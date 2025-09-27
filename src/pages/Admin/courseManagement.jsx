import React, { useState, useEffect } from 'react';
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
  CheckCircle,
  AlertCircle,
  Loader,
  X
} from 'lucide-react';
import { courseService } from '../../services/courseService';

// Mock API service - replace with your actual API service
/*const courseService = {
  getAllCourses: async (params = {}) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockResponse = {
      courses: [
        {
          id: 1,
          name: 'Data Structures and Algorithms',
          code: 'CSE101',
          department: 'Computer Science & Engineering',
          semester: '3rd Semester',
          credits: 4,
          theory_hours: 3,
          practical_hours: 2,
          faculty: 'Dr. Rajesh Kumar',
          description: 'Fundamental data structures and algorithms for problem solving',
          prerequisites: 'Programming Fundamentals',
          status: 'Active',
          syllabus_status: 'Updated',
          created_at: '2024-01-15T10:00:00Z',
          updated_at: '2024-09-01T10:00:00Z',
          enrolled_students: 65,
          courseOutcomes: [
            { id: 1, outcome_number: 1, description: 'Analyze the performance of algorithms' },
            { id: 2, outcome_number: 2, description: 'Implement various data structures' },
            { id: 3, outcome_number: 3, description: 'Design efficient algorithms for problem solving' },
            { id: 4, outcome_number: 4, description: 'Apply appropriate data structures for specific problems' }
          ]
        },
        {
          id: 2,
          name: 'Digital Signal Processing',
          code: 'ECE201',
          department: 'Electronics & Communication',
          semester: '5th Semester',
          credits: 4,
          theory_hours: 3,
          practical_hours: 2,
          faculty: 'Dr. Priya Sharma',
          description: 'Analysis and design of digital signal processing systems',
          prerequisites: 'Signals and Systems',
          status: 'Active',
          syllabus_status: 'Updated',
          created_at: '2024-01-20T10:00:00Z',
          updated_at: '2024-08-15T10:00:00Z',
          enrolled_students: 58
        },
        {
          id: 3,
          name: 'Thermodynamics',
          code: 'ME301',
          department: 'Mechanical Engineering',
          semester: '4th Semester',
          credits: 3,
          theory_hours: 3,
          practical_hours: 0,
          faculty: 'Prof. Amit Patel',
          description: 'Laws of thermodynamics and their applications',
          prerequisites: 'Physics, Mathematics',
          status: 'Active',
          syllabus_status: 'Review Pending',
          created_at: '2024-01-10T10:00:00Z',
          updated_at: '2024-07-20T10:00:00Z',
          enrolled_students: 72
        },
        {
          id: 4,
          name: 'Machine Learning',
          code: 'CSE401',
          department: 'Computer Science & Engineering',
          semester: '7th Semester',
          credits: 4,
          theory_hours: 3,
          practical_hours: 2,
          faculty: 'Dr. Sneha Desai',
          description: 'Introduction to machine learning algorithms and applications',
          prerequisites: 'Data Structures, Statistics',
          status: 'Active',
          syllabus_status: 'Updated',
          created_at: '2024-02-01T10:00:00Z',
          updated_at: '2024-09-05T10:00:00Z',
          enrolled_students: 45
        },
        {
          id: 5,
          name: 'Structural Analysis',
          code: 'CE501',
          department: 'Civil Engineering',
          semester: '6th Semester',
          credits: 4,
          theory_hours: 3,
          practical_hours: 2,
          faculty: 'Prof. Arjun Singh',
          description: 'Analysis of determinate and indeterminate structures',
          prerequisites: 'Engineering Mechanics',
          status: 'Inactive',
          syllabus_status: 'Outdated',
          created_at: '2024-01-05T10:00:00Z',
          updated_at: '2024-06-10T10:00:00Z',
          enrolled_students: 38
        }
      ],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalCourses: 5,
        limit: 10
      }
    };
    
    return mockResponse;
  },

  getDepartments: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return { 
      departments: [
        'Computer Science & Engineering', 
        'Electronics & Communication', 
        'Mechanical Engineering', 
        'Civil Engineering', 
        'Information Technology'
      ] 
    };
  },

  getSemesters: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return { 
      semesters: [
        '1st Semester', '2nd Semester', '3rd Semester', '4th Semester',
        '5th Semester', '6th Semester', '7th Semester', '8th Semester'
      ] 
    };
  },

  createCourse: async (courseData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { 
      message: 'Course created successfully',
      course: {
        id: Math.floor(Math.random() * 1000),
        ...courseData
      }
    };
  },

  updateCourse: async (id, courseData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { message: 'Course updated successfully' };
  },

  deleteCourse: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { message: 'Course deleted successfully' };
  },

  getCOPOMapping: async (courseId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      mappings: [
        { co_number: 1, po_number: 1, strength: 3 },
        { co_number: 1, po_number: 2, strength: 2 },
        { co_number: 1, po_number: 3, strength: 1 },
        { co_number: 1, po_number: 4, strength: 0 },
        { co_number: 1, po_number: 5, strength: 1 },
        { co_number: 2, po_number: 1, strength: 2 },
        { co_number: 2, po_number: 2, strength: 3 },
        { co_number: 2, po_number: 3, strength: 2 },
        { co_number: 2, po_number: 4, strength: 1 },
        { co_number: 2, po_number: 5, strength: 0 }
      ]
    };
  },

  updateCOPOMapping: async (courseId, mappings) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { message: 'CO-PO mapping updated successfully' };
  }
};*/

