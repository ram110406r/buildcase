import React, { useState } from "react";
import { motion } from "framer-motion";
import { GripVertical, Plus } from "lucide-react";

const MONO: React.CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" };

type Priority = "low" | "medium" | "high";
type Task = { id: string; title: string; priority: Priority; assignee: string };
type Column = { id: string; title: string; tasks: Task[] };

const initialColumns: Column[] = [
  {
    id: "backlog",
    title: "BACKLOG",
    tasks: [
      { id: "1", title: "Design social auth buttons", priority: "medium", assignee: "AK" },
      { id: "2", title: "Write privacy policy copy", priority: "low", assignee: "JR" },
    ],
  },
  {
    id: "ready",
    title: "READY",
    tasks: [
      { id: "3", title: "Set up OAuth credentials", priority: "high", assignee: "MK" },
    ],
  },
  {
    id: "in-progress",
    title: "IN PROGRESS",
    tasks: [
      { id: "4", title: "Implement Google OAuth flow", priority: "high", assignee: "AK" },
      { id: "5", title: "Build progressive onboarding UI", priority: "medium", assignee: "JR" },
    ],
  },
  {
    id: "review",
    title: "REVIEW",
    tasks: [
      { id: "6", title: "Magic link email template", priority: "medium", assignee: "MK" },
    ],
  },
  {
    id: "done",
    title: "DONE",
    tasks: [
      { id: "7", title: "Database schema for user profiles", priority: "high", assignee: "AK" },
    ],
  },
];

const priorityStyle: Record<Priority, React.CSSProperties> = {
  high: { background: "#F44B4B18", color: "#C0392B", border: "1px solid #F44B4B40" },
  medium: { background: "#F2A65A1A", color: "#B07830", border: "1px solid #F2A65A40" },
  low: { background: "#7A7F851A", color: "#5A5F65", border: "1px solid #7A7F8540" },
};

export default function BuildTasks() {
  const [columns] = useState<Column[]>(initialColumns);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.1em" }}>
            BUILDCASE / TASKS
          </p>
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "22px",
              color: "#23262B",
              marginTop: "6px",
            }}
          >
            Build Tasks
          </h1>
          <p style={{ fontSize: "13px", color: "#7A7F85", marginTop: "4px" }}>
            Developer-ready tasks generated from feature specs.
          </p>
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "#23262B",
            color: "#F3EFE6",
            border: "none",
            borderRadius: "4px",
            padding: "9px 16px",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
            flexShrink: 0,
          }}
        >
          <Plus style={{ width: "14px", height: "14px" }} />
          Add Task
        </button>
      </div>

      {/* Kanban board */}
      <div style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "16px" }}>
        {columns.map((column) => (
          <div key={column.id} style={{ minWidth: "240px", width: "240px", flexShrink: 0 }}>
            {/* Column header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px",
                padding: "8px 12px",
                background: "#F7F4EC",
                border: "1px solid #D6D2C8",
                borderRadius: "4px",
              }}
            >
              <span style={{ ...MONO, fontSize: "9px", fontWeight: 600, letterSpacing: "0.1em", color: "#23262B" }}>
                {column.title}
              </span>
              <span
                style={{
                  ...MONO,
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#E36A2C",
                  background: "#E36A2C15",
                  padding: "1px 6px",
                  borderRadius: "2px",
                }}
              >
                {column.tasks.length}
              </span>
            </div>

            {/* Tasks */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {column.tasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    background: "#F7F4EC",
                    border: "1px solid #D6D2C8",
                    borderRadius: "4px",
                    padding: "12px",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <GripVertical
                      style={{ width: "12px", height: "12px", color: "#D6D2C8", marginTop: "1px", flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "12px", fontWeight: 500, color: "#23262B", lineHeight: "1.5" }}>
                        {task.title}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px" }}>
                        <span
                          style={{
                            ...MONO,
                            fontSize: "8px",
                            fontWeight: 600,
                            letterSpacing: "0.06em",
                            padding: "2px 6px",
                            borderRadius: "2px",
                            ...priorityStyle[task.priority],
                          }}
                        >
                          {task.priority.toUpperCase()}
                        </span>
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            background: "#23262B",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <span
                            style={{
                              ...MONO,
                              fontSize: "8px",
                              fontWeight: 700,
                              color: "#F3EFE6",
                            }}
                          >
                            {task.assignee[0]}
                          </span>
                        </div>
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
