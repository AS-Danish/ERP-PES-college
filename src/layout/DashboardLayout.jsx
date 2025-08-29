import React, { useEffect, useState, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { roleToMenu } from "../lib/menuConfig";
import { Menu, User, LogOut, Settings, ChevronDown } from "lucide-react";
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
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const handler = (e) => {
      setIsDesktop(e.matches);
      if (e.matches) setIsOpen(false);
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleProfileNavigation = () => {
    navigate("/profile");
    setIsProfileDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    setIsProfileDropdownOpen(false);
    handleLogout();
  };

  // Get user initials for avatar fallback
  const getUserInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getFullName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user?.name || user?.email || "User";
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* FIXED: Mobile overlay - ensuring proper z-index layering to prevent content blackout */}
      {!isDesktop && isOpen && (
        <div 
          className="fixed inset-0 bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <Sidebar
        isOpen={isOpen}
        isCollapsed={isCollapsed}
        menuItems={menuItems}
        openGroups={openGroups}
        onToggleGroup={toggleGroup}
        onToggleCollapse={handleToggleCollapse}
        onClose={handleCloseSidebar}
        onLogout={handleLogout}
        isDesktop={isDesktop}
        sidebarWidth={sidebarWidth}
      />

      {/* Main Content */}
      <div 
        className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out"
        style={{
          marginLeft: isDesktop ? sidebarWidth : 0,
        }}
      >
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {!isDesktop && (
                <button
                  onClick={() => setIsOpen((v) => !v)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              )}
              <div>
                <h1 className="text-xl font-semibold text-gray-900">NAAC College ERP</h1>
                <p className="text-sm text-gray-500">National Assessment and Accreditation Council</p>
              </div>
            </div>
            
            {user && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={handleProfileClick}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {/* Profile Picture */}
                  <div className="flex-shrink-0">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={getFullName()}
                        className="h-8 w-8 rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-white">
                          {getUserInitials(getFullName())}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* User Info */}
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {getFullName()}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user.role}
                    </p>
                  </div>
                  
                  {/* Dropdown Arrow */}
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                    isProfileDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* FIXED: Profile dropdown z-index (z-50) - above sidebar to prevent conflicts */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {getFullName()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user.email}
                        </p>
                      </div>
                      
                      <button
                        onClick={handleProfileNavigation}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                      >
                        <User className="h-4 w-4 mr-3 text-gray-400" />
                        Profile Settings
                      </button>
                      
                      <button
                        onClick={() => {
                          navigate('/settings');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                      >
                        <Settings className="h-4 w-4 mr-3 text-gray-400" />
                        Account Settings
                      </button>
                      
                      <div className="border-t border-gray-100">
                        <button
                          onClick={handleLogoutClick}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}