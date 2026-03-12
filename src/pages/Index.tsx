import React from "react";
import { motion } from "framer-motion";
import { Terminal, ShieldCheck, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const MONO: React.CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" };

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex justify-center gap-3">
          <ShieldCheck className="h-8 w-8 text-orange-600" />
          <Activity className="h-8 w-8 text-neutral-400" />
        </div>
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Buildcase Logo" className="h-20 w-auto" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl">
          Buildcase <span className="text-orange-600">v0.4.2</span>
        </h1>
        <p className="max-w-lg mx-auto text-lg text-neutral-500 font-medium">
          Evidence-based project diagnostics and high-fidelity decision instrumentation.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex gap-4"
      >
        <Link 
          to="/" 
          className="bg-[#23262B] text-white px-8 py-3 rounded-sm font-bold text-sm tracking-widest hover:bg-black transition-all flex items-center gap-2"
          style={MONO}
        >
          <Terminal className="h-4 w-4" />
          INITIALIZE_CONSOLE
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col items-center gap-2 opacity-50"
      >
        <div className="h-px w-24 bg-neutral-300" />
        <p style={{ ...MONO, fontSize: "10px", letterSpacing: "0.2em" }}>SYSTEM_READY // SECURE_LINK</p>
      </motion.div>
    </div>
  );
};

export default Index;
