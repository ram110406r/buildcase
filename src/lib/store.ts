import { create } from "zustand";
import { persist } from "zustand/middleware";

/* ────────────────────────── helpers ────────────────────────── */
let _id = Date.now();
export const uid = () => String(++_id);
export const now = () => new Date().toISOString();

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

// ─── Projects (aggregation layer for Dashboard) ───
interface ProjectStore {
  projects: Project[];
  addProject: (p: Omit<Project, "id" | "updatedAt">) => void;
  updateStatus: (id: string, status: ProjectStatus) => void;
  removeProject: (id: string) => void;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      projects: [],
      addProject: (p) =>
        set((s) => ({
          projects: [{ ...p, id: uid(), updatedAt: now() }, ...s.projects],
        })),
      updateStatus: (id, status) =>
        set((s) => ({
          projects: s.projects.map((p) =>
            p.id === id ? { ...p, status, updatedAt: now() } : p
          ),
        })),
      removeProject: (id) =>
        set((s) => ({ projects: s.projects.filter((p) => p.id !== id) })),
    }),
    { name: "buildcase-projects" }
  )
);

// ─── Specs ───
interface SpecStore {
  specs: Spec[];
  addSpec: (s: Omit<Spec, "id" | "updatedAt">) => void;
  updateSpec: (id: string, patch: Partial<Spec>) => void;
  toggleRequirement: (specId: string, reqIdx: number) => void;
  removeSpec: (id: string) => void;
}

export const useSpecStore = create<SpecStore>()(
  persist(
    (set) => ({
      specs: [],
      addSpec: (s) =>
        set((st) => ({
          specs: [{ ...s, id: uid(), updatedAt: now() }, ...st.specs],
        })),
      updateSpec: (id, patch) =>
        set((st) => ({
          specs: st.specs.map((s) =>
            s.id === id ? { ...s, ...patch, updatedAt: now() } : s
          ),
        })),
      toggleRequirement: (specId, reqIdx) =>
        set((st) => ({
          specs: st.specs.map((s) => {
            if (s.id !== specId) return s;
            const reqs = [...s.requirements];
            reqs[reqIdx] = { ...reqs[reqIdx], done: !reqs[reqIdx].done };
            return { ...s, requirements: reqs, updatedAt: now() };
          }),
        })),
      removeSpec: (id) =>
        set((st) => ({ specs: st.specs.filter((s) => s.id !== id) })),
    }),
    { name: "buildcase-specs" }
  )
);

// ─── Tasks ───
interface TaskStore {
  tasks: Task[];
  addTask: (t: Omit<Task, "id" | "updatedAt">) => void;
  moveTask: (id: string, status: TaskStatus) => void;
  removeTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (t) =>
        set((s) => ({
          tasks: [{ ...t, id: uid(), updatedAt: now() }, ...s.tasks],
        })),
      moveTask: (id, status) =>
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id === id ? { ...t, status, updatedAt: now() } : t
          ),
        })),
      removeTask: (id) =>
        set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),
    }),
    { name: "buildcase-tasks" }
  )
);

// ─── Bugs ───
interface BugStore {
  bugs: Bug[];
  addBug: (b: Omit<Bug, "id" | "updatedAt">) => void;
  updateBugStatus: (id: string, status: BugStatus) => void;
  removeBug: (id: string) => void;
}

export const useBugStore = create<BugStore>()(
  persist(
    (set) => ({
      bugs: [],
      addBug: (b) =>
        set((s) => ({
          bugs: [{ ...b, id: uid(), updatedAt: now() }, ...s.bugs],
        })),
      updateBugStatus: (id, status) =>
        set((s) => ({
          bugs: s.bugs.map((b) =>
            b.id === id ? { ...b, status, updatedAt: now() } : b
          ),
        })),
      removeBug: (id) =>
        set((s) => ({ bugs: s.bugs.filter((b) => b.id !== id) })),
    }),
    { name: "buildcase-bugs" }
  )
);

// ─── Research ───
interface ResearchStore {
  entries: ResearchEntry[];
  addEntry: (content: string) => void;
  removeEntry: (id: string) => void;
  clearAll: () => void;
}

export const useResearchStore = create<ResearchStore>()(
  persist(
    (set) => ({
      entries: [],
      addEntry: (content) => {
        const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
        set((s) => ({
          entries: [
            { id: uid(), content, wordCount, createdAt: now() },
            ...s.entries,
          ],
        }));
      },
      removeEntry: (id) =>
        set((s) => ({ entries: s.entries.filter((e) => e.id !== id) })),
      clearAll: () => set({ entries: [] }),
    }),
    { name: "buildcase-research" }
  )
);

// ─── Settings ───
interface SettingsStore {
  operatorName: string;
  theme: "Parchment (Default)" | "High Contrast" | "Terminal Noir";
  criticalAlerts: boolean;
  autoArchiving: boolean;
  setOperatorName: (name: string) => void;
  setTheme: (t: SettingsStore["theme"]) => void;
  toggleCriticalAlerts: () => void;
  toggleAutoArchiving: () => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      operatorName: "Admin Operator",
      theme: "Parchment (Default)",
      criticalAlerts: true,
      autoArchiving: false,
      setOperatorName: (name) => set({ operatorName: name }),
      setTheme: (theme) => set({ theme }),
      toggleCriticalAlerts: () =>
        set((s) => ({ criticalAlerts: !s.criticalAlerts })),
      toggleAutoArchiving: () =>
        set((s) => ({ autoArchiving: !s.autoArchiving })),
    }),
    { name: "buildcase-settings" }
  )
);
