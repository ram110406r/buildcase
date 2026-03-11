import { motion } from "framer-motion";
import { Lightbulb, AlertTriangle, TrendingUp, Link2, ChevronDown } from "lucide-react";
import { useState } from "react";

const insights = [
  { title: "Users struggle with onboarding flow", confidence: 92, source: "12 interviews" },
  { title: "Mobile experience needs improvement", confidence: 87, source: "8 tickets" },
  { title: "Pricing page causes confusion", confidence: 78, source: "5 feedback entries" },
];

const painPoints = [
  { text: "3-step signup feels too long", severity: "high" },
  { text: "Password requirements unclear", severity: "medium" },
  { text: "Email verification email delays", severity: "high" },
  { text: "No social login options", severity: "low" },
];

const opportunities = [
  { title: "Single-step signup with social auth", impact: "High", effort: "Medium" },
  { title: "Progressive onboarding wizard", impact: "High", effort: "High" },
  { title: "Simplified pricing tiers", impact: "Medium", effort: "Low" },
];

const evidence = [
  { quote: "I gave up after the third form page...", source: "User Interview #7", context: "Discussing initial signup experience" },
  { quote: "Why can't I just use Google to sign in?", source: "Support Ticket #234", context: "User requesting social auth" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const severityColor: Record<string, string> = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-secondary/10 text-secondary",
  low: "bg-accent/10 text-accent",
};

export default function Analysis() {
  const [expandedEvidence, setExpandedEvidence] = useState<number | null>(null);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl space-y-8">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-foreground">Analysis Output</h1>
        <p className="text-sm text-muted-foreground mt-1">Structured intelligence from your research data.</p>
      </motion.div>

      {/* Key Insights */}
      <motion.div variants={item} className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Lightbulb className="h-3.5 w-3.5" /> Key Insights
        </h2>
        <div className="grid gap-3">
          {insights.map((insight) => (
            <div key={insight.title} className="glass-panel p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{insight.title}</p>
                <p className="text-xs text-muted-foreground mt-1">Based on {insight.source}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full gradient-primary rounded-full" style={{ width: `${insight.confidence}%` }} />
                </div>
                <span className="text-xs font-mono text-muted-foreground">{insight.confidence}%</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Pain Points */}
      <motion.div variants={item} className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="h-3.5 w-3.5" /> User Pain Points
        </h2>
        <div className="glass-panel divide-y divide-border/50">
          {painPoints.map((point) => (
            <div key={point.text} className="flex items-center gap-3 p-3">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${severityColor[point.severity]}`}>
                {point.severity}
              </span>
              <span className="text-sm text-foreground">{point.text}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Opportunities */}
      <motion.div variants={item} className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <TrendingUp className="h-3.5 w-3.5" /> Opportunities
        </h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {opportunities.map((opp) => (
            <div key={opp.title} className="glass-panel card-hover p-4">
              <p className="text-sm font-medium text-foreground">{opp.title}</p>
              <div className="flex gap-3 mt-3">
                <span className="text-xs text-muted-foreground">Impact: <span className="text-foreground font-medium">{opp.impact}</span></span>
                <span className="text-xs text-muted-foreground">Effort: <span className="text-foreground font-medium">{opp.effort}</span></span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Evidence Chain */}
      <motion.div variants={item} className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Link2 className="h-3.5 w-3.5" /> Evidence Chain
        </h2>
        <div className="space-y-2">
          {evidence.map((ev, i) => (
            <div key={i} className="glass-panel">
              <button
                onClick={() => setExpandedEvidence(expandedEvidence === i ? null : i)}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <div>
                  <p className="text-sm text-foreground italic">"{ev.quote}"</p>
                  <p className="text-xs text-muted-foreground mt-1">{ev.source}</p>
                </div>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expandedEvidence === i ? "rotate-180" : ""}`} />
              </button>
              {expandedEvidence === i && (
                <div className="px-4 pb-4 border-t border-border/50 pt-3">
                  <p className="text-xs text-muted-foreground">{ev.context}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
