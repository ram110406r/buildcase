import { motion } from "framer-motion";
import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your workspace and preferences.</p>
      </div>
      <div className="glass-panel p-8 flex flex-col items-center justify-center gap-3 text-center min-h-[200px]">
        <SettingsIcon className="h-10 w-10 text-muted-foreground/50" />
        <p className="text-sm text-muted-foreground">Settings page coming soon.</p>
      </div>
    </motion.div>
  );
}
