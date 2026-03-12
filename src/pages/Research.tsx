import { motion } from "framer-motion";
import { Upload, Cpu } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const MONO: React.CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" };

const LOG_LINES = [
  "Initializing evidence parser...",
  "Detecting signals...",
  "Clustering problems...",
  "Evaluating opportunities...",
  "Generating case file...",
  "Analysis complete ✓",
];

function TypewriterLog({ running }: { running: boolean }) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) {
      setDisplayed([]);
      setCurrentLine("");
      setLineIdx(0);
      setCharIdx(0);
      return;
    }
    ref.current = setInterval(() => {
      setCharIdx((c) => {
        const line = LOG_LINES[lineIdx] ?? "";
        if (c < line.length) {
          setCurrentLine(line.slice(0, c + 1));
          return c + 1;
        } else {
          // Move to next line
          setDisplayed((d) => [...d, line]);
          setCurrentLine("");
          setCharIdx(0);
          setLineIdx((l) => {
            if (l + 1 >= LOG_LINES.length) {
              clearInterval(ref.current!);
            }
            return l + 1;
          });
          return 0;
        }
      });
    }, 50);
    return () => clearInterval(ref.current!);
  }, [running, lineIdx]);

  if (!running && displayed.length === 0) return null;

  return (
    <div
      style={{
        ...MONO,
        fontSize: "11px",
        background: "#23262B",
        color: "#F2A65A",
        borderRadius: "4px",
        padding: "16px 20px",
        lineHeight: "1.8",
        marginTop: "12px",
      }}
    >
      {displayed.map((line, i) => (
        <div key={i} style={{ color: i === displayed.length - 1 && lineIdx >= LOG_LINES.length ? "#E36A2C" : "#F2A65A" }}>
          {"> "}{line}
        </div>
      ))}
      {currentLine && <div className="typewriter-cursor">{"> "}{currentLine}</div>}
    </div>
  );
}

export default function Research() {
  const [content, setContent] = useState("");
  const [running, setRunning] = useState(false);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  const handleRun = () => {
    if (!content.trim()) return;
    setRunning(false);
    setTimeout(() => setRunning(true), 50);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-4xl space-y-6"
    >
      {/* Header */}
      <div>
        <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.1em" }}>
          BUILDCASE / RESEARCH
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
          Evidence Input
        </h1>
        <p style={{ fontSize: "13px", color: "#7A7F85", marginTop: "4px" }}>
          Paste research transcripts, user feedback, support tickets, or raw notes.
        </p>
      </div>

      {/* Textarea panel */}
      <div
        style={{
          background: "#F7F4EC",
          border: "1px solid #D6D2C8",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        {/* Panel header bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 16px",
            borderBottom: "1px solid #D6D2C8",
            background: "#EDE9E0",
          }}
        >
          <span style={{ ...MONO, fontSize: "9px", color: "#7A7F85", letterSpacing: "0.1em" }}>
            EVIDENCE BUFFER
          </span>
          <span style={{ ...MONO, fontSize: "9px", color: "#7A7F85" }}>
            {wordCount > 0 ? `${wordCount} words` : "empty"}
          </span>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`Paste transcripts, feedback, tickets...\n\nExample:\n"User interview 7: They mentioned the signup process felt too long — after the third step they almost gave up."\n\n"Support ticket #234: Customer asking why there's no Google login option."`}
          style={{
            ...MONO,
            fontSize: "12px",
            width: "100%",
            height: "260px",
            background: "#F9F6EF",
            border: "none",
            outline: "none",
            resize: "none",
            padding: "16px",
            color: "#23262B",
            lineHeight: "1.7",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Upload zone */}
      <div
        style={{
          background: "#F7F4EC",
          border: "2px dashed #D6D2C8",
          borderRadius: "4px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          transition: "border-color 150ms",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#E36A2C"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#D6D2C8"; }}
      >
        <Upload style={{ width: "20px", height: "20px", color: "#7A7F85" }} />
        <p style={{ fontSize: "13px", fontWeight: 500, color: "#23262B" }}>
          Drop files here or click to upload
        </p>
        <p style={{ ...MONO, fontSize: "9px", color: "#7A7F85", letterSpacing: "0.06em" }}>
          SUPPORTS .TXT · .PDF · .DOCX
        </p>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          onClick={handleRun}
          disabled={!content.trim()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: content.trim() ? "#23262B" : "#7A7F85",
            color: "#F3EFE6",
            border: "none",
            borderRadius: "4px",
            padding: "10px 20px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: content.trim() ? "pointer" : "not-allowed",
            transition: "background 150ms",
            fontFamily: "'Inter', sans-serif",
          }}
          onMouseEnter={(e) => {
            if (content.trim()) e.currentTarget.style.background = "#1B1E22";
          }}
          onMouseLeave={(e) => {
            if (content.trim()) e.currentTarget.style.background = "#23262B";
          }}
        >
          <Cpu style={{ width: "14px", height: "14px" }} />
          Run Analysis
        </button>
        <span style={{ ...MONO, fontSize: "10px", color: "#7A7F85" }}>
          {wordCount > 0 ? `${wordCount} words detected` : "No evidence loaded"}
        </span>
      </div>

      {/* Typewriter log */}
      <TypewriterLog running={running} />
    </motion.div>
  );
}
