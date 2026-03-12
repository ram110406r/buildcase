import React from "react";
import { motion } from "framer-motion";
import { User, Shield, Monitor, Bell, Save, LucideIcon } from "lucide-react";

const MONO: React.CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" };

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

function SettingsModule({ icon: Icon, title, children }: { icon: LucideIcon, title: string, children: React.ReactNode }) {
  return (
    <motion.div variants={item} className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-orange-600" />
        <h2 style={{ ...MONO, fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em" }}>{title}</h2>
      </div>
      <div className="glass-panel p-6 space-y-4 bg-[#F7F4EC] border-[#D6D2C8] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none">
          <Icon className="h-24 w-24" />
        </div>
        {children}
      </div>
    </motion.div>
  );
}

export default function SettingsPage() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-4xl space-y-10"
    >
      <motion.div variants={item}>
        <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.1em" }}>SYSTEM / SETTINGS</p>
        <h1 className="text-2xl font-bold text-foreground mt-2">Console Configuration</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your telemetry preferences and access credentials.</p>
      </motion.div>

      <div className="space-y-8">
        <SettingsModule icon={User} title="IDENTITY_PROFILE">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <label style={{ ...MONO, fontSize: "10px", color: "#7A7F85" }}>OPERATOR_NAME</label>
              <input 
                className="w-full bg-[#EDE9E0] border border-[#D6D2C8] px-3 py-2 text-sm rounded-sm"
                defaultValue="Admin Operator"
              />
            </div>
            <div className="space-y-1">
              <label style={{ ...MONO, fontSize: "10px", color: "#7A7F85" }}>ACCESS_LEVEL</label>
              <div className="px-3 py-2 text-sm bg-[#EDE9E0]/50 border border-[#D6D2C8] rounded-sm text-muted-foreground">
                LEVEL_05 (SUPERUSER)
              </div>
            </div>
          </div>
        </SettingsModule>

        <SettingsModule icon={Monitor} title="INTERFACE_STYLING">
          <div className="flex gap-4">
            {["Parchment (Default)", "High Contrast", "Terminal Noir"].map((theme) => (
              <button 
                key={theme}
                className={`px-4 py-2 text-xs border border-[#D6D2C8] rounded-sm transition-all ${theme === "Parchment (Default)" ? "bg-[#23262B] text-[#F3EFE6]" : "bg-[#EDE9E0] hover:bg-[#E8E4DC]"}`}
                style={MONO}
              >
                {theme.toUpperCase()}
              </button>
            ))}
          </div>
        </SettingsModule>

        <SettingsModule icon={Bell} title="TELEMETRY_ALERTS">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Critical Errors</p>
                <p className="text-xs text-muted-foreground">Receive alerts for system anomalies.</p>
              </div>
              <div className="h-5 w-10 bg-orange-600 rounded-full relative cursor-pointer shadow-inner">
                <div className="absolute right-1 top-1 h-3 w-3 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between opacity-50">
              <div>
                <p className="text-sm font-medium">Auto-Archiving</p>
                <p className="text-xs text-muted-foreground">Automatically archive completed specs.</p>
              </div>
              <div className="h-5 w-10 bg-[#D6D2C8] rounded-full relative cursor-not-allowed">
                <div className="absolute left-1 top-1 h-3 w-3 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </SettingsModule>

        <SettingsModule icon={Shield} title="SECURITY_PROTOCOLS">
          <div className="space-y-4">
            <button className="text-xs font-semibold px-4 py-2 border border-red-200 text-red-600 rounded-sm hover:bg-red-50 transition-colors" style={MONO}>
              ROTATE_ACCESS_KEYS
            </button>
            <p className="text-[10px] text-muted-foreground" style={MONO}>LAST_ROTATION: 2026-03-01 14:22 UTC</p>
          </div>
        </SettingsModule>
      </div>

      <motion.div variants={item} className="pt-6 border-t border-[#D6D2C8]">
        <button className="flex items-center gap-2 bg-[#23262B] text-[#F3EFE6] px-6 py-2.5 rounded-sm hover:bg-black transition-all shadow-lg active:transform active:scale-95">
          <Save className="h-4 w-4" />
          <span className="text-xs font-bold" style={MONO}>COMMIT_CHANGES</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
