import { create } from 'zustand';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  where,
  orderBy,
  serverTimestamp,
  getDocs,
  writeBatch
} from 'firebase/firestore';
import { db, auth } from './firebase';

/* ────────────────────────── helpers ────────────────────────── */
export const now = () => new Date().toISOString();

// Convert Firestore timestamp to ISO string
const fromFirestoreTimestamp = (timestamp: any): string => {
  if (!timestamp) return now();
  if (typeof timestamp.toDate === 'function') {
    return timestamp.toDate().toISOString();
  }
  return timestamp;
};

/* ────────────────────────── types ────────────────────────── */

export type ProjectType = "Spec" | "Bug Report" | "Research" | "Build Plan";
export type ProjectStatus = "In Progress" | "Review" | "Complete";

export interface Project {
  id: string;
  name: string;
  type: ProjectType;
  status: ProjectStatus;
  updatedAt: string;
}

export interface Spec {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  sprint: string;
  storyPoints: number;
  userStories: { role: string; action: string; benefit: string }[];
  requirements: { text: string; done: boolean }[];
  edgeCases: { title: string; description: string }[];
  updatedAt: string;
}

export type TaskStatus = "Backlog" | "In Progress" | "Done";
export type TaskPriority = "High" | "Medium" | "Low";

export interface Task {
  id: string;
  title: string;
  assignee: string;
  priority: TaskPriority;
  status: TaskStatus;
  tag: string;
  updatedAt: string;
}

export type BugSeverity = "Critical" | "High" | "Medium" | "Low";
export type BugStatus = "Open" | "In Progress" | "Resolved" | "Closed";

export interface Bug {
  id: string;
  title: string;
  severity: BugSeverity;
  status: BugStatus;
  reporter: string;
  description: string;
  steps: string;
  expected: string;
  actual: string;
  updatedAt: string;
}

export interface ResearchEntry {
  id: string;
  content: string;
  wordCount: number;
  createdAt: string;
}

/* ────────────────────────── stores ────────────────────────── */

// ─── Projects ───
interface ProjectStore {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  subscribe: (userId: string) => void;
  unsubscribe: () => void;
  addProject: (p: Omit<Project, "id" | "updatedAt">) => Promise<void>;
  updateStatus: (id: string, status: ProjectStatus) => Promise<void>;
  removeProject: (id: string) => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,
  unsubscribe: () => {},
  
  subscribe: (userId: string) => {
    const q = query(
      collection(db, 'projects'),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projects = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        updatedAt: fromFirestoreTimestamp(doc.data().updatedAt),
      })) as Project[];
      set({ projects, isLoading: false });
    }, (error) => {
      console.error('Error subscribing to projects:', error);
      set({ error: error.message, isLoading: false });
    });
    
    set({ unsubscribe, isLoading: true });
  },
  
  addProject: async (project) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
      
      await addDoc(collection(db, 'projects'), {
        ...project,
        userId: user.uid,
        updatedAt: serverTimestamp(),
      });
    } catch (error: any) {
      console.error('Error adding project:', error);
      throw error;
    }
  },
  
  updateStatus: async (id, status) => {
    try {
      const projectRef = doc(db, 'projects', id);
      await updateDoc(projectRef, {
        status,
        updatedAt: serverTimestamp(),
      });
    } catch (error: any) {
      console.error('Error updating project:', error);
      throw error;
    }
  },
  
  removeProject: async (id) => {
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (error: any) {
      console.error('Error removing project:', error);
      throw error;
    }
  },
}));

// ─── Specs ───
interface SpecStore {
  specs: Spec[];
  isLoading: boolean;
  error: string | null;
  subscribe: (userId: string) => void;
  unsubscribe: () => void;
  addSpec: (s: Omit<Spec, "id" | "updatedAt">) => Promise<void>;
  updateSpec: (id: string, patch: Partial<Spec>) => Promise<void>;
  toggleRequirement: (specId: string, reqIdx: number) => Promise<void>;
  removeSpec: (id: string) => Promise<void>;
}

