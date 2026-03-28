import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Research from "./pages/Research";
import Analysis from "./pages/Analysis";
import Specs from "./pages/Specs";
import BuildTasks from "./pages/BuildTasks";
import BugReports from "./pages/BugReports";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { auth } from "./lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const queryClient = new QueryClient();

// Authentication wrapper for all routes
function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth);
  
  // Show loading screen while checking auth status
  if (loading) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        background: "linear-gradient(135deg, #F8F6F2 0%, #F5F2ED 100%)",
      }}>
        <div style={{ textAlign: "center" }}>
          <svg 
            style={{ 
              width: 40, 
              height: 40, 
              animation: "spin 1s linear infinite",
              color: "#F28C28",
              marginBottom: "16px"
            }} 
            viewBox="0 0 24 24" 
            fill="none"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <p style={{ 
            fontFamily: "'IBM Plex Mono', monospace", 
            color: "#7A7F85",
            fontSize: "13px",
            letterSpacing: "0.05em"
          }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }
  
  // If not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  // User is authenticated, show the protected content
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public route - Login/Register */}
          <Route path="/auth" element={<Auth />} />
          
          {/* All other routes are protected */}
          <Route element={
            <AuthWrapper>
              <AppLayout />
            </AuthWrapper>
          }>
            <Route path="/" element={<Dashboard />} />
            <Route path="/research" element={<Research />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/specs" element={<Specs />} />
            <Route path="/tasks" element={<BuildTasks />} />
            <Route path="/bugs" element={<BugReports />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
