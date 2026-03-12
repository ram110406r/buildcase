import React from "react";
import { motion } from "framer-motion";
import { FileText, User, CheckSquare, AlertCircle, Plus } from "lucide-react";

const MONO: React.CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" };

const userStories = [
  { role: "New User", action: "sign up with Google", benefit: "skip manual form filling" },
  { role: "Returning User", action: "see my progress on a dashboard", benefit: "quickly resume where I left off" },
  { role: "Admin", action: "view user signup analytics", benefit: "understand conversion rates" },
];

const requirements = [
  { text: "OAuth 2.0 integration with Google and GitHub", done: true },
  { text: "Progressive profile completion after signup", done: false },
  { text: "Email verification with magic link option", done: false },
  { text: "Rate limiting on signup endpoint (5 req/min)", done: true },
  { text: "GDPR consent checkbox with link to privacy policy", done: false },
];

const edgeCases = [
  { title: "Duplicate email across providers", description: "User signs up with email, then tries Google with same email. System should link accounts." },
  { title: "Expired magic link", description: "User clicks verification link after 24h expiry. Show clear error and resend option." },
  { title: "Network failure mid-signup", description: "Handle partial state: user created but not verified. Allow retry without duplicate." },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.2 } } };

function SectionPanel({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
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
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 20px",
          borderBottom: "1px solid #D6D2C8",
          background: "#EDE9E0",
        }}
      >
        <Icon style={{ width: "12px", height: "12px", color: "#E36A2C" }} />
        <span style={{ ...MONO, fontSize: "10px", letterSpacing: "0.1em", color: "#23262B", fontWeight: 600 }}>
          {title}
        </span>
      </div>
      <div style={{ padding: "20px" }}>{children}</div>
    </div>
  );
}

export default function Specs() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl space-y-6">
      {/* Header */}
      <motion.div variants={item} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.1em" }}>
            BUILDCASE / SPECS
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
            Feature Spec Generator
          </h1>
          <p style={{ fontSize: "13px", color: "#7A7F85", marginTop: "4px" }}>
            Structured product requirement documents.
          </p>
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "#23262B",
            color: "#F3EFE6",
            border: "none",
            borderRadius: "4px",
            padding: "9px 16px",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
            flexShrink: 0,
          }}
        >
          <Plus style={{ width: "14px", height: "14px" }} />
          New Spec
        </button>
      </motion.div>

      {/* Feature Overview */}
      <motion.div variants={item}>
        <SectionPanel icon={FileText} title="FEATURE OVERVIEW">
          <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#23262B" }}>User Onboarding V2</h3>
          <p style={{ fontSize: "13px", color: "#7A7F85", marginTop: "8px", lineHeight: "1.6" }}>
            Redesign the signup and onboarding flow to reduce friction, add social authentication,
            and implement progressive profile completion. Target: reduce signup abandonment by 40%.
          </p>
          <div style={{ display: "flex", gap: "8px", marginTop: "14px", flexWrap: "wrap" }}>
            {[
              { label: "PRIORITY: HIGH", bg: "#E36A2C18", color: "#C4561E" },
              { label: "SPRINT 12", bg: "#23262B12", color: "#23262B" },
              { label: "3 STORY POINTS", bg: "#F2A65A18", color: "#B07830" },
            ].map((tag) => (
              <span
                key={tag.label}
                style={{
                  ...MONO,
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  background: tag.bg,
                  color: tag.color,
                  padding: "3px 10px",
                  borderRadius: "2px",
                }}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </SectionPanel>
      </motion.div>

      {/* User Stories */}
      <motion.div variants={item}>
        <SectionPanel icon={User} title="USER STORIES">
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {userStories.map((story, i) => (
              <div
                key={i}
                style={{
                  padding: "12px 16px",
                  background: "#F9F6EF",
                  border: "1px solid #D6D2C8",
                  borderRadius: "4px",
                  fontSize: "13px",
                  color: "#23262B",
                  lineHeight: "1.6",
                }}
              >
                As a{" "}
                <span style={{ fontWeight: 700, color: "#E36A2C" }}>{story.role}</span>, I want to{" "}
                <span style={{ fontWeight: 600 }}>{story.action}</span> so that I can{" "}
                <span style={{ color: "#7A7F85" }}>{story.benefit}</span>.
              </div>
            ))}
          </div>
        </SectionPanel>
      </motion.div>

      {/* Functional Requirements */}
      <motion.div variants={item}>
        <SectionPanel icon={CheckSquare} title="FUNCTIONAL REQUIREMENTS">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {requirements.map((req, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 0",
                  borderBottom: i < requirements.length - 1 ? "1px solid #E8E4DC" : "none",
                }}
              >
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    border: req.done ? "none" : "1px solid #D6D2C8",
                    borderRadius: "2px",
                    background: req.done ? "#E36A2C" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {req.done && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path d="M1 3L3.5 5.5L8 1" stroke="#F3EFE6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span
                  style={{
                    fontSize: "13px",
                    color: req.done ? "#7A7F85" : "#23262B",
                    textDecoration: req.done ? "line-through" : "none",
                  }}
                >
                  {req.text}
                </span>
              </div>
            ))}
          </div>
        </SectionPanel>
      </motion.div>

      {/* Edge Cases */}
      <motion.div variants={item}>
        <SectionPanel icon={AlertCircle} title="EDGE CASES">
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {edgeCases.map((ec, i) => (
              <details
                key={i}
                style={{
                  background: "#F9F6EF",
                  border: "1px solid #D6D2C8",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <summary
                  style={{
                    padding: "12px 16px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#23262B",
                    listStyle: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {ec.title}
                  <span style={{ color: "#7A7F85", fontSize: "10px" }}>▼</span>
                </summary>
                <div
                  style={{
                    padding: "12px 16px",
                    borderTop: "1px solid #D6D2C8",
                    fontSize: "12px",
                    color: "#7A7F85",
                    lineHeight: "1.6",
                  }}
                >
                  {ec.description}
                </div>
              </details>
            ))}
          </div>
        </SectionPanel>
      </motion.div>
    </motion.div>
  );
}