export const useSpecStore = create<SpecStore>((set, get) => ({
  specs: [],
  isLoading: false,
  error: null,
  unsubscribe: () => {},
  
  subscribe: (userId: string) => {
    const q = query(
      collection(db, 'specs'),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const specs = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        updatedAt: fromFirestoreTimestamp(doc.data().updatedAt),
      })) as Spec[];
      set({ specs, isLoading: false });
    }, (error) => {
      console.error('Error subscribing to specs:', error);
      set({ error: error.message, isLoading: false });
    });
    
    set({ unsubscribe, isLoading: true });
  },
  
  addSpec: async (spec) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
      
      await addDoc(collection(db, 'specs'), {
        ...spec,
        userId: user.uid,
        updatedAt: serverTimestamp(),
      });
    } catch (error: any) {
      console.error('Error adding spec:', error);
      throw error;
    }
  },
  
  updateSpec: async (id, patch) => {
    try {
      const specRef = doc(db, 'specs', id);
      await updateDoc(specRef, {
        ...patch,
        updatedAt: serverTimestamp(),
      });
    } catch (error: any) {
      console.error('Error updating spec:', error);
      throw error;
    }
  },
  
  toggleRequirement: async (specId, reqIdx) => {
    try {
      const specRef = doc(db, 'specs', specId);
      // Note: This requires reading the current spec first
      // For production, consider using a cloud function or batch operation
      console.warn('toggleRequirement needs implementation with read-modify-write pattern');
    } catch (error: any) {
      console.error('Error toggling requirement:', error);
      throw error;
    }
  },
  
  removeSpec: async (id) => {
    try {
      await deleteDoc(doc(db, 'specs', id));
    } catch (error: any) {
      console.error('Error removing spec:', error);
      throw error;
    }
  },
}));

// ─── Tasks ───
interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  subscribe: (userId: string) => void;
  unsubscribe: () => void;
  addTask: (t: Omit<Task, "id" | "updatedAt">) => Promise<void>;
  moveTask: (id: string, status: TaskStatus) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,
  unsubscribe: () => {},
  
  subscribe: (userId: string) => {
    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        updatedAt: fromFirestoreTimestamp(doc.data().updatedAt),
      })) as Task[];
      set({ tasks, isLoading: false });
    }, (error) => {
      console.error('Error subscribing to tasks:', error);
      set({ error: error.message, isLoading: false });
    });
    
    set({ unsubscribe, isLoading: true });
  },
  
  addTask: async (task) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
      
      await addDoc(collection(db, 'tasks'), {
        ...task,
        userId: user.uid,
        updatedAt: serverTimestamp(),
      });
    } catch (error: any) {
      console.error('Error adding task:', error);
      throw error;
    }
  },
  
  moveTask: async (id, status) => {
    try {
      const taskRef = doc(db, 'tasks', id);
      await updateDoc(taskRef, {
        status,
        updatedAt: serverTimestamp(),
      });
    } catch (error: any) {
      console.error('Error moving task:', error);
      throw error;
    }
  },
  
  removeTask: async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
    } catch (error: any) {
      console.error('Error removing task:', error);
      throw error;
    }
  },
}));

// ─── Bugs ───
interface BugStore {
  bugs: Bug[];
  isLoading: boolean;
  error: string | null;
  subscribe: (userId: string) => void;
  unsubscribe: () => void;
  addBug: (b: Omit<Bug, "id" | "updatedAt">) => Promise<void>;
  updateBugStatus: (id: string, status: BugStatus) => Promise<void>;
  removeBug: (id: string) => Promise<void>;
}

export const useBugStore = create<BugStore>((set, get) => ({
  bugs: [],
  isLoading: false,
  error: null,
  unsubscribe: () => {},
  
  subscribe: (userId: string) => {
    const q = query(
      collection(db, 'bugs'),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bugs = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        updatedAt: fromFirestoreTimestamp(doc.data().updatedAt),
      })) as Bug[];
      set({ bugs, isLoading: false });
    }, (error) => {
      console.error('Error subscribing to bugs:', error);
      set({ error: error.message, isLoading: false });
    });
    
    set({ unsubscribe, isLoading: true });
  },
  
  addBug: async (bug) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
      
      await addDoc(collection(db, 'bugs'), {
        ...bug,
        userId: user.uid,
        updatedAt: serverTimestamp(),
      });
    } catch (error: any) {
      console.error('Error adding bug:', error);
      throw error;
    }
  },
  
  updateBugStatus: async (id, status) => {
    try {
      const bugRef = doc(db, 'bugs', id);
      await updateDoc(bugRef, {
        status,
        updatedAt: serverTimestamp(),
      });
    } catch (error: any) {
      console.error('Error updating bug:', error);
      throw error;
    }
  },
  
  removeBug: async (id) => {
    try {
      await deleteDoc(doc(db, 'bugs', id));
    } catch (error: any) {
      console.error('Error removing bug:', error);
      throw error;
    }
  },
}));

