import { motion } from "framer-motion";
import { Bug, Plus, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BugReports() {
  const [title, setTitle] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl space-y-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bug Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">Structured bug reports for engineering teams.</p>
        </div>
      </div>

      <div className="glass-panel p-6 space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Brief description of the bug"
            className="bg-muted/30 border-border/50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</label>
          <Textarea
            placeholder="Detailed description of the issue..."
            className="bg-muted/30 border-border/50 min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Steps to Reproduce</label>
          <Textarea
            placeholder="1. Go to...&#10;2. Click on...&#10;3. Observe..."
            className="bg-muted/30 border-border/50 min-h-[100px] font-mono text-sm"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Expected Result</label>
            <Textarea placeholder="What should happen..." className="bg-muted/30 border-border/50 min-h-[80px]" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Actual Result</label>
            <Textarea placeholder="What actually happens..." className="bg-muted/30 border-border/50 min-h-[80px]" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Severity</label>
            <Select>
              <SelectTrigger className="bg-muted/30 border-border/50">
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Environment</label>
            <Select>
              <SelectTrigger className="bg-muted/30 border-border/50">
                <SelectValue placeholder="Select environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="staging">Staging</SelectItem>
                <SelectItem value="development">Development</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button className="gradient-primary text-primary-foreground hover:opacity-90 gap-2">
            <Sparkles className="h-4 w-4" /> Generate Engineering Report
          </Button>
          <Button variant="outline" className="border-border/50 text-muted-foreground hover:text-foreground">
            Save Draft
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
