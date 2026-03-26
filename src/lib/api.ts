import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from './firebase';
import { useProjectStore, useSpecStore, useTaskStore, useBugStore, useResearchStore, useSettingsStore } from "@/lib/store";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

// Helper to get auth token (for legacy backend)
const getAuthHeader = () => {
  const user = auth.currentUser;
  return user ? {} : {}; // Firebase uses client-side auth
};

/* ==================== AUTH SERVICE ==================== */
export const authService = {
  async register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: new Date().toISOString(),
      });
      
      // Create default settings
      await setDoc(doc(db, 'settings', user.uid), {
        operatorName: 'Admin Operator',
        theme: 'Parchment (Default)',
        criticalAlerts: true,
        autoArchiving: false,
        createdAt: new Date().toISOString(),
      });
      
      return user;
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.message || 'Registration failed');
    }
  },

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.code === 'auth/wrong-credential' ? 'Incorrect email or password' : error.message);
    }
  },

  async logout() {
    await signOut(auth);
  },

  async getCurrentUser(): Promise<User | null> {
    return auth.currentUser;
  },
  
  onAuthStateChanged: (callback: (user: User | null) => void) => {
    return auth.onAuthStateChanged(callback);
  },
};

/* ==================== RESEARCH SERVICE ==================== */
export const researchService = {
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    
    const res = await fetch(`${API_BASE_URL}/research/upload`, {
      method: "POST",
      headers: getAuthHeader(),
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");
    return res.json();
  },

  async getFiles() {
    const res = await fetch(`${API_BASE_URL}/research/files`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
  },

  async deleteFile(id: number) {
    const res = await fetch(`${API_BASE_URL}/research/files/${id}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Delete failed");
    return res.json();
  },

  // Sync local store with backend
  async syncWithBackend() {
    try {
      const files = await this.getFiles();
      const { entries, addEntry } = useResearchStore.getState();
      
      // Add files not in local store
      for (const file of files) {
        if (!entries.find(e => e.id === file.id.toString())) {
          addEntry(file.raw_content || "");
        }
      }
    } catch (error) {
      console.warn("Backend sync failed, using local storage only");
    }
  },
};

/* ==================== ANALYSIS SERVICE ==================== */
export const analysisService = {
  async runBMAD(researchFileIds: number[]) {
    const res = await fetch(`${API_BASE_URL}/analysis/run`, {
      method: "POST",
      headers: { ...getAuthHeader(), "Content-Type": "application/json" },
      body: JSON.stringify({ research_file_ids: researchFileIds }),
    });
    if (!res.ok) throw new Error("Analysis failed");
    return res.json();
  },

  async getJobStatus(jobId: number) {
    const res = await fetch(`${API_BASE_URL}/analysis/jobs/${jobId}`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
  },

  async getJobBrief(jobId: number) {
    const res = await fetch(`${API_BASE_URL}/analysis/jobs/${jobId}/brief`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
  },
};

/* ==================== SPECS SERVICE ==================== */
export const specsService = {
  async createSpec(data: any) {
    const res = await fetch(`${API_BASE_URL}/briefs`, {
      method: "POST",
      headers: { ...getAuthHeader(), "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Create failed");
    return res.json();
  },

  async getSpecs() {
    const res = await fetch(`${API_BASE_URL}/briefs`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
  },

  async updateSpec(id: number, data: any) {
    const res = await fetch(`${API_BASE_URL}/briefs/${id}`, {
      method: "PUT",
      headers: { ...getAuthHeader(), "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Update failed");
    return res.json();
  },

  async deleteSpec(id: number) {
    const res = await fetch(`${API_BASE_URL}/briefs/${id}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Delete failed");
    return res.json();
  },

  async exportSpec(id: number, format: "json" | "pdf") {
    const res = await fetch(`${API_BASE_URL}/briefs/${id}/export?format=${format}`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Export failed");
    if (format === "pdf") {
      return res.blob();
    }
    return res.json();
  },
};

/* ==================== TASKS SERVICE ==================== */
export const tasksService = {
  async createTask(data: any) {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: { ...getAuthHeader(), "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Create failed");
    return res.json();
  },

  async getTasks() {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
  },

  async updateTask(id: number, data: any) {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { ...getAuthHeader(), "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Update failed");
    return res.json();
  },

  async deleteTask(id: number) {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Delete failed");
    return res.json();
  },
};

/* ==================== BUGS SERVICE ==================== */
export const bugsService = {
  async createBug(data: any) {
    const res = await fetch(`${API_BASE_URL}/bugs`, {
      method: "POST",
      headers: { ...getAuthHeader(), "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Create failed");
    return res.json();
  },

  async getBugs() {
    const res = await fetch(`${API_BASE_URL}/bugs`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
  },

  async updateBug(id: number, data: any) {
    const res = await fetch(`${API_BASE_URL}/bugs/${id}`, {
      method: "PUT",
      headers: { ...getAuthHeader(), "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Update failed");
    return res.json();
  },

  async deleteBug(id: number) {
    const res = await fetch(`${API_BASE_URL}/bugs/${id}`, {
      method: "DELETE",
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Delete failed");
    return res.json();
  },
};

/* ==================== SETTINGS SERVICE ==================== */
export const settingsService = {
  async getSettings() {
    const res = await fetch(`${API_BASE_URL}/settings`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
  },

  async updateSettings(data: any) {
    const res = await fetch(`${API_BASE_URL}/settings`, {
      method: "PUT",
      headers: { ...getAuthHeader(), "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Update failed");
    return res.json();
  },
};
