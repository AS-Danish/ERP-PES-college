import React, { useState, useEffect } from "react";
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Clock, 
  MapPin, 
  UserCheck, 
  FileText, 
  BarChart3,
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MoreVertical,
  TrendingUp,
  TrendingDown
} from "lucide-react";

export default function FacultyCurrentClasses() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [showDetails, setShowDetails] = useState(false);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockClasses = [
      {
        id: 1,
        subject: "Data Structures & Algorithms",
        code: "CS301",
        semester: "5th Semester",
        section: "A",
        department: "Computer Science",
        totalStudents: 45,
        presentStudents: 42,
        room: "Lab-101",
        schedule: {
          days: ["Monday", "Wednesday", "Friday"],
          time: "9:00 AM - 10:30 AM"
        },
        nextClass: "2024-09-12T09:00:00",
        attendancePercentage: 89.5,
        assignments: {
          active: 2,
          pending: 8,
          graded: 15
        },
        performance: {
          average: 78.5,
          trend: "up"
        },
        status: "active"
      },
      {
        id: 2,
        subject: "Database Management Systems",
        code: "CS302",
        semester: "5th Semester",
        section: "B",
        department: "Computer Science",
        totalStudents: 38,
        presentStudents: 35,
        room: "Room-203",
        schedule: {
          days: ["Tuesday", "Thursday"],
          time: "11:00 AM - 12:30 PM"
        },
        nextClass: "2024-09-12T11:00:00",
        attendancePercentage: 92.1,
        assignments: {
          active: 1,
          pending: 5,
          graded: 12
        },
        performance: {
          average: 82.3,
          trend: "up"
        },
        status: "active"
      },
      {
        id: 3,
        subject: "Web Development",
        code: "CS303",
        semester: "6th Semester",
        section: "A",
        department: "Computer Science",
        totalStudents: 42,
        presentStudents: 39,
        room: "Lab-102",
        schedule: {
          days: ["Monday", "Wednesday"],
          time: "2:00 PM - 3:30 PM"
        },
        nextClass: "2024-09-12T14:00:00",
        attendancePercentage: 85.7,
        assignments: {
          active: 3,
          pending: 12,
          graded: 8
        },
        performance: {
          average: 75.8,
          trend: "down"
        },
        status: "active"
      }
    ];
    setClasses(mockClasses);
  }, []);

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === "all") return matchesSearch;
    if (filterBy === "low-attendance") return matchesSearch && cls.attendancePercentage < 85;
    if (filterBy === "pending-assignments") return matchesSearch && cls.assignments.pending > 10;
    return matchesSearch;
  });

  const getNextClassTime = (nextClass) => {
    const date = new Date(nextClass);
    const now = new Date();
    const diffHours = Math.ceil((date - now) / (1000 * 60 * 60));
    
    if (diffHours < 0) return "Class ended";
    if (diffHours < 1) return "Starting soon";
    if (diffHours < 24) return `In ${diffHours} hours`;
    return date.toLocaleDateString();
  };

  const ClassCard = ({ classData }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{classData.subject}</h3>
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                {classData.code}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {classData.semester}
              </span>
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                Section {classData.section}
              </span>
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {classData.room}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => {
                setSelectedClass(classData);
                setShowDetails(true);
              }}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Users className="w-4 h-4 text-gray-500" />
            </div>
            <p className="text-lg font-semibold text-gray-900">{classData.totalStudents}</p>
            <p className="text-xs text-gray-500">Students</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <UserCheck className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-lg font-semibold text-green-700">{classData.attendancePercentage}%</p>
            <p className="text-xs text-gray-500">Attendance</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <FileText className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-lg font-semibold text-blue-700">{classData.assignments.active}</p>
            <p className="text-xs text-gray-500">Active</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <BarChart3 className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-lg font-semibold text-purple-700">{classData.performance.average}%</p>
            <p className="text-xs text-gray-500">Average</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm">
            <span className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              {classData.schedule.time}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">{classData.schedule.days.join(", ")}</span>
          </div>
          <div className="flex items-center">
            {classData.performance.trend === "up" ? 
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" /> :
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            }
            <span className={`text-sm ${classData.performance.trend === "up" ? "text-green-600" : "text-red-600"}`}>
              Performance {classData.performance.trend === "up" ? "improving" : "declining"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            Next class: <span className="font-medium">{getNextClassTime(classData.nextClass)}</span>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors">
              Mark Attendance
            </button>
            <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors">
              Assignments
            </button>
            <button className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors">
              Materials
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ClassDetailsModal = () => {
    if (!selectedClass || !showDetails) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{selectedClass.subject}</h2>
                <p className="text-gray-600">{selectedClass.code} - {selectedClass.semester}</p>
              </div>
              <button 
                onClick={() => setShowDetails(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Students</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Total Enrolled:</span>
                    <span className="font-medium">{selectedClass.totalStudents}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Present:</span>
                    <span className="font-medium">{selectedClass.presentStudents}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Attendance Rate:</span>
                    <span className="font-medium text-green-600">{selectedClass.attendancePercentage}%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Assignments</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Active:</span>
                    <span className="font-medium text-blue-600">{selectedClass.assignments.active}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Review:</span>
                    <span className="font-medium text-orange-600">{selectedClass.assignments.pending}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed:</span>
                    <span className="font-medium text-green-600">{selectedClass.assignments.graded}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Performance</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Class Average:</span>
                    <span className="font-medium">{selectedClass.performance.average}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trend:</span>
                    <span className={`font-medium ${selectedClass.performance.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedClass.performance.trend === 'up' ? 'Improving' : 'Declining'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Updated:</span>
                    <span className="font-medium">Today</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border-t pt-6">
              <h4 className="font-medium text-gray-900 mb-4">Quick Actions</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button className="flex items-center justify-center space-x-2 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                  <UserCheck className="w-4 h-4" />
                  <span className="text-sm font-medium">Attendance</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Assignment</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-medium">Materials</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">Reports</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Current Classes</h1>
          <p className="text-gray-600 mt-1">Manage and monitor your active classes</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Class</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Classes</option>
                <option value="low-attendance">Low Attendance</option>
                <option value="pending-assignments">Pending Assignments</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClasses.map(classData => (
          <ClassCard key={classData.id} classData={classData} />
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No classes found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      <ClassDetailsModal />
    </div>
  );
}