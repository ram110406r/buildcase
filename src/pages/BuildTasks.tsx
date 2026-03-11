import { motion } from "framer-motion";
import { useState } from "react";
import { GripVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type Task = {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
  assignee: string;
};

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

const initialColumns: Column[] = [
  {
    id: "backlog",
    title: "Backlog",
    tasks: [
      { id: "1", title: "Design social auth buttons", priority: "medium", assignee: "AK" },
      { id: "2", title: "Write privacy policy copy", priority: "low", assignee: "JR" },
    ],
  },
  {
    id: "ready",
    title: "Ready",
    tasks: [
      { id: "3", title: "Set up OAuth credentials", priority: "high", assignee: "MK" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      { id: "4", title: "Implement Google OAuth flow", priority: "high", assignee: "AK" },
      { id: "5", title: "Build progressive onboarding UI", priority: "medium", assignee: "JR" },
    ],
  },
  {
    id: "review",
    title: "Review",
    tasks: [
      { id: "6", title: "Magic link email template", priority: "medium", assignee: "MK" },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      { id: "7", title: "Database schema for user profiles", priority: "high", assignee: "AK" },
    ],
  },
];

const priorityColor: Record<string, string> = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-secondary/10 text-secondary",
  low: "bg-accent/10 text-accent",
};

export default function BuildTasks() {
  const [columns] = useState<Column[]>(initialColumns);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Build Tasks</h1>
          <p className="text-sm text-muted-foreground mt-1">Developer-ready tasks from your specs.</p>
        </div>
        <Button className="gradient-primary text-primary-foreground hover:opacity-90 gap-2">
          <Plus className="h-4 w-4" /> Add Task
        </Button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div key={column.id} className="min-w-[260px] w-[260px] shrink-0">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {column.title}
              </h3>
              <span className="text-xs text-muted-foreground font-mono bg-muted/50 px-1.5 py-0.5 rounded">
                {column.tasks.length}
              </span>
            </div>
            <div className="space-y-2">
              {column.tasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  className="glass-panel card-hover p-3 cursor-pointer"
                >
                  <div className="flex items-start gap-2">
                    <GripVertical className="h-4 w-4 text-muted-foreground/30 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{task.title}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-xs px-1.5 py-0.5 rounded font-medium capitalize ${priorityColor[task.priority]}`}>
                          {task.priority}
                        </span>
                        <span className="text-xs h-5 w-5 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-medium">
                          {task.assignee[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
