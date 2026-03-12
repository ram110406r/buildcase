import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bug, Cpu } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MONO: React.CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" };

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#F9F6EF",
  border: "1px solid #D6D2C8",
  borderRadius: "4px",
  padding: "9px 12px",
  fontSize: "13px",
  color: "#23262B",
  fontFamily: "'Inter', sans-serif",
  outline: "none",
  boxSizing: "border-box",
};

const monoInputStyle: React.CSSProperties = {
  ...inputStyle,
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: "12px",
  lineHeight: "1.7",
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label
      style={{
        ...MONO,
        fontSize: "9px",
        letterSpacing: "0.1em",
        color: "#7A7F85",
        fontWeight: 600,
        display: "block",
        marginBottom: "6px",
      }}
    >
      {children}
    </label>
  );
}

function FormModule({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#F7F4EC",
        border: "1px solid #D6D2C8",
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "8px 20px",
          borderBottom: "1px solid #D6D2C8",
          background: "#EDE9E0",
        }}
      >
        <span style={{ ...MONO, fontSize: "9px", letterSpacing: "0.1em", color: "#23262B", fontWeight: 600 }}>
          {title}
        </span>
      </div>
      <div style={{ padding: "20px" }}>{children}</div>
    </div>
  );
}

export default function BugReports() {
  const [title, setTitle] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-3xl space-y-5"
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.1em" }}>
            BUILDCASE / BUGS
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
            Bug Reports
          </h1>
          <p style={{ fontSize: "13px", color: "#7A7F85", marginTop: "4px" }}>
            Structured incident reports for engineering teams.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "#F44B4B15",
            border: "1px solid #F44B4B40",
            borderRadius: "4px",
            padding: "6px 12px",
          }}
        >
          <Bug style={{ width: "12px", height: "12px", color: "#C0392B" }} />
          <span style={{ ...MONO, fontSize: "9px", color: "#C0392B", fontWeight: 600, letterSpacing: "0.08em" }}>
            INCIDENT FORM
          </span>
        </div>
      </div>

      {/* Module 1: Identification */}
      <FormModule title="IDENTIFICATION">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <FieldLabel>TITLE</FieldLabel>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief description of the bug"
              style={inputStyle}
            />
          </div>
          <div>
            <FieldLabel>DESCRIPTION</FieldLabel>
            <textarea
              placeholder="Detailed description of the issue..."
              rows={3}
              style={{ ...monoInputStyle, resize: "vertical" }}
            />
          </div>
        </div>
      </FormModule>

      {/* Module 2: Reproduction */}
      <FormModule title="REPRODUCTION STEPS">
        <div>
          <FieldLabel>STEPS TO REPRODUCE</FieldLabel>
          <textarea
            placeholder={"1. Go to...\n2. Click on...\n3. Observe..."}
            rows={4}
            style={{ ...monoInputStyle, resize: "vertical" }}
          />
        </div>
      </FormModule>

      {/* Module 3: Expected vs Actual */}
      <FormModule title="EXPECTED vs ACTUAL">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div>
            <FieldLabel>✓ EXPECTED RESULT</FieldLabel>
            <textarea
              placeholder="What should happen..."
              rows={4}
              style={{
                ...monoInputStyle,
                resize: "none",
                borderColor: "#7A7F8530",
              }}
            />
          </div>
          <div>
            <FieldLabel>✗ ACTUAL RESULT</FieldLabel>
            <textarea
              placeholder="What actually happens..."
              rows={4}
              style={{
                ...monoInputStyle,
                resize: "none",
                background: "#FFF5F0",
                borderColor: "#F44B4B40",
              }}
            />
          </div>
        </div>
      </FormModule>

      {/* Module 4: Classification */}
      <FormModule title="CLASSIFICATION">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <FieldLabel>SEVERITY</FieldLabel>
            <Select>
              <SelectTrigger
                style={{
                  background: "#F9F6EF",
                  border: "1px solid #D6D2C8",
                  borderRadius: "4px",
                  height: "38px",
                  fontSize: "13px",
                }}
              >
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="critical">🔴 Critical</SelectItem>
                <SelectItem value="high">🟠 High</SelectItem>
                <SelectItem value="medium">🟡 Medium</SelectItem>
                <SelectItem value="low">⚪ Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <FieldLabel>ENVIRONMENT</FieldLabel>
            <Select>
              <SelectTrigger
                style={{
                  background: "#F9F6EF",
                  border: "1px solid #D6D2C8",
                  borderRadius: "4px",
                  height: "38px",
                  fontSize: "13px",
                }}
              >
                <SelectValue placeholder="Select environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="staging">Staging</SelectItem>
                <SelectItem value="development">Development</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </FormModule>

      {/* Actions */}
      <div style={{ display: "flex", gap: "10px", paddingTop: "4px" }}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#23262B",
            color: "#F3EFE6",
            border: "none",
            borderRadius: "4px",
            padding: "10px 20px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <Cpu style={{ width: "14px", height: "14px" }} />
          Generate Engineering Report
        </button>
        <button
          style={{
            background: "transparent",
            color: "#7A7F85",
            border: "1px solid #D6D2C8",
            borderRadius: "4px",
            padding: "10px 20px",
            fontSize: "13px",
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Save Draft
        </button>
      </div>
    </motion.div>
  );
}
