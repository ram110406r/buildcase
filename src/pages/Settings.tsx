import React, { useState } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, Save } from "lucide-react";
import { useSettingsStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

const MONO: React.CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" };
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.2 } } };

function Toggle({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0" }}>
      <span style={{ fontSize: "13px", color: "#23262B" }}>{label}</span>
      <button onClick={onToggle} style={{
        width: "38px", height: "20px", borderRadius: "10px", border: "none", cursor: "pointer",
        background: on ? "#23262B" : "#D6D2C8", position: "relative", transition: "background 200ms",
      }}>
        <span style={{
          width: "14px", height: "14px", borderRadius: "50%", background: "#F3EFE6",
          position: "absolute", top: "3px", left: on ? "21px" : "3px", transition: "left 200ms",
          boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
        }} />
      </button>
    </div>
  );
}

export default function Settings() {
  const store = useSettingsStore();
  const { toast } = useToast();
  const [name, setName] = useState(store.operatorName);

  const handleSave = () => {
    store.setOperatorName(name.trim() || "Admin Operator");
    toast({ title: "Settings saved", description: "Your preferences have been committed." });
  };

  const themes = ["Parchment (Default)", "High Contrast", "Terminal Noir"] as const;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl space-y-6">
      <motion.div variants={item}>
        <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.1em" }}>BUILDCASE / SETTINGS</p>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "22px", color: "#23262B", marginTop: "6px" }}>
          System Configuration
        </h1>
        <p style={{ fontSize: "13px", color: "#7A7F85", marginTop: "4px" }}>Operator preferences and system toggles.</p>
      </motion.div>

      {/* Operator Identity */}
      <motion.div variants={item} style={{ background: "#F7F4EC", border: "1px solid #D6D2C8", borderRadius: "4px", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderBottom: "1px solid #D6D2C8", background: "#EDE9E0" }}>
          <SettingsIcon style={{ width: 12, height: 12, color: "#E36A2C" }} />
          <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", color: "#23262B", fontWeight: 600 }}>OPERATOR IDENTITY</span>
        </div>
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.08em" }}>OPERATOR NAME</label>
            <input value={name} onChange={(e) => setName(e.target.value)}
              style={{ ...MONO, fontSize: "12px", padding: "8px 12px", background: "#F9F6EF", border: "1px solid #D6D2C8", borderRadius: "4px", color: "#23262B", outline: "none", width: "100%", boxSizing: "border-box" }} />
          </div>
        </div>
      </motion.div>

      {/* Theme */}
      <motion.div variants={item} style={{ background: "#F7F4EC", border: "1px solid #D6D2C8", borderRadius: "4px", overflow: "hidden" }}>
        <div style={{ padding: "10px 20px", borderBottom: "1px solid #D6D2C8", background: "#EDE9E0" }}>
          <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", color: "#23262B", fontWeight: 600 }}>VISUAL THEME</span>
        </div>
        <div style={{ padding: "16px 20px", display: "flex", gap: "10px" }}>
          {themes.map((t) => (
            <button key={t} onClick={() => store.setTheme(t)} style={{
              ...MONO, fontSize: "10px", padding: "6px 16px", borderRadius: "3px", cursor: "pointer", fontWeight: 600,
              border: "1px solid #D6D2C8", background: store.theme === t ? "#23262B" : "#F9F6EF", color: store.theme === t ? "#F3EFE6" : "#23262B",
            }}>{t.toUpperCase()}</button>
          ))}
        </div>
      </motion.div>

      {/* System Toggles */}
      <motion.div variants={item} style={{ background: "#F7F4EC", border: "1px solid #D6D2C8", borderRadius: "4px", overflow: "hidden" }}>
        <div style={{ padding: "10px 20px", borderBottom: "1px solid #D6D2C8", background: "#EDE9E0" }}>
          <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", color: "#23262B", fontWeight: 600 }}>SYSTEM TOGGLES</span>
        </div>
        <div style={{ padding: "8px 20px" }}>
          <Toggle on={store.criticalAlerts} onToggle={store.toggleCriticalAlerts} label="Critical Alerts" />
          <div style={{ borderTop: "1px solid #E8E4DC" }} />
          <Toggle on={store.autoArchiving} onToggle={store.toggleAutoArchiving} label="Auto-Archiving" />
        </div>
      </motion.div>

      {/* Save */}
      <motion.div variants={item}>
        <button onClick={handleSave} style={{
          display: "flex", alignItems: "center", gap: "6px",
          background: "#23262B", color: "#F3EFE6", border: "none", borderRadius: "4px",
          padding: "10px 20px", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif",
        }}>
          <Save style={{ width: 14, height: 14 }} /> Commit Changes
        </button>
      </motion.div>
    </motion.div>
  );
}
