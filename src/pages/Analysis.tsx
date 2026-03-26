import React from "react";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { useSpecStore, useTaskStore, useBugStore, useResearchStore } from "@/lib/store";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, CartesianGrid } from "recharts";

const MONO: React.CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" };
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.2 } } };

const COLORS = ["#23262B", "#E36A2C", "#F2A65A", "#B0A590"];

function MetricCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div style={{ background: "#F7F4EC", border: "1px solid #D6D2C8", borderRadius: "4px", padding: "14px 18px" }}>
      <p style={{ ...MONO, fontSize: "9px", color: "#7A7F85", letterSpacing: "0.08em" }}>{label}</p>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "22px", fontWeight: 700, color: "#23262B", marginTop: "2px" }}>{value}</p>
      {sub && <p style={{ ...MONO, fontSize: "9px", color: "#7A7F85", marginTop: "2px" }}>{sub}</p>}
    </div>
  );
}

export default function Analysis() {
  const { specs } = useSpecStore();
  const { tasks } = useTaskStore();
  const { bugs } = useBugStore();
  const { entries: research } = useResearchStore();

  /* ── metrics ── */
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.status === "Done").length;
  const velocity = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const totalReqs = specs.reduce((s, sp) => s + sp.requirements.length, 0);
  const doneReqs = specs.reduce((s, sp) => s + sp.requirements.filter((r) => r.done).length, 0);
  const specCompletion = totalReqs > 0 ? Math.round((doneReqs / totalReqs) * 100) : 0;

  const openBugs = bugs.filter((b) => b.status === "Open" || b.status === "In Progress").length;
  const criticalBugs = bugs.filter((b) => b.severity === "Critical" && b.status !== "Closed").length;
  const totalWords = research.reduce((s, e) => s + e.wordCount, 0);

  /* ── chart data ── */
  const priorityDist = [
    { name: "High", Tasks: tasks.filter((t) => t.priority === "High").length, Bugs: bugs.filter((b) => b.severity === "High" || b.severity === "Critical").length },
    { name: "Medium", Tasks: tasks.filter((t) => t.priority === "Medium").length, Bugs: bugs.filter((b) => b.severity === "Medium").length },
    { name: "Low", Tasks: tasks.filter((t) => t.priority === "Low").length, Bugs: bugs.filter((b) => b.severity === "Low").length },
  ];

  /* Simulate a cumulative evidence acquisition trend from research timestamps */
  const evidenceTrend = research
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .reduce<{ date: string; words: number }[]>((acc, r) => {
      const d = new Date(r.createdAt).toLocaleDateString();
      const prev = acc.length > 0 ? acc[acc.length - 1].words : 0;
      acc.push({ date: d, words: prev + r.wordCount });
      return acc;
    }, []);

  const hasAnyData = specs.length + tasks.length + bugs.length + research.length > 0;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl space-y-6">
      {/* Header */}
      <motion.div variants={item}>
        <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.1em" }}>BUILDCASE / ANALYSIS</p>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "22px", color: "#23262B", marginTop: "6px" }}>
          Project Analysis
        </h1>
        <p style={{ fontSize: "13px", color: "#7A7F85", marginTop: "4px" }}>Quantitative metrics across all modules.</p>
      </motion.div>

      {/* KPIs */}
      <motion.div variants={item} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
        <MetricCard label="VELOCITY" value={`${velocity}%`} sub={`${doneTasks}/${totalTasks} tasks done`} />
        <MetricCard label="SPEC COMPLETION" value={`${specCompletion}%`} sub={`${doneReqs}/${totalReqs} requirements`} />
        <MetricCard label="OPEN BUGS" value={openBugs} sub={criticalBugs > 0 ? `${criticalBugs} critical` : "No critical"} />
        <MetricCard label="EVIDENCE BASE" value={totalWords.toLocaleString()} sub={`${research.length} entries`} />
      </motion.div>

      {!hasAnyData && (
        <motion.div variants={item} style={{ textAlign: "center", padding: "60px", color: "#7A7F85" }}>
          <BarChart3 style={{ width: 36, height: 36, margin: "0 auto 12px", opacity: 0.3 }} />
          <p style={{ ...MONO, fontSize: "11px", letterSpacing: "0.06em" }}>NO DATA YET · ADD SPECS, TASKS, BUGS, OR RESEARCH TO SEE ANALYTICS</p>
        </motion.div>
      )}

      {hasAnyData && (
        <>
          {/* Priority distribution */}
          {(tasks.length > 0 || bugs.length > 0) && (
            <motion.div variants={item} style={{ background: "#F7F4EC", border: "1px solid #D6D2C8", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ padding: "10px 20px", borderBottom: "1px solid #D6D2C8", background: "#EDE9E0" }}>
                <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", color: "#23262B", fontWeight: 600 }}>PRIORITY DISTRIBUTION</span>
              </div>
              <div style={{ padding: "16px 12px 8px" }}>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={priorityDist}>
                    <XAxis dataKey="name" tick={{ fontSize: 10, fontFamily: "'IBM Plex Mono', monospace", fill: "#7A7F85" }} axisLine={false} tickLine={false} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 10, fontFamily: "'IBM Plex Mono', monospace", fill: "#7A7F85" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ ...MONO, fontSize: "11px", background: "#23262B", border: "none", borderRadius: "3px", color: "#F3EFE6" }} />
                    <Bar dataKey="Tasks" fill="#23262B" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="Bugs" fill="#E36A2C" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* Evidence acquisition trend */}
          {evidenceTrend.length > 1 && (
            <motion.div variants={item} style={{ background: "#F7F4EC", border: "1px solid #D6D2C8", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ padding: "10px 20px", borderBottom: "1px solid #D6D2C8", background: "#EDE9E0" }}>
                <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", color: "#23262B", fontWeight: 600 }}>EVIDENCE ACQUISITION</span>
              </div>
              <div style={{ padding: "16px 12px 8px" }}>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={evidenceTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E8E4DC" />
                    <XAxis dataKey="date" tick={{ fontSize: 9, fontFamily: "'IBM Plex Mono', monospace", fill: "#7A7F85" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fontFamily: "'IBM Plex Mono', monospace", fill: "#7A7F85" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ ...MONO, fontSize: "11px", background: "#23262B", border: "none", borderRadius: "3px", color: "#F3EFE6" }} />
                    <Line type="monotone" dataKey="words" stroke="#E36A2C" strokeWidth={2} dot={{ fill: "#E36A2C", r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* Health score */}
          <motion.div variants={item} style={{ background: "#F7F4EC", border: "1px solid #D6D2C8", borderRadius: "4px", padding: "20px" }}>
            <p style={{ ...MONO, fontSize: "10px", letterSpacing: "0.08em", color: "#7A7F85", marginBottom: "10px" }}>PROJECT HEALTH SCORE</p>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              {(() => {
                let score = 50;
                if (velocity > 50) score += 15;
                if (specCompletion > 50) score += 10;
                if (criticalBugs === 0) score += 10;
                if (research.length >= 3) score += 15;
                score = Math.min(100, score);
                const color = score >= 80 ? "#16A34A" : score >= 50 ? "#F2A65A" : "#DC2626";
                return (
                  <>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "36px", fontWeight: 700, color }}>{score}</p>
                    <div style={{ flex: 1 }}>
                      <div style={{ height: "6px", background: "#E8E4DC", borderRadius: "3px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${score}%`, background: color, borderRadius: "3px", transition: "width 300ms" }} />
                      </div>
                      <p style={{ ...MONO, fontSize: "9px", color: "#7A7F85", marginTop: "4px" }}>
                        {score >= 80 ? "Healthy — execution on track" : score >= 50 ? "Moderate — some areas need attention" : "At Risk — critical blockers present"}
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
