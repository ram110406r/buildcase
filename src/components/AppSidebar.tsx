import {
  LayoutDashboard,
  Search,
  BarChart3,
  FileText,
  ListTodo,
  Bug,
  Settings,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "DASHBOARD", url: "/", icon: LayoutDashboard },
  { title: "RESEARCH", url: "/research", icon: Search },
  { title: "ANALYSIS", url: "/analysis", icon: BarChart3 },
  { title: "SPECS", url: "/specs", icon: FileText },
  { title: "TASKS", url: "/tasks", icon: ListTodo },
  { title: "BUGS", url: "/bugs", icon: Bug },
  { title: "SETTINGS", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar
      collapsible="icon"
      style={{
        background: "#F7F4EC",
        borderRight: "1px solid #D6D2C8",
      }}
    >
      <SidebarContent style={{ background: "#F7F4EC" }}>
        {/* Brand */}
        <div className="px-4 py-5 flex items-center justify-center" style={{ borderBottom: "1px solid #D6D2C8" }}>
          <img 
            src="/logo.png" 
            alt="Buildcase Logo" 
            style={{ 
              width: collapsed ? "24px" : "32px", 
              height: "auto",
              transition: "width 0.2s ease-in-out"
            }} 
          />
          {!collapsed && (
            <h1
              className="ml-2"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "15px",
                letterSpacing: "-0.01em",
                color: "#23262B",
              }}
            >
              Build<span style={{ color: "#E36A2C" }}>case</span>
            </h1>
          )}
        </div>

        <SidebarGroup style={{ paddingTop: "12px" }}>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  item.url === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end={item.url === "/"}
                        className="flex items-center gap-3 px-4 py-2.5 transition-colors"
                        style={{
                          borderLeft: isActive
                            ? "3px solid #E36A2C"
                            : "3px solid transparent",
                          background: isActive ? "#EDE9E0" : "transparent",
                          color: isActive ? "#23262B" : "#7A7F85",
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "10px",
                          fontWeight: 500,
                          letterSpacing: "0.1em",
                          textDecoration: "none",
                        }}
                      >
                        <item.icon
                          className="shrink-0"
                          style={{
                            width: "14px",
                            height: "14px",
                            color: isActive ? "#E36A2C" : "#7A7F85",
                          }}
                        />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
