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
  Building2, 
  GraduationCap, 
  Users,
  Clock,
  Award,
  BookOpen,
  MoreVertical,
  Settings,
  FileText,
  Calendar,
  CheckCircle,
  TrendingUp,
  UserCheck,
  MapPin,
  Phone,
  Mail,
  Globe,
  X,
  Save,
  Shield,
  AlertTriangle,
  Activity,
  Database,
  History,
  FilePlus,
  PowerOff,
  Power
} from 'lucide-react';

export default function DepartmentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrograms, setSelectedPrograms] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedAccreditation, setSelectedAccreditation] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDepartmentForDetails, setSelectedDepartmentForDetails] = useState(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);

  // Form state for adding/editing departments
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    hodId: '',
    programs: [],
    establishmentYear: '',
    accreditationGrade: '',
    accreditationYear: '',
    accreditationValidTill: '',
    description: '',
    missionVision: '',
    contact: {
      phone: '',
      email: '',
      office: ''
    }
  });

  // Sample faculty data for HOD selection
  const facultyList = [
    { id: 'F001', name: 'Dr. Rajesh Kumar', designation: 'Professor' },
    { id: 'F002', name: 'Dr. Priya Sharma', designation: 'Associate Professor' },
    { id: 'F003', name: 'Prof. Amit Patel', designation: 'Professor' },
    { id: 'F004', name: 'Prof. Arjun Singh', designation: 'Assistant Professor' },
    { id: 'F005', name: 'Dr. Sneha Desai', designation: 'Associate Professor' },
    { id: 'F006', name: 'Dr. Kavita Mehta', designation: 'Professor' }
  ];

  // Sample departments data with NAAC compliance features
  const departments = [
    {
      id: 'CSE',
      code: 'CSE',
      name: 'Computer Science & Engineering',
      hodId: 'F001',
      hodName: 'Dr. Rajesh Kumar',
      programs: ['UG', 'PG'],
      establishmentYear: '2010',
      accreditationGrade: 'A++',
      accreditationYear: '2023',
      accreditationValidTill: '2026-06-15',
      description: 'Leading department in computer science education and research',
      missionVision: 'To excel in computer science education and create innovative solutions for societal challenges',
      faculty: 25,
      courses: 32,
      students: 480,
      totalSeats: 120,
      status: 'Active',
      laboratories: 8,
      contact: {
        phone: '+91 240 123 4567',
        email: 'cse@college.edu.in',
        office: 'Block A, 3rd Floor'
      },
      documents: [
        { name: 'NBA Accreditation Certificate', type: 'PDF', uploadDate: '2023-06-15', status: 'Verified' },
        { name: 'Department Profile 2023', type: 'PDF', uploadDate: '2023-01-10', status: 'Verified' }
      ],
      auditLog: [
        { action: 'Created', user: 'Admin', date: '2010-01-15', details: 'Department established' },
        { action: 'Updated', user: 'Dr. Kumar', date: '2023-06-15', details: 'Accreditation details updated' },
        { action: 'Faculty Added', user: 'HR Admin', date: '2023-08-20', details: '2 new faculty members added' }
      ]
    },
    {
      id: 'ECE',
      code: 'ECE',
      name: 'Electronics & Communication Engineering',
      hodId: 'F002',
      hodName: 'Dr. Priya Sharma',
      programs: ['UG'],
      establishmentYear: '2008',
      accreditationGrade: 'A+',
      accreditationYear: '2022',
      accreditationValidTill: '2025-08-20',
      description: 'Excellence in electronics and communication technology',
      missionVision: 'To provide quality education in electronics and communication engineering',
      faculty: 22,
      courses: 28,
      students: 360,
      totalSeats: 90,
      status: 'Active',
      laboratories: 6,
      contact: {
        phone: '+91 240 123 4568',
        email: 'ece@college.edu.in',
        office: 'Block B, 2nd Floor'
      },
      documents: [
        { name: 'NAAC Accreditation', type: 'PDF', uploadDate: '2022-08-20', status: 'Verified' }
      ],
      auditLog: [
        { action: 'Created', user: 'Admin', date: '2008-03-10', details: 'Department established' },
        { action: 'Accreditation Updated', user: 'Dr. Sharma', date: '2022-08-20', details: 'A+ grade achieved' }
      ]
    },
    {
      id: 'ME',
      code: 'ME',
      name: 'Mechanical Engineering',
      hodId: 'F003',
      hodName: 'Prof. Amit Patel',
      programs: ['UG', 'Diploma'],
      establishmentYear: '2005',
      accreditationGrade: 'A',
      accreditationYear: '2023',
      accreditationValidTill: '2026-01-10',
      description: 'Comprehensive mechanical engineering education with industry focus',
      missionVision: 'To create competent mechanical engineers for global industry',
      faculty: 28,
      courses: 30,
      students: 420,
      totalSeats: 105,
      status: 'Active',
      laboratories: 10,
      contact: {
        phone: '+91 240 123 4569',
        email: 'me@college.edu.in',
        office: 'Block C, Ground Floor'
      },
      documents: [
        { name: 'NBA Accreditation 2023', type: 'PDF', uploadDate: '2023-01-10', status: 'Verified' },
        { name: 'Industry Collaboration MOU', type: 'PDF', uploadDate: '2023-03-15', status: 'Active' }
      ],
      auditLog: [
        { action: 'Created', user: 'Admin', date: '2005-06-01', details: 'Department established' },
        { action: 'Program Added', user: 'Academic Admin', date: '2020-07-01', details: 'Diploma program added' }
      ]
    },
    {
      id: 'CE',
      code: 'CE',
      name: 'Civil Engineering',
      hodId: 'F004',
      hodName: 'Prof. Arjun Singh',
      programs: ['UG'],
      establishmentYear: '2007',
      accreditationGrade: 'B++',
      accreditationYear: '2020',
      accreditationValidTill: '2025-03-15',
      description: 'Building infrastructure leaders for tomorrow',
      missionVision: 'To develop skilled civil engineers contributing to infrastructure development',
      faculty: 20,
      courses: 26,
      students: 300,
      totalSeats: 75,
      status: 'Under Review',
      laboratories: 7,
      contact: {
        phone: '+91 240 123 4570',
        email: 'ce@college.edu.in',
        office: 'Block D, 1st Floor'
      },
      documents: [
        { name: 'Previous Accreditation Certificate', type: 'PDF', uploadDate: '2020-03-15', status: 'Expired' }
      ],
      auditLog: [
        { action: 'Created', user: 'Admin', date: '2007-08-15', details: 'Department established' },
        { action: 'Status Changed', user: 'Quality Admin', date: '2024-11-01', details: 'Under review for re-accreditation' }
      ]
    },
    {
      id: 'IT',
      code: 'IT',
      name: 'Information Technology',
      hodId: 'F005',
      hodName: 'Dr. Sneha Desai',
      programs: ['UG', 'PG'],
      establishmentYear: '2012',
      accreditationGrade: 'Pending',
      accreditationYear: null,
      accreditationValidTill: null,
      description: 'Modern IT education with industry alignment',
      missionVision: 'To create IT professionals ready for digital transformation',
      faculty: 18,
      courses: 24,
      students: 240,
      totalSeats: 60,
      status: 'Active',
      laboratories: 5,
      contact: {
        phone: '+91 240 123 4571',
        email: 'it@college.edu.in',
        office: 'Block A, 2nd Floor'
      },
      documents: [
        { name: 'Application for Accreditation', type: 'PDF', uploadDate: '2024-01-15', status: 'Submitted' }
      ],
      auditLog: [
        { action: 'Created', user: 'Admin', date: '2012-07-10', details: 'Department established' },
        { action: 'Accreditation Applied', user: 'Dr. Desai', date: '2024-01-15', details: 'Applied for NBA accreditation' }
      ]
    },
    {
      id: 'MBA',
      code: 'MBA',
      name: 'Master of Business Administration',
      hodId: 'F006',
      hodName: 'Dr. Kavita Mehta',
      programs: ['PG', 'Certificate'],
      establishmentYear: '2015',
      accreditationGrade: 'A',
      accreditationYear: '2022',
      accreditationValidTill: '2025-11-20',
      description: 'Comprehensive business education with leadership focus',
      missionVision: 'To develop business leaders and entrepreneurs',
      faculty: 15,
      courses: 18,
      students: 120,
      totalSeats: 60,
      status: 'Active',
      laboratories: 2,
      contact: {
        phone: '+91 240 123 4572',
        email: 'mba@college.edu.in',
        office: 'Management Block, 3rd Floor'
      },
      documents: [
        { name: 'AICTE Approval', type: 'PDF', uploadDate: '2022-11-20', status: 'Verified' },
        { name: 'Industry Partnership Agreements', type: 'PDF', uploadDate: '2023-05-10', status: 'Active' }
      ],
      auditLog: [
        { action: 'Created', user: 'Admin', date: '2015-01-20', details: 'Department established' },
        { action: 'Program Added', user: 'Academic Admin', date: '2023-06-01', details: 'Certificate programs added' }
      ]
    }
  ];

  const programTypes = ['All', 'UG', 'PG', 'Diploma', 'Certificate'];
  const statuses = ['All', 'Active', 'Inactive', 'Under Review'];
  const accreditationGrades = ['All', 'A++', 'A+', 'A', 'B++', 'B+', 'B', 'Pending'];

  // Filter departments
  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.hodName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrograms = selectedPrograms === 'All' || dept.programs.includes(selectedPrograms);
    const matchesStatus = selectedStatus === 'All' || dept.status === selectedStatus;
    const matchesAccreditation = selectedAccreditation === 'All' || dept.accreditationGrade === selectedAccreditation;
    
    return matchesSearch && matchesPrograms && matchesStatus && matchesAccreditation;
  });

  // Sort departments
  const sortedDepartments = [...filteredDepartments].sort((a, b) => {
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
  const totalPages = Math.ceil(sortedDepartments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDepartments = sortedDepartments.slice(startIndex, endIndex);

  // Calculate summary statistics
  const totalDepartments = departments.length;
  const activeDepartments = departments.filter(d => d.status === 'Active').length;
  const totalFaculty = departments.reduce((sum, d) => sum + d.faculty, 0);
  const totalStudents = departments.reduce((sum, d) => sum + d.students, 0);
  const accreditedDepartments = departments.filter(d => ['A++', 'A+', 'A', 'B++', 'B+', 'B'].includes(d.accreditationGrade)).length;

  const handleSelectDepartment = (deptId) => {
    setSelectedDepartments(prev => 
      prev.includes(deptId) 
        ? prev.filter(id => id !== deptId)
        : [...prev, deptId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDepartments.length === currentDepartments.length) {
      setSelectedDepartments([]);
    } else {
      setSelectedDepartments(currentDepartments.map(d => d.id));
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

  const getAccreditationBadge = (grade) => {
    const colors = {
      'A++': 'bg-emerald-100 text-emerald-800',
      'A+': 'bg-green-100 text-green-800',
      'A': 'bg-blue-100 text-blue-800',
      'B++': 'bg-indigo-100 text-indigo-800',
      'B+': 'bg-purple-100 text-purple-800',
      'B': 'bg-pink-100 text-pink-800',
      'Pending': 'bg-orange-100 text-orange-800'
    };
    return colors[grade] || 'bg-gray-100 text-gray-800';
  };

  const openDetailsModal = (dept) => {
    setSelectedDepartmentForDetails(dept);
    setShowDetailsModal(true);
  };

  const openEditModal = (dept) => {
    setFormData({
      code: dept.code,
      name: dept.name,
      hodId: dept.hodId,
      programs: dept.programs,
      establishmentYear: dept.establishmentYear,
      accreditationGrade: dept.accreditationGrade,
      accreditationYear: dept.accreditationYear,
      accreditationValidTill: dept.accreditationValidTill,
      description: dept.description,
      missionVision: dept.missionVision,
      contact: dept.contact
    });
    setSelectedDepartmentForDetails(dept);
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      hodId: '',
      programs: [],
      establishmentYear: '',
      accreditationGrade: '',
      accreditationYear: '',
      accreditationValidTill: '',
      description: '',
      missionVision: '',
      contact: {
        phone: '',
        email: '',
        office: ''
      }
    });
  };

  const handleFormChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleProgramChange = (program) => {
    setFormData(prev => ({
      ...prev,
      programs: prev.programs.includes(program)
        ? prev.programs.filter(p => p !== program)
        : [...prev.programs, program]
    }));
  };

  const canDeleteDepartment = (dept) => {
    // Department can only be deleted if it has no active courses, classes, or faculty mapped
    return dept.courses === 0 && dept.students === 0 && dept.faculty === 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Department Management</h1>
              <p className="text-gray-600">NAAC-compliant department administration and oversight</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Import Data
              </button>
              <button className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </button>
              <button 
                onClick={() => {
                  resetForm();
                  setShowAddModal(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Department
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Departments</p>
                <p className="text-2xl font-bold text-gray-900">{totalDepartments}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Departments</p>
                <p className="text-2xl font-bold text-gray-900">{activeDepartments}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Faculty</p>
                <p className="text-2xl font-bold text-gray-900">{totalFaculty}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Award className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Accredited</p>
                <p className="text-2xl font-bold text-gray-900">{accreditedDepartments}</p>
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
                  placeholder="Search by department name, code, or HOD..."
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

            {selectedDepartments.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">{selectedDepartments.length} selected</span>
                <div className="flex gap-2">
                  <button className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                  <button className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Bulk Edit
                  </button>
                </div>
              </div>
            )}
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Program Type</label>
                  <select
                    value={selectedPrograms}
                    onChange={(e) => setSelectedPrograms(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {programTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Accreditation Grade</label>
                  <select
                    value={selectedAccreditation}
                    onChange={(e) => setSelectedAccreditation(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {accreditationGrades.map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
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

        {/* Department Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedDepartments.length === currentDepartments.length && currentDepartments.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Programs & Establishment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Faculty & Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    NAAC Accreditation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentDepartments.map((dept) => (
                  <tr key={dept.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedDepartments.includes(dept.id)}
                        onChange={() => handleSelectDepartment(dept.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-indigo-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{dept.name}</div>
                          <div className="text-sm text-gray-500">Code: {dept.code}</div>
                          <div className="text-xs text-gray-400">HOD: {dept.hodName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1 mb-1">
                        {dept.programs.map(program => (
                          <span key={program} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {program}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-gray-500">Est. {dept.establishmentYear}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Faculty: {dept.faculty}</div>
                      <div className="text-sm text-gray-500">Students: {dept.students}</div>
                      <div className="text-xs text-gray-400">Courses: {dept.courses}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="mb-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAccreditationBadge(dept.accreditationGrade)}`}>
                          {dept.accreditationGrade}
                        </span>
                      </div>
                      {dept.accreditationValidTill && (
                        <div className="text-xs text-gray-500">
                          Valid till: {new Date(dept.accreditationValidTill).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(dept.status)}`}>
                        {dept.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => openDetailsModal(dept)}
                          className="text-blue-600 hover:text-blue-900" 
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => openEditModal(dept)}
                          className="text-gray-600 hover:text-gray-900" 
                          title="Edit Department"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedDepartmentForDetails(dept);
                            setShowDocumentModal(true);
                          }}
                          className="text-green-600 hover:text-green-900" 
                          title="Manage Documents"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedDepartmentForDetails(dept);
                            setShowAuditModal(true);
                          }}
                          className="text-purple-600 hover:text-purple-900" 
                          title="Audit Log"
                        >
                          <History className="w-4 h-4" />
                        </button>
                        {dept.status === 'Active' ? (
                          <button className="text-orange-600 hover:text-orange-900" title="Deactivate">
                            <PowerOff className="w-4 h-4" />
                          </button>
                        ) : (
                          <button className="text-green-600 hover:text-green-900" title="Activate">
                            <Power className="w-4 h-4" />
                          </button>
                        )}
                        <button 
                          disabled={!canDeleteDepartment(dept)}
                          className={`${canDeleteDepartment(dept) ? 'text-red-600 hover:text-red-900' : 'text-gray-300 cursor-not-allowed'}`} 
                          title={canDeleteDepartment(dept) ? 'Delete Department' : 'Cannot delete - has active mappings'}
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
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(endIndex, sortedDepartments.length)}</span> of{' '}
                  <span className="font-medium">{sortedDepartments.length}</span> results
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

        {/* Department Details Modal */}
        {showDetailsModal && selectedDepartmentForDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Department Details</h3>
                    <p className="text-sm text-gray-600">{selectedDepartmentForDetails.name} ({selectedDepartmentForDetails.code})</p>
                  </div>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Basic Information */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Basic Information</h4>
                    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Department Code:</span>
                        <span className="text-sm text-gray-900">{selectedDepartmentForDetails.code}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Established:</span>
                        <span className="text-sm text-gray-900">{selectedDepartmentForDetails.establishmentYear}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Head of Department:</span>
                        <span className="text-sm text-gray-900">{selectedDepartmentForDetails.hodName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Programs:</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedDepartmentForDetails.programs.map(program => (
                            <span key={program} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {program}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Status:</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(selectedDepartmentForDetails.status)}`}>
                          {selectedDepartmentForDetails.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Statistics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{selectedDepartmentForDetails.faculty}</div>
                        <div className="text-sm text-blue-800">Faculty Members</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{selectedDepartmentForDetails.students}</div>
                        <div className="text-sm text-green-800">Students Enrolled</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{selectedDepartmentForDetails.courses}</div>
                        <div className="text-sm text-purple-800">Courses Offered</div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{selectedDepartmentForDetails.laboratories}</div>
                        <div className="text-sm text-orange-800">Laboratories</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* NAAC Accreditation Details */}
                <div className="mt-8">
                  <h4 className="text-md font-medium text-gray-900 mb-4">NAAC Accreditation Status</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Current Grade</div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getAccreditationBadge(selectedDepartmentForDetails.accreditationGrade)}`}>
                          {selectedDepartmentForDetails.accreditationGrade}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Accredited Year</div>
                        <div className="text-sm font-medium">{selectedDepartmentForDetails.accreditationYear || 'Not Available'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Valid Till</div>
                        <div className="text-sm font-medium">
                          {selectedDepartmentForDetails.accreditationValidTill 
                            ? new Date(selectedDepartmentForDetails.accreditationValidTill).toLocaleDateString()
                            : 'Not Available'
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mt-8">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Contact Information</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <div>
                          <div className="text-xs text-gray-500">Phone</div>
                          <div className="text-sm font-medium">{selectedDepartmentForDetails.contact.phone}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <div>
                          <div className="text-xs text-gray-500">Email</div>
                          <div className="text-sm font-medium">{selectedDepartmentForDetails.contact.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <div>
                          <div className="text-xs text-gray-500">Office Location</div>
                          <div className="text-sm font-medium">{selectedDepartmentForDetails.contact.office}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mission & Vision */}
                <div className="mt-8">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Mission & Vision</h4>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-blue-800">{selectedDepartmentForDetails.missionVision}</div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-8">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Description</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-700">{selectedDepartmentForDetails.description}</div>
                  </div>
                </div>

                {/* Documents */}
                <div className="mt-8">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Documents</h4>
                  <div className="space-y-3">
                    {selectedDepartmentForDetails.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                            <div className="text-xs text-gray-500">Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            doc.status === 'Verified' ? 'bg-green-100 text-green-800' :
                            doc.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                            doc.status === 'Submitted' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {doc.status}
                          </span>
                          <button className="text-blue-600 hover:text-blue-800">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-8">
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => {
                      setShowDetailsModal(false);
                      openEditModal(selectedDepartmentForDetails);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Edit Details
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Department Modal */}
        {(showAddModal || showEditModal) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    {showAddModal ? 'Add New Department' : 'Edit Department'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  {/* Basic Department Information */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      Basic Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Department Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.code}
                          onChange={(e) => handleFormChange('code', e.target.value.toUpperCase())}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="CSE"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Department Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleFormChange('name', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Computer Science & Engineering"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Head of Department <span className="text-red-500">*</span>
                        </label>
                        <select 
                          value={formData.hodId}
                          onChange={(e) => handleFormChange('hodId', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select HOD</option>
                          {facultyList.map(faculty => (
                            <option key={faculty.id} value={faculty.id}>
                              {faculty.name} ({faculty.designation})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Establishment Year <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={formData.establishmentYear}
                          onChange={(e) => handleFormChange('establishmentYear', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="2020"
                          min="1900"
                          max="2030"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Program Association */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      Associated Programs
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['UG', 'PG', 'Diploma', 'Certificate'].map(program => (
                        <label key={program} className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.programs.includes(program)}
                            onChange={() => handleProgramChange(program)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm font-medium text-gray-700">{program}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* NAAC Accreditation Details */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      NAAC Accreditation Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Accreditation Grade</label>
                        <select 
                          value={formData.accreditationGrade}
                          onChange={(e) => handleFormChange('accreditationGrade', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select Grade</option>
                          <option value="A++">A++</option>
                          <option value="A+">A+</option>
                          <option value="A">A</option>
                          <option value="B++">B++</option>
                          <option value="B+">B+</option>
                          <option value="B">B</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Accreditation Year</label>
                        <input
                          type="number"
                          value={formData.accreditationYear}
                          onChange={(e) => handleFormChange('accreditationYear', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="2023"
                          min="2000"
                          max="2030"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Valid Till</label>
                        <input
                          type="date"
                          value={formData.accreditationValidTill}
                          onChange={(e) => handleFormChange('accreditationValidTill', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      Contact Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.contact.phone}
                          onChange={(e) => handleFormChange('contact.phone', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="+91 240 123 4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          value={formData.contact.email}
                          onChange={(e) => handleFormChange('contact.email', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="dept@college.edu.in"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Office Location</label>
                        <input
                          type="text"
                          value={formData.contact.office}
                          onChange={(e) => handleFormChange('contact.office', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Block A, 3rd Floor"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description & Mission */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Description & Mission
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Department Description</label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => handleFormChange('description', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows={3}
                          placeholder="Brief description of the department..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mission & Vision Statement</label>
                        <textarea
                          value={formData.missionVision}
                          onChange={(e) => handleFormChange('missionVision', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows={3}
                          placeholder="Department's mission and vision statement..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddModal(false);
                        setShowEditModal(false);
                        resetForm();
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {showAddModal ? 'Add Department' : 'Update Department'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Document Management Modal */}
        {showDocumentModal && selectedDepartmentForDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Document Management</h3>
                    <p className="text-sm text-gray-600">{selectedDepartmentForDetails.name} ({selectedDepartmentForDetails.code})</p>
                  </div>
                  <button
                    onClick={() => setShowDocumentModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {/* Upload New Document */}
                <div className="mb-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Upload New Document</h4>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Drop files here or click to upload</p>
                    <p className="text-xs text-gray-500">Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)</p>
                    <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                      Choose Files
                    </button>
                  </div>
                </div>

                {/* Existing Documents */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Existing Documents</h4>
                  <div className="space-y-3">
                    {selectedDepartmentForDetails.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded">
                            <FileText className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                            <div className="text-xs text-gray-500">
                              Uploaded: {new Date(doc.uploadDate).toLocaleDateString()} • Type: {doc.type}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            doc.status === 'Verified' ? 'bg-green-100 text-green-800' :
                            doc.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                            doc.status === 'Submitted' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {doc.status}
                          </span>
                          <div className="flex items-center gap-1">
                            <button className="p-1 text-blue-600 hover:text-blue-800" title="Download">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-green-600 hover:text-green-800" title="View">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-red-600 hover:text-red-800" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-6">
                  <button
                    onClick={() => setShowDocumentModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Audit Log Modal */}
        {showAuditModal && selectedDepartmentForDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Audit Log & Change History</h3>
                    <p className="text-sm text-gray-600">{selectedDepartmentForDetails.name} ({selectedDepartmentForDetails.code})</p>
                  </div>
                  <button
                    onClick={() => setShowAuditModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {selectedDepartmentForDetails.auditLog.map((log, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className={`p-2 rounded-full ${
                          log.action === 'Created' ? 'bg-green-100' :
                          log.action === 'Updated' ? 'bg-blue-100' :
                          log.action === 'Status Changed' ? 'bg-yellow-100' :
                          'bg-purple-100'
                        }`}>
                          {log.action === 'Created' ? <FilePlus className="w-4 h-4 text-green-600" /> :
                           log.action === 'Updated' ? <Edit className="w-4 h-4 text-blue-600" /> :
                           log.action === 'Status Changed' ? <Activity className="w-4 h-4 text-yellow-600" /> :
                           <History className="w-4 h-4 text-purple-600" />}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">{log.action}</h4>
                          <span className="text-xs text-gray-500">{new Date(log.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <UserCheck className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">by {log.user}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-6">
                  <button
                    onClick={() => setShowAuditModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    Export Audit Log
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}