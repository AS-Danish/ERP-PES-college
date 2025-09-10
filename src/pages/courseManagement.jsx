import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download, 
  Upload, 
  ChevronDown, 
  BookOpen, 
  GraduationCap, 
  Target,
  Clock,
  Users,
  Award,
  Building,
  MoreVertical,
  Settings,
  FileText,
  Calendar,
  CheckCircle
} from 'lucide-react';

export default function CourseManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCOPOModal, setShowCOPOModal] = useState(false);
  const [selectedCourseForCOPO, setSelectedCourseForCOPO] = useState(null);

  // Sample course data
  const courses = [
    {
      id: 'CSE101',
      name: 'Data Structures and Algorithms',
      code: 'CSE101',
      department: 'Computer Science & Engineering',
      semester: '3rd Semester',
      credits: 4,
      theory: 3,
      practical: 2,
      faculty: 'Dr. Rajesh Kumar',
      students: 65,
      status: 'Active',
      syllabus: 'Updated',
      lastModified: '2024-09-01',
      courseOutcomes: [
        'Analyze the performance of algorithms',
        'Implement various data structures',
        'Design efficient algorithms for problem solving',
        'Apply appropriate data structures for specific problems'
      ],
      coPoMapping: {
        'CO1': { PO1: 3, PO2: 2, PO3: 1, PO4: 0, PO5: 1 },
        'CO2': { PO1: 2, PO2: 3, PO3: 2, PO4: 1, PO5: 0 },
        'CO3': { PO1: 3, PO2: 3, PO3: 3, PO4: 2, PO5: 1 },
        'CO4': { PO1: 2, PO2: 2, PO3: 3, PO4: 3, PO5: 2 }
      }
    },
    {
      id: 'ECE201',
      name: 'Digital Signal Processing',
      code: 'ECE201',
      department: 'Electronics & Communication',
      semester: '5th Semester',
      credits: 4,
      theory: 3,
      practical: 2,
      faculty: 'Dr. Priya Sharma',
      students: 58,
      status: 'Active',
      syllabus: 'Updated',
      lastModified: '2024-08-15',
      courseOutcomes: [
        'Understand discrete-time signals and systems',
        'Analyze digital filters',
        'Design FIR and IIR filters',
        'Implement DSP algorithms'
      ],
      coPoMapping: {
        'CO1': { PO1: 3, PO2: 2, PO3: 2, PO4: 1, PO5: 0 },
        'CO2': { PO1: 2, PO2: 3, PO3: 3, PO4: 2, PO5: 1 },
        'CO3': { PO1: 3, PO2: 3, PO3: 3, PO4: 3, PO5: 2 },
        'CO4': { PO1: 2, PO2: 2, PO3: 3, PO4: 3, PO5: 3 }
      }
    },
    {
      id: 'ME301',
      name: 'Thermodynamics',
      code: 'ME301',
      department: 'Mechanical Engineering',
      semester: '4th Semester',
      credits: 3,
      theory: 3,
      practical: 0,
      faculty: 'Prof. Amit Patel',
      students: 72,
      status: 'Active',
      syllabus: 'Review Pending',
      lastModified: '2024-07-20',
      courseOutcomes: [
        'Apply the laws of thermodynamics',
        'Analyze thermodynamic cycles',
        'Calculate properties of substances',
        'Design thermal systems'
      ],
      coPoMapping: {
        'CO1': { PO1: 3, PO2: 3, PO3: 2, PO4: 1, PO5: 1 },
        'CO2': { PO1: 2, PO2: 3, PO3: 3, PO4: 2, PO5: 1 },
        'CO3': { PO1: 3, PO2: 2, PO3: 2, PO4: 3, PO5: 2 },
        'CO4': { PO1: 2, PO2: 3, PO3: 3, PO4: 3, PO5: 3 }
      }
    },
    {
      id: 'CSE401',
      name: 'Machine Learning',
      code: 'CSE401',
      department: 'Computer Science & Engineering',
      semester: '7th Semester',
      credits: 4,
      theory: 3,
      practical: 2,
      faculty: 'Dr. Sneha Desai',
      students: 45,
      status: 'Active',
      syllabus: 'Updated',
      lastModified: '2024-09-05',
      courseOutcomes: [
        'Understand machine learning algorithms',
        'Implement supervised learning methods',
        'Apply unsupervised learning techniques',
        'Evaluate model performance'
      ],
      coPoMapping: {
        'CO1': { PO1: 3, PO2: 2, PO3: 2, PO4: 1, PO5: 1 },
        'CO2': { PO1: 3, PO2: 3, PO3: 3, PO4: 2, PO5: 2 },
        'CO3': { PO1: 2, PO2: 3, PO3: 3, PO4: 3, PO5: 2 },
        'CO4': { PO1: 3, PO2: 3, PO3: 2, PO4: 3, PO5: 3 }
      }
    },
    {
      id: 'CE501',
      name: 'Structural Analysis',
      code: 'CE501',
      department: 'Civil Engineering',
      semester: '6th Semester',
      credits: 4,
      theory: 3,
      practical: 2,
      faculty: 'Prof. Arjun Singh',
      students: 38,
      status: 'Inactive',
      syllabus: 'Outdated',
      lastModified: '2024-06-10',
      courseOutcomes: [
        'Analyze statically determinate structures',
        'Apply force and displacement methods',
        'Design structural elements',
        'Use analysis software tools'
      ],
      coPoMapping: {
        'CO1': { PO1: 3, PO2: 3, PO3: 2, PO4: 2, PO5: 1 },
        'CO2': { PO1: 2, PO2: 3, PO3: 3, PO4: 3, PO5: 2 },
        'CO3': { PO1: 3, PO2: 2, PO3: 3, PO4: 3, PO5: 3 },
        'CO4': { PO1: 2, PO2: 2, PO3: 2, PO4: 3, PO5: 3 }
      }
    }
  ];

  const departments = ['All', 'Computer Science & Engineering', 'Electronics & Communication', 'Mechanical Engineering', 'Civil Engineering', 'Information Technology'];
  const semesters = ['All', '1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'];
  const statuses = ['All', 'Active', 'Inactive', 'Under Review'];

  // Program Outcomes
  const programOutcomes = [
    'PO1: Engineering Knowledge',
    'PO2: Problem Analysis',
    'PO3: Design/Development of Solutions',
    'PO4: Conduct Investigations',
    'PO5: Modern Tool Usage'
  ];

  // Filter courses based on search and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.faculty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || course.department === selectedDepartment;
    const matchesSemester = selectedSemester === 'All' || course.semester === selectedSemester;
    const matchesStatus = selectedStatus === 'All' || course.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesSemester && matchesStatus;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = sortedCourses.slice(startIndex, endIndex);

  // Calculate summary statistics
  const totalCourses = courses.length;
  const activeCourses = courses.filter(c => c.status === 'Active').length;
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  const totalStudents = courses.reduce((sum, c) => sum + c.students, 0);

  const handleSelectCourse = (courseId) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCourses.length === currentCourses.length) {
      setSelectedCourses([]);
    } else {
      setSelectedCourses(currentCourses.map(c => c.id));
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-red-100 text-red-800',
      'Under Review': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getSyllabusBadge = (syllabus) => {
    const colors = {
      'Updated': 'bg-green-100 text-green-800',
      'Outdated': 'bg-red-100 text-red-800',
      'Review Pending': 'bg-yellow-100 text-yellow-800'
    };
    return colors[syllabus] || 'bg-gray-100 text-gray-800';
  };

  const openCOPOModal = (course) => {
    setSelectedCourseForCOPO(course);
    setShowCOPOModal(true);
  };

  const getStrengthColor = (value) => {
    if (value === 3) return 'bg-green-500';
    if (value === 2) return 'bg-yellow-500';
    if (value === 1) return 'bg-orange-500';
    return 'bg-gray-300';
  };

  const getStrengthText = (value) => {
    if (value === 3) return 'Strong';
    if (value === 2) return 'Medium';
    if (value === 1) return 'Weak';
    return 'None';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Management</h1>
              <p className="text-gray-600">Manage course curriculum, CO/PO mapping, and academic structure</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Import Courses
              </button>
              <button className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Data
              </button>
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Course
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{totalCourses}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Courses</p>
                <p className="text-2xl font-bold text-gray-900">{activeCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Credits</p>
                <p className="text-2xl font-bold text-gray-900">{totalCredits}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Enrollments</p>
                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by course name, code, or faculty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {selectedCourses.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">{selectedCourses.length} selected</span>
                <div className="flex gap-2">
                  <button className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                  <button className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Bulk CO/PO Map
                  </button>
                </div>
              </div>
            )}
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {semesters.map(semester => (
                      <option key={semester} value={semester}>{semester}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Items per page</label>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Course Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedCourses.length === currentCourses.length && currentCourses.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department & Semester
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Credits & Structure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Faculty & Enrollment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status & Syllabus
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course.id)}
                        onChange={() => handleSelectCourse(course.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-indigo-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{course.name}</div>
                          <div className="text-sm text-gray-500">{course.code}</div>
                          <div className="text-xs text-gray-400">Modified: {new Date(course.lastModified).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{course.department}</div>
                      <div className="text-sm text-gray-500">{course.semester}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Credits: {course.credits}</div>
                      <div className="text-sm text-gray-500">Theory: {course.theory}h | Lab: {course.practical}h</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{course.faculty}</div>
                      <div className="text-sm text-gray-500">Students: {course.students}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="mb-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(course.status)}`}>
                          {course.status}
                        </span>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSyllabusBadge(course.syllabus)}`}>
                          {course.syllabus}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => openCOPOModal(course)}
                          className="text-green-600 hover:text-green-900" 
                          title="CO/PO Mapping"
                        >
                          <Target className="w-4 h-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900" title="Syllabus">
                          <FileText className="w-4 h-4" />
                        </button>
                        <div className="relative">
                          <button className="text-gray-400 hover:text-gray-600" title="More Options">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(endIndex, sortedCourses.length)}</span> of{' '}
                  <span className="font-medium">{sortedCourses.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === pageNum
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* CO/PO Mapping Modal */}
        {showCOPOModal && selectedCourseForCOPO && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">CO/PO Mapping</h3>
                    <p className="text-sm text-gray-600">{selectedCourseForCOPO.name} ({selectedCourseForCOPO.code})</p>
                  </div>
                  <button
                    onClick={() => setShowCOPOModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {/* Course Outcomes */}
                <div className="mb-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Course Outcomes (COs)</h4>
                  <div className="space-y-2">
                    {selectedCourseForCOPO.courseOutcomes.map((outcome, index) => (
                      <div key={index} className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-blue-900">CO{index + 1}</p>
                        <p className="text-sm text-blue-800">{outcome}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Program Outcomes */}
                <div className="mb-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Program Outcomes (POs)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {programOutcomes.map((po, index) => (
                      <div key={index} className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-green-900">{po}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CO/PO Mapping Matrix */}
                <div className="mb-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">CO/PO Mapping Matrix</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 border border-gray-300 text-left text-xs font-medium text-gray-500 uppercase">
                            Course Outcomes
                          </th>
                          {['PO1', 'PO2', 'PO3', 'PO4', 'PO5'].map(po => (
                            <th key={po} className="px-4 py-2 border border-gray-300 text-center text-xs font-medium text-gray-500 uppercase">
                              {po}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {Object.entries(selectedCourseForCOPO.coPoMapping).map(([co, mapping]) => (
                          <tr key={co} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border border-gray-300 font-medium text-sm text-gray-900">
                              {co}
                            </td>
                            {Object.entries(mapping).map(([po, value]) => (
                              <td key={po} className="px-4 py-2 border border-gray-300 text-center">
                                <div className="flex items-center justify-center">
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${getStrengthColor(value)}`}
                                    title={getStrengthText(value)}
                                  >
                                    {value}
                                  </div>
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mapping Legend */}
                <div className="mb-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Mapping Strength</h4>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-green-500"></div>
                      <span className="text-sm text-gray-700">3 - Strong correlation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-yellow-500"></div>
                      <span className="text-sm text-gray-700">2 - Medium correlation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-orange-500"></div>
                      <span className="text-sm text-gray-700">1 - Weak correlation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-gray-300"></div>
                      <span className="text-sm text-gray-700">0 - No correlation</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowCOPOModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    Edit Mapping
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                    Export Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Course Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Add New Course</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <form className="space-y-6">
                  {/* Basic Course Information */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Basic Course Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Course Name *</label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter course name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Course Code *</label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="CSE101"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option value="">Select Department</option>
                          <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                          <option value="Electronics & Communication">Electronics & Communication</option>
                          <option value="Mechanical Engineering">Mechanical Engineering</option>
                          <option value="Civil Engineering">Civil Engineering</option>
                          <option value="Information Technology">Information Technology</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Semester *</label>
                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option value="">Select Semester</option>
                          <option value="1st Semester">1st Semester</option>
                          <option value="2nd Semester">2nd Semester</option>
                          <option value="3rd Semester">3rd Semester</option>
                          <option value="4th Semester">4th Semester</option>
                          <option value="5th Semester">5th Semester</option>
                          <option value="6th Semester">6th Semester</option>
                          <option value="7th Semester">7th Semester</option>
                          <option value="8th Semester">8th Semester</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Credits *</label>
                        <input
                          type="number"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="4"
                          min="1"
                          max="6"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Theory Hours</label>
                        <input
                          type="number"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="3"
                          min="0"
                          max="6"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Practical Hours</label>
                        <input
                          type="number"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="2"
                          min="0"
                          max="6"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Faculty Assigned</label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Dr. Faculty Name"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Course Description</label>
                      <textarea
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter course description"
                      ></textarea>
                    </div>
                  </div>

                  {/* Course Outcomes */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Course Outcomes</h4>
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">CO{i}</label>
                          <textarea
                            rows={2}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder={`Enter Course Outcome ${i}`}
                          ></textarea>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prerequisites */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Additional Information</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Prerequisites</label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Course codes separated by commas"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      Add Course
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}