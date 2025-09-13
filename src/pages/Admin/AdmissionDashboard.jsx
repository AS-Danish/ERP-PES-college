import { useState } from 'react';
import { ChevronDown, Users, GraduationCap } from 'lucide-react';

export default function AdmissionDashboard() {
  const [enrollmentYear, setEnrollmentYear] = useState('2024-25');
  const [newAdmissionYear, setNewAdmissionYear] = useState('2024-25');
  const [admissionTypeYear, setAdmissionTypeYear] = useState('2024-25');
  const [isEnrollmentDropdownOpen, setIsEnrollmentDropdownOpen] = useState(false);
  const [isNewAdmissionDropdownOpen, setIsNewAdmissionDropdownOpen] = useState(false);
  const [isAdmissionTypeDropdownOpen, setIsAdmissionTypeDropdownOpen] = useState(false);

  const academicYears = ['2024-25', '2023-24', '2022-23', '2021-22'];

  // Sample data for all years
  const allYearData = {
    '2024-25': {
      enrollment: [
        {
          srNo: 1,
          program: 'B.Tech Electronics & Communication',
          firstYear: { male: 45, female: 25, total: 70 },
          secondYear: { male: 42, female: 23, total: 65 },
          thirdYear: { male: 40, female: 22, total: 62 },
          fourthYear: { male: 38, female: 20, total: 58 },
          total: { male: 165, female: 90, total: 255 }
        },
        {
          srNo: 2,
          program: 'B.Tech Computer Science',
          firstYear: { male: 55, female: 35, total: 90 },
          secondYear: { male: 52, female: 33, total: 85 },
          thirdYear: { male: 50, female: 30, total: 80 },
          fourthYear: { male: 48, female: 27, total: 75 },
          total: { male: 205, female: 125, total: 330 }
        },
        {
          srNo: 3,
          program: 'M.Tech Signal Processing',
          firstYear: { male: 15, female: 10, total: 25 },
          secondYear: { male: 12, female: 8, total: 20 },
          thirdYear: { male: 0, female: 0, total: 0 },
          fourthYear: { male: 0, female: 0, total: 0 },
          total: { male: 27, female: 18, total: 45 }
        }
      ],
      newAdmissions: [
        {
          srNo: 1,
          program: 'B.Tech Electronics & Communication',
          firstYear: 70,
          secondYear: 5,
          total: 75
        },
        {
          srNo: 2,
          program: 'B.Tech Computer Science',
          firstYear: 90,
          secondYear: 3,
          total: 93
        },
        {
          srNo: 3,
          program: 'M.Tech Signal Processing',
          firstYear: 25,
          secondYear: 2,
          total: 27
        }
      ],
      admissionTypes: [
        {
          type: 'CAP 1',
          firstYear: { male: 80, female: 45, total: 125 },
          secondYear: { male: 5, female: 3, total: 8 },
          total: { male: 85, female: 48, total: 133 }
        },
        {
          type: 'CAP 2',
          firstYear: { male: 35, female: 20, total: 55 },
          secondYear: { male: 3, female: 2, total: 5 },
          total: { male: 38, female: 22, total: 60 }
        },
        {
          type: 'CAP 3',
          firstYear: { male: 20, female: 12, total: 32 },
          secondYear: { male: 1, female: 1, total: 2 },
          total: { male: 21, female: 13, total: 34 }
        },
        {
          type: 'Institute Level',
          firstYear: { male: 25, female: 15, total: 40 },
          secondYear: { male: 1, female: 1, total: 2 },
          total: { male: 26, female: 16, total: 42 }
        },
        {
          type: 'Against CAP',
          firstYear: { male: 8, female: 5, total: 13 },
          secondYear: { male: 0, female: 0, total: 0 },
          total: { male: 8, female: 5, total: 13 }
        },
        {
          type: 'Data not filled',
          firstYear: { male: 12, female: 8, total: 20 },
          secondYear: { male: 0, female: 0, total: 0 },
          total: { male: 12, female: 8, total: 20 }
        }
      ]
    },
    '2023-24': {
      enrollment: [
        {
          srNo: 1,
          program: 'B.Tech Electronics & Communication',
          firstYear: { male: 42, female: 23, total: 65 },
          secondYear: { male: 40, female: 22, total: 62 },
          thirdYear: { male: 38, female: 20, total: 58 },
          fourthYear: { male: 36, female: 18, total: 54 },
          total: { male: 156, female: 83, total: 239 }
        },
        {
          srNo: 2,
          program: 'B.Tech Computer Science',
          firstYear: { male: 52, female: 33, total: 85 },
          secondYear: { male: 50, female: 30, total: 80 },
          thirdYear: { male: 48, female: 27, total: 75 },
          fourthYear: { male: 46, female: 24, total: 70 },
          total: { male: 196, female: 114, total: 310 }
        },
        {
          srNo: 3,
          program: 'M.Tech Signal Processing',
          firstYear: { male: 12, female: 8, total: 20 },
          secondYear: { male: 10, female: 6, total: 16 },
          thirdYear: { male: 0, female: 0, total: 0 },
          fourthYear: { male: 0, female: 0, total: 0 },
          total: { male: 22, female: 14, total: 36 }
        }
      ],
      newAdmissions: [
        {
          srNo: 1,
          program: 'B.Tech Electronics & Communication',
          firstYear: 65,
          secondYear: 4,
          total: 69
        },
        {
          srNo: 2,
          program: 'B.Tech Computer Science',
          firstYear: 85,
          secondYear: 2,
          total: 87
        },
        {
          srNo: 3,
          program: 'M.Tech Signal Processing',
          firstYear: 20,
          secondYear: 1,
          total: 21
        }
      ],
      admissionTypes: [
        {
          type: 'CAP 1',
          firstYear: { male: 75, female: 42, total: 117 },
          secondYear: { male: 4, female: 2, total: 6 },
          total: { male: 79, female: 44, total: 123 }
        },
        {
          type: 'CAP 2',
          firstYear: { male: 32, female: 18, total: 50 },
          secondYear: { male: 2, female: 1, total: 3 },
          total: { male: 34, female: 19, total: 53 }
        },
        {
          type: 'CAP 3',
          firstYear: { male: 18, female: 10, total: 28 },
          secondYear: { male: 1, female: 0, total: 1 },
          total: { male: 19, female: 10, total: 29 }
        },
        {
          type: 'Institute Level',
          firstYear: { male: 22, female: 13, total: 35 },
          secondYear: { male: 0, female: 1, total: 1 },
          total: { male: 22, female: 14, total: 36 }
        },
        {
          type: 'Against CAP',
          firstYear: { male: 6, female: 4, total: 10 },
          secondYear: { male: 0, female: 0, total: 0 },
          total: { male: 6, female: 4, total: 10 }
        },
        {
          type: 'Data not filled',
          firstYear: { male: 10, female: 6, total: 16 },
          secondYear: { male: 0, female: 0, total: 0 },
          total: { male: 10, female: 6, total: 16 }
        }
      ]
    },
    '2022-23': {
      enrollment: [
        {
          srNo: 1,
          program: 'B.Tech Electronics & Communication',
          firstYear: { male: 40, female: 22, total: 62 },
          secondYear: { male: 38, female: 20, total: 58 },
          thirdYear: { male: 36, female: 18, total: 54 },
          fourthYear: { male: 34, female: 16, total: 50 },
          total: { male: 148, female: 76, total: 224 }
        },
        {
          srNo: 2,
          program: 'B.Tech Computer Science',
          firstYear: { male: 50, female: 30, total: 80 },
          secondYear: { male: 48, female: 27, total: 75 },
          thirdYear: { male: 46, female: 24, total: 70 },
          fourthYear: { male: 44, female: 21, total: 65 },
          total: { male: 188, female: 102, total: 290 }
        },
        {
          srNo: 3,
          program: 'M.Tech Signal Processing',
          firstYear: { male: 10, female: 6, total: 16 },
          secondYear: { male: 8, female: 4, total: 12 },
          thirdYear: { male: 0, female: 0, total: 0 },
          fourthYear: { male: 0, female: 0, total: 0 },
          total: { male: 18, female: 10, total: 28 }
        }
      ],
      newAdmissions: [
        {
          srNo: 1,
          program: 'B.Tech Electronics & Communication',
          firstYear: 62,
          secondYear: 3,
          total: 65
        },
        {
          srNo: 2,
          program: 'B.Tech Computer Science',
          firstYear: 80,
          secondYear: 2,
          total: 82
        },
        {
          srNo: 3,
          program: 'M.Tech Signal Processing',
          firstYear: 16,
          secondYear: 1,
          total: 17
        }
      ],
      admissionTypes: [
        {
          type: 'CAP 1',
          firstYear: { male: 70, female: 38, total: 108 },
          secondYear: { male: 3, female: 2, total: 5 },
          total: { male: 73, female: 40, total: 113 }
        },
        {
          type: 'CAP 2',
          firstYear: { male: 28, female: 16, total: 44 },
          secondYear: { male: 2, female: 1, total: 3 },
          total: { male: 30, female: 17, total: 47 }
        },
        {
          type: 'CAP 3',
          firstYear: { male: 16, female: 8, total: 24 },
          secondYear: { male: 1, female: 0, total: 1 },
          total: { male: 17, female: 8, total: 25 }
        },
        {
          type: 'Institute Level',
          firstYear: { male: 20, female: 11, total: 31 },
          secondYear: { male: 0, female: 0, total: 0 },
          total: { male: 20, female: 11, total: 31 }
        },
        {
          type: 'Against CAP',
          firstYear: { male: 4, female: 3, total: 7 },
          secondYear: { male: 0, female: 0, total: 0 },
          total: { male: 4, female: 3, total: 7 }
        },
        {
          type: 'Data not filled',
          firstYear: { male: 8, female: 4, total: 12 },
          secondYear: { male: 0, female: 0, total: 0 },
          total: { male: 8, female: 4, total: 12 }
        }
      ]
    },
    '2021-22': {
      enrollment: [
        {
          srNo: 1,
          program: 'B.Tech Electronics & Communication',
          firstYear: { male: 38, female: 20, total: 58 },
          secondYear: { male: 36, female: 18, total: 54 },
          thirdYear: { male: 34, female: 16, total: 50 },
          fourthYear: { male: 32, female: 14, total: 46 },
          total: { male: 140, female: 68, total: 208 }
        },
        {
          srNo: 2,
          program: 'B.Tech Computer Science',
          firstYear: { male: 48, female: 27, total: 75 },
          secondYear: { male: 46, female: 24, total: 70 },
          thirdYear: { male: 44, female: 21, total: 65 },
          fourthYear: { male: 42, female: 18, total: 60 },
          total: { male: 180, female: 90, total: 270 }
        },
        {
          srNo: 3,
          program: 'M.Tech Signal Processing',
          firstYear: { male: 8, female: 4, total: 12 },
          secondYear: { male: 6, female: 2, total: 8 },
          thirdYear: { male: 0, female: 0, total: 0 },
          fourthYear: { male: 0, female: 0, total: 0 },
          total: { male: 14, female: 6, total: 20 }
        }
      ],
      newAdmissions: [
        {
          srNo: 1,
          program: 'B.Tech Electronics & Communication',
          firstYear: 58,
          secondYear: 2,
          total: 60
        },
        {
          srNo: 2,
          program: 'B.Tech Computer Science',
          firstYear: 75,
          secondYear: 1,
          total: 76
        },
        {
          srNo: 3,
          program: 'M.Tech Signal Processing',
          firstYear: 12,
          secondYear: 0,
          total: 12
        }
      ],
      admissionTypes: [
        {
          type: 'CAP 1',
          firstYear: { male: 65, female: 35, total: 100 },
          secondYear: { male: 2, female: 1, total: 3 },
          total: { male: 67, female: 36, total: 103 }
        },
        {
          type: 'CAP 2',
          firstYear: { male: 25, female: 14, total: 39 },
          secondYear: { male: 1, female: 0, total: 1 },
          total: { male: 26, female: 14, total: 40 }
        },
        {
          type: 'CAP 3',
          firstYear: { male: 14, female: 6, total: 20 },
          secondYear: { male: 0, female: 0, total: 0 },
          total: { male: 14, female: 6, total: 20 }
        },
        {
          type: 'Institute Level',
          firstYear: { male: 18, female: 9, total: 27 },
          secondYear: { male: 0, female: 0, total: 0 },
          total: { male: 18, female: 9, total: 27 }
        },
        {
          type: 'Against CAP',
          firstYear: { male: 2, female: 2, total: 4 },
          secondYear: { male: 0, female: 0, total: 0 },
          total: { male: 2, female: 2, total: 4 }
        },
        {
          type: 'Data not filled',
          firstYear: { male: 6, female: 2, total: 8 },
          secondYear: { male: 0, female: 0, total: 0 },
          total: { male: 6, female: 2, total: 8 }
        }
      ]
    }
  };

  // Get data for selected years
  const enrollmentData = allYearData[enrollmentYear]?.enrollment || [];
  const newAdmissionData = allYearData[newAdmissionYear]?.newAdmissions || [];
  const admissionTypeData = allYearData[admissionTypeYear]?.admissionTypes || [];

  // Calculate totals based on enrollment year
  const ugTotal = allYearData[enrollmentYear]?.enrollment
    .filter(item => item.program.startsWith('B.'))
    .reduce((sum, item) => sum + item.total.total, 0) || 0;
  
  const pgTotal = allYearData[enrollmentYear]?.enrollment
    .filter(item => item.program.startsWith('M.'))
    .reduce((sum, item) => sum + item.total.total, 0) || 0;

  // Calculate admission type totals
  const admissionTotals = admissionTypeData.reduce(
    (acc, item) => ({
      male: acc.male + item.total.male,
      female: acc.female + item.total.female,
      total: acc.total + item.total.total
    }),
    { male: 0, female: 0, total: 0 }
  );

  // Close all dropdowns when clicking outside
  const closeAllDropdowns = () => {
    setIsEnrollmentDropdownOpen(false);
    setIsNewAdmissionDropdownOpen(false);
    setIsAdmissionTypeDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admission Dashboard</h1>
          <p className="text-gray-600">Comprehensive view of student admissions and enrollment</p>
        </div>

        {/* Academic Year Filter */}
        <div className="mb-6">
          <div className="text-sm text-gray-600 mb-2">Global Overview Filters:</div>
          <div className="relative inline-block">
            <button
              onClick={() => {
                setIsEnrollmentDropdownOpen(!isEnrollmentDropdownOpen);
                setIsNewAdmissionDropdownOpen(false);
                setIsAdmissionTypeDropdownOpen(false);
              }}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
            >
              Summary Cards Year: {enrollmentYear}
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {isEnrollmentDropdownOpen && (
              <div className="absolute top-full mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {academicYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      setEnrollmentYear(year);
                      setIsEnrollmentDropdownOpen(false);
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">UG Students Total</p>
                <p className="text-2xl font-bold text-gray-900">{ugTotal}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">PG Students Total</p>
                <p className="text-2xl font-bold text-gray-900">{pgTotal}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Student Enrollment Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Student Enrollment by Program</h2>
            <div className="relative">
              <button
                onClick={() => {
                  setIsEnrollmentDropdownOpen(!isEnrollmentDropdownOpen);
                  setIsNewAdmissionDropdownOpen(false);
                  setIsAdmissionTypeDropdownOpen(false);
                }}
                className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
              >
                {enrollmentYear}
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {isEnrollmentDropdownOpen && (
                <div className="absolute top-full mt-1 right-0 w-32 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
                  {academicYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        setEnrollmentYear(year);
                        setIsEnrollmentDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">Sr. No.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">Program</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r" colSpan={3}>First Year</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r" colSpan={3}>Second Year</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r" colSpan={3}>Third Year</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r" colSpan={3}>Fourth Year</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" colSpan={3}>Total</th>
                </tr>
                <tr className="bg-gray-50 border-t">
                  <th className="border-r"></th>
                  <th className="border-r"></th>
                  <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r">Male</th>
                  <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r">Female</th>
                  <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r">Total</th>
                  <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r">Male</th>
                  <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r">Female</th>
                  <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r">Total</th>
                  <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r">Male</th>
                  <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r">Female</th>
                  <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r">Total</th>
                  <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r">Male</th>
                  <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r">Female</th>
                  <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r">Total</th>
                  <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r">Male</th>
                  <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r">Female</th>
                  <th className="px-2 py-2 text-xs font-medium text-gray-500">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {enrollmentData.map((row) => (
                  <tr key={row.srNo} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r">{row.srNo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r font-medium">{row.program}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r">{row.firstYear.male}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r">{row.firstYear.female}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center border-r">{row.firstYear.total}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r">{row.secondYear.male}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r">{row.secondYear.female}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center border-r">{row.secondYear.total}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r">{row.thirdYear.male}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r">{row.thirdYear.female}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center border-r">{row.thirdYear.total}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r">{row.fourthYear.male}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r">{row.fourthYear.female}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center border-r">{row.fourthYear.total}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm font-semibold text-blue-900 text-center border-r">{row.total.male}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm font-semibold text-pink-900 text-center border-r">{row.total.female}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 text-center">{row.total.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Newly Admitted Students Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Newly Admitted Students</h2>
            <div className="relative">
              <button
                onClick={() => {
                  setIsNewAdmissionDropdownOpen(!isNewAdmissionDropdownOpen);
                  setIsEnrollmentDropdownOpen(false);
                  setIsAdmissionTypeDropdownOpen(false);
                }}
                className="bg-green-50 border border-green-200 rounded-lg px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center gap-2"
              >
                {newAdmissionYear}
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {isNewAdmissionDropdownOpen && (
                <div className="absolute top-full mt-1 right-0 w-32 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
                  {academicYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        setNewAdmissionYear(year);
                        setIsNewAdmissionDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr. No.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">First Year</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Second Year</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {newAdmissionData.map((row) => (
                  <tr key={row.srNo} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.srNo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.program}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{row.firstYear}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{row.secondYear}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 text-center">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Admission Type Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Admission Type (Program-wise)</h2>
            <div className="relative">
              <button
                onClick={() => {
                  setIsAdmissionTypeDropdownOpen(!isAdmissionTypeDropdownOpen);
                  setIsEnrollmentDropdownOpen(false);
                  setIsNewAdmissionDropdownOpen(false);
                }}
                className="bg-purple-50 border border-purple-200 rounded-lg px-3 py-1.5 text-sm font-medium text-purple-700 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center gap-2"
              >
                {admissionTypeYear}
                <ChevronDown className="w-3 h-3" />
              </button>
              
              {isAdmissionTypeDropdownOpen && (
                <div className="absolute top-full mt-1 right-0 w-32 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
                  {academicYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        setAdmissionTypeYear(year);
                        setIsAdmissionTypeDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">Admission Type</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r" colSpan={3}>First Year</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r" colSpan={3}>Second Year</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" colSpan={3}>Total</th>
                </tr>
                <tr className="bg-gray-50 border-t">
                  <th className="border-r"></th>
                  <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r">Male</th>
                  <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r">Female</th>
                  <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r">Total</th>
                  <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r">Male</th>
                  <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r">Female</th>
                  <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r">Total</th>
                  <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r">Male</th>
                  <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r">Female</th>
                  <th className="px-2 py-2 text-xs font-medium text-gray-500">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {admissionTypeData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">{row.type}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r">{row.firstYear.male}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r">{row.firstYear.female}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center border-r">{row.firstYear.total}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r">{row.secondYear.male}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r">{row.secondYear.female}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center border-r">{row.secondYear.total}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm font-semibold text-blue-900 text-center border-r">{row.total.male}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm font-semibold text-pink-900 text-center border-r">{row.total.female}</td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 text-center">{row.total.total}</td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="bg-gray-100 font-semibold">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r">Total</td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r">
                    {admissionTypeData.reduce((sum, row) => sum + row.firstYear.male, 0)}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r">
                    {admissionTypeData.reduce((sum, row) => sum + row.firstYear.female, 0)}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r">
                    {admissionTypeData.reduce((sum, row) => sum + row.firstYear.total, 0)}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r">
                    {admissionTypeData.reduce((sum, row) => sum + row.secondYear.male, 0)}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r">
                    {admissionTypeData.reduce((sum, row) => sum + row.secondYear.female, 0)}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900 text-center border-r">
                    {admissionTypeData.reduce((sum, row) => sum + row.secondYear.total, 0)}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm font-bold text-blue-900 text-center border-r">
                    {admissionTotals.male}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm font-bold text-pink-900 text-center border-r">
                    {admissionTotals.female}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-center">
                    {admissionTotals.total}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}