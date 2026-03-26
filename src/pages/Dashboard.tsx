import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Bug, FileText, LayoutGrid, Microscope, TrendingUp } from "lucide-react";
import { useProjectStore, useSpecStore, useTaskStore, useBugStore, useResearchStore, useSettingsStore } from "@/lib/store";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";

const MONO: React.CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" };
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.2 } } };

const COLORS = ["#23262B", "#E36A2C", "#F2A65A", "#B0A590", "#7A7F85"];

export default function Dashboard() {
  const { projects } = useProjectStore();
  const { specs } = useSpecStore();
  const { tasks } = useTaskStore();
  const { bugs } = useBugStore();
  const { entries: research } = useResearchStore();
  const { operatorName } = useSettingsStore();

  /* ── derived data ── */
  const tasksByStatus = [
    { name: "Backlog", value: tasks.filter((t) => t.status === "Backlog").length },
    { name: "In Progress", value: tasks.filter((t) => t.status === "In Progress").length },
    { name: "Done", value: tasks.filter((t) => t.status === "Done").length },
  ];

  const bugsBySeverity = [
    { name: "Critical", value: bugs.filter((b) => b.severity === "Critical").length },
    { name: "High", value: bugs.filter((b) => b.severity === "High").length },
    { name: "Medium", value: bugs.filter((b) => b.severity === "Medium").length },
    { name: "Low", value: bugs.filter((b) => b.severity === "Low").length },
  ].filter((d) => d.value > 0);

  const openBugs = bugs.filter((b) => b.status === "Open" || b.status === "In Progress").length;
  const totalWords = research.reduce((s, e) => s + e.wordCount, 0);

  const kpis = [
    { icon: FileText, label: "SPECS", value: specs.length, color: "#23262B" },
    { icon: LayoutGrid, label: "TASKS", value: tasks.length, color: "#E36A2C" },
    { icon: Bug, label: "OPEN BUGS", value: openBugs, color: openBugs > 0 ? "#DC2626" : "#16A34A" },
    { icon: Microscope, label: "EVIDENCE", value: `${totalWords.toLocaleString()} w`, color: "#7A7F85" },
  ];

  const hasData = specs.length + tasks.length + bugs.length + research.length > 0;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl space-y-6">
      {/* Header */}
      <motion.div variants={item}>
        <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.1em" }}>BUILDCASE / DASHBOARD</p>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "22px", color: "#23262B", marginTop: "6px" }}>
          Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"}, {operatorName.split(" ")[0]}
        </h1>
        <p style={{ fontSize: "13px", color: "#7A7F85", marginTop: "4px" }}>Operational overview across all modules.</p>
      </motion.div>

      {/* KPIs */}
      <motion.div variants={item} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
        {kpis.map((k) => (
          <div key={k.label} style={{ background: "#F7F4EC", border: "1px solid #D6D2C8", borderRadius: "4px", padding: "14px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <k.icon style={{ width: 12, height: 12, color: k.color }} />
              <span style={{ ...MONO, fontSize: "9px", color: "#7A7F85", letterSpacing: "0.08em" }}>{k.label}</span>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "24px", fontWeight: 700, color: k.color, marginTop: "4px" }}>{k.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Charts row */}
      {hasData && (
        <motion.div variants={item} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {/* Tasks bar chart */}
          <div style={{ background: "#F7F4EC", border: "1px solid #D6D2C8", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ padding: "10px 20px", borderBottom: "1px solid #D6D2C8", background: "#EDE9E0" }}>
              <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", color: "#23262B", fontWeight: 600 }}>TASKS BY STATUS</span>
            </div>
            <div style={{ padding: "16px 12px 8px" }}>
              {tasks.length > 0 ? (
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={tasksByStatus}>
                    <XAxis dataKey="name" tick={{ fontSize: 10, fontFamily: "'IBM Plex Mono', monospace", fill: "#7A7F85" }} axisLine={false} tickLine={false} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 10, fontFamily: "'IBM Plex Mono', monospace", fill: "#7A7F85" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ ...MONO, fontSize: "11px", background: "#23262B", border: "none", borderRadius: "3px", color: "#F3EFE6" }} />
                    <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                      {tasksByStatus.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", textAlign: "center", padding: "40px 0" }}>NO TASKS YET</p>
              )}
            </div>
          </div>

          {/* Bugs pie chart */}
          <div style={{ background: "#F7F4EC", border: "1px solid #D6D2C8", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ padding: "10px 20px", borderBottom: "1px solid #D6D2C8", background: "#EDE9E0" }}>
              <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", color: "#23262B", fontWeight: 600 }}>BUGS BY SEVERITY</span>
            </div>
            <div style={{ padding: "16px 12px 8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {bugsBySeverity.length > 0 ? (
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={bugsBySeverity} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={55} innerRadius={30} paddingAngle={3} label={({ name, value }) => `${name}: ${value}`}
                      style={{ fontSize: "9px", fontFamily: "'IBM Plex Mono', monospace" }}>
                      {bugsBySeverity.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ ...MONO, fontSize: "11px", background: "#23262B", border: "none", borderRadius: "3px", color: "#F3EFE6" }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", textAlign: "center", padding: "40px 0" }}>NO BUGS FILED</p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Recent Activity */}
      <motion.div variants={item} style={{ background: "#F7F4EC", border: "1px solid #D6D2C8", borderRadius: "4px", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderBottom: "1px solid #D6D2C8", background: "#EDE9E0" }}>
          <TrendingUp style={{ width: 12, height: 12, color: "#E36A2C" }} />
          <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", color: "#23262B", fontWeight: 600 }}>RECENT ACTIVITY</span>
        </div>
        <div style={{ padding: "16px 20px" }}>
          {(() => {
            const activities = [
              ...specs.map((s) => ({ time: s.updatedAt, text: `Spec "${s.title}" updated`, icon: "📋" })),
              ...tasks.map((t) => ({ time: t.updatedAt, text: `Task "${t.title}" → ${t.status}`, icon: "🔧" })),
              ...bugs.map((b) => ({ time: b.updatedAt, text: `Bug "${b.title}" [${b.severity}]`, icon: "🐛" })),
              ...research.map((r) => ({ time: r.createdAt, text: `Research entry (${r.wordCount} words)`, icon: "🔬" })),
            ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 8);

            if (activities.length === 0) {
              return <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", textAlign: "center", padding: "20px 0" }}>NO ACTIVITY YET · START BY CREATING A SPEC OR TASK</p>;
            }

            return activities.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "5px 0", borderBottom: i < activities.length - 1 ? "1px solid #E8E4DC" : "none" }}>
                <span style={{ fontSize: "12px" }}>{a.icon}</span>
                <span style={{ fontSize: "12px", color: "#23262B", flex: 1 }}>{a.text}</span>
                <span style={{ ...MONO, fontSize: "9px", color: "#7A7F85" }}>
                  {new Date(a.time).toLocaleDateString()}
                </span>
              </div>
            ));
          })()}
        </div>
      </motion.div>
    </motion.div>
  );
}
