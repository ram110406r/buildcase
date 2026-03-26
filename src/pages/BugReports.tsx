import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bug, Plus, Trash2, ChevronDown } from "lucide-react";
import { useBugStore, type BugSeverity, type BugStatus } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

const MONO: React.CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" };

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.2 } } };

const severityColor: Record<BugSeverity, { bg: string; text: string }> = {
  Critical: { bg: "#DC262618", text: "#DC2626" },
  High: { bg: "#E36A2C18", text: "#C4561E" },
  Medium: { bg: "#F2A65A18", text: "#B07830" },
  Low: { bg: "#23262B12", text: "#7A7F85" },
};

const statusOptions: BugStatus[] = ["Open", "In Progress", "Resolved", "Closed"];
const severityOptions: BugSeverity[] = ["Critical", "High", "Medium", "Low"];

function InputField({ label, value, onChange, placeholder, textarea = false }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; textarea?: boolean;
}) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <label style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.08em" }}>{label}</label>
      <Tag
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          ...MONO, fontSize: "12px", padding: "8px 12px", background: "#F9F6EF",
          border: "1px solid #D6D2C8", borderRadius: "4px", color: "#23262B",
          outline: "none", resize: textarea ? "vertical" as const : "none" as const,
          minHeight: textarea ? "80px" : undefined, width: "100%", boxSizing: "border-box" as const,
        }}
      />
    </div>
  );
}

