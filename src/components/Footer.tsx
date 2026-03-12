import React from "react";
import { motion } from "framer-motion";

const MONO: React.CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" };

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      style={{
        height: "64px",
        background: "#F3EFE6",
        borderTop: "1px solid #D6D2C8",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "11px",
        color: "#7A7F85",
        ...MONO,
      }}
    >
      <div className="flex items-center gap-6">
        <span>&copy; {currentYear} BUILDCASE INSTRUMENTS</span>
        <span style={{ color: "#D6D2C8" }}>|</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-foreground transition-colors">OS_VER: 0.4.2-ALPHA</a>
          <a href="#" className="hover:text-foreground transition-colors">SECURITY_ENCRYPTED</a>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#E36A2C",
            }}
          />
          <span>CORE_LINK_STABLE</span>
        </div>
        <span style={{ color: "#D6D2C8" }}>|</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-foreground transition-colors">DOCS</a>
          <a href="#" className="hover:text-foreground transition-colors">SUPPORT</a>
        </div>
      </div>
    </motion.footer>
  );
}
