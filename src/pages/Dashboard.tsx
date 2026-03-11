import { motion } from "framer-motion";
import {
  Search,
  FileText,
  Bug,
  ListTodo,
  ArrowRight,
  Clock,
  BarChart3,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const quickActions = [
  { label: "Research Analysis", icon: Search, to: "/research", color: "from-primary to-secondary" },
  { label: "Feature Spec", icon: FileText, to: "/specs", color: "from-secondary to-accent" },
  { label: "Bug Report", icon: Bug, to: "/bugs", color: "from-destructive to-secondary" },
  { label: "Build Plan", icon: ListTodo, to: "/tasks", color: "from-accent to-primary" },
];

const recentProjects = [
  { name: "User Onboarding Revamp", type: "Feature Spec", updated: "2h ago", status: "In Progress" },
  { name: "Payment Flow Issues", type: "Bug Report", updated: "5h ago", status: "Review" },
  { name: "Dashboard Analytics", type: "Research", updated: "1d ago", status: "Complete" },
  { name: "Mobile App MVP", type: "Build Plan", updated: "2d ago", status: "In Progress" },
];

const recentOutputs = [
  { title: "PRD: Onboarding V2", type: "Spec", icon: FileText, time: "2h ago" },
  { title: "Analysis: User Churn", type: "Analysis", icon: BarChart3, time: "5h ago" },
  { title: "Bug: Checkout Crash", type: "Bug", icon: Bug, time: "1d ago" },
  { title: "Tasks: Auth Module", type: "Tasks", icon: ListTodo, time: "2d ago" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function Dashboard() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 max-w-6xl">
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Convert ideas into structured product docs.</p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item}>
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
          <Zap className="h-3.5 w-3.5" /> Quick Actions
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.to}
              className="glass-panel card-hover p-4 group flex flex-col gap-3"
            >
              <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                <action.icon className="h-4 w-4 text-foreground" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{action.label}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Projects */}
      <motion.div variants={item}>
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Recent Projects</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {recentProjects.map((project) => (
            <div key={project.name} className="glass-panel card-hover p-4 flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-foreground">{project.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{project.type}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  project.status === "Complete"
                    ? "bg-accent/10 text-accent"
                    : project.status === "Review"
                    ? "bg-secondary/10 text-secondary"
                    : "bg-primary/10 text-primary"
                }`}>
                  {project.status}
                </span>
                <p className="text-xs text-muted-foreground mt-1.5 flex items-center justify-end gap-1">
                  <Clock className="h-3 w-3" /> {project.updated}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Outputs */}
      <motion.div variants={item}>
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Recent Outputs</h2>
        <div className="glass-panel divide-y divide-border/50">
          {recentOutputs.map((output) => (
            <div key={output.title} className="flex items-center gap-3 p-3 hover:bg-muted/30 transition-colors cursor-pointer">
              <output.icon className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{output.title}</p>
                <p className="text-xs text-muted-foreground">{output.type}</p>
              </div>
              <span className="text-xs text-muted-foreground">{output.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
