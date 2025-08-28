import React from "react";
import { NavLink } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  Users,
  UserCog,
  Building2,
  GraduationCap,
  ClipboardCheck,
  FileText,
  ListChecks,
  BookOpen,
  FlaskConical,
  Building,
  UsersRound,
  ShieldCheck,
  Trophy,
  BarChart2,
  ChartSpline,
  Download,
} from "lucide-react";

const iconMap = {
  LayoutDashboard,
  Users,
  UserCog,
  Building2,
  GraduationCap,
  ClipboardCheck,
  FileText,
  ListChecks,
  BookOpen,
  FlaskConical,
  Building,
  UsersRound,
  ShieldCheck,
  Trophy,
  BarChart2,
  ChartSpline,
  Download,
};

const Sidebar = ({
  isOpen,
  isCollapsed,
  isDesktop,
  sidebarWidth,
  menuItems,
  openGroups,
  onToggleCollapse,
  onClose,
  onToggleGroup,
  onLogout,
}) => {
  const toggleGroup = (label) => {
    if (isCollapsed) {
      onToggleCollapse();
    } else {
      onToggleGroup(label);
    }
  };

  const renderMenuItem = (item) => {
    const Icon = iconMap[item.icon] || LayoutDashboard;
    
    if (item.children && item.children.length > 0) {
      const open = !!openGroups[item.label];
      return (
        <div key={item.label} className="select-none">
          <button
            className={`w-full ${
              isCollapsed ? "px-0 justify-center" : "px-3 justify-between"
            } flex items-center gap-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-100 transition-colors group relative`}
            onClick={() => toggleGroup(item.label)}
            title={isCollapsed ? item.label : undefined}
          >
            <span className="flex items-center gap-3">
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </span>
            {!isCollapsed && (
              open ? <ChevronUp className="w-4 h-4 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 flex-shrink-0" />
            )}
            {/* FIXED: Tooltip z-index (z-50) - highest layer to show above sidebar and overlay */}
            {isCollapsed && (
              <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                {item.label}
              </span>
            )}
          </button>
          {!isCollapsed && open && (
            <div className="mt-1 ml-8 space-y-1">
              {item.children.map((child) => {
                const ChildIcon = iconMap[child.icon] || LayoutDashboard;
                return (
                  <NavLink
                    key={child.path}
                    to={child.path}
                    className={({ isActive }) =>
                      `group flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive ? "text-blue-700 bg-blue-50 border-l-2 border-blue-600" : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                    onClick={onClose}
                  >
                    <ChildIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{child.label}</span>
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return (
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) =>
          `group relative flex items-center ${
            isCollapsed ? "justify-center px-0" : "px-3"
          } py-2.5 rounded-xl text-sm transition-all duration-150 select-none ${
            isActive ? "text-blue-700 bg-blue-50" : "text-gray-700 hover:bg-gray-100"
          }`
        }
        onClick={onClose}
        title={isCollapsed ? item.label : undefined}
      >
        {({ isActive }) => (
          <>
            {/* Active indicator */}
            {isActive && !isCollapsed && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r bg-blue-600" />
            )}
            {isActive && isCollapsed && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r bg-blue-600" />
            )}
            <Icon className={`w-5 h-5 flex-shrink-0 ${isCollapsed ? "" : "mr-3"} transition-transform`} />
            {!isCollapsed && <span className="truncate">{item.label}</span>}
            {/* FIXED: Navigation item tooltip - proper z-index layering */}
            {isCollapsed && (
              <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                {item.label}
              </span>
            )}
          </>
        )}
      </NavLink>
    );
  };

  return (
    <>
      {/* FIXED: Sidebar with proper z-index (z-40) - higher than overlay (z-30) to ensure sidebar stays on top */}
      <aside
        className={`fixed z-40 inset-y-0 left-0 transform bg-white border-r border-gray-200 shadow-lg transition-all duration-300 ease-in-out flex flex-col ${
          isDesktop ? "translate-x-0" : isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: sidebarWidth }}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
              <span className="text-white text-sm font-semibold">P</span>
            </div>
            {!isCollapsed && (
              <span className="font-semibold text-gray-900 truncate">PES ERP</span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {isDesktop && (
              <button
                className="inline-flex items-center justify-center w-8 h-8 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={onToggleCollapse}
                aria-label="Toggle sidebar"
                title={isCollapsed ? "Expand" : "Collapse"}
              >
                {isCollapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronLeft className="w-4 h-4" />
                )}
              </button>
            )}
            {!isDesktop && (
              <button
                className="inline-flex items-center justify-center w-8 h-8 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={onClose}
                aria-label="Close menu"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-3">
          <nav className="space-y-1">
            {menuItems.map((item) => renderMenuItem(item))}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 flex-shrink-0">
          <button
            onClick={onLogout}
            className={`w-full ${
              isCollapsed ? "px-0 justify-center" : "px-3 justify-start"
            } inline-flex items-center gap-3 py-2.5 rounded-xl text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors group relative`}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="truncate">Logout</span>}
            {/* FIXED: Logout button tooltip - consistent z-index with other tooltips */}
            {isCollapsed && (
              <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;