import { useState } from 'react';
import { Search, ChevronDown, Eye, Download, ChevronLeft, ChevronRight } from 'lucide-react';

export default function StudentRecordsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [academicYear, setAcademicYear] = useState('2024-25');
  const [selectedProgram, setSelectedProgram] = useState('All Programs');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAcademicDropdownOpen, setIsAcademicDropdownOpen] = useState(false);
  const [isProgramDropdownOpen, setIsProgramDropdownOpen] = useState(false);
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);

  const studentsPerPage = 30;
  
  const academicYears = ['2024-25', '2023-24', '2022-23', '2021-22'];
  const programs = ['All Programs', 'B.Tech Electronics & Communication', 'B.Tech Computer Science', 'M.Tech Signal Processing'];
  const classes = ['All Classes', 'First Year', 'Second Year', 'Third Year', 'Fourth Year'];

  // Sample student data - in real application, this would come from API
  const allStudents = [
    {
      srNo: 1,
      studentCode: 'EC24001',
      fullName: 'Aadhya Sharma',
      prn: '24EC001',
      program: 'B.Tech Electronics & Communication',
      class: 'First Year',
      academicYear: '2024-25'
    },
    {
      srNo: 2,
      studentCode: 'EC24002',
      fullName: 'Arjun Patel',
      prn: '24EC002',
      program: 'B.Tech Electronics & Communication',
      class: 'First Year',
      academicYear: '2024-25'
    },
    {
      srNo: 3,
      studentCode: 'CS24001',
      fullName: 'Priya Singh',
      prn: '24CS001',
      program: 'B.Tech Computer Science',
      class: 'First Year',
      academicYear: '2024-25'
    },
    {
      srNo: 4,
      studentCode: 'EC23001',
      fullName: 'Rahul Kumar',
      prn: '23EC001',
      program: 'B.Tech Electronics & Communication',
      class: 'Second Year',
      academicYear: '2024-25'
    },
    {
      srNo: 5,
      studentCode: 'CS23001',
      fullName: 'Ananya Joshi',
      prn: '23CS001',
      program: 'B.Tech Computer Science',
      class: 'Second Year',
      academicYear: '2024-25'
    },
    {
      srNo: 6,
      studentCode: 'EC22001',
      fullName: 'Vikram Mehta',
      prn: '22EC001',
      program: 'B.Tech Electronics & Communication',
      class: 'Third Year',
      academicYear: '2024-25'
    },
    {
      srNo: 7,
      studentCode: 'CS22001',
      fullName: 'Kavya Reddy',
      prn: '22CS001',
      program: 'B.Tech Computer Science',
      class: 'Third Year',
      academicYear: '2024-25'
    },
    {
      srNo: 8,
      studentCode: 'EC21001',
      fullName: 'Aditya Gupta',
      prn: '21EC001',
      program: 'B.Tech Electronics & Communication',
      class: 'Fourth Year',
      academicYear: '2024-25'
    },
    {
      srNo: 9,
      studentCode: 'CS21001',
      fullName: 'Sneha Verma',
      prn: '21CS001',
      program: 'B.Tech Computer Science',
      class: 'Fourth Year',
      academicYear: '2024-25'
    },
    {
      srNo: 10,
      studentCode: 'MT24001',
      fullName: 'Rohan Das',
      prn: '24MT001',
      program: 'M.Tech Signal Processing',
      class: 'First Year',
      academicYear: '2024-25'
    },
    // Add more sample data to demonstrate pagination
    ...Array.from({ length: 80 }, (_, i) => ({
      srNo: i + 11,
      studentCode: `ST${24000 + i + 11}`,
      fullName: `Student ${i + 11}`,
      prn: `24ST${String(i + 11).padStart(3, '0')}`,
      program: programs[Math.floor(Math.random() * (programs.length - 1)) + 1],
      class: classes[Math.floor(Math.random() * (classes.length - 1)) + 1],
      academicYear: '2024-25'
    }))
  ];

  // Filter students based on search and filters
  const filteredStudents = allStudents.filter(student => {
    const matchesSearch = searchTerm === '' || 
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.prn.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAcademicYear = student.academicYear === academicYear;
    const matchesProgram = selectedProgram === 'All Programs' || student.program === selectedProgram;
    const matchesClass = selectedClass === 'All Classes' || student.class === selectedClass;
    
    return matchesSearch && matchesAcademicYear && matchesProgram && matchesClass;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, endIndex);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleViewStudent = (student) => {
    // Handle view student details
    console.log('View student:', student);
  };

  const handleDownloadReport = () => {
    // Handle download report
    console.log('Download report for current filters');
  };

  const closeAllDropdowns = () => {
    setIsAcademicDropdownOpen(false);
    setIsProgramDropdownOpen(false);
    setIsClassDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6" onClick={closeAllDropdowns}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Records</h1>
          <p className="text-gray-600">Search and manage student records across all programs</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Search Students</h2>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by Student Name or Code
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter student name, student code, or PRN..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 font-medium"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Class-wise Student List</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Academic Year Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAcademicDropdownOpen(!isAcademicDropdownOpen);
                    setIsProgramDropdownOpen(false);
                    setIsClassDropdownOpen(false);
                  }}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
                >
                  {academicYear}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isAcademicDropdownOpen && (
                  <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {academicYears.map((year) => (
                      <button
                        key={year}
                        onClick={(e) => {
                          e.stopPropagation();
                          setAcademicYear(year);
                          setIsAcademicDropdownOpen(false);
                          setCurrentPage(1);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Program Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Program</label>
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProgramDropdownOpen(!isProgramDropdownOpen);
                    setIsAcademicDropdownOpen(false);
                    setIsClassDropdownOpen(false);
                  }}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
                >
                  {selectedProgram}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isProgramDropdownOpen && (
                  <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {programs.map((program) => (
                      <button
                        key={program}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProgram(program);
                          setIsProgramDropdownOpen(false);
                          setCurrentPage(1);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {program}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Class Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsClassDropdownOpen(!isClassDropdownOpen);
                    setIsAcademicDropdownOpen(false);
                    setIsProgramDropdownOpen(false);
                  }}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
                >
                  {selectedClass}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isClassDropdownOpen && (
                  <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    {classes.map((classItem) => (
                      <button
                        key={classItem}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedClass(classItem);
                          setIsClassDropdownOpen(false);
                          setCurrentPage(1);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {classItem}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="text-sm text-gray-600 mb-4">
            Showing {currentStudents.length} of {filteredStudents.length} students
            {searchTerm && ` matching "${searchTerm}"`}
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr. No.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRN</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentStudents.length > 0 ? (
                  currentStudents.map((student, index) => (
                    <tr key={student.studentCode} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.studentCode}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.prn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.program}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.class}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleViewStudent(student)}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-1 mx-auto text-sm font-medium"
                        >
                          <Eye className="w-3 h-3" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      No students found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Download Report Button */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleDownloadReport}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center gap-2 font-medium"
          >
            <Download className="w-4 h-4" />
            Download Report
          </button>
        </div>

        {/* Pagination */}
        {filteredStudents.length > studentsPerPage && (
          <div className="flex items-center justify-between bg-white px-6 py-3 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span>
                Showing {startIndex + 1} to {Math.min(endIndex, filteredStudents.length)} of{' '}
                {filteredStudents.length} results
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        currentPage === pageNumber
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}