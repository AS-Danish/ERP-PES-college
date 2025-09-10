export const roleToMenu = {
  admin: [
    { label: "Admin Dashboard", path: "/admin/dashboard", icon: "LayoutDashboard" },
    { label: "Student Management", path: "/admin/students/manage", icon: "LayoutDashboard" },
    { label: "Faculty Management", path: "/admin/faculty/manage", icon: "LayoutDashboard" },
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
    {
      label: "Academics",
      icon: "BookOpen",
      children: [
        { label: "Courses", path: "/student/courses", icon: "BookOpen" },
        { label: "Timetable", path: "/student/timetable", icon: "Calendar" },
        { label: "Grades & Results", path: "/student/grades", icon: "BarChart3" },
        { label: "Attendance", path: "/student/attendance", icon: "UserCheck" },
      ],
    },
    {
      label: "Assignments",
      icon: "FileText",
      children: [
        { label: "Active Assignments", path: "/student/assignments/active", icon: "Clock" },
        { label: "Submissions", path: "/student/assignments/submissions", icon: "Upload" },
        { label: "Feedback", path: "/student/assignments/feedback", icon: "MessageSquare" },
      ],
    },
    {
      label: "Examinations",
      icon: "ClipboardCheck",
      children: [
        { label: "Exam Schedule", path: "/student/exams/schedule", icon: "Calendar" },
        { label: "Admit Cards", path: "/student/exams/admit-cards", icon: "CreditCard" },
        { label: "Results", path: "/student/exams/results", icon: "Award" },
      ],
    },
    {
      label: "Resources",
      icon: "Download",
      children: [
        { label: "Study Materials", path: "/student/resources/materials", icon: "FileText" },
        { label: "Library", path: "/student/resources/library", icon: "Building" },
        { label: "Downloads", path: "/student/resources/downloads", icon: "Download" },
      ],
    },
    {
      label: "Finance",
      icon: "CreditCard",
      children: [
        { label: "Fee Status", path: "/student/finance/fees", icon: "CreditCard" },
        { label: "Payment History", path: "/student/finance/payments", icon: "History" },
        { label: "Scholarships", path: "/student/finance/scholarships", icon: "Award" },
      ],
    },
    {
      label: "Support",
      icon: "MessageSquare",
      children: [
        { label: "Help Desk", path: "/student/support/helpdesk", icon: "HelpCircle" },
        { label: "Contact Faculty", path: "/student/support/faculty", icon: "Users" },
        { label: "Feedback", path: "/student/support/feedback", icon: "MessageSquare" },
      ],
    },
  ],
  faculty: [
    { label: "Dashboard", path: "/faculty/dashboard", icon: "LayoutDashboard" },
  ],
  hod: [
    { label: "Dashboard", path: "/hod/dashboard", icon: "LayoutDashboard" },
  ],
};