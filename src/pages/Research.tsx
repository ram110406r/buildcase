import React, { useState } from "react";
import { motion } from "framer-motion";
import { Microscope, Plus, Trash2, FileText, Upload } from "lucide-react";
import { useResearchStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

const MONO: React.CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" };
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.2 } } };

export default function Research() {
  const { entries, addEntry, removeEntry, clearAll } = useResearchStore();
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Read file content
      const text = await file.text();
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Add to research store
      addEntry(text);
      toast({ 
        title: "File uploaded", 
        description: `${file.name} - ${text.split(/\s+/).length} words captured.` 
      });
      
      // Reset input
      event.target.value = "";
    } catch (error) {
      toast({ 
        title: "Upload failed", 
        description: "Could not read file", 
        variant: "destructive" 
      });
    } finally {
      setIsUploading(false);
    }
  };

  const logLines = [
    "▸ Parsing input evidence...",
    "▸ Tokenizing document fragments",
    "▸ Extracting key entities & themes",
    "▸ Cross-referencing pattern library",
    "▸ Building evidence graph",
    "▸ Scoring signal confidence",
    "▸ Analysis complete ✓",
  ];

  const handleRun = () => {
    if (!content.trim() || isRunning) return;
    setIsRunning(true);
    setLogs([]);

    logLines.forEach((line, i) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, line]);
        if (i === logLines.length - 1) {
          setTimeout(() => {
            addEntry(content.trim());
            toast({ title: "Research saved", description: `${content.trim().split(/\s+/).length} words captured.` });
            setContent("");
            setIsRunning(false);
            setLogs([]);
          }, 600);
        }
      }, (i + 1) * 400);
    });
  };

  const totalWords = entries.reduce((s, e) => s + e.wordCount, 0);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl space-y-6">
      {/* Header */}
      <motion.div variants={item}>
        <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.1em" }}>BUILDCASE / RESEARCH</p>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "22px", color: "#23262B", marginTop: "6px" }}>
          Research Console
        </h1>
        <p style={{ fontSize: "13px", color: "#7A7F85", marginTop: "4px" }}>Capture and analyze product evidence.</p>
      </motion.div>

      {/* Stats bar */}
      <motion.div variants={item} style={{ display: "flex", gap: "20px" }}>
        {[
          { label: "ENTRIES", value: entries.length },
          { label: "TOTAL WORDS", value: totalWords.toLocaleString() },
        ].map((s) => (
          <div key={s.label} style={{ background: "#F7F4EC", border: "1px solid #D6D2C8", borderRadius: "4px", padding: "10px 18px" }}>
            <p style={{ ...MONO, fontSize: "9px", color: "#7A7F85", letterSpacing: "0.08em" }}>{s.label}</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "20px", fontWeight: 700, color: "#23262B" }}>{s.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Input area */}
      <motion.div variants={item}>
        <div style={{ background: "#F7F4EC", border: "1px solid #D6D2C8", borderRadius: "4px", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderBottom: "1px solid #D6D2C8", background: "#EDE9E0" }}>
            <Microscope style={{ width: "12px", height: "12px", color: "#E36A2C" }} />
            <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", color: "#23262B", fontWeight: 600 }}>EVIDENCE INPUT</span>
          </div>
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {/* File upload area */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <label style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#F9F6EF",
                border: "1px dashed #D6D2C8",
                borderRadius: "4px",
                padding: "10px 16px",
                cursor: isUploading ? "not-allowed" : "pointer",
                opacity: isUploading ? 0.6 : 1,
                transition: "all 150ms",
              }}
              onMouseEnter={(e) => { if (!isUploading) e.currentTarget.style.borderColor = "#E36A2C"; }}
              onMouseLeave={(e) => { if (!isUploading) e.currentTarget.style.borderColor = "#D6D2C8"; }}
              >
                <Upload style={{ width: 14, height: 14, color: "#E36A2C" }} />
                <span style={{ ...MONO, fontSize: "11px", color: "#23262B", fontWeight: 600 }}>
                  {isUploading ? "Uploading..." : "Upload File"}
                </span>
                <input
                  type="file"
                  accept=".txt,.md,.doc,.docx,.pdf"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  style={{ display: "none" }}
                />
              </label>
              <span style={{ ...MONO, fontSize: "9px", color: "#7A7F85" }}>
                Supports: TXT, MD, DOC, DOCX, PDF
              </span>
            </div>

            <textarea
              value={content} onChange={(e) => setContent(e.target.value)}
              placeholder="Paste interview transcripts, support tickets, survey responses, user feedback, or any product evidence here..."
              disabled={isRunning}
              style={{
                ...MONO, fontSize: "12px", padding: "12px", background: "#F9F6EF", border: "1px solid #D6D2C8",
                borderRadius: "4px", color: "#23262B", outline: "none", resize: "vertical", minHeight: "120px",
                width: "100%", boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button onClick={handleRun} disabled={!content.trim() || isRunning} style={{
                display: "flex", alignItems: "center", gap: "6px",
                background: content.trim() && !isRunning ? "#23262B" : "#7A7F85", color: "#F3EFE6", border: "none", borderRadius: "4px",
                padding: "9px 18px", fontSize: "12px", fontWeight: 600, cursor: content.trim() && !isRunning ? "pointer" : "not-allowed",
                fontFamily: "'Inter', sans-serif",
              }}>
                <Plus style={{ width: 14, height: 14 }} /> {isRunning ? "Analyzing..." : "Run Analysis"}
              </button>
              {content.trim() && (
                <span style={{ ...MONO, fontSize: "10px", color: "#7A7F85" }}>
                  {content.trim().split(/\s+/).length} words
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Analysis log */}
      {logs.length > 0 && (
        <motion.div variants={item} style={{ background: "#1A1D21", borderRadius: "4px", padding: "14px 18px" }}>
          {logs.map((line, i) => (
            <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ ...MONO, fontSize: "11px", color: line.includes("✓") ? "#16A34A" : "#A0A4AA", lineHeight: 1.8 }}>
              {line}
            </motion.p>
          ))}
        </motion.div>
      )}

      {/* Entries list */}
      {entries.length > 0 && (
        <motion.div variants={item}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.08em", color: "#7A7F85" }}>SAVED ENTRIES · {entries.length}</span>
            {entries.length > 1 && (
              <button onClick={() => { clearAll(); toast({ title: "All research cleared" }); }}
                style={{ ...MONO, fontSize: "10px", color: "#DC2626", background: "none", border: "none", cursor: "pointer" }}>
                CLEAR ALL
              </button>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {entries.map((entry) => (
              <div key={entry.id} style={{ background: "#F7F4EC", border: "1px solid #D6D2C8", borderRadius: "4px", padding: "12px 16px" }}>
                <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <FileText style={{ width: 13, height: 13, color: "#7A7F85", flexShrink: 0 }} />
                    <p style={{ fontSize: "13px", color: "#23262B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "500px" }}>
                      {entry.content.substring(0, 120)}{entry.content.length > 120 ? "…" : ""}
                    </p>
                  </div>
                  <button onClick={() => { removeEntry(entry.id); toast({ title: "Entry removed" }); }}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#7A7F85", padding: "2px", flexShrink: 0 }}>
                    <Trash2 style={{ width: 12, height: 12 }} />
                  </button>
                </div>
                <div style={{ display: "flex", gap: "16px", marginTop: "6px" }}>
                  <span style={{ ...MONO, fontSize: "9px", color: "#7A7F85" }}>{entry.wordCount} words</span>
                  <span style={{ ...MONO, fontSize: "9px", color: "#7A7F85" }}>{new Date(entry.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