export default function CourseManagement() {
  // State management
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  
  // Selection and pagination states
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCOPOModal, setShowCOPOModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCourseForCOPO, setSelectedCourseForCOPO] = useState(null);
  const [selectedCourseForEdit, setSelectedCourseForEdit] = useState(null);
  const [copoMappings, setCopoMappings] = useState([]);
  const [copoLoading, setCopoLoading] = useState(false);

  // Form states
  const [courseForm, setCourseForm] = useState({
    name: '',
    code: '',
    department: '',
    semester: '',
    credits: 3,
    theory_hours: 3,
    practical_hours: 0,
    faculty: '',
    description: '',
    prerequisites: '',
    status: 'Active',
    course_outcomes: ['', '', '', '']
  });

  const [notifications, setNotifications] = useState([]);

  const statuses = ['All', 'Active', 'Inactive', 'Under Review'];
  const programOutcomes = [
    'PO1: Engineering Knowledge',
    'PO2: Problem Analysis',
    'PO3: Design/Development of Solutions',
    'PO4: Conduct Investigations',
    'PO5: Modern Tool Usage'
  ];

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  // Load courses when filters change
  useEffect(() => {
    loadCourses();
  }, [currentPage, itemsPerPage, searchTerm, selectedDepartment, selectedSemester, selectedStatus]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      
      // First try to initialize database if needed
      try {
        await courseService.initDatabase();
      } catch (initError) {
        console.log('Database might already be initialized or error occurred:', initError);
      }
      
      const [coursesRes, deptsRes, semsRes] = await Promise.all([
        courseService.getAllCourses({ page: 1, limit: itemsPerPage }),
        courseService.getDepartments(),
        courseService.getSemesters()
      ]);
      
      setCourses(coursesRes.courses);
      setTotalPages(coursesRes.pagination.totalPages);
      setTotalCourses(coursesRes.pagination.totalCourses);
      setDepartments(['All', ...deptsRes.departments]);
      setSemesters(['All', ...semsRes.semesters]);
    } catch (err) {
      console.error('Error loading course data:', err);
      setError('Failed to load course data. Please try again.');
      addNotification('Failed to load course data. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadCourses = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        department: selectedDepartment !== 'All' ? selectedDepartment : '',
        semester: selectedSemester !== 'All' ? selectedSemester : '',
        status: selectedStatus !== 'All' ? selectedStatus : ''
      };
      
      const response = await courseService.getAllCourses(params);
      setCourses(response.courses || []);
      setTotalPages(response.pagination?.totalPages || 1);
      setTotalCourses(response.pagination?.totalCourses || 0);
    } catch (err) {
      console.error('Error loading courses:', err);
      setError('Failed to load courses. Please try again.');
      addNotification('Failed to load courses. Please try again.', 'error');
      setCourses([]);
      setTotalPages(1);
      setTotalCourses(0);
    } finally {
      setLoading(false);
    }
  };

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await courseService.createCourse(courseForm);
      setShowAddModal(false);
      resetCourseForm();
      addNotification('Course created successfully', 'success');
      loadCourses();
    } catch (err) {
      console.error('Error creating course:', err);
      addNotification(err.message || 'Failed to create course', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await courseService.updateCourse(selectedCourseForEdit.id, courseForm);
      setShowEditModal(false);
      setSelectedCourseForEdit(null);
      resetCourseForm();
      addNotification('Course updated successfully', 'success');
      loadCourses();
    } catch (err) {
      console.error('Error updating course:', err);
      addNotification(err.message || 'Failed to update course', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    
    try {
      setLoading(true);
      await courseService.deleteCourse(courseId);
      addNotification('Course deleted successfully', 'success');
      loadCourses();
    } catch (err) {
      console.error('Error deleting course:', err);
      addNotification(err.message || 'Failed to delete course', 'error');
    } finally {
      setLoading(false);
    }
  };

  const resetCourseForm = () => {
    setCourseForm({
      name: '',
      code: '',
      department: '',
      semester: '',
      credits: 3,
      theory_hours: 3,
      practical_hours: 0,
      faculty: '',
      description: '',
      prerequisites: '',
      status: 'Active',
      course_outcomes: ['', '', '', '']
    });
  };

  const openEditModal = (course) => {
    setSelectedCourseForEdit(course);
    setCourseForm({
      name: course.name || '',
      code: course.code || '',
      department: course.department || '',
      semester: course.semester || '',
      credits: course.credits || 3,
      theory_hours: course.theory_hours || 3,
      practical_hours: course.practical_hours || 0,
      faculty: course.faculty || '',
      description: course.description || '',
      prerequisites: course.prerequisites || '',
      status: course.status || 'Active',
      course_outcomes: course.courseOutcomes 
        ? course.courseOutcomes.map(co => co.description) 
        : ['', '', '', '']
    });
    setShowEditModal(true);
  };

  const openCOPOModal = async (course) => {
    setSelectedCourseForCOPO(course);
    setShowCOPOModal(true);
    setCopoLoading(true);
    
    try {
      const response = await courseService.getCOPOMapping(course.id);
      setCopoMappings(response.mappings || []);
    } catch (err) {
      console.error('Error loading CO-PO mapping:', err);
      addNotification('Failed to load CO-PO mapping', 'error');
      setCopoMappings([]);
    } finally {
      setCopoLoading(false);
    }
  };

  const handleSelectCourse = (courseId) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCourses.length === courses.length) {
      setSelectedCourses([]);
    } else {
      setSelectedCourses(courses.map(c => c.id));
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

  const getMappingMatrix = () => {
    const matrix = {};
    copoMappings.forEach(mapping => {
      if (!matrix[mapping.co_number]) matrix[mapping.co_number] = {};
      matrix[mapping.co_number][mapping.po_number] = mapping.strength;
    });
    return matrix;
  };

  // Calculate summary statistics
  const activeCourses = courses.filter(c => c.status === 'Active').length;
  const totalCredits = courses.reduce((sum, c) => sum + (c.credits || 0), 0);
  const totalStudents = courses.reduce((sum, c) => sum + (c.enrolled_students || 0), 0);

  if (error && !courses.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Courses</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadInitialData}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Notifications */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg shadow-lg flex items-center justify-between min-w-64 ${
                notification.type === 'success' ? 'bg-green-100 text-green-800' :
                notification.type === 'error' ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'
              }`}
            >
              <span className="text-sm font-medium">{notification.message}</span>
              <button
                onClick={() => removeNotification(notification.id)}
                className="ml-2 text-current hover:text-opacity-75"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

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
                  <button 
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete ${selectedCourses.length} courses?`)) {
                        Promise.all(selectedCourses.map(id => courseService.deleteCourse(id)))
                          .then(() => {
                            addNotification('Courses deleted successfully', 'success');
                            setSelectedCourses([]);
                            loadCourses();
                          })
                          .catch(() => addNotification('Failed to delete some courses', 'error'));
                      }
                    }}
                    className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
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
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
              <Loader className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedCourses.length === courses.length && courses.length > 0}
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
                {courses.map((course) => (
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
                          <div className="text-xs text-gray-400">
                            Modified: {new Date(course.updated_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{course.department}</div>
                      <div className="text-sm text-gray-500">{course.semester}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Credits: {course.credits}</div>
                      <div className="text-sm text-gray-500">
                        Theory: {course.theory_hours}h | Lab: {course.practical_hours}h
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{course.faculty}</div>
                      <div className="text-sm text-gray-500">Students: {course.enrolled_students}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="mb-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(course.status)}`}>
                          {course.status}
                        </span>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSyllabusBadge(course.syllabus_status)}`}>
                          {course.syllabus_status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => openEditModal(course)}
                          className="text-gray-600 hover:text-gray-900" 
                          title="Edit"
                        >
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
                        <button 
                          onClick={() => handleDeleteCourse(course.id)}
                          className="text-red-600 hover:text-red-900" 
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalCourses)}</span> of{' '}
                  <span className="font-medium">{totalCourses}</span> results
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
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {copoLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader className="w-8 h-8 animate-spin text-blue-600" />
                  </div>
                ) : (
                  <>
                    {/* Course Outcomes */}
                    <div className="mb-6">
                      <h4 className="text-md font-medium text-gray-900 mb-4">Course Outcomes (COs)</h4>
                      <div className="space-y-2">
                        {selectedCourseForCOPO.courseOutcomes ? (
                          selectedCourseForCOPO.courseOutcomes.map((outcome, index) => (
                            <div key={index} className="bg-blue-50 p-3 rounded-lg">
                              <p className="text-sm font-medium text-blue-900">CO{outcome.outcome_number}</p>
                              <p className="text-sm text-blue-800">{outcome.description}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500">No course outcomes defined</p>
                        )}
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
                    {copoMappings.length > 0 && (
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
                              {Object.entries(getMappingMatrix()).map(([co, mapping]) => (
                                <tr key={co} className="hover:bg-gray-50">
                                  <td className="px-4 py-2 border border-gray-300 font-medium text-sm text-gray-900">
                                    CO{co}
                                  </td>
                                  {[1, 2, 3, 4, 5].map(po => (
                                    <td key={po} className="px-4 py-2 border border-gray-300 text-center">
                                      <div className="flex items-center justify-center">
                                        <div
                                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${getStrengthColor(mapping[po] || 0)}`}
                                          title={getStrengthText(mapping[po] || 0)}
                                        >
                                          {mapping[po] || 0}
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
                    )}

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
                  </>
                )}

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

        {/* Add/Edit Course Modal */}
        {(showAddModal || showEditModal) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    {showEditModal ? 'Edit Course' : 'Add New Course'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      setSelectedCourseForEdit(null);
                      resetCourseForm();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <form onSubmit={showEditModal ? handleUpdateCourse : handleCreateCourse} className="space-y-6">
                  {/* Basic Course Information */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Basic Course Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Course Name *</label>
                        <input
                          type="text"
                          value={courseForm.name}
                          onChange={(e) => setCourseForm({...courseForm, name: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter course name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Course Code *</label>
                        <input
                          type="text"
                          value={courseForm.code}
                          onChange={(e) => setCourseForm({...courseForm, code: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="CSE101"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                        <select 
                          value={courseForm.department}
                          onChange={(e) => setCourseForm({...courseForm, department: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select Department</option>
                          {departments.filter(d => d !== 'All').map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Semester *</label>
                        <select 
                          value={courseForm.semester}
                          onChange={(e) => setCourseForm({...courseForm, semester: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select Semester</option>
                          {semesters.filter(s => s !== 'All').map(semester => (
                            <option key={semester} value={semester}>{semester}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Credits *</label>
                        <input
                          type="number"
                          value={courseForm.credits}
                          onChange={(e) => setCourseForm({...courseForm, credits: parseInt(e.target.value) || 3})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="4"
                          min="1"
                          max="6"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Theory Hours</label>
                        <input
                          type="number"
                          value={courseForm.theory_hours}
                          onChange={(e) => setCourseForm({...courseForm, theory_hours: parseInt(e.target.value) || 0})}
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
                          value={courseForm.practical_hours}
                          onChange={(e) => setCourseForm({...courseForm, practical_hours: parseInt(e.target.value) || 0})}
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
                          value={courseForm.faculty}
                          onChange={(e) => setCourseForm({...courseForm, faculty: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Dr. Faculty Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select 
                          value={courseForm.status}
                          onChange={(e) => setCourseForm({...courseForm, status: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Under Review">Under Review</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Course Description</label>
                      <textarea
                        rows={3}
                        value={courseForm.description}
                        onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter course description"
                      ></textarea>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prerequisites</label>
                      <input
                        type="text"
                        value={courseForm.prerequisites}
                        onChange={(e) => setCourseForm({...courseForm, prerequisites: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Course codes separated by commas"
                      />
                    </div>
                  </div>

                  {/* Course Outcomes */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Course Outcomes</h4>
                    <div className="space-y-3">
                      {courseForm.course_outcomes.map((outcome, index) => (
                        <div key={index}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">CO{index + 1}</label>
                          <textarea
                            rows={2}
                            value={outcome}
                            onChange={(e) => {
                              const newOutcomes = [...courseForm.course_outcomes];
                              newOutcomes[index] = e.target.value;
                              setCourseForm({...courseForm, course_outcomes: newOutcomes});
                            }}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder={`Enter Course Outcome ${index + 1}`}
                          ></textarea>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddModal(false);
                        setShowEditModal(false);
                        setSelectedCourseForEdit(null);
                        resetCourseForm();
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {loading && <Loader className="w-4 h-4 animate-spin" />}
                      {showEditModal ? 'Update Course' : 'Add Course'}
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