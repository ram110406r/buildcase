import React, { useState } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Plus, Trash2, ChevronDown, GripVertical } from "lucide-react";
import { useTaskStore, type TaskStatus, type TaskPriority } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

const MONO: React.CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" };
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.2 } } };

const columns: TaskStatus[] = ["Backlog", "In Progress", "Done"];

const priorityColor: Record<TaskPriority, { bg: string; text: string }> = {
  High: { bg: "#E36A2C18", text: "#C4561E" },
  Medium: { bg: "#F2A65A18", text: "#B07830" },
  Low: { bg: "#23262B12", text: "#7A7F85" },
};

const colHeaderColor: Record<TaskStatus, string> = {
  Backlog: "#7A7F85",
  "In Progress": "#E36A2C",
  Done: "#16A34A",
};

function AddTaskForm({ onClose }: { onClose: () => void }) {
  const { addTask } = useTaskStore();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("Medium");
  const [tag, setTag] = useState("");

  const submit = () => {
    if (!title.trim()) return;
    addTask({ title: title.trim(), assignee: assignee.trim() || "Unassigned", priority, status: "Backlog", tag: tag.trim() || "General" });
    toast({ title: "Task created", description: `"${title.trim()}" added to Backlog.` });
    onClose();
  };

  return (
    <div style={{ background: "#F7F4EC", border: "1px solid #D6D2C8", borderRadius: "4px", padding: "16px", marginBottom: "12px", display: "flex", flexDirection: "column", gap: "10px" }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title *"
        style={{ ...MONO, fontSize: "12px", padding: "6px 10px", background: "#F9F6EF", border: "1px solid #D6D2C8", borderRadius: "3px", outline: "none", color: "#23262B", width: "100%", boxSizing: "border-box" }} />
      <div style={{ display: "flex", gap: "8px" }}>
        <input value={assignee} onChange={(e) => setAssignee(e.target.value)} placeholder="Assignee"
          style={{ ...MONO, fontSize: "11px", padding: "5px 8px", background: "#F9F6EF", border: "1px solid #D6D2C8", borderRadius: "3px", outline: "none", color: "#23262B", flex: 1 }} />
        <input value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Tag"
          style={{ ...MONO, fontSize: "11px", padding: "5px 8px", background: "#F9F6EF", border: "1px solid #D6D2C8", borderRadius: "3px", outline: "none", color: "#23262B", flex: 1 }} />
      </div>
      <div style={{ display: "flex", gap: "6px" }}>
        {(["High", "Medium", "Low"] as const).map((p) => (
          <button key={p} onClick={() => setPriority(p)} style={{
            ...MONO, fontSize: "9px", padding: "3px 10px", borderRadius: "2px", cursor: "pointer", fontWeight: 600,
            border: "1px solid #D6D2C8", background: priority === p ? "#23262B" : "#F9F6EF", color: priority === p ? "#F3EFE6" : "#23262B",
          }}>{p.toUpperCase()}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={submit} disabled={!title.trim()} style={{
          ...MONO, fontSize: "11px", padding: "5px 14px", background: title.trim() ? "#23262B" : "#7A7F85", color: "#F3EFE6",
          border: "none", borderRadius: "3px", cursor: title.trim() ? "pointer" : "not-allowed", fontWeight: 600,
        }}>ADD</button>
        <button onClick={onClose} style={{ ...MONO, fontSize: "11px", padding: "5px 14px", background: "transparent", color: "#7A7F85", border: "1px solid #D6D2C8", borderRadius: "3px", cursor: "pointer" }}>CANCEL</button>
      </div>
    </div>
  );
}

export default function BuildTasks() {
  const { tasks, moveTask, removeTask } = useTaskStore();
  const { toast } = useToast();
  const [showAdd, setShowAdd] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = "move";
    // Set a transparent drag image or customize
    e.dataTransfer.setData("text/plain", taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId) {
      moveTask(taskId, status);
      toast({ title: "Task moved", description: `Task moved to ${status}` });
    }
    setDraggedTaskId(null);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl space-y-6">
      <motion.div variants={item}>
        <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.1em" }}>BUILDCASE / BUILD</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "6px" }}>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "22px", color: "#23262B" }}>Build Tasks</h1>
          <button onClick={() => setShowAdd(!showAdd)} style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: "#23262B", color: "#F3EFE6", border: "none", borderRadius: "4px",
            padding: "8px 16px", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif",
          }}>
            <Plus style={{ width: 14, height: 14 }} /> Add Task
          </button>
        </div>
        <p style={{ fontSize: "13px", color: "#7A7F85", marginTop: "4px" }}>Kanban board for tracking implementation progress.</p>
      </motion.div>

      {/* Kanban */}
      <motion.div variants={item} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", alignItems: "start" }}>
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col);
          return (
            <div key={col} style={{ background: "#F7F4EC", border: "1px solid #D6D2C8", borderRadius: "4px", overflow: "hidden", minHeight: "200px" }}>
              {/* Column Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: "1px solid #D6D2C8", background: "#EDE9E0" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: colHeaderColor[col] }} />
                  <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", color: "#23262B", fontWeight: 600 }}>{col.toUpperCase()}</span>
                </span>
                <span style={{ ...MONO, fontSize: "10px", color: "#7A7F85" }}>{colTasks.length}</span>
              </div>

              <div 
                style={{ padding: "10px", display: "flex", flexDirection: "column", gap: "8px" }}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, col)}
              >
                {col === "Backlog" && showAdd && <AddTaskForm onClose={() => setShowAdd(false)} />}

                {colTasks.map((task) => {
                  const pc = priorityColor[task.priority];
                  return (
                    <div 
                      key={task.id} 
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      style={{ 
                        background: "#F9F6EF", 
                        border: draggedTaskId === task.id ? "2px solid #E36A2C" : "1px solid #E8E4DC", 
                        borderRadius: "4px", 
                        padding: "10px 12px",
                        cursor: "grab",
                        opacity: draggedTaskId === task.id ? 0.5 : 1,
                        transition: "all 150ms",
                      }}
                      onMouseEnter={(e) => { if (draggedTaskId !== task.id) e.currentTarget.style.borderColor = "#D6D2C8"; }}
                      onMouseLeave={(e) => { if (draggedTaskId !== task.id) e.currentTarget.style.borderColor = "#E8E4DC"; }}
                    >
                      <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", flex: 1 }}>
                          <GripVertical style={{ width: 12, height: 12, color: "#B0A590", flexShrink: 0 }} />
                          <p style={{ fontSize: "13px", fontWeight: 500, color: "#23262B", lineHeight: 1.4 }}>{task.title}</p>
                        </div>
                        <button onClick={() => { removeTask(task.id); toast({ title: "Task removed" }); }}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "#7A7F85", padding: "2px", flexShrink: 0 }}>
                          <Trash2 style={{ width: 11, height: 11 }} />
                        </button>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ ...MONO, fontSize: "8px", fontWeight: 600, background: pc.bg, color: pc.text, padding: "1px 6px", borderRadius: "2px" }}>
                            {task.priority.toUpperCase()}
                          </span>
                          {task.tag && <span style={{ ...MONO, fontSize: "8px", color: "#7A7F85" }}>{task.tag}</span>}
                        </div>
                        {/* Status move dropdown */}
                        <div style={{ position: "relative", display: "inline-block" }}>
                          <select value={task.status} onChange={(e) => moveTask(task.id, e.target.value as TaskStatus)}
                            style={{
                              ...MONO, fontSize: "9px", padding: "2px 18px 2px 6px", border: "1px solid #D6D2C8",
                              borderRadius: "2px", background: "#F9F6EF", color: "#7A7F85", cursor: "pointer",
                              appearance: "none", WebkitAppearance: "none",
                            }}>
                            {columns.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <ChevronDown style={{ width: "8px", height: "8px", position: "absolute", right: "4px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#7A7F85" }} />
                        </div>
                      </div>
                      <p style={{ ...MONO, fontSize: "9px", color: "#7A7F85", marginTop: "6px" }}>{task.assignee}</p>
                    </div>
                  );
                })}

                {colTasks.length === 0 && (
                  <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", textAlign: "center", padding: "20px 0", opacity: 0.5 }}>EMPTY</p>
                )}
              </div>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
