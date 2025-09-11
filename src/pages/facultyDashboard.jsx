import React, { useState, useEffect } from "react";
import { 
  Users, 
  BookOpen, 
  ClipboardCheck, 
  UserCheck, 
  FileText, 
  Award, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  CheckCircle,
  Inbox,
  BarChart3,
  Plus,
  Eye
} from "lucide-react";

export default function FacultyDashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalClasses: 0,
    todayClasses: 0,
    totalStudents: 0,
    pendingAssignments: 0,
    submissionsToReview: 0,
    attendanceToMark: 0,
    lowAttendanceStudents: 0,
    upcomingExams: 0
  });

  // Simulated data - replace with actual API calls
  useEffect(() => {
    // This would be your actual API call to fetch dashboard data
    const fetchDashboardData = async () => {
      // Example API call:
      // const response = await fetch('/api/faculty/dashboard');
      // const data = await response.json();
      
      // Mock data for demonstration
      setDashboardData({
        totalClasses: 6,
        todayClasses: 3,
        totalStudents: 180,
        pendingAssignments: 4,
        submissionsToReview: 23,
        attendanceToMark: 2,
        lowAttendanceStudents: 8,
        upcomingExams: 2
      });
    };

    fetchDashboardData();
  }, []);

  const quickActions = [
    {
      title: "Mark Attendance",
      description: "Record student attendance for today's classes",
      icon: UserCheck,
      color: "bg-blue-500",
      path: "/faculty/attendance/mark"
    },
    {
      title: "Create Assignment",
      description: "Add new assignments for your classes",
      icon: Plus,
      color: "bg-green-500",
      path: "/faculty/assignments/create"
    },
    {
      title: "Review Submissions",
      description: "Evaluate pending assignment submissions",
      icon: CheckCircle,
      color: "bg-purple-500",
      path: "/faculty/assignments/submissions"
    },
    {
      title: "Upload Materials",
      description: "Share study materials with students",
      icon: FileText,
      color: "bg-orange-500",
      path: "/faculty/assignments/materials"
    }
  ];

  const upcomingClasses = [
    { subject: "Data Structures", time: "9:00 AM", room: "Lab-101", students: 45 },
    { subject: "Database Systems", time: "11:00 AM", room: "Room-203", students: 38 },
    { subject: "Web Development", time: "2:00 PM", room: "Lab-102", students: 42 }
  ];

  const recentActivity = [
    { action: "Assignment submitted", subject: "Web Development", count: 8, time: "2 hours ago" },
    { action: "Attendance marked", subject: "Data Structures", count: 45, time: "3 hours ago" },
    { action: "New assignment created", subject: "Database Systems", count: 1, time: "1 day ago" },
    { action: "Exam results uploaded", subject: "Programming", count: 40, time: "2 days ago" }
  ];

  const StatCard = ({ title, value, icon: Icon, color, subtitle, trend }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`${color} p-3 rounded-full`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-sm text-green-600">{trend}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Faculty Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your classes today.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-lg font-semibold text-gray-900">{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Classes"
          value={dashboardData.totalClasses}
          subtitle="This semester"
          icon={BookOpen}
          color="bg-blue-500"
        />
        <StatCard
          title="Today's Classes"
          value={dashboardData.todayClasses}
          subtitle="Scheduled today"
          icon={Calendar}
          color="bg-green-500"
        />
        <StatCard
          title="Total Students"
          value={dashboardData.totalStudents}
          subtitle="Across all classes"
          icon={Users}
          color="bg-purple-500"
        />
        <StatCard
          title="Pending Reviews"
          value={dashboardData.submissionsToReview}
          subtitle="Assignments to grade"
          icon={Inbox}
          color="bg-orange-500"
        />
      </div>

      {/* Action Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
            <span className="text-sm font-medium text-yellow-800">
              {dashboardData.attendanceToMark} classes need attendance
            </span>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <UserCheck className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-sm font-medium text-red-800">
              {dashboardData.lowAttendanceStudents} students low attendance
            </span>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <ClipboardCheck className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-800">
              {dashboardData.upcomingExams} exams this week
            </span>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <Award className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-green-800">
              All grades up to date
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors group"
                  onClick={() => {
                    // Handle navigation
                    console.log(`Navigate to ${action.path}`);
                  }}
                >
                  <div className="flex items-center">
                    <div className={`${action.color} p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{action.title}</h4>
                      <p className="text-sm text-gray-500">{action.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Today's Classes</h3>
                <button className="flex items-center text-sm text-blue-600 hover:text-blue-700">
                  <Eye className="w-4 h-4 mr-1" />
                  View All
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingClasses.map((cls, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{cls.subject}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {cls.time}
                          </span>
                          <span>{cls.room}</span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {cls.students} students
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors">
                      Mark Attendance
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {activity.action} - {activity.subject}
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.count} {activity.action.includes('submitted') ? 'submissions' : activity.action.includes('marked') ? 'students' : 'items'}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}