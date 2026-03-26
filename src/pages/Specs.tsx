import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Plus, Trash2, Check, ChevronRight, X, Download } from "lucide-react";
import { useSpecStore, type Spec } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

const MONO: React.CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" };
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.2 } } };

const priorityColor = {
  High: { bg: "#E36A2C18", text: "#C4561E" },
  Medium: { bg: "#F2A65A18", text: "#B07830" },
  Low: { bg: "#23262B12", text: "#7A7F85" },
};

/* ───── New Spec Form (inline) ───── */
function NewSpecForm({ onClose }: { onClose: () => void }) {
  const { addSpec } = useSpecStore();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");

  const submit = () => {
    if (!title.trim()) return;
    addSpec({
      title: title.trim(), description: desc.trim(), priority,
      sprint: "—", storyPoints: 0,
      userStories: [], requirements: [], edgeCases: [],
    });
    toast({ title: "Spec created", description: `"${title.trim()}" added.` });
    onClose();
  };

  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
      style={{ background: "#F7F4EC", border: "1px solid #D6D2C8", borderRadius: "4px", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", borderBottom: "1px solid #D6D2C8", background: "#EDE9E0" }}>
        <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", color: "#23262B", fontWeight: 600 }}>NEW SPEC</span>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#7A7F85" }}><X style={{ width: 14, height: 14 }} /></button>
      </div>
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.08em" }}>TITLE *</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Feature name"
            style={{ ...MONO, fontSize: "12px", padding: "8px 12px", background: "#F9F6EF", border: "1px solid #D6D2C8", borderRadius: "4px", color: "#23262B", outline: "none", width: "100%", boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.08em" }}>DESCRIPTION</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="What does this feature do?"
            style={{ ...MONO, fontSize: "12px", padding: "8px 12px", background: "#F9F6EF", border: "1px solid #D6D2C8", borderRadius: "4px", color: "#23262B", outline: "none", resize: "vertical", minHeight: "60px", width: "100%", boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {(["High", "Medium", "Low"] as const).map((p) => (
            <button key={p} onClick={() => setPriority(p)} style={{
              ...MONO, fontSize: "10px", padding: "5px 14px", borderRadius: "2px", cursor: "pointer", fontWeight: 600,
              border: "1px solid #D6D2C8", background: priority === p ? "#23262B" : "#F9F6EF", color: priority === p ? "#F3EFE6" : "#23262B",
            }}>{p.toUpperCase()}</button>
          ))}
        </div>
        <button onClick={submit} disabled={!title.trim()} style={{
          display: "flex", alignItems: "center", gap: "6px", alignSelf: "flex-start",
          background: title.trim() ? "#23262B" : "#7A7F85", color: "#F3EFE6", border: "none", borderRadius: "4px",
          padding: "9px 18px", fontSize: "12px", fontWeight: 600, cursor: title.trim() ? "pointer" : "not-allowed", fontFamily: "'Inter', sans-serif",
        }}>
          <Plus style={{ width: 14, height: 14 }} /> Create Spec
        </button>
      </div>
    </motion.div>
  );
}

/* ───── Spec Detail View ───── */
function SpecDetail({ spec, onBack }: { spec: Spec; onBack: () => void }) {
  const { toggleRequirement, removeSpec } = useSpecStore();
  const { toast } = useToast();
  const pc = priorityColor[spec.priority];

  const handleExport = (format: "json" | "pdf") => {
    const exportData = {
      id: spec.id,
      title: spec.title,
      description: spec.description,
      priority: spec.priority,
      userStories: spec.userStories,
      requirements: spec.requirements,
      edgeCases: spec.edgeCases,
      exportedAt: new Date().toISOString(),
    };

    if (format === "json") {
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${spec.title.replace(/\s+/g, "_").toLowerCase()}_brief.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: "Exported", description: "Brief exported as JSON" });
    } else {
      // PDF export simulation - in production would call backend
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head><title>${spec.title}</title></head>
            <body style="font-family: Arial, sans-serif; padding: 40px;">
              <h1>${spec.title}</h1>
              <p><strong>Priority:</strong> ${spec.priority}</p>
              <p><strong>Description:</strong> ${spec.description}</p>
              <h2>User Stories</h2>
              <ul>${spec.userStories.map(s => `<li>As a ${s.role}, I want ${s.action} so that ${s.benefit}</li>`).join("")}</ul>
              <h2>Requirements</h2>
              <ul>${spec.requirements.map(r => `<li>${r.done ? "✓" : "○"} ${r.text}</li>`).join("")}</ul>
              <h2>Edge Cases</h2>
              <ul>${spec.edgeCases.map(e => `<li><strong>${e.title}</strong>: ${e.description}</li>`).join("")}</ul>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
        toast({ title: "Exported", description: "Print dialog opened for PDF" });
      }
    }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl space-y-6">
      <motion.div variants={item}>
        <button onClick={onBack} style={{ ...MONO, fontSize: "10px", color: "#7A7F85", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", marginBottom: "12px" }}>
          ← BACK TO SPECS
        </button>
        <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.1em" }}>BUILDCASE / SPECS</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "6px" }}>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "22px", color: "#23262B" }}>{spec.title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button onClick={() => handleExport("json")} title="Export JSON"
              style={{ background: "none", border: "none", cursor: "pointer", color: "#7A7F85", padding: "4px" }}>
              <Download style={{ width: 14, height: 14 }} />
            </button>
            <button onClick={() => handleExport("pdf")} title="Export PDF"
              style={{ background: "none", border: "none", cursor: "pointer", color: "#7A7F85", padding: "4px" }}>
              <FileText style={{ width: 14, height: 14 }} />
            </button>
            <button onClick={() => { removeSpec(spec.id); toast({ title: "Spec deleted" }); onBack(); }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#7A7F85", padding: "4px" }}>
              <Trash2 style={{ width: 14, height: 14 }} />
            </button>
          </div>
        </div>
        {spec.description && <p style={{ fontSize: "13px", color: "#7A7F85", marginTop: "4px" }}>{spec.description}</p>}
      </motion.div>

      {/* User Stories */}
      {spec.userStories.length > 0 && (
        <motion.div variants={item} style={{ background: "#F7F4EC", border: "1px solid #D6D2C8", borderRadius: "4px", overflow: "hidden" }}>
          <div style={{ padding: "10px 20px", borderBottom: "1px solid #D6D2C8", background: "#EDE9E0" }}>
            <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", color: "#23262B", fontWeight: 600 }}>USER STORIES · {spec.userStories.length}</span>
          </div>
          <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {spec.userStories.map((s, i) => (
              <p key={i} style={{ fontSize: "13px", color: "#23262B", lineHeight: 1.6 }}>
                As a <strong>{s.role}</strong>, I want <strong>{s.action}</strong> so that <strong>{s.benefit}</strong>.
              </p>
            ))}
          </div>
        </motion.div>
      )}

      {/* Requirements */}
      {spec.requirements.length > 0 && (
        <motion.div variants={item} style={{ background: "#F7F4EC", border: "1px solid #D6D2C8", borderRadius: "4px", overflow: "hidden" }}>
          <div style={{ padding: "10px 20px", borderBottom: "1px solid #D6D2C8", background: "#EDE9E0" }}>
            <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", color: "#23262B", fontWeight: 600 }}>
              REQUIREMENTS · {spec.requirements.filter((r) => r.done).length}/{spec.requirements.length}
            </span>
          </div>
          <div style={{ padding: "12px 20px", display: "flex", flexDirection: "column", gap: "6px" }}>
            {spec.requirements.map((r, i) => (
              <div key={i} onClick={() => toggleRequirement(spec.id, i)}
                style={{ display: "flex", alignItems: "center", gap: "10px", padding: "6px 8px", borderRadius: "3px", cursor: "pointer", transition: "background 150ms" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#EDE9E0"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                <span style={{
                  width: "16px", height: "16px", borderRadius: "3px", display: "flex", alignItems: "center", justifyContent: "center",
                  border: r.done ? "none" : "1.5px solid #D6D2C8", background: r.done ? "#23262B" : "transparent",
                }}>
                  {r.done && <Check style={{ width: 10, height: 10, color: "#F3EFE6" }} />}
                </span>
                <span style={{ fontSize: "13px", color: r.done ? "#7A7F85" : "#23262B", textDecoration: r.done ? "line-through" : "none" }}>{r.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Edge Cases */}
      {spec.edgeCases.length > 0 && (
        <motion.div variants={item} style={{ background: "#F7F4EC", border: "1px solid #D6D2C8", borderRadius: "4px", overflow: "hidden" }}>
          <div style={{ padding: "10px 20px", borderBottom: "1px solid #D6D2C8", background: "#EDE9E0" }}>
            <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", color: "#23262B", fontWeight: 600 }}>EDGE CASES · {spec.edgeCases.length}</span>
          </div>
          <div style={{ padding: "12px 20px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {spec.edgeCases.map((ec, i) => (
              <details key={i} style={{ fontSize: "13px", color: "#23262B" }}>
                <summary style={{ cursor: "pointer", fontWeight: 500 }}>{ec.title}</summary>
                <p style={{ marginTop: "6px", paddingLeft: "12px", color: "#7A7F85", lineHeight: 1.6 }}>{ec.description}</p>
              </details>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ───── Main Specs Page ───── */
export default function Specs() {
  const { specs } = useSpecStore();
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const selectedSpec = specs.find((s) => s.id === selected);
  if (selectedSpec) return <SpecDetail spec={selectedSpec} onBack={() => setSelected(null)} />;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl space-y-6">
      <motion.div variants={item}>
        <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.1em" }}>BUILDCASE / SPECS</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "6px" }}>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "22px", color: "#23262B" }}>Spec Index</h1>
          <button onClick={() => setShowForm(!showForm)} style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: "#23262B", color: "#F3EFE6", border: "none", borderRadius: "4px",
            padding: "8px 16px", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif",
          }}>
            <Plus style={{ width: 14, height: 14 }} /> New Spec
          </button>
        </div>
        <p style={{ fontSize: "13px", color: "#7A7F85", marginTop: "4px" }}>Feature specifications and requirements.</p>
      </motion.div>

      {showForm && <NewSpecForm onClose={() => setShowForm(false)} />}

      {/* Spec List */}
      {specs.length > 0 ? (
        specs.map((spec) => {
          const pc = priorityColor[spec.priority];
          return (
            <motion.div key={spec.id} variants={item} onClick={() => setSelected(spec.id)}
              style={{
                background: "#F7F4EC", border: "1px solid #D6D2C8", borderRadius: "4px", padding: "16px 20px",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between",
                transition: "border-color 150ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#E36A2C"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#D6D2C8"; }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <FileText style={{ width: 16, height: 16, color: "#7A7F85" }} />
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#23262B" }}>{spec.title}</p>
                  {spec.description && <p style={{ fontSize: "12px", color: "#7A7F85", marginTop: "2px", maxWidth: "500px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{spec.description}</p>}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ ...MONO, fontSize: "9px", fontWeight: 600, background: pc.bg, color: pc.text, padding: "2px 8px", borderRadius: "2px" }}>{spec.priority.toUpperCase()}</span>
                {spec.requirements.length > 0 && (
                  <span style={{ ...MONO, fontSize: "9px", color: "#7A7F85" }}>
                    {spec.requirements.filter((r) => r.done).length}/{spec.requirements.length}
                  </span>
                )}
                <ChevronRight style={{ width: 14, height: 14, color: "#7A7F85" }} />
              </div>
            </motion.div>
          );
        })
      ) : (
        !showForm && (
          <motion.div variants={item} style={{ textAlign: "center", padding: "50px", color: "#7A7F85" }}>
            <FileText style={{ width: 32, height: 32, margin: "0 auto 12px", opacity: 0.4 }} />
            <p style={{ ...MONO, fontSize: "11px", letterSpacing: "0.06em" }}>NO SPECS YET · CLICK "NEW SPEC" TO CREATE ONE</p>
          </motion.div>
        )
      )}
    </motion.div>
  );
}
