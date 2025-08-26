import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { roleToMenu } from "../lib/menuConfig";
import { Menu as MenuIcon } from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 768px)").matches
      : true
  );
  const [openGroups, setOpenGroups] = useState({});

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const handler = (e) => {
      setIsDesktop(e.matches);
      if (e.matches) setIsOpen(false);
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const menuItems = roleToMenu[user?.role] || [];
  const sidebarWidth = isCollapsed ? 72 : 264;

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const toggleGroup = (label) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleToggleCollapse = () => {
    setIsCollapsed((v) => !v);
  };

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Overlay for mobile */}
      {!isDesktop && isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-[1px] z-30" 
          onClick={handleCloseSidebar} 
        />
      )}

      {/* Sidebar Component */}
      <Sidebar
        isOpen={isOpen}
        isCollapsed={isCollapsed}
        isDesktop={isDesktop}
        sidebarWidth={sidebarWidth}
        menuItems={menuItems}
        openGroups={openGroups}
        onToggleCollapse={handleToggleCollapse}
        onClose={handleCloseSidebar}
        onToggleGroup={toggleGroup}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div 
        className="flex-1 w-full transition-[margin] duration-200 ease-in-out" 
        style={{ marginLeft: isDesktop ? sidebarWidth : 0 }}
      >
        {/* Header */}
        <header className="h-16 bg-white/95 backdrop-blur border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-20 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-3">
            {!isDesktop && (
              <button 
                className="inline-flex items-center justify-center w-8 h-8 rounded-md text-gray-600 hover:bg-gray-100" 
                onClick={() => setIsOpen((v) => !v)} 
                aria-label="Open menu"
              >
                <MenuIcon className="w-5 h-5" />
              </button>
            )}
            <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          </div>
          {user && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">{user.role?.toUpperCase()}</span>
            </div>
          )}
        </header>

        {/* Main Content Area */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}