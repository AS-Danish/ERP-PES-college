import { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Trash2, 
  Plus,
  Filter,
  Search,
  User,
  Building2,
  GraduationCap,
  CalendarDays,
  RefreshCw,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Save,
  X
} from 'lucide-react';

export default function ClassAssignmentManagement() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [lectureDate, setLectureDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [subjectType, setSubjectType] = useState('Theory');
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [showConflicts, setShowConflicts] = useState(false);
  const [currentView, setCurrentView] = useState('assign'); // assign, schedule, logs
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [editingLecture, setEditingLecture] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [calendarView, setCalendarView] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Sample data
  const departments = [
    { id: 'CSE', name: 'Computer Science & Engineering' },
    { id: 'ECE', name: 'Electronics & Communication' },
    { id: 'ME', name: 'Mechanical Engineering' },
    { id: 'CE', name: 'Civil Engineering' },
    { id: 'IT', name: 'Information Technology' }
  ];

  const classes = {
    'CSE': [
      { id: 'CSE-1A', name: 'CSE 1st Year A', batches: ['Batch 1', 'Batch 2', 'Batch 3'] },
      { id: 'CSE-1B', name: 'CSE 1st Year B', batches: ['Batch 1', 'Batch 2', 'Batch 3'] },
      { id: 'CSE-2A', name: 'CSE 2nd Year A', batches: ['Batch 1', 'Batch 2', 'Batch 3'] },
      { id: 'CSE-3A', name: 'CSE 3rd Year A', batches: ['Batch 1', 'Batch 2', 'Batch 3'] }
    ],
    'ECE': [
      { id: 'ECE-1A', name: 'ECE 1st Year A', batches: ['Batch 1', 'Batch 2'] },
      { id: 'ECE-2A', name: 'ECE 2nd Year A', batches: ['Batch 1', 'Batch 2'] }
    ]
  };

  const faculties = {
    'CSE': [
      { id: 'F001', name: 'Dr. Rajesh Kumar', subjects: ['Data Structures', 'Algorithms', 'DBMS'] },
      { id: 'F002', name: 'Prof. Priya Sharma', subjects: ['Java Programming', 'Web Development', 'Software Engineering'] },
      { id: 'F003', name: 'Dr. Amit Patel', subjects: ['Operating Systems', 'Computer Networks', 'Cyber Security'] }
    ],
    'ECE': [
      { id: 'F004', name: 'Dr. Sneha Desai', subjects: ['Digital Electronics', 'Microprocessors', 'VLSI Design'] },
      { id: 'F005', name: 'Prof. Arjun Singh', subjects: ['Signal Processing', 'Communication Systems', 'Embedded Systems'] }
    ]
  };

  const subjects = {
    'CSE-1A': [
      { id: 'CS101', name: 'Programming in C', type: 'both', credits: 4 },
      { id: 'CS102', name: 'Data Structures', type: 'both', credits: 4 },
      { id: 'CS103', name: 'Mathematics-I', type: 'theory', credits: 3 }
    ],
    'CSE-2A': [
      { id: 'CS201', name: 'Java Programming', type: 'both', credits: 4 },
      { id: 'CS202', name: 'Database Management', type: 'both', credits: 4 },
      { id: 'CS203', name: 'Computer Networks', type: 'both', credits: 4 }
    ]
  };

  // Sample scheduled lectures
  const [scheduledLectures, setScheduledLectures] = useState([
    {
      id: 'L001',
      department: 'CSE',
      class: 'CSE-2A',
      faculty: 'Dr. Rajesh Kumar',
      subject: 'Data Structures',
      date: '2025-09-15',
      startTime: '09:00',
      endTime: '10:00',
      type: 'Theory',
      status: 'Scheduled',
      createdBy: 'Admin',
      createdAt: '2025-09-13 10:30:00',
      batches: null
    },
    {
      id: 'L002',
      department: 'CSE',
      class: 'CSE-2A',
      faculty: 'Prof. Priya Sharma',
      subject: 'Java Programming',
      date: '2025-09-15',
      startTime: '10:00',
      endTime: '12:00',
      type: 'Practical',
      status: 'Scheduled',
      createdBy: 'Admin',
      createdAt: '2025-09-13 11:15:00',
      batches: ['Batch 1']
    },
    {
      id: 'L003',
      department: 'CSE',
      class: 'CSE-1A',
      faculty: 'Dr. Amit Patel',
      subject: 'Operating Systems',
      date: '2025-09-14',
      startTime: '11:00',
      endTime: '12:00',
      type: 'Theory',
      status: 'Completed',
      createdBy: 'Admin',
      createdAt: '2025-09-12 14:20:00',
      batches: null
    },
    {
      id: 'L004',
      department: 'ECE',
      class: 'ECE-1A',
      faculty: 'Dr. Sneha Desai',
      subject: 'Digital Electronics',
      date: '2025-09-16',
      startTime: '14:00',
      endTime: '15:00',
      type: 'Theory',
      status: 'Cancelled',
      createdBy: 'Admin',
      createdAt: '2025-09-13 09:45:00',
      cancelledBy: 'Dr. Sneha Desai',
      cancelledAt: '2025-09-13 16:30:00',
      cancelReason: 'Faculty unavailable',
      batches: null
    }
  ]);

  // Time slots
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  // Check for conflicts
  const checkConflicts = () => {
    if (!selectedFaculty || !selectedClass || !lectureDate || !startTime || !endTime) {
      setConflicts([]);
      return;
    }

    const newConflicts = [];
    const lectureStart = new Date(`${lectureDate} ${startTime}`);
    const lectureEnd = new Date(`${lectureDate} ${endTime}`);

    scheduledLectures.forEach(lecture => {
      if (lecture.status === 'Cancelled') return;
      
      const existingStart = new Date(`${lecture.date} ${lecture.startTime}`);
      const existingEnd = new Date(`${lecture.date} ${lecture.endTime}`);

      // Check faculty conflict
      if (lecture.faculty === selectedFaculty && 
          ((lectureStart >= existingStart && lectureStart < existingEnd) ||
           (lectureEnd > existingStart && lectureEnd <= existingEnd) ||
           (lectureStart <= existingStart && lectureEnd >= existingEnd))) {
        newConflicts.push({
          type: 'Faculty Conflict',
          message: `${selectedFaculty} is already assigned to ${lecture.class} (${lecture.subject}) from ${lecture.startTime} to ${lecture.endTime}`,
          severity: 'high'
        });
      }

      // Check class conflict
      if (lecture.class === selectedClass &&
          ((lectureStart >= existingStart && lectureStart < existingEnd) ||
           (lectureEnd > existingStart && lectureEnd <= existingEnd) ||
           (lectureStart <= existingStart && lectureEnd >= existingEnd))) {
        newConflicts.push({
          type: 'Class Conflict',
          message: `${selectedClass} already has a lecture (${lecture.subject}) from ${lecture.startTime} to ${lecture.endTime}`,
          severity: 'high'
        });
      }
    });

    setConflicts(newConflicts);
    setShowConflicts(newConflicts.length > 0);
  };

  useEffect(() => {
    checkConflicts();
  }, [selectedFaculty, selectedClass, lectureDate, startTime, endTime]);

  // Auto-set end time based on type
  useEffect(() => {
    if (startTime && subjectType) {
      const start = new Date(`2000-01-01 ${startTime}`);
      const hours = subjectType === 'Theory' ? 1 : 2;
      start.setHours(start.getHours() + hours);
      setEndTime(start.toTimeString().slice(0, 5));
    }
  }, [startTime, subjectType]);

  const handleAssignLecture = () => {
    if (conflicts.length > 0) {
      alert('Please resolve conflicts before assigning the lecture.');
      return;
    }

    if (!selectedDepartment || !selectedClass || !selectedFaculty || !selectedSubject || !lectureDate || !startTime || !endTime) {
      alert('Please fill in all required fields.');
      return;
    }

    if (subjectType === 'Practical' && selectedBatches.length === 0) {
      alert('Please select at least one batch for practical sessions.');
      return;
    }

    const newLecture = {
      id: `L${Date.now()}`,
      department: selectedDepartment,
      class: selectedClass,
      faculty: selectedFaculty,
      subject: selectedSubject,
      date: lectureDate,
      startTime,
      endTime,
      type: subjectType,
      status: 'Scheduled',
      createdBy: 'Admin',
      createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      batches: subjectType === 'Practical' ? selectedBatches : null
    };

    setScheduledLectures([...scheduledLectures, newLecture]);
    
    // Reset form
    setSelectedDepartment('');
    setSelectedClass('');
    setSelectedFaculty('');
    setSelectedSubject('');
    setLectureDate('');
    setStartTime('');
    setEndTime('');
    setSubjectType('Theory');
    setSelectedBatches([]);
    setConflicts([]);
    setShowConflicts(false);

    alert('Lecture assigned successfully!');
  };

  const handleEditLecture = (lecture) => {
    setEditingLecture(lecture);
    setShowEditModal(true);
  };

  const handleCancelLecture = (lectureId) => {
    const reason = prompt('Please provide a reason for cancellation:');
    if (!reason) return;

    setScheduledLectures(prev => prev.map(lecture => 
      lecture.id === lectureId 
        ? {
            ...lecture, 
            status: 'Cancelled',
            cancelledBy: 'Admin',
            cancelledAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
            cancelReason: reason
          }
        : lecture
    ));
  };

  const getStatusBadge = (status) => {
    const badges = {
      'Scheduled': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800',
      'In Progress': 'bg-yellow-100 text-yellow-800'
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Scheduled': return <Clock className="w-4 h-4" />;
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      case 'Cancelled': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredLectures = scheduledLectures.filter(lecture => {
    const matchesSearch = 
      lecture.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecture.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecture.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || lecture.status === statusFilter;
    const matchesDate = !dateFilter || lecture.date === dateFilter;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const renderCalendarView = () => {
    const weekStart = new Date(currentWeek);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      days.push(day);
    }

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Weekly Schedule</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                const newWeek = new Date(currentWeek);
                newWeek.setDate(newWeek.getDate() - 7);
                setCurrentWeek(newWeek);
              }}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium text-gray-700">
              {weekStart.toDateString()} - {days[6].toDateString()}
            </span>
            <button
              onClick={() => {
                const newWeek = new Date(currentWeek);
                newWeek.setDate(newWeek.getDate() + 7);
                setCurrentWeek(newWeek);
              }}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-8 gap-1">
          <div className="p-2 text-xs font-medium text-gray-500">Time</div>
          {days.map(day => (
            <div key={day.toISOString()} className="p-2 text-xs font-medium text-gray-500 text-center">
              <div>{day.toLocaleDateString('en', { weekday: 'short' })}</div>
              <div>{day.getDate()}</div>
            </div>
          ))}
          
          {timeSlots.map(time => (
            <>
              <div key={time} className="p-2 text-xs text-gray-500 border-t border-gray-100">
                {time}
              </div>
              {days.map(day => {
                const dayStr = day.toISOString().split('T')[0];
                const dayLectures = scheduledLectures.filter(l => 
                  l.date === dayStr && l.startTime === time && l.status !== 'Cancelled'
                );
                
                return (
                  <div key={`${day}-${time}`} className="p-1 border-t border-gray-100 min-h-[60px]">
                    {dayLectures.map(lecture => (
                      <div 
                        key={lecture.id}
                        className="text-xs bg-blue-100 text-blue-800 rounded p-1 mb-1 cursor-pointer hover:bg-blue-200"
                        onClick={() => handleEditLecture(lecture)}
                      >
                        <div className="font-medium truncate">{lecture.subject}</div>
                        <div className="truncate">{lecture.faculty}</div>
                        <div className="truncate">{lecture.class}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Class Assignment Management</h1>
              <p className="text-gray-600">Assign lectures to faculty and manage class schedules</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setCalendarView(!calendarView)}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  calendarView 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <CalendarDays className="w-4 h-4" />
                {calendarView ? 'List View' : 'Calendar View'}
              </button>
              <button className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setCurrentView('assign')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  currentView === 'assign'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Assign Lecture
              </button>
              <button
                onClick={() => setCurrentView('schedule')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  currentView === 'schedule'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Scheduled Lectures
              </button>
              <button
                onClick={() => setCurrentView('logs')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  currentView === 'logs'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Audit Logs
              </button>
            </nav>
          </div>
        </div>

        {currentView === 'assign' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Assignment Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Assign New Lecture</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Department */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department *
                    </label>
                    <select
                      value={selectedDepartment}
                      onChange={(e) => {
                        setSelectedDepartment(e.target.value);
                        setSelectedClass('');
                        setSelectedFaculty('');
                        setSelectedSubject('');
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Class/Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Class/Section *
                    </label>
                    <select
                      value={selectedClass}
                      onChange={(e) => {
                        setSelectedClass(e.target.value);
                        setSelectedSubject('');
                      }}
                      disabled={!selectedDepartment}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    >
                      <option value="">Select Class</option>
                      {selectedDepartment && classes[selectedDepartment]?.map(cls => (
                        <option key={cls.id} value={cls.id}>{cls.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Faculty */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Faculty *
                    </label>
                    <select
                      value={selectedFaculty}
                      onChange={(e) => setSelectedFaculty(e.target.value)}
                      disabled={!selectedDepartment}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    >
                      <option value="">Select Faculty</option>
                      {selectedDepartment && faculties[selectedDepartment]?.map(faculty => (
                        <option key={faculty.id} value={faculty.name}>{faculty.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      disabled={!selectedClass}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    >
                      <option value="">Select Subject</option>
                      {selectedClass && subjects[selectedClass]?.map(subject => (
                        <option key={subject.id} value={subject.name}>{subject.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lecture Date *
                    </label>
                    <input
                      type="date"
                      value={lectureDate}
                      onChange={(e) => setLectureDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Subject Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject Type *
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="Theory"
                          checked={subjectType === 'Theory'}
                          onChange={(e) => setSubjectType(e.target.value)}
                          className="mr-2"
                        />
                        Theory (1 hour)
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="Practical"
                          checked={subjectType === 'Practical'}
                          onChange={(e) => setSubjectType(e.target.value)}
                          className="mr-2"
                        />
                        Practical (2 hours)
                      </label>
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Time *
                    </label>
                    <select
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Start Time</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Time *
                    </label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                      readOnly
                    />
                  </div>
                </div>

                {/* Batch Selection for Practical */}
                {subjectType === 'Practical' && selectedClass && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Batches *
                    </label>
                    <div className="flex gap-4 flex-wrap">
                      {classes[selectedDepartment]?.find(cls => cls.id === selectedClass)?.batches.map(batch => (
                        <label key={batch} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedBatches.includes(batch)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedBatches([...selectedBatches, batch]);
                              } else {
                                setSelectedBatches(selectedBatches.filter(b => b !== batch));
                              }
                            }}
                            className="mr-2"
                          />
                          {batch}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Conflict Alert */}
                {showConflicts && conflicts.length > 0 && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-800 mb-2">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="font-medium">Schedule Conflicts Detected</span>
                    </div>
                    {conflicts.map((conflict, index) => (
                      <div key={index} className="text-sm text-red-700 mb-1">
                        • {conflict.message}
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleAssignLecture}
                    disabled={conflicts.length > 0}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2 font-medium flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Assign Lecture
                  </button>
                </div>
              </div>
            </div>

            {/* Summary Panel */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Lectures</span>
                    <span className="text-lg font-semibold text-gray-900">
                      {scheduledLectures.filter(l => l.date === new Date().toISOString().split('T')[0]).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Scheduled</span>
                    <span className="text-lg font-semibold text-blue-600">
                      {scheduledLectures.filter(l => l.date === new Date().toISOString().split('T')[0] && l.status === 'Scheduled').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Completed</span>
                    <span className="text-lg font-semibold text-green-600">
                      {scheduledLectures.filter(l => l.date === new Date().toISOString().split('T')[0] && l.status === 'Completed').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Cancelled</span>
                    <span className="text-lg font-semibold text-red-600">
                      {scheduledLectures.filter(l => l.date === new Date().toISOString().split('T')[0] && l.status === 'Cancelled').length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Assignments */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Assignments</h3>
                <div className="space-y-3">
                  {scheduledLectures.slice(0, 5).map(lecture => (
                    <div key={lecture.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{lecture.subject}</div>
                        <div className="text-xs text-gray-600">{lecture.faculty} • {lecture.class}</div>
                        <div className="text-xs text-gray-500">{lecture.date} • {lecture.startTime}-{lecture.endTime}</div>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(lecture.status)}`}>
                        {lecture.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'schedule' && (
          <div>
            {calendarView ? renderCalendarView() : (
              <div>
                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search lectures..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="All">All Status</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('All');
                        setDateFilter('');
                      }}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Clear Filters
                    </button>
                  </div>
                </div>

                {/* Lectures Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Lecture Details
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Faculty & Class
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date & Time
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type & Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredLectures.map((lecture) => (
                          <tr key={lecture.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-indigo-600" />
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{lecture.subject}</div>
                                  <div className="text-sm text-gray-500">ID: {lecture.id}</div>
                                  {lecture.batches && (
                                    <div className="text-xs text-gray-400">Batches: {lecture.batches.join(', ')}</div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{lecture.faculty}</div>
                              <div className="text-sm text-gray-500">{lecture.class}</div>
                              <div className="text-xs text-gray-400">{lecture.department}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {new Date(lecture.date).toLocaleDateString()}
                              </div>
                              <div className="text-sm text-gray-500">
                                {lecture.startTime} - {lecture.endTime}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="mb-1">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                  {lecture.type}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(lecture.status)}
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(lecture.status)}`}>
                                  {lecture.status}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => handleEditLecture(lecture)}
                                  className="text-blue-600 hover:text-blue-900" 
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="text-green-600 hover:text-green-900" title="View Details">
                                  <Eye className="w-4 h-4" />
                                </button>
                                {lecture.status === 'Scheduled' && (
                                  <button 
                                    onClick={() => handleCancelLecture(lecture.id)}
                                    className="text-red-600 hover:text-red-900" 
                                    title="Cancel"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {currentView === 'logs' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Audit Logs</h3>
              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Logs
              </button>
            </div>
            
            <div className="space-y-4">
              {scheduledLectures.map((lecture) => (
                <div key={lecture.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-medium text-gray-900">{lecture.subject}</span>
                      <span className="text-gray-500 ml-2">({lecture.id})</span>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(lecture.status)}`}>
                      {lecture.status}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>
                      <span className="font-medium">Created:</span> {lecture.createdAt} by {lecture.createdBy}
                    </div>
                    <div>
                      <span className="font-medium">Details:</span> {lecture.faculty} • {lecture.class} • {lecture.date} {lecture.startTime}-{lecture.endTime}
                    </div>
                    {lecture.status === 'Cancelled' && (
                      <>
                        <div className="text-red-600">
                          <span className="font-medium">Cancelled:</span> {lecture.cancelledAt} by {lecture.cancelledBy}
                        </div>
                        <div className="text-red-600">
                          <span className="font-medium">Reason:</span> {lecture.cancelReason}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && editingLecture && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Edit Lecture</h3>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <input
                        type="text"
                        defaultValue={editingLecture.subject}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Faculty</label>
                      <input
                        type="text"
                        defaultValue={editingLecture.faculty}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <input
                        type="date"
                        defaultValue={editingLecture.date}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                      <input
                        type="time"
                        defaultValue={editingLecture.startTime}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-6">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Handle save logic here
                      setShowEditModal(false);
                      alert('Lecture updated successfully!');
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
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