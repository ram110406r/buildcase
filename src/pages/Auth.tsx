import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { authService } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const MONO: React.CSSProperties = { fontFamily: "'IBM Plex Mono', monospace" };

export default function Auth() {
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        await authService.login(email, password);
        toast({ 
          title: "Welcome back!", 
          description: "You've successfully logged in." 
        });
        window.location.href = "/";
      } else {
        await authService.register(email, password);
        toast({ 
          title: "Account created!", 
          description: "You can now log in with your credentials." 
        });
        setIsLogin(true);
      }
    } catch (error: any) {
      toast({ 
        title: "Authentication failed", 
        description: error.message, 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      background: "linear-gradient(135deg, #F8F6F2 0%, #F5F2ED 50%, #EFECE6 100%)",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle gradient overlay */}
      <div style={{
        position: "absolute",
        top: "-50%",
        right: "-20%",
        width: "800px",
        height: "800px",
        background: "radial-gradient(circle, rgba(242, 140, 40, 0.03) 0%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />
      
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "16px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)",
          padding: "32px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <p style={{ ...MONO, fontSize: "12px", color: "#6B7280", letterSpacing: "0.15em", marginBottom: "12px", fontWeight: 600, textTransform: "uppercase" }}>
            BUILDCASE / AUTH
          </p>
          <h1 style={{ 
            fontFamily: "'Inter', sans-serif", 
            fontWeight: 600, 
            fontSize: "28px", 
            color: "#1A1A1A",
            marginBottom: "8px",
            lineHeight: 1.2,
          }}>
            Welcome back
          </h1>
          <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.5 }}>
            Sign in to your workspace
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <label style={{ ...MONO, fontSize: "11px", color: "#6B7280", letterSpacing: "0.05em", fontWeight: 500, textTransform: "uppercase" }}>
                  Email Address
                </label>
                <div style={{ position: "relative" }}>
                  <Mail style={{ 
                    position: "absolute", 
                    left: "14px", 
                    top: "50%", 
                    transform: "translateY(-50%)", 
                    width: 18, 
                    height: 18, 
                    color: "#9CA3AF" 
                  }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    autoComplete="email"
                    style={{
                      ...MONO,
                      fontSize: "14px",
                      paddingLeft: "44px",
                      paddingRight: "14px",
                      padding: "13px 14px",
                      background: "rgba(249, 247, 243, 0.5)",
                      border: "1.5px solid #E5E7EB",
                      borderRadius: "10px",
                      color: "#1A1A1A",
                      outline: "none",
                      width: "100%",
                      boxSizing: "border-box",
                      transition: "all 200ms ease",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#F28C28";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(242, 140, 40, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#E5E7EB";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ ...MONO, fontSize: "11px", color: "#6B7280", letterSpacing: "0.05em", fontWeight: 500, textTransform: "uppercase" }}>
              {isLogin ? "Password" : "Email Address"}
            </label>
            <div style={{ position: "relative" }}>
              {isLogin ? (
                <Lock style={{ 
                  position: "absolute", 
                  left: "14px", 
                  top: "50%", 
                  transform: "translateY(-50%)", 
                  width: 18, 
                  height: 18, 
                  color: "#9CA3AF" 
                }} />
              ) : (
                <Mail style={{ 
                  position: "absolute", 
                  left: "14px", 
                  top: "50%", 
                  transform: "translateY(-50%)", 
                  width: 18, 
                  height: 18, 
                  color: "#9CA3AF" 
                }} />
              )}
              <input
                type={isLogin ? "password" : "email"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={isLogin ? undefined : 8}
                placeholder={isLogin ? "Enter your password" : "you@example.com"}
                autoComplete={isLogin ? "current-password" : "new-password"}
                style={{
                  ...MONO,
                  fontSize: "14px",
                  paddingLeft: "44px",
                  paddingRight: "14px",
                  padding: "13px 14px",
                  background: "rgba(249, 247, 243, 0.5)",
                  border: "1.5px solid #E5E7EB",
                  borderRadius: "10px",
                  color: "#1A1A1A",
                  outline: "none",
                  width: "100%",
                  boxSizing: "border-box",
                  transition: "all 200ms ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#F28C28";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(242, 140, 40, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#E5E7EB";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
            {!isLogin && (
              <span style={{ ...MONO, fontSize: "10px", color: "#9CA3AF" }}>
                Minimum 8 characters
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !email || !password}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              background: isLoading || !email || !password ? "#D1D5DB" : "#F28C28",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "10px",
              padding: "14px 24px",
              fontSize: "14px",
              fontWeight: 500,
              cursor: isLoading || !email || !password ? "not-allowed" : "pointer",
              fontFamily: "'Inter', sans-serif",
              marginTop: "8px",
              transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: !isLoading && email && password ? "0 4px 14px rgba(242, 140, 40, 0.25)" : "none",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => {
              if (!isLoading && email && password) {
                e.currentTarget.style.background = "#E87D1E";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(242, 140, 40, 0.35)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading && email && password) {
                e.currentTarget.style.background = "#F28C28";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(242, 140, 40, 0.25)";
              }
            }}
          >
            {isLoading ? (
              <>
                <svg style={{ width: 18, height: 18, animation: "spin 1s linear infinite" }} viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Signing in...
              </>
            ) : (
              <>
                Sign in
                <ArrowRight style={{ width: 18, height: 18 }} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "16px",
          margin: "24px 0",
        }}>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #E5E7EB, transparent)" }} />
          <span style={{ fontSize: "13px", color: "#9CA3AF", fontWeight: 500 }}>or</span>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #E5E7EB, transparent)" }} />
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.6 }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              color: "#F28C28",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "none",
              padding: "4px 0",
              transition: "all 150ms ease",
              display: "inline-block",
              marginTop: "4px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = "underline";
              e.currentTarget.style.color = "#E87D1E";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = "none";
              e.currentTarget.style.color = "#F28C28";
            }}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
