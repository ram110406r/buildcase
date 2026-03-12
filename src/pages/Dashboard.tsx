import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  FileText,
  Bug,
  ListTodo,
  ArrowRight,
  Clock,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

const quickActions = [
  { label: "Research Analysis", sub: "INPUT EVIDENCE", icon: Search, to: "/research" },
  { label: "Feature Spec", sub: "GENERATE SPEC", icon: FileText, to: "/specs" },
  { label: "Bug Report", sub: "FILE REPORT", icon: Bug, to: "/bugs" },
  { label: "Build Plan", sub: "CREATE TASKS", icon: ListTodo, to: "/tasks" },
];

const recentProjects = [
  { name: "User Onboarding Revamp", type: "Feature Spec", updated: "2h ago", status: "In Progress" },
  { name: "Payment Flow Issues", type: "Bug Report", updated: "5h ago", status: "Review" },
  { name: "Dashboard Analytics", type: "Research", updated: "1d ago", status: "Complete" },
  { name: "Mobile App MVP", type: "Build Plan", updated: "2d ago", status: "In Progress" },
];

const recentOutputs = [
  { title: "PRD: Onboarding V2", type: "SPEC", icon: FileText, time: "2h ago" },
  { title: "Analysis: User Churn", type: "ANALYSIS", icon: BarChart3, time: "5h ago" },
  { title: "Bug: Checkout Crash", type: "BUG", icon: Bug, time: "1d ago" },
  { title: "Tasks: Auth Module", type: "TASKS", icon: ListTodo, time: "2d ago" },
];

const statusColor: Record<string, { bg: string; text: string }> = {
  Complete: { bg: "#E36A2C1A", text: "#C4561E" },
  Review: { bg: "#F2A65A1A", text: "#B07830" },
  "In Progress": { bg: "#23262B12", text: "#23262B" },
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

const MONO: React.CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" };

export default function Dashboard() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-10 max-w-6xl">
      {/* Header */}
      <motion.div variants={item}>
        <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.1em" }}>
          BUILDCASE / DASHBOARD
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
          Product Intelligence Console
        </h1>
        <p style={{ fontSize: "13px", color: "#7A7F85", marginTop: "4px" }}>
          Convert evidence into structured product decisions.
        </p>
      </motion.div>

      {/* Quick Actions — diagnostic modules */}
      <motion.div variants={item}>
        <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.1em", marginBottom: "12px" }}>
          ◈ MODULES
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.to}
              className="panel-hover group"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                background: "#F7F4EC",
                border: "1px solid #D6D2C8",
                borderRadius: "4px",
                padding: "20px",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: "#EDE9E0",
                  border: "1px solid #D6D2C8",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <action.icon style={{ width: "16px", height: "16px", color: "#E36A2C" }} />
              </div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#23262B" }}>{action.label}</p>
                <p style={{ ...MONO, fontSize: "9px", color: "#7A7F85", letterSpacing: "0.08em", marginTop: "4px" }}>
                  {action.sub}
                </p>
              </div>
              <ArrowRight
                style={{
                  width: "12px",
                  height: "12px",
                  color: "#E36A2C",
                  marginTop: "auto",
                  opacity: 0,
                  transition: "opacity 180ms",
                }}
                className="group-hover:opacity-100"
              />
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Projects */}
      <motion.div variants={item}>
        <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.1em", marginBottom: "12px" }}>
          ◈ RECENT PROJECTS
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {recentProjects.map((project) => {
            const sc = statusColor[project.status] ?? statusColor["In Progress"];
            return (
              <div
                key={project.name}
                className="panel-hover"
                style={{
                  background: "#F7F4EC",
                  border: "1px solid #D6D2C8",
                  borderRadius: "4px",
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#23262B" }}>
                    {project.name}
                  </p>
                  <p style={{ ...MONO, fontSize: "9px", color: "#7A7F85", marginTop: "4px", letterSpacing: "0.06em" }}>
                    {project.type.toUpperCase()}
                  </p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "12px" }}>
                  <span
                    style={{
                      ...MONO,
                      fontSize: "9px",
                      fontWeight: 500,
                      background: sc.bg,
                      color: sc.text,
                      padding: "2px 8px",
                      borderRadius: "2px",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {project.status.toUpperCase()}
                  </span>
                  <p
                    style={{
                      ...MONO,
                      fontSize: "9px",
                      color: "#7A7F85",
                      marginTop: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: "4px",
                    }}
                  >
                    <Clock style={{ width: "10px", height: "10px" }} />
                    {project.updated}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Outputs */}
      <motion.div variants={item}>
        <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.1em", marginBottom: "12px" }}>
          ◈ RECENT OUTPUTS
        </p>
        <div
          style={{
            background: "#F7F4EC",
            border: "1px solid #D6D2C8",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          {recentOutputs.map((output, i) => (
            <div
              key={output.title}
              className="group"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 20px",
                borderBottom: i < recentOutputs.length - 1 ? "1px solid #D6D2C8" : "none",
                cursor: "pointer",
                transition: "background 150ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#EDE9E0"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <output.icon style={{ width: "14px", height: "14px", color: "#7A7F85", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "13px", fontWeight: 500, color: "#23262B" }}>{output.title}</p>
                <p style={{ ...MONO, fontSize: "9px", color: "#7A7F85", letterSpacing: "0.08em" }}>{output.type}</p>
              </div>
              <span style={{ ...MONO, fontSize: "9px", color: "#7A7F85", flexShrink: 0 }}>{output.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
