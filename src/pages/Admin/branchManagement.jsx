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
  Globe
} from 'lucide-react';

export default function BranchManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedAccreditation, setSelectedAccreditation] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBranchForDetails, setSelectedBranchForDetails] = useState(null);

  // Sample branch data
  const branches = [
    {
      id: 'CSE',
      name: 'Computer Science & Engineering',
      code: 'CSE',
      type: 'Engineering',
      established: '2010',
      hod: 'Dr. Rajesh Kumar',
      faculty: 25,
      students: 480,
      totalSeats: 120,
      status: 'Active',
      accreditation: 'NBA Accredited',
      lastAccreditation: '2023-06-15',
      nextReview: '2026-06-15',
      courses: 32,
      laboratories: 8,
      researchAreas: [
        'Artificial Intelligence',
        'Machine Learning',
        'Data Science',
        'Cybersecurity',
        'Software Engineering'
      ],
      facilities: [
        'Advanced Computing Lab',
        'AI/ML Lab',
        'Network Security Lab',
        'Software Development Lab',
        'Research Center'
      ],
      contact: {
        phone: '+91 240 123 4567',
        email: 'cse@college.edu.in',
        office: 'Block A, 3rd Floor'
      },
      achievements: [
        'Best Department Award 2023',
        '95% Placement Rate',
        '15 Research Publications'
      ]
    },
    {
      id: 'ECE',
      name: 'Electronics & Communication Engineering',
      code: 'ECE',
      type: 'Engineering',
      established: '2008',
      hod: 'Dr. Priya Sharma',
      faculty: 22,
      students: 360,
      totalSeats: 90,
      status: 'Active',
      accreditation: 'NBA Accredited',
      lastAccreditation: '2022-08-20',
      nextReview: '2025-08-20',
      courses: 28,
      laboratories: 6,
      researchAreas: [
        'VLSI Design',
        'Digital Signal Processing',
        'Wireless Communication',
        'Embedded Systems',
        'IoT Applications'
      ],
      facilities: [
        'VLSI Design Lab',
        'Communication Lab',
        'Microprocessor Lab',
        'Digital Electronics Lab',
        'Signal Processing Lab'
      ],
      contact: {
        phone: '+91 240 123 4568',
        email: 'ece@college.edu.in',
        office: 'Block B, 2nd Floor'
      },
      achievements: [
        'Excellence in Research 2023',
        '88% Placement Rate',
        '12 Patent Applications'
      ]
    },
    {
      id: 'ME',
      name: 'Mechanical Engineering',
      code: 'ME',
      type: 'Engineering',
      established: '2005',
      hod: 'Prof. Amit Patel',
      faculty: 28,
      students: 420,
      totalSeats: 105,
      status: 'Active',
      accreditation: 'NBA Accredited',
      lastAccreditation: '2023-01-10',
      nextReview: '2026-01-10',
      courses: 30,
      laboratories: 10,
      researchAreas: [
        'Thermal Engineering',
        'Manufacturing Technology',
        'Automobile Engineering',
        'Renewable Energy',
        'Robotics & Automation'
      ],
      facilities: [
        'Manufacturing Lab',
        'Thermal Lab',
        'Automobile Workshop',
        'CAD/CAM Lab',
        'Materials Testing Lab'
      ],
      contact: {
        phone: '+91 240 123 4569',
        email: 'me@college.edu.in',
        office: 'Block C, Ground Floor'
      },
      achievements: [
        'Industry Collaboration Award',
        '92% Placement Rate',
        '20 Industry Projects'
      ]
    },
    {
      id: 'CE',
      name: 'Civil Engineering',
      code: 'CE',
      type: 'Engineering',
      established: '2007',
      hod: 'Prof. Arjun Singh',
      faculty: 20,
      students: 300,
      totalSeats: 75,
      status: 'Active',
      accreditation: 'Under Review',
      lastAccreditation: '2020-03-15',
      nextReview: '2024-12-30',
      courses: 26,
      laboratories: 7,
      researchAreas: [
        'Structural Engineering',
        'Environmental Engineering',
        'Transportation Engineering',
        'Geotechnical Engineering',
        'Construction Management'
      ],
      facilities: [
        'Structural Analysis Lab',
        'Environmental Lab',
        'Surveying Lab',
        'Materials Testing Lab',
        'Concrete Technology Lab'
      ],
      contact: {
        phone: '+91 240 123 4570',
        email: 'ce@college.edu.in',
        office: 'Block D, 1st Floor'
      },
      achievements: [
        'Infrastructure Excellence Award',
        '85% Placement Rate',
        '8 Government Projects'
      ]
    },
    {
      id: 'IT',
      name: 'Information Technology',
      code: 'IT',
      type: 'Engineering',
      established: '2012',
      hod: 'Dr. Sneha Desai',
      faculty: 18,
      students: 240,
      totalSeats: 60,
      status: 'Active',
      accreditation: 'Not Accredited',
      lastAccreditation: null,
      nextReview: '2025-03-01',
      courses: 24,
      laboratories: 5,
      researchAreas: [
        'Web Technologies',
        'Database Systems',
        'Cloud Computing',
        'Mobile App Development',
        'Information Security'
      ],
      facilities: [
        'Web Development Lab',
        'Database Lab',
        'Mobile App Lab',
        'Cloud Computing Lab',
        'Project Lab'
      ],
      contact: {
        phone: '+91 240 123 4571',
        email: 'it@college.edu.in',
        office: 'Block A, 2nd Floor'
      },
      achievements: [
        'Innovation in IT Award',
        '90% Placement Rate',
        '25 Industry Internships'
      ]
    },
    {
      id: 'MBA',
      name: 'Master of Business Administration',
      code: 'MBA',
      type: 'Management',
      established: '2015',
      hod: 'Dr. Kavita Mehta',
      faculty: 15,
      students: 120,
      totalSeats: 60,
      status: 'Active',
      accreditation: 'AICTE Approved',
      lastAccreditation: '2022-11-20',
      nextReview: '2025-11-20',
      courses: 18,
      laboratories: 2,
      researchAreas: [
        'Strategic Management',
        'Financial Management',
        'Marketing Research',
        'Human Resource Management',
        'Operations Management'
      ],
      facilities: [
        'Case Study Room',
        'Seminar Hall',
        'Computer Lab',
        'Library Resources',
        'Conference Room'
      ],
      contact: {
        phone: '+91 240 123 4572',
        email: 'mba@college.edu.in',
        office: 'Management Block, 3rd Floor'
      },
      achievements: [
        'Best Management Program 2023',
        '94% Placement Rate',
        'Corporate tie-ups with 50+ companies'
      ]
    }
  ];

  const types = ['All', 'Engineering', 'Management', 'Science', 'Arts'];
  const statuses = ['All', 'Active', 'Inactive', 'Under Development'];
  const accreditations = ['All', 'NBA Accredited', 'AICTE Approved', 'Under Review', 'Not Accredited'];

  // Filter branches based on search and filters
  const filteredBranches = branches.filter(branch => {
    const matchesSearch = branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         branch.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         branch.hod.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || branch.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || branch.status === selectedStatus;
    const matchesAccreditation = selectedAccreditation === 'All' || branch.accreditation === selectedAccreditation;
    
    return matchesSearch && matchesType && matchesStatus && matchesAccreditation;
  });

  // Sort branches
  const sortedBranches = [...filteredBranches].sort((a, b) => {
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
  const totalPages = Math.ceil(sortedBranches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBranches = sortedBranches.slice(startIndex, endIndex);

  // Calculate summary statistics
  const totalBranches = branches.length;
  const activeBranches = branches.filter(b => b.status === 'Active').length;
  const totalFaculty = branches.reduce((sum, b) => sum + b.faculty, 0);
  const totalStudents = branches.reduce((sum, b) => sum + b.students, 0);
  const accreditedBranches = branches.filter(b => b.accreditation === 'NBA Accredited').length;

  const handleSelectBranch = (branchId) => {
    setSelectedBranches(prev => 
      prev.includes(branchId) 
        ? prev.filter(id => id !== branchId)
        : [...prev, branchId]
    );
  };

  const handleSelectAll = () => {
    if (selectedBranches.length === currentBranches.length) {
      setSelectedBranches([]);
    } else {
      setSelectedBranches(currentBranches.map(b => b.id));
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-red-100 text-red-800',
      'Under Development': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getAccreditationBadge = (accreditation) => {
    const colors = {
      'NBA Accredited': 'bg-green-100 text-green-800',
      'AICTE Approved': 'bg-blue-100 text-blue-800',
      'Under Review': 'bg-yellow-100 text-yellow-800',
      'Not Accredited': 'bg-red-100 text-red-800'
    };
    return colors[accreditation] || 'bg-gray-100 text-gray-800';
  };

  const openDetailsModal = (branch) => {
    setSelectedBranchForDetails(branch);
    setShowDetailsModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Branch Management</h1>
              <p className="text-gray-600">Manage departments, faculty allocation, and academic structure</p>
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
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Branch
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
                <p className="text-sm text-gray-600">Total Branches</p>
                <p className="text-2xl font-bold text-gray-900">{totalBranches}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Branches</p>
                <p className="text-2xl font-bold text-gray-900">{activeBranches}</p>
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
                <p className="text-sm text-gray-600">NBA Accredited</p>
                <p className="text-2xl font-bold text-gray-900">{accreditedBranches}</p>
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
                  placeholder="Search by branch name, code, or HOD..."
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

            {selectedBranches.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">{selectedBranches.length} selected</span>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {types.map(type => (
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Accreditation</label>
                  <select
                    value={selectedAccreditation}
                    onChange={(e) => setSelectedAccreditation(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {accreditations.map(acc => (
                      <option key={acc} value={acc}>{acc}</option>
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

        {/* Branch Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedBranches.length === currentBranches.length && currentBranches.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Branch Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type & Establishment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Faculty & Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Courses & Labs
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status & Accreditation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentBranches.map((branch) => (
                  <tr key={branch.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedBranches.includes(branch.id)}
                        onChange={() => handleSelectBranch(branch.id)}
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
                          <div className="text-sm font-medium text-gray-900">{branch.name}</div>
                          <div className="text-sm text-gray-500">Code: {branch.code}</div>
                          <div className="text-xs text-gray-400">HOD: {branch.hod}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{branch.type}</div>
                      <div className="text-sm text-gray-500">Est. {branch.established}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Faculty: {branch.faculty}</div>
                      <div className="text-sm text-gray-500">Students: {branch.students}</div>
                      <div className="text-xs text-gray-400">Seats: {branch.totalSeats}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Courses: {branch.courses}</div>
                      <div className="text-sm text-gray-500">Labs: {branch.laboratories}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="mb-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(branch.status)}`}>
                          {branch.status}
                        </span>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAccreditationBadge(branch.accreditation)}`}>
                          {branch.accreditation}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => openDetailsModal(branch)}
                          className="text-blue-600 hover:text-blue-900" 
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900" title="Faculty Management">
                          <Users className="w-4 h-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900" title="Course Mapping">
                          <BookOpen className="w-4 h-4" />
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
                  <span className="font-medium">{Math.min(endIndex, sortedBranches.length)}</span> of{' '}
                  <span className="font-medium">{sortedBranches.length}</span> results
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

        {/* Branch Details Modal */}
        {showDetailsModal && selectedBranchForDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Branch Details</h3>
                    <p className="text-sm text-gray-600">{selectedBranchForDetails.name} ({selectedBranchForDetails.code})</p>
                  </div>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
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
                        <span className="text-sm text-gray-900">{selectedBranchForDetails.code}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Type:</span>
                        <span className="text-sm text-gray-900">{selectedBranchForDetails.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Established:</span>
                        <span className="text-sm text-gray-900">{selectedBranchForDetails.established}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Head of Department:</span>
                        <span className="text-sm text-gray-900">{selectedBranchForDetails.hod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">Status:</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(selectedBranchForDetails.status)}`}>
                          {selectedBranchForDetails.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Statistics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{selectedBranchForDetails.faculty}</div>
                        <div className="text-sm text-blue-800">Faculty Members</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{selectedBranchForDetails.students}</div>
                        <div className="text-sm text-green-800">Students Enrolled</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{selectedBranchForDetails.courses}</div>
                        <div className="text-sm text-purple-800">Courses Offered</div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{selectedBranchForDetails.laboratories}</div>
                        <div className="text-sm text-orange-800">Laboratories</div>
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
                          <div className="text-sm font-medium">{selectedBranchForDetails.contact.phone}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <div>
                          <div className="text-xs text-gray-500">Email</div>
                          <div className="text-sm font-medium">{selectedBranchForDetails.contact.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <div>
                          <div className="text-xs text-gray-500">Office Location</div>
                          <div className="text-sm font-medium">{selectedBranchForDetails.contact.office}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Accreditation Information */}
                <div className="mt-8">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Accreditation Status</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getAccreditationBadge(selectedBranchForDetails.accreditation)}`}>
                        {selectedBranchForDetails.accreditation}
                      </span>
                      <div className="text-sm text-gray-600">
                        Next Review: {selectedBranchForDetails.nextReview ? new Date(selectedBranchForDetails.nextReview).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                    {selectedBranchForDetails.lastAccreditation && (
                      <div className="text-sm text-gray-600">
                        Last Accreditation: {new Date(selectedBranchForDetails.lastAccreditation).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Research Areas */}
                <div className="mt-8">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Research Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedBranchForDetails.researchAreas.map((area, index) => (
                      <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Facilities */}
                <div className="mt-8">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Facilities</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedBranchForDetails.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-800">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="mt-8">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Recent Achievements</h4>
                  <div className="space-y-3">
                    {selectedBranchForDetails.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3 bg-yellow-50 p-3 rounded-lg">
                        <Award className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm text-yellow-800">{achievement}</span>
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
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
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

        {/* Add Branch Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Add New Branch</h3>
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
                  {/* Basic Branch Information */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Basic Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Branch Name *</label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter branch name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Branch Code *</label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="CSE"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option value="">Select Type</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Management">Management</option>
                          <option value="Science">Science</option>
                          <option value="Arts">Arts</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Established Year *</label>
                        <input
                          type="number"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="2020"
                          min="1900"
                          max="2030"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Head of Department *</label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Dr. Faculty Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Seats *</label>
                        <input
                          type="number"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="60"
                          min="1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Contact Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="+91 240 123 4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="dept@college.edu.in"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Office Location</label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Block A, 3rd Floor"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Research Areas */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Research Areas</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Research Area {i}</label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder={`Enter research area ${i}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Facilities */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Facilities</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Facility {i}</label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder={`Enter facility ${i}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Accreditation */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Accreditation Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Accreditation Status</label>
                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option value="">Select Status</option>
                          <option value="NBA Accredited">NBA Accredited</option>
                          <option value="AICTE Approved">AICTE Approved</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Not Accredited">Not Accredited</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Next Review Date</label>
                        <input
                          type="date"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      Add Branch
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