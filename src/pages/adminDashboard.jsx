import React, { useState } from "react";
import { 
  Users,
  BookOpen,
  GraduationCap,
  FileText,
  BarChart3,
  Award,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  UserCheck
} from "lucide-react";

export default function AdminDashboard() {
  // Mock user data - replace with actual auth context
  const user = {
    name: "Dr. Rajesh Kumar",
    firstName: "Dr. Rajesh",
    lastName: "Kumar",
    email: "admin@college.edu",
    role: "admin",
    profilePicture: null,
    department: "Administration"
  };

  // Mock dashboard data
  const dashboardStats = {
    totalStudents: 2450,
    totalFaculty: 120,
    totalCourses: 45,
    naacGrade: "A++",
    accreditationStatus: "Accredited",
    lastAssessment: "2023"
  };

  const recentActivities = [
    { id: 1, action: "New student enrollment completed", time: "2 hours ago", type: "success" },
    { id: 2, action: "Faculty appraisal reports submitted", time: "4 hours ago", type: "info" },
    { id: 3, action: "NAAC documentation updated", time: "1 day ago", type: "warning" },
    { id: 4, action: "Academic calendar published", time: "2 days ago", type: "success" }
  ];

  const upcomingTasks = [
    { id: 1, task: "Submit quarterly NAAC report", dueDate: "Dec 15, 2024", priority: "high" },
    { id: 2, task: "Faculty performance review", dueDate: "Dec 20, 2024", priority: "medium" },
    { id: 3, task: "Update curriculum mapping", dueDate: "Jan 5, 2025", priority: "low" }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <Clock className="h-4 w-4 text-blue-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Welcome back, {user.firstName}!</h2>
        <p className="text-gray-600 mt-2">Here's what's happening at your institution today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalStudents.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Faculty Members</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalFaculty}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Courses</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalCourses}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">NAAC Grade</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.naacGrade}</p>
              <p className="text-xs text-green-600 mt-1">{dashboardStats.accreditationStatus}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Quick Actions & NAAC Status */}
        <div className="lg:col-span-2 space-y-6">
          {/* NAAC Accreditation Status */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">NAAC Accreditation Status</h3>
                <p className="text-blue-100 mt-2">Current Grade: {dashboardStats.naacGrade} | Last Assessment: {dashboardStats.lastAssessment}</p>
                <div className="mt-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
                      <span className="text-sm font-medium">Criteria 1: 3.8/4.0</span>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
                      <span className="text-sm font-medium">Criteria 2: 3.9/4.0</span>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1">
                      <span className="text-sm font-medium">Overall: 3.85/4.0</span>
                    </div>
                  </div>
                </div>
              </div>
              <Award className="h-16 w-16 text-white opacity-80" />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors duration-150">
                <Users className="h-8 w-8 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Manage Users</span>
              </button>
              
              <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors duration-150">
                <FileText className="h-8 w-8 text-green-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">NAAC Reports</span>
              </button>
              
              <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors duration-150">
                <GraduationCap className="h-8 w-8 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Academic Plans</span>
              </button>
              
              <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 transition-colors duration-150">
                <BarChart3 className="h-8 w-8 text-yellow-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Analytics</span>
              </button>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex-shrink-0 mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all activities →
            </button>
          </div>
        </div>

        {/* Right Column - Upcoming Tasks & Calendar */}
        <div className="space-y-6">
          {/* Upcoming Tasks */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Tasks</h3>
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors duration-150">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{task.task}</p>
                      <p className="text-xs text-gray-500 mt-1">Due: {task.dueDate}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all tasks →
            </button>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Online</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Services</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">Running</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Backup Status</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-yellow-600">Scheduled</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Update</span>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">New Admissions</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-semibold text-gray-900">127</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Faculty Recruited</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-semibold text-gray-900">8</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Research Publications</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-semibold text-gray-900">23</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Infrastructure Projects</span>
                <span className="text-sm font-semibold text-gray-900">3 Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Announcements */}
      <div className="mt-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Announcements</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-900">NAAC Peer Team Visit Scheduled</p>
              <p className="text-xs text-gray-600 mt-1">The next NAAC assessment visit is scheduled for March 2025. All departments should prepare documentation.</p>
              <p className="text-xs text-gray-500 mt-1">Posted 3 days ago</p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-900">New Academic Session Guidelines</p>
              <p className="text-xs text-gray-600 mt-1">Updated guidelines for the 2024-25 academic session have been published in the faculty portal.</p>
              <p className="text-xs text-gray-500 mt-1">Posted 1 week ago</p>
            </div>
            
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-900">Infrastructure Development Update</p>
              <p className="text-xs text-gray-600 mt-1">The new library wing construction is 75% complete and expected to be ready by January 2025.</p>
              <p className="text-xs text-gray-500 mt-1">Posted 1 week ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}