export default function BugReports() {
  const { bugs, addBug, updateBugStatus, removeBug } = useBugStore();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState<BugSeverity>("Medium");
  const [reporter, setReporter] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [expected, setExpected] = useState("");
  const [actual, setActual] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = "Title is required";
    if (!reporter.trim()) e.reporter = "Reporter is required";
    if (!description.trim()) e.description = "Description is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    addBug({ title: title.trim(), severity, status: "Open", reporter: reporter.trim(), description: description.trim(), steps: steps.trim(), expected: expected.trim(), actual: actual.trim() });
    toast({ title: "Bug reported", description: `"${title.trim()}" filed successfully.` });
    setTitle(""); setReporter(""); setDescription(""); setSteps(""); setExpected(""); setActual("");
    setErrors({});
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl space-y-6">
      {/* Header */}
      <motion.div variants={item}>
        <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.1em" }}>BUILDCASE / BUGS</p>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "22px", color: "#23262B", marginTop: "6px" }}>
          Bug Report Console
        </h1>
        <p style={{ fontSize: "13px", color: "#7A7F85", marginTop: "4px" }}>Structured defect tracking and triage.</p>
      </motion.div>

      {/* Report Form */}
      <motion.div variants={item}>
        <div style={{ background: "#F7F4EC", border: "1px solid #D6D2C8", borderRadius: "4px", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderBottom: "1px solid #D6D2C8", background: "#EDE9E0" }}>
            <Bug style={{ width: "12px", height: "12px", color: "#E36A2C" }} />
            <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", color: "#23262B", fontWeight: 600 }}>FILE NEW REPORT</span>
          </div>
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <InputField label="TITLE *" value={title} onChange={setTitle} placeholder="Brief bug title" />
                {errors.title && <p style={{ ...MONO, fontSize: "10px", color: "#DC2626", marginTop: "4px" }}>{errors.title}</p>}
              </div>
              <div>
                <InputField label="REPORTER *" value={reporter} onChange={setReporter} placeholder="Your name" />
                {errors.reporter && <p style={{ ...MONO, fontSize: "10px", color: "#DC2626", marginTop: "4px" }}>{errors.reporter}</p>}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.08em" }}>SEVERITY</label>
              <div style={{ display: "flex", gap: "8px" }}>
                {severityOptions.map((s) => (
                  <button key={s} onClick={() => setSeverity(s)} style={{
                    ...MONO, fontSize: "10px", padding: "5px 14px", borderRadius: "2px", border: "1px solid #D6D2C8", cursor: "pointer",
                    background: severity === s ? "#23262B" : "#F9F6EF", color: severity === s ? "#F3EFE6" : "#23262B", fontWeight: 600,
                  }}>{s.toUpperCase()}</button>
                ))}
              </div>
            </div>
            <div>
              <InputField label="DESCRIPTION *" value={description} onChange={setDescription} placeholder="What happened?" textarea />
              {errors.description && <p style={{ ...MONO, fontSize: "10px", color: "#DC2626", marginTop: "4px" }}>{errors.description}</p>}
            </div>
            <InputField label="STEPS TO REPRODUCE" value={steps} onChange={setSteps} placeholder="1. Go to... 2. Click..." textarea />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <InputField label="EXPECTED" value={expected} onChange={setExpected} placeholder="What should happen" />
              <InputField label="ACTUAL" value={actual} onChange={setActual} placeholder="What actually happens" />
            </div>
            <button onClick={handleSubmit} style={{
              display: "flex", alignItems: "center", gap: "6px", alignSelf: "flex-start",
              background: "#23262B", color: "#F3EFE6", border: "none", borderRadius: "4px",
              padding: "9px 18px", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif",
            }}>
              <Plus style={{ width: "14px", height: "14px" }} /> Submit Report
            </button>
          </div>
        </div>
      </motion.div>

      {/* Bug Table */}
      {bugs.length > 0 && (
        <motion.div variants={item}>
          <div style={{ background: "#F7F4EC", border: "1px solid #D6D2C8", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderBottom: "1px solid #D6D2C8", background: "#EDE9E0" }}>
              <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", color: "#23262B", fontWeight: 600 }}>
                ACTIVE BUGS · {bugs.length}
              </span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #D6D2C8" }}>
                    {["TITLE", "SEVERITY", "STATUS", "REPORTER", ""].map((h) => (
                      <th key={h} style={{ ...MONO, fontSize: "9px", color: "#7A7F85", letterSpacing: "0.08em", padding: "8px 16px", textAlign: "left", fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bugs.map((bug) => {
                    const sc = severityColor[bug.severity];
                    return (
                      <tr key={bug.id} style={{ borderBottom: "1px solid #E8E4DC" }}>
                        <td style={{ padding: "10px 16px", color: "#23262B", fontWeight: 500 }}>{bug.title}</td>
                        <td style={{ padding: "10px 16px" }}>
                          <span style={{ ...MONO, fontSize: "9px", fontWeight: 600, background: sc.bg, color: sc.text, padding: "2px 8px", borderRadius: "2px", letterSpacing: "0.06em" }}>
                            {bug.severity.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: "10px 16px" }}>
                          <div style={{ position: "relative", display: "inline-block" }}>
                            <select
                              value={bug.status}
                              onChange={(e) => updateBugStatus(bug.id, e.target.value as BugStatus)}
                              style={{
                                ...MONO, fontSize: "10px", padding: "3px 22px 3px 8px", border: "1px solid #D6D2C8",
                                borderRadius: "2px", background: "#F9F6EF", color: "#23262B", cursor: "pointer",
                                appearance: "none", WebkitAppearance: "none",
                              }}
                            >
                              {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <ChevronDown style={{ width: "10px", height: "10px", position: "absolute", right: "6px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#7A7F85" }} />
                          </div>
                        </td>
                        <td style={{ padding: "10px 16px", color: "#7A7F85" }}>{bug.reporter}</td>
                        <td style={{ padding: "10px 16px" }}>
                          <button onClick={() => { removeBug(bug.id); toast({ title: "Bug removed" }); }}
                            style={{ background: "none", border: "none", cursor: "pointer", color: "#7A7F85", padding: "4px" }}>
                            <Trash2 style={{ width: "13px", height: "13px" }} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {bugs.length === 0 && (
        <motion.div variants={item} style={{ textAlign: "center", padding: "40px", color: "#7A7F85" }}>
          <p style={{ ...MONO, fontSize: "11px", letterSpacing: "0.06em" }}>NO ACTIVE BUGS · USE THE FORM ABOVE TO FILE A REPORT</p>
        </motion.div>
      )}
    </motion.div>
  );
}
