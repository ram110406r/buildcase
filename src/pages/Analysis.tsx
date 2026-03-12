import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp, Link2, ChevronDown, Radio } from "lucide-react";

const MONO: React.CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" };

const signals = [
  { title: "Users struggle with onboarding flow", confidence: 92, source: "12 interviews" },
  { title: "Mobile experience needs improvement", confidence: 87, source: "8 tickets" },
  { title: "Pricing page causes confusion", confidence: 78, source: "5 feedback entries" },
];

const problems = [
  { text: "3-step signup feels too long", severity: "high" },
  { text: "Password requirements unclear", severity: "medium" },
  { text: "Email verification email delays", severity: "high" },
  { text: "No social login options", severity: "low" },
];

const opportunities = [
  { title: "Single-step signup with social auth", impact: "High", effort: "Medium", score: "9.2" },
  { title: "Progressive onboarding wizard", impact: "High", effort: "High", score: "7.8" },
  { title: "Simplified pricing tiers", impact: "Medium", effort: "Low", score: "8.5" },
];

const recommendations = [
  { text: "Prioritize Google OAuth integration in next sprint", priority: "P0" },
  { text: "A/B test 1-step vs 3-step signup flow", priority: "P1" },
  { text: "Add inline password strength indicator", priority: "P2" },
];

const evidence = [
  { quote: "I gave up after the third form page...", source: "User Interview #7", context: "Discussing initial signup experience" },
  { quote: "Why can't I just use Google to sign in?", source: "Support Ticket #234", context: "User requesting social auth" },
];

const severityStyle: Record<string, React.CSSProperties> = {
  high: { background: "#F44B4B18", color: "#C0392B", border: "1px solid #F44B4B40" },
  medium: { background: "#F2A65A1A", color: "#B07830", border: "1px solid #F2A65A40" },
  low: { background: "#7A7F851A", color: "#5A5F65", border: "1px solid #7A7F8540" },
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.2 } } };

function Module({ title, children }: { title: string; children: React.ReactNode }) {
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
          padding: "10px 16px",
          borderBottom: "1px solid #D6D2C8",
          background: "#EDE9E0",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#E36A2C",
            display: "inline-block",
            flexShrink: 0,
          }}
        />
        <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", color: "#23262B", fontWeight: 600 }}>
          {title}
        </span>
      </div>
      <div style={{ padding: "16px" }}>{children}</div>
    </div>
  );
}

export default function Analysis() {
  const [expandedEvidence, setExpandedEvidence] = useState<number | null>(null);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl space-y-8">
      {/* Header */}
      <motion.div variants={item}>
        <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.1em" }}>
          BUILDCASE / ANALYSIS
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
          Analysis Pipeline
        </h1>
        <p style={{ fontSize: "13px", color: "#7A7F85", marginTop: "4px" }}>
          Structured intelligence extracted from research evidence.
        </p>
      </motion.div>

      {/* 2-column grid of modules */}
      <div className="grid sm:grid-cols-2 gap-4">

        {/* SIGNALS */}
        <motion.div variants={item}>
          <Module title="SIGNALS">
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {signals.map((s) => (
                <div
                  key={s.title}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <div>
                    <p style={{ fontSize: "12px", fontWeight: 500, color: "#23262B" }}>{s.title}</p>
                    <p style={{ ...MONO, fontSize: "9px", color: "#7A7F85", marginTop: "2px" }}>
                      {s.source}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                    <div
                      style={{
                        width: "60px",
                        height: "3px",
                        background: "#D6D2C8",
                        borderRadius: "2px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${s.confidence}%`,
                          background: "#E36A2C",
                          borderRadius: "2px",
                        }}
                      />
                    </div>
                    <span style={{ ...MONO, fontSize: "10px", color: "#E36A2C", fontWeight: 600 }}>
                      {s.confidence}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Module>
        </motion.div>

        {/* PROBLEMS */}
        <motion.div variants={item}>
          <Module title="PROBLEMS">
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {problems.map((p) => (
                <div
                  key={p.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      ...MONO,
                      fontSize: "8px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      padding: "2px 6px",
                      borderRadius: "2px",
                      flexShrink: 0,
                      ...severityStyle[p.severity],
                    }}
                  >
                    {p.severity.toUpperCase()}
                  </span>
                  <span style={{ fontSize: "12px", color: "#23262B" }}>{p.text}</span>
                </div>
              ))}
            </div>
          </Module>
        </motion.div>

        {/* OPPORTUNITIES */}
        <motion.div variants={item}>
          <Module title="OPPORTUNITIES">
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {opportunities.map((o) => (
                <div
                  key={o.title}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "12px",
                    paddingBottom: "10px",
                    borderBottom: "1px solid #D6D2C8",
                  }}
                >
                  <div>
                    <p style={{ fontSize: "12px", fontWeight: 500, color: "#23262B" }}>{o.title}</p>
                    <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
                      <span style={{ ...MONO, fontSize: "9px", color: "#7A7F85" }}>
                        IMPACT <span style={{ color: "#23262B" }}>{o.impact}</span>
                      </span>
                      <span style={{ ...MONO, fontSize: "9px", color: "#7A7F85" }}>
                        EFFORT <span style={{ color: "#23262B" }}>{o.effort}</span>
                      </span>
                    </div>
                  </div>
                  <span
                    style={{
                      ...MONO,
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#E36A2C",
                      flexShrink: 0,
                    }}
                  >
                    {o.score}
                  </span>
                </div>
              ))}
            </div>
          </Module>
        </motion.div>

        {/* RECOMMENDATIONS */}
        <motion.div variants={item}>
          <Module title="RECOMMENDATIONS">
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {recommendations.map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      ...MONO,
                      fontSize: "9px",
                      fontWeight: 700,
                      color: "#F3EFE6",
                      background: "#E36A2C",
                      padding: "2px 6px",
                      borderRadius: "2px",
                      flexShrink: 0,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {r.priority}
                  </span>
                  <span style={{ fontSize: "12px", color: "#23262B", lineHeight: "1.5" }}>{r.text}</span>
                </div>
              ))}
            </div>
          </Module>
        </motion.div>
      </div>

      {/* Evidence Chain (full width) */}
      <motion.div variants={item}>
        <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.1em", marginBottom: "12px" }}>
          ◈ EVIDENCE CHAIN
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {evidence.map((ev, i) => (
            <div
              key={i}
              style={{
                background: "#F7F4EC",
                border: "1px solid #D6D2C8",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setExpandedEvidence(expandedEvidence === i ? null : i)}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <div>
                  <p style={{ fontSize: "13px", color: "#23262B", fontStyle: "italic" }}>"{ev.quote}"</p>
                  <p style={{ ...MONO, fontSize: "9px", color: "#7A7F85", marginTop: "4px" }}>{ev.source}</p>
                </div>
                <ChevronDown
                  style={{
                    width: "14px",
                    height: "14px",
                    color: "#7A7F85",
                    transition: "transform 150ms",
                    transform: expandedEvidence === i ? "rotate(180deg)" : "none",
                    flexShrink: 0,
                    marginLeft: "12px",
                  }}
                />
              </button>
              {expandedEvidence === i && (
                <div
                  style={{
                    padding: "12px 16px",
                    borderTop: "1px solid #D6D2C8",
                    background: "#EDE9E0",
                  }}
                >
                  <p style={{ fontSize: "12px", color: "#7A7F85" }}>{ev.context}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
