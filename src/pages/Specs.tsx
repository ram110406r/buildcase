import { motion } from "framer-motion";
import { FileText, User, CheckSquare, AlertCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export default function Specs() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl space-y-8">
      <motion.div variants={item} className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Feature Spec Generator</h1>
          <p className="text-sm text-muted-foreground mt-1">Structured product requirement documents.</p>
        </div>
        <Button className="gradient-primary text-primary-foreground hover:opacity-90 gap-2">
          <Plus className="h-4 w-4" /> New Spec
        </Button>
      </motion.div>

      {/* Feature Overview */}
      <motion.div variants={item} className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <FileText className="h-3.5 w-3.5" /> Feature Overview
        </h2>
        <div className="glass-panel p-5">
          <h3 className="text-lg font-semibold text-foreground">User Onboarding V2</h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Redesign the signup and onboarding flow to reduce friction, add social authentication,
            and implement progressive profile completion. Target: reduce signup abandonment by 40%.
          </p>
          <div className="flex gap-4 mt-4">
            <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full">Priority: High</span>
            <span className="text-xs bg-accent/10 text-accent px-2.5 py-1 rounded-full">Sprint 12</span>
            <span className="text-xs bg-secondary/10 text-secondary px-2.5 py-1 rounded-full">3 story points</span>
          </div>
        </div>
      </motion.div>

      {/* User Stories */}
      <motion.div variants={item} className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <User className="h-3.5 w-3.5" /> User Stories
        </h2>
        <div className="grid gap-3">
          {userStories.map((story, i) => (
            <div key={i} className="glass-panel p-4">
              <p className="text-sm text-foreground">
                As a <span className="font-semibold text-primary">{story.role}</span>, I want to{" "}
                <span className="font-medium">{story.action}</span> so that I can{" "}
                <span className="text-accent">{story.benefit}</span>.
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Functional Requirements */}
      <motion.div variants={item} className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <CheckSquare className="h-3.5 w-3.5" /> Functional Requirements
        </h2>
        <div className="glass-panel divide-y divide-border/50">
          {requirements.map((req, i) => (
            <div key={i} className="flex items-center gap-3 p-3">
              <div className={`h-4 w-4 rounded border flex items-center justify-center shrink-0 ${
                req.done ? "bg-accent border-accent" : "border-border"
              }`}>
                {req.done && <CheckSquare className="h-3 w-3 text-background" />}
              </div>
              <span className={`text-sm ${req.done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                {req.text}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Edge Cases */}
      <motion.div variants={item} className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <AlertCircle className="h-3.5 w-3.5" /> Edge Cases
        </h2>
        <div className="space-y-2">
          {edgeCases.map((ec, i) => (
            <details key={i} className="glass-panel group">
              <summary className="p-4 cursor-pointer flex items-center justify-between text-sm font-medium text-foreground list-none">
                {ec.title}
                <span className="text-muted-foreground text-xs group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-4 pb-4 text-sm text-muted-foreground border-t border-border/50 pt-3">
                {ec.description}
              </div>
            </details>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
