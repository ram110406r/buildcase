import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Search } from "lucide-react";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full" style={{ background: "#F3EFE6" }}>
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header — 64px instrument console */}
          <header
            className="flex items-center justify-between px-6 sticky top-0 z-10"
            style={{
              height: "64px",
              background: "#F3EFE6",
              borderBottom: "1px solid #D6D2C8",
            }}
          >
            {/* Left — trigger + terminal search */}
            <div className="flex items-center gap-4">
              <SidebarTrigger
                className="text-muted-foreground hover:text-foreground"
                style={{ color: "#7A7F85" }}
              />
              <div
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 min-w-[260px]"
                style={{
                  background: "#EDE9E0",
                  border: "1px solid #D6D2C8",
                  borderRadius: "2px",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "12px",
                  color: "#7A7F85",
                }}
              >
                <span style={{ color: "#E36A2C", fontSize: "11px" }}>&gt;_</span>
                <Search className="h-3 w-3" />
                <span>Search project...</span>
                <kbd
                  className="ml-auto"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "10px",
                    background: "#D6D2C8",
                    padding: "1px 5px",
                    borderRadius: "2px",
                    color: "#7A7F85",
                  }}
                >
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Right — status indicator */}
            <div
              className="flex items-center gap-2"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "11px",
                color: "#7A7F85",
                letterSpacing: "0.05em",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#E36A2C",
                  display: "inline-block",
                  boxShadow: "0 0 0 2px #E36A2C33",
                }}
              />
              <span>STATUS · READY</span>
            </div>
          </header>

          <main className="flex-1 p-8 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