// ─── Research ───
interface ResearchStore {
  entries: ResearchEntry[];
  isLoading: boolean;
  error: string | null;
  subscribe: (userId: string) => void;
  unsubscribe: () => void;
  addEntry: (content: string) => Promise<void>;
  removeEntry: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;
}

export const useResearchStore = create<ResearchStore>((set, get) => ({
  entries: [],
  isLoading: false,
  error: null,
  unsubscribe: () => {},
  
  subscribe: (userId: string) => {
    const q = query(
      collection(db, 'research'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const entries = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        createdAt: fromFirestoreTimestamp(doc.data().createdAt),
      })) as ResearchEntry[];
      set({ entries, isLoading: false });
    }, (error) => {
      console.error('Error subscribing to research:', error);
      set({ error: error.message, isLoading: false });
    });
    
    set({ unsubscribe, isLoading: true });
  },
  
  addEntry: async (content) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
      
      const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
      
      await addDoc(collection(db, 'research'), {
        content,
        wordCount,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
    } catch (error: any) {
      console.error('Error adding research entry:', error);
      throw error;
    }
  },
  
  removeEntry: async (id) => {
    try {
      await deleteDoc(doc(db, 'research', id));
    } catch (error: any) {
      console.error('Error removing research entry:', error);
      throw error;
    }
  },
  
  clearAll: async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
      
      const q = query(
        collection(db, 'research'),
        where('userId', '==', user.uid)
      );
      
      const snapshot = await getDocs(q);
      const batch = writeBatch(db);
      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    } catch (error: any) {
      console.error('Error clearing all research:', error);
      throw error;
    }
  },
}));

// ─── Settings ───
interface SettingsStore {
  operatorName: string;
  theme: "Parchment (Default)" | "High Contrast" | "Terminal Noir";
  criticalAlerts: boolean;
  autoArchiving: boolean;
  isLoading: boolean;
  error: string | null;
  subscribe: (userId: string) => void;
  unsubscribe: () => void;
  setOperatorName: (name: string) => Promise<void>;
  setTheme: (t: SettingsStore["theme"]) => Promise<void>;
  toggleCriticalAlerts: () => Promise<void>;
  toggleAutoArchiving: () => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  operatorName: "Admin Operator",
  theme: "Parchment (Default)",
  criticalAlerts: true,
  autoArchiving: false,
  isLoading: false,
  error: null,
  unsubscribe: () => {},
  
  subscribe: (userId: string) => {
    const settingsRef = doc(db, 'settings', userId);
    
    const unsubscribe = onSnapshot(settingsRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        set({
          operatorName: data.operatorName || "Admin Operator",
          theme: data.theme || "Parchment (Default)",
          criticalAlerts: data.criticalAlerts ?? true,
          autoArchiving: data.autoArchiving ?? false,
          isLoading: false,
        });
      } else {
        // Create default settings if they don't exist
        set({
          operatorName: "Admin Operator",
          theme: "Parchment (Default)",
          criticalAlerts: true,
          autoArchiving: false,
          isLoading: false,
        });
      }
    }, (error) => {
      console.error('Error subscribing to settings:', error);
      set({ error: error.message, isLoading: false });
    });
    
    set({ unsubscribe, isLoading: true });
  },
  
  setOperatorName: async (name) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
      
      const settingsRef = doc(db, 'settings', user.uid);
      await updateDoc(settingsRef, { operatorName: name });
    } catch (error: any) {
      console.error('Error setting operator name:', error);
      throw error;
    }
  },
  
  setTheme: async (theme) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
      
      const settingsRef = doc(db, 'settings', user.uid);
      await updateDoc(settingsRef, { theme });
    } catch (error: any) {
      console.error('Error setting theme:', error);
      throw error;
    }
  },
  
  toggleCriticalAlerts: async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
      
      const settingsRef = doc(db, 'settings', user.uid);
      await updateDoc(settingsRef, { criticalAlerts: !get().criticalAlerts });
    } catch (error: any) {
      console.error('Error toggling critical alerts:', error);
      throw error;
    }
  },
  
  toggleAutoArchiving: async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
      
      const settingsRef = doc(db, 'settings', user.uid);
      await updateDoc(settingsRef, { autoArchiving: !get().autoArchiving });
    } catch (error: any) {
      console.error('Error toggling auto archiving:', error);
      throw error;
    }
  },
}));
