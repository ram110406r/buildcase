import React, { useState } from "react";
import { motion } from "framer-motion";
import { FolderOpen, Plus, Trash2, ChevronRight, X } from "lucide-react";
import { useProjectStore, type Project } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

const MONO: React.CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" };
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.2 } } };

const statusColor: Record<string, { bg: string; text: string }> = {
  Active: { bg: "#16A34A18", text: "#16A34A" },
  Planning: { bg: "#F2A65A18", text: "#B07830" },
  "On Hold": { bg: "#23262B12", text: "#7A7F85" },
  Completed: { bg: "#23262B18", text: "#23262B" },
};

export default function Projects() {
  const { projects, addProject, removeProject, setActiveProject, activeProjectId } = useProjectStore();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState<"Active" | "Planning" | "On Hold" | "Completed">("Planning");

  const submit = () => {
    if (!title.trim()) return;
    addProject({ name: title.trim(), description: desc.trim(), status });
    toast({ title: "Project created", description: `"${title.trim()}" added.` });
    setTitle("");
    setDesc("");
    setShowForm(false);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl space-y-6">
      <motion.div variants={item}>
        <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.1em" }}>BUILDCASE / PROJECTS</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "6px" }}>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "22px", color: "#23262B" }}>Projects</h1>
          <button onClick={() => setShowForm(!showForm)} style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: "#23262B", color: "#F3EFE6", border: "none", borderRadius: "4px",
            padding: "8px 16px", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif",
          }}>
            <Plus style={{ width: 14, height: 14 }} /> New Project
          </button>
        </div>
        <p style={{ fontSize: "13px", color: "#7A7F85", marginTop: "4px" }}>Manage product initiatives.</p>
      </motion.div>

      {/* New project form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} style={{ background: "#F7F4EC", border: "1px solid #D6D2C8", borderRadius: "4px", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", borderBottom: "1px solid #D6D2C8", background: "#EDE9E0" }}>
            <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", color: "#23262B", fontWeight: 600 }}>NEW PROJECT</span>
            <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#7A7F85" }}><X style={{ width: 14, height: 14 }} /></button>
          </div>
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Project name *"
              style={{ ...MONO, fontSize: "12px", padding: "8px 12px", background: "#F9F6EF", border: "1px solid #D6D2C8", borderRadius: "4px", color: "#23262B", outline: "none", width: "100%", boxSizing: "border-box" }} />
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description"
              style={{ ...MONO, fontSize: "12px", padding: "8px 12px", background: "#F9F6EF", border: "1px solid #D6D2C8", borderRadius: "4px", color: "#23262B", outline: "none", resize: "vertical", minHeight: "50px", width: "100%", boxSizing: "border-box" }} />
            <div style={{ display: "flex", gap: "6px" }}>
              {(["Planning", "Active", "On Hold", "Completed"] as const).map((s) => (
                <button key={s} onClick={() => setStatus(s)} style={{
                  ...MONO, fontSize: "9px", padding: "4px 12px", borderRadius: "2px", cursor: "pointer", fontWeight: 600,
                  border: "1px solid #D6D2C8", background: status === s ? "#23262B" : "#F9F6EF", color: status === s ? "#F3EFE6" : "#23262B",
                }}>{s.toUpperCase()}</button>
              ))}
            </div>
            <button onClick={submit} disabled={!title.trim()} style={{
              display: "flex", alignItems: "center", gap: "6px", alignSelf: "flex-start",
              background: title.trim() ? "#23262B" : "#7A7F85", color: "#F3EFE6", border: "none", borderRadius: "4px",
              padding: "9px 18px", fontSize: "12px", fontWeight: 600, cursor: title.trim() ? "pointer" : "not-allowed",
              fontFamily: "'Inter', sans-serif",
            }}>
              <Plus style={{ width: 14, height: 14 }} /> Create
            </button>
          </div>
        </motion.div>
      )}

      {/* Project list */}
      {projects.length > 0 ? (
        projects.map((project) => {
          const sc = statusColor[project.status] || statusColor.Planning;
          const isActive = project.id === activeProjectId;
          return (
            <motion.div key={project.id} variants={item} style={{
              background: isActive ? "#EDE9E0" : "#F7F4EC", border: `1px solid ${isActive ? "#E36A2C" : "#D6D2C8"}`, borderRadius: "4px",
              padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, cursor: "pointer" }} onClick={() => setActiveProject(project.id)}>
                <FolderOpen style={{ width: 16, height: 16, color: isActive ? "#E36A2C" : "#7A7F85" }} />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#23262B" }}>{project.name}</p>
                    {isActive && <span style={{ ...MONO, fontSize: "8px", fontWeight: 600, color: "#E36A2C", background: "#E36A2C18", padding: "1px 6px", borderRadius: "2px" }}>ACTIVE</span>}
                  </div>
                  {project.description && <p style={{ fontSize: "12px", color: "#7A7F85", marginTop: "2px" }}>{project.description}</p>}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ ...MONO, fontSize: "9px", fontWeight: 600, background: sc.bg, color: sc.text, padding: "2px 8px", borderRadius: "2px" }}>{project.status.toUpperCase()}</span>
                <button onClick={() => { removeProject(project.id); toast({ title: "Project removed" }); }}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#7A7F85", padding: "4px" }}>
                  <Trash2 style={{ width: 13, height: 13 }} />
                </button>
              </div>
            </motion.div>
          );
        })
      ) : (
        !showForm && (
          <motion.div variants={item} style={{ textAlign: "center", padding: "50px", color: "#7A7F85" }}>
            <FolderOpen style={{ width: 32, height: 32, margin: "0 auto 12px", opacity: 0.4 }} />
            <p style={{ ...MONO, fontSize: "11px", letterSpacing: "0.06em" }}>NO PROJECTS · CLICK "NEW PROJECT" TO CREATE ONE</p>
          </motion.div>
        )
      )}
    </motion.div>
  );
}
