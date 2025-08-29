export const roleToMenu = {
  admin: [
    { label: "Admin Dashboard", path: "/admin/dashboard", icon: "LayoutDashboard" },
    {
      label: "Admissions",
      icon: "UserPlus",
      children: [
        { label: "Admission Dashboard", path: "/admin/admissions/dashboard", icon: "BarChart3" },
        { label: "Student Records", path: "/admin/students/records", icon: "FileUser" },
      ],
    },
    {
      label: "Users & Access",
      icon: "Users",
      children: [
        { label: "Manage Users", path: "/admin/users", icon: "UserCog" },
        { label: "Departments", path: "/admin/departments", icon: "Building2" },
        { label: "Programs", path: "/admin/programs", icon: "GraduationCap" },
      ],
    },
    {
      label: "NAAC",
      icon: "ClipboardCheck",
      children: [
        { label: "SSR Overview", path: "/admin/naac/ssr", icon: "FileText" },
        { label: "Criteria 1: Curricular Aspects", path: "/admin/naac/criteria-1", icon: "ListChecks" },
        { label: "Criteria 2: Teaching-Learning", path: "/admin/naac/criteria-2", icon: "BookOpen" },
        { label: "Criteria 3: Research & Extension", path: "/admin/naac/criteria-3", icon: "FlaskConical" },
        { label: "Criteria 4: Infrastructure", path: "/admin/naac/criteria-4", icon: "Building" },
        { label: "Criteria 5: Student Support", path: "/admin/naac/criteria-5", icon: "UsersRound" },
        { label: "Criteria 6: Governance", path: "/admin/naac/criteria-6", icon: "ShieldCheck" },
        { label: "Criteria 7: Best Practices", path: "/admin/naac/criteria-7", icon: "Trophy" },
      ],
    },
    {
      label: "Reports",
      icon: "BarChart2",
      children: [
        { label: "Analytics", path: "/admin/reports/analytics", icon: "ChartSpline" },
        { label: "Exports", path: "/admin/reports/exports", icon: "Download" },
      ],
    },
  ],
  student: [
    { label: "Dashboard", path: "/student/dashboard", icon: "LayoutDashboard" },
  ],
  faculty: [
    { label: "Dashboard", path: "/faculty/dashboard", icon: "LayoutDashboard" },
  ],
  hod: [
    { label: "Dashboard", path: "/hod/dashboard", icon: "LayoutDashboard" },
  ],
};