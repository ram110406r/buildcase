import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, User, ArrowRight } from "lucide-react";
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
        // Redirect to dashboard would happen here via router
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
      background: "linear-gradient(135deg, #F7F4EC 0%, #EDE9E0 100%)",
      padding: "20px",
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "#FFFFFF",
          border: "1px solid #D6D2C8",
          borderRadius: "6px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}
        <div style={{ 
          padding: "32px 40px", 
          borderBottom: "1px solid #E8E4DC",
          background: "linear-gradient(135deg, #EDE9E0 0%, #F7F4EC 100%)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Decorative element */}
          <div style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: "80px",
            height: "80px",
            background: "linear-gradient(135deg, transparent 50%, rgba(227, 106, 44, 0.05) 50%)",
            borderRadius: "0 0 0 100%",
          }} />
          
          <p style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.12em", marginBottom: "10px", fontWeight: 600 }}>
            BUILDCASE / AUTH
          </p>
          <h1 style={{ 
            fontFamily: "'Inter', sans-serif", 
            fontWeight: 700, 
            fontSize: "26px", 
            color: "#23262B",
            marginBottom: "8px",
          }}>
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p style={{ fontSize: "13px", color: "#7A7F85", lineHeight: 1.5 }}>
            {isLogin ? "Sign in to continue to your workspace" : "Get started with your Buildcase workspace"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <label style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.08em" }}>
                  EMAIL ADDRESS
                </label>
                <div style={{ position: "relative" }}>
                  <Mail style={{ 
                    position: "absolute", 
                    left: "12px", 
                    top: "50%", 
                    transform: "translateY(-50%)", 
                    width: 16, 
                    height: 16, 
                    color: "#7A7F85" 
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
                      fontSize: "13px",
                      paddingLeft: "40px",
                      paddingRight: "12px",
                      padding: "10px 12px",
                      background: "#F9F6EF",
                      border: "1px solid #D6D2C8",
                      borderRadius: "4px",
                      color: "#23262B",
                      outline: "none",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </motion.div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ ...MONO, fontSize: "10px", color: "#7A7F85", letterSpacing: "0.08em" }}>
                {isLogin ? "PASSWORD" : "EMAIL ADDRESS"}
              </label>
              <div style={{ position: "relative" }}>
                {isLogin ? (
                  <Lock style={{ 
                    position: "absolute", 
                    left: "12px", 
                    top: "50%", 
                    transform: "translateY(-50%)", 
                    width: 16, 
                    height: 16, 
                    color: "#7A7F85" 
                  }} />
                ) : (
                  <Mail style={{ 
                    position: "absolute", 
                    left: "12px", 
                    top: "50%", 
                    transform: "translateY(-50%)", 
                    width: 16, 
                    height: 16, 
                    color: "#7A7F85" 
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
                    fontSize: "13px",
                    paddingLeft: "40px",
                    paddingRight: "12px",
                    padding: "10px 12px",
                    background: "#F9F6EF",
                    border: "1px solid #D6D2C8",
                    borderRadius: "4px",
                    color: "#23262B",
                    outline: "none",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              {!isLogin && (
                <span style={{ ...MONO, fontSize: "9px", color: "#7A7F85" }}>
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
                background: isLoading || !email || !password ? "#B0A590" : "#23262B",
                color: "#F3EFE6",
                border: "none",
                borderRadius: "4px",
                padding: "12px 24px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: isLoading || !email || !password ? "not-allowed" : "pointer",
                fontFamily: "'Inter', sans-serif",
                marginTop: "12px",
                transition: "all 200ms ease",
                boxShadow: !isLoading && email && password ? "0 2px 8px rgba(35, 38, 43, 0.15)" : "none",
              }}
              onMouseEnter={(e) => {
                if (!isLoading && email && password) {
                  e.currentTarget.style.background = "#1a1d21";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(35, 38, 43, 0.2)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading && email && password) {
                  e.currentTarget.style.background = "#23262B";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(35, 38, 43, 0.15)";
                }
              }}
            >
              {isLoading ? (
                <>
                  <svg style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight style={{ width: 16, height: 16 }} />
                </>
              )}
            </button>
          </div>

          {/* Toggle */}
          <div style={{ 
            marginTop: "32px", 
            paddingTop: "32px", 
            borderTop: "1px solid #E8E4DC",
            textAlign: "center",
          }}>
            <p style={{ fontSize: "13px", color: "#7A7F85", lineHeight: 1.6 }}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <br />
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                style={{
                  ...MONO,
                  fontSize: "11px",
                  color: "#E36A2C",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                  textDecoration: "none",
                  borderBottom: "2px solid transparent",
                  transition: "border-color 150ms",
                  marginTop: "4px",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "#E36A2C"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "transparent"}
              >
                {isLogin ? "Sign up →" : "Sign in →"}
              </button>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
