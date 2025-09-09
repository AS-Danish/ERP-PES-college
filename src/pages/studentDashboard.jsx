import React, { useState } from "react";
import { 
  BookOpen,
  GraduationCap,
  Calendar,
  FileText,
  Award,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Bell,
  Download,
  MessageSquare,
  Target,
  BarChart3,
  CreditCard,
  MapPin
} from "lucide-react";

export default function StudentDashboard() {
  // Mock student data - replace with actual auth context
  const student = {
    name: "Priya Sharma",
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@student.college.edu",
    rollNumber: "20CS001",
    program: "B.Tech Computer Science",
    semester: "6th",
    year: "3rd Year",
    profilePicture: null,
    department: "Computer Science & Engineering"
  };

  // Mock academic data
  const academicStats = {
    currentCGPA: 8.75,
    creditsEarned: 142,
    totalCredits: 180,
    attendancePercentage: 87,
    assignmentsPending: 3,
    completedCourses: 28
  };

  const currentSemesterCourses = [
    { 
      id: 1, 
      code: "CS601", 
      name: "Software Engineering", 
      credits: 4, 
      instructor: "Dr. Rajesh Kumar",
      attendance: 92,
      grade: "A",
      status: "ongoing"
    },
    { 
      id: 2, 
      code: "CS602", 
      name: "Database Management Systems", 
      credits: 4, 
      instructor: "Prof. Sunita Patel",
      attendance: 85,
      grade: "A-",
      status: "ongoing"
    },
    { 
      id: 3, 
      code: "CS603", 
      name: "Computer Networks", 
      credits: 3, 
      instructor: "Dr. Amit Singh",
      attendance: 90,
      grade: "B+",
      status: "ongoing"
    },
    { 
      id: 4, 
      code: "CS604", 
      name: "Machine Learning", 
      credits: 4, 
      instructor: "Dr. Kavita Jain",
      attendance: 82,
      grade: "A",
      status: "ongoing"
    }
  ];

  const upcomingEvents = [
    { id: 1, title: "Database Systems Mid-term Exam", date: "Dec 18, 2024", time: "10:00 AM", type: "exam" },
    { id: 2, title: "Software Engineering Project Submission", date: "Dec 20, 2024", time: "11:59 PM", type: "assignment" },
    { id: 3, title: "Machine Learning Lab Quiz", date: "Dec 22, 2024", time: "2:00 PM", type: "quiz" },
    { id: 4, title: "Winter Vacation Begins", date: "Dec 25, 2024", time: "All Day", type: "event" }
  ];

  const recentActivities = [
    { id: 1, action: "Assignment submitted for Software Engineering", time: "2 hours ago", type: "success" },
    { id: 2, action: "Attendance marked for Database Systems", time: "1 day ago", type: "info" },
    { id: 3, action: "Grade updated for Computer Networks Quiz", time: "2 days ago", type: "success" },
    { id: 4, action: "New assignment posted for Machine Learning", time: "3 days ago", type: "warning" }
  ];

  const achievements = [
    { id: 1, title: "Dean's List", description: "Academic Excellence in Semester 5", date: "Nov 2024", icon: "award" },
    { id: 2, title: "Best Project Award", description: "Web Development Competition", date: "Oct 2024", icon: "trophy" },
    { id: 3, title: "Perfect Attendance", description: "Software Engineering Course", date: "Sep 2024", icon: "check" }
  ];

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'exam': return 'text-red-600 bg-red-100 border-red-200';
      case 'assignment': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'quiz': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'event': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
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

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome back, {student.firstName}!</h2>
            <p className="text-gray-600 mt-2">{student.program} • {student.semester} Semester • Roll No: {student.rollNumber}</p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Current CGPA</p>
              <p className="text-2xl font-bold text-blue-600">{academicStats.currentCGPA}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Current CGPA</p>
              <p className="text-2xl font-bold text-gray-900">{academicStats.currentCGPA}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Target className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Attendance</p>
              <p className="text-2xl font-bold text-gray-900">{academicStats.attendancePercentage}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Credits Earned</p>
              <p className="text-2xl font-bold text-gray-900">{academicStats.creditsEarned}/{academicStats.totalCredits}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{academicStats.assignmentsPending}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Courses & Academic Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Academic Progress */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Academic Progress</h3>
                <p className="text-blue-100 mt-2">Semester 6 • {student.year} • {academicStats.completedCourses} Courses Completed</p>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm text-blue-100 mb-2">
                    <span>Credits Progress</span>
                    <span>{academicStats.creditsEarned}/{academicStats.totalCredits}</span>
                  </div>
                  <div className="w-full bg-blue-400 bg-opacity-30 rounded-full h-2">
                    <div 
                      className="bg-white rounded-full h-2 transition-all duration-500"
                      style={{ width: `${(academicStats.creditsEarned / academicStats.totalCredits) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <GraduationCap className="h-16 w-16 text-white opacity-80" />
            </div>
          </div>

          {/* Current Semester Courses */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Semester Courses</h3>
            <div className="space-y-4">
              {currentSemesterCourses.map((course) => (
                <div key={course.id} className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors duration-150">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{course.name}</h4>
                          <p className="text-xs text-gray-500 mt-1">{course.code} • {course.instructor} • {course.credits} Credits</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-semibold text-gray-900">{course.grade}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-xs">
                            <span className="text-gray-500">Attendance: </span>
                            <span className={`font-medium ${getAttendanceColor(course.attendance)}`}>
                              {course.attendance}%
                            </span>
                          </div>
                        </div>
                        <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors duration-150">
                <Calendar className="h-8 w-8 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Timetable</span>
              </button>
              
              <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors duration-150">
                <FileText className="h-8 w-8 text-green-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Assignments</span>
              </button>
              
              <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors duration-150">
                <Download className="h-8 w-8 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Downloads</span>
              </button>
              
              <button className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 transition-colors duration-150">
                <CreditCard className="h-8 w-8 text-yellow-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Fee Status</span>
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

        {/* Right Column - Events & Achievements */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className={`p-3 rounded-lg border ${getEventTypeColor(event.type)} transition-colors duration-150`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{event.date} • {event.time}</p>
                    </div>
                    <span className="text-xs font-medium capitalize px-2 py-1 rounded-full bg-opacity-20">
                      {event.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full text-sm text-blue-600 hover:text-blue-800 font-medium">
              View academic calendar →
            </button>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-start space-x-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                  <div className="flex-shrink-0 mt-0.5">
                    <Award className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all achievements →
            </button>
          </div>

          {/* Attendance Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Summary</h3>
            <div className="space-y-4">
              {currentSemesterCourses.slice(0, 3).map((course) => (
                <div key={course.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{course.code}</p>
                    <p className="text-xs text-gray-500">{course.name}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-semibold ${getAttendanceColor(course.attendance)}`}>
                      {course.attendance}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Overall Average</span>
                <span className={`text-sm font-bold ${getAttendanceColor(academicStats.attendancePercentage)}`}>
                  {academicStats.attendancePercentage}%
                </span>
              </div>
            </div>
          </div>

          {/* Support & Resources */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Support & Resources</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                <MessageSquare className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-sm font-medium text-gray-700">Contact Faculty</span>
              </button>
              
              <button className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                <Bell className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-sm font-medium text-gray-700">Academic Advisor</span>
              </button>
              
              <button className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                <MapPin className="h-5 w-5 text-purple-600 mr-3" />
                <span className="text-sm font-medium text-gray-700">Campus Resources</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Notifications */}
      <div className="mt-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Notifications</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-900">Semester 6 Registration Open</p>
              <p className="text-xs text-gray-600 mt-1">Course registration for next semester is now open. Deadline: December 30, 2024</p>
              <p className="text-xs text-gray-500 mt-1">Posted 2 days ago</p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-900">Scholarship Application Available</p>
              <p className="text-xs text-gray-600 mt-1">Merit-based scholarship applications are now available for eligible students.</p>
              <p className="text-xs text-gray-500 mt-1">Posted 1 week ago</p>
            </div>
            
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-900">Library Timing Update</p>
              <p className="text-xs text-gray-600 mt-1">Library will have extended hours during the examination period starting December 20.</p>
              <p className="text-xs text-gray-500 mt-1">Posted 1 week ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
