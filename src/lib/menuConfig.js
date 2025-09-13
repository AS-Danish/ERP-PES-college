export const roleToMenu = {
  admin: [
    { label: "Admin Dashboard", path: "/admin/dashboard", icon: "LayoutDashboard" },
    { label: "Student Management", path: "/admin/students/manage", icon: "LayoutDashboard" },
    { label: "Faculty Management", path: "/admin/faculty/manage", icon: "LayoutDashboard" },
    { label: "Branch Management", path: "/admin/branch/manage", icon: "LayoutDashboard" },
    { label: "Course Management", path: "/admin/course/manage", icon: "LayoutDashboard" },
    { label: "Class Assign Management", path: "/admin/class/assign/manage", icon: "LayoutDashboard" },
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
    {
      label: "My Classes",
      icon: "Users",
      children: [
        { label: "Current Classes", path: "/faculty/classes/current", icon: "BookOpen" },
        { label: "Class Schedule", path: "/faculty/classes/schedule", icon: "Calendar" },
        { label: "Class Management", path: "/faculty/classes/manage", icon: "Settings" },
      ],
    },
    {
      label: "Attendance",
      icon: "UserCheck",
      children: [
        { label: "Create Session", path: "/faculty/attendance/create-session", icon: "Plus" },
        { label: "Mark Attendance", path: "/faculty/attendance/mark", icon: "CheckSquare" },
        { label: "Bulk Upload", path: "/faculty/attendance/bulk-upload", icon: "Upload" },
        { label: "Request Corrections", path: "/faculty/attendance/corrections", icon: "Edit" },
        { label: "Attendance Reports", path: "/faculty/attendance/reports", icon: "BarChart3" },
      ],
    },
    {
      label: "Assignments",
      icon: "FileText",
      children: [
        { label: "Create Assignment", path: "/faculty/assignments/create", icon: "Plus" },
        { label: "Manage Assignments", path: "/faculty/assignments/manage", icon: "List" },
        { label: "Submissions", path: "/faculty/assignments/submissions", icon: "Inbox" },
        { label: "Evaluation", path: "/faculty/assignments/evaluation", icon: "CheckCircle" },
        { label: "Study Materials", path: "/faculty/assignments/materials", icon: "BookOpen" },
      ],
    },
    {
      label: "Exams & Results",
      icon: "ClipboardCheck",
      children: [
        { label: "Internal Marks", path: "/faculty/exams/internal-marks", icon: "Edit" },
        { label: "Practical Exams", path: "/faculty/exams/practical", icon: "FlaskConical" },
        { label: "Answer Scripts", path: "/faculty/exams/answer-scripts", icon: "FileImage" },
        { label: "Final Marks", path: "/faculty/exams/final-marks", icon: "Award" },
        { label: "Results Overview", path: "/faculty/exams/results", icon: "BarChart3" },
      ],
    },
    {
      label: "Student Interaction",
      icon: "MessageSquare",
      children: [
        { label: "Student Messages", path: "/faculty/interaction/messages", icon: "Mail" },
        { label: "Attendance Alerts", path: "/faculty/interaction/attendance-alerts", icon: "AlertTriangle" },
        { label: "Performance Tracking", path: "/faculty/interaction/performance", icon: "TrendingUp" },
        { label: "Student Feedback", path: "/faculty/interaction/feedback", icon: "MessageCircle" },
      ],
    },
    {
      label: "Reports",
      icon: "BarChart2",
      children: [
        { label: "Class Performance", path: "/faculty/reports/class-performance", icon: "ChartSpline" },
        { label: "Attendance Summary", path: "/faculty/reports/attendance-summary", icon: "PieChart" },
        { label: "Assignment Reports", path: "/faculty/reports/assignments", icon: "FileBarChart" },
        { label: "Export Data", path: "/faculty/reports/export", icon: "Download" },
      ],
    },
  ],
  hod: [
    { label: "Dashboard", path: "/hod/dashboard", icon: "LayoutDashboard" },
  ],
};