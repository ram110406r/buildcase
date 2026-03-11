import { motion } from "framer-motion";
import { Upload, FileText, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Research() {
  const [content, setContent] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-foreground">Research Input</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Paste research transcripts, user feedback, support tickets, or raw notes.
        </p>
      </div>

      <div className="glass-panel p-1">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste research transcripts, feedback, support tickets..."
          className="min-h-[320px] bg-transparent border-0 focus-visible:ring-0 resize-none text-sm text-foreground placeholder:text-muted-foreground/50 p-4"
        />
      </div>

      <div className="glass-panel p-6 border-dashed border-2 border-border/50 flex flex-col items-center justify-center gap-3 text-center cursor-pointer hover:border-primary/30 transition-colors">
        <Upload className="h-8 w-8 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium text-foreground">Drop files here or click to upload</p>
          <p className="text-xs text-muted-foreground mt-1">Supports .txt, .pdf, .docx</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          className="gradient-primary text-primary-foreground hover:opacity-90 transition-opacity gap-2"
          disabled={!content.trim()}
        >
          <Sparkles className="h-4 w-4" />
          Run Analysis
        </Button>
        <span className="text-xs text-muted-foreground">
          {content.length > 0 ? `${content.split(/\s+/).filter(Boolean).length} words` : "No content yet"}
        </span>
      </div>
    </motion.div>
  );
}
