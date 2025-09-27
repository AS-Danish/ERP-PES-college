const { query } = require('../database/databaseConfig');

// GET /api/courses - Get all courses (admin/faculty)
exports.getAllCourses = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', department = '', semester = '', status = '' } = req.query;
    
    // Ensure page and limit are valid integers
    const pageInt = Math.max(1, parseInt(page) || 1);
    const limitInt = Math.max(1, Math.min(100, parseInt(limit) || 10)); // Cap at 100
    const offset = (pageInt - 1) * limitInt;
    
    // First check if courses table exists
    try {
      await query('SELECT 1 FROM courses LIMIT 1');
    } catch (tableError) {
      console.log('Courses table does not exist, returning empty result');
      return res.json({
        courses: [],
        pagination: {
          currentPage: pageInt,
          totalPages: 0,
          totalCourses: 0,
          limit: limitInt
        }
      });
    }
    
    let whereClause = 'WHERE 1=1';
    let params = [];
    
    if (search) {
      whereClause += ' AND (c.name LIKE ? OR c.code LIKE ? OR c.faculty LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }
    
    if (department) {
      whereClause += ' AND c.department = ?';
      params.push(department);
    }
    
    if (semester) {
      whereClause += ' AND c.semester = ?';
      params.push(semester);
    }
    
    if (status) {
      whereClause += ' AND c.status = ?';
      params.push(status);
    }
    
    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM courses c 
      ${whereClause}
    `;
    const countResult = await query(countQuery, params);
    const total = countResult[0].total;
    
    // Get courses with pagination
    const coursesQueryTemplate = `
      SELECT c.*, 
        COALESCE((SELECT COUNT(*) FROM course_enrollments ce WHERE ce.course_id = c.id), 0) as enrolled_students
      FROM courses c
      ${whereClause}
      ORDER BY c.created_at DESC
      LIMIT ${limitInt} OFFSET ${offset}
    `;
    
    console.log('Query:', coursesQueryTemplate);
    console.log('Params:', params);
    console.log('Limit:', limitInt, 'Offset:', offset);
    
    const courses = await query(coursesQueryTemplate, params);
    
    res.json({
      courses,
      pagination: {
        currentPage: pageInt,
        totalPages: Math.ceil(total / limitInt),
        totalCourses: total,
        limit: limitInt
      }
    });
  } catch (err) {
    console.error('Error in getAllCourses:', err);
    res.status(500).json({ message: 'Error fetching courses', error: err.message });
  }
};

// GET /api/courses/:id - Get course by ID
exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const courseQuery = `
      SELECT c.*, 
        (SELECT COUNT(*) FROM course_enrollments ce WHERE ce.course_id = c.id) as enrolled_students
      FROM courses c
      WHERE c.id = ?
    `;
    
    const courses = await query(courseQuery, [id]);
    
    if (courses.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Get course outcomes (if table exists)
    let courseOutcomes = [];
    let copoMappings = [];
    
    try {
      courseOutcomes = await query(
        'SELECT * FROM course_outcomes WHERE course_id = ? ORDER BY outcome_number',
        [id]
      );
    } catch (err) {
      console.log('Course outcomes table does not exist or error occurred:', err.message);
    }
    
    try {
      copoMappings = await query(
        'SELECT * FROM co_po_mappings WHERE course_id = ?',
        [id]
      );
    } catch (err) {
      console.log('CO-PO mappings table does not exist or error occurred:', err.message);
    }
    
    const course = courses[0];
    course.courseOutcomes = courseOutcomes;
    course.coPoMappings = copoMappings;
    
    res.json({ course });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching course', error: err.message });
  }
};

// POST /api/courses - Create new course (admin/faculty)
exports.createCourse = async (req, res) => {
  try {
    const {
      name,
      code,
      department,
      semester,
      credits,
      theory_hours,
      practical_hours,
      faculty,
      description,
      prerequisites,
      course_outcomes,
      status = 'Active'
    } = req.body;

    // Validate required fields
    if (!name || !code || !department || !semester || !credits) {
      return res.status(400).json({ 
        message: 'Course name, code, department, semester and credits are required' 
      });
    }

    // Check if course code already exists
    const existingCourse = await query('SELECT id FROM courses WHERE code = ?', [code]);
    if (existingCourse.length > 0) {
      return res.status(400).json({ message: 'Course code already exists' });
    }

    // Start transaction
    const connection = await require('../database/databaseConfig').getConnection();
    await connection.promise().execute('START TRANSACTION');

    try {
      // Create course record
      const courseResult = await query(
        `INSERT INTO courses (
          name, code, department, semester, credits, theory_hours, practical_hours,
          faculty, description, prerequisites, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name, code, department, semester, credits, theory_hours || 0, practical_hours || 0,
          faculty, description, prerequisites, status
        ]
      );

      const courseId = courseResult.insertId;

      // Insert course outcomes if provided and table exists
      if (course_outcomes && Array.isArray(course_outcomes)) {
        try {
          for (let i = 0; i < course_outcomes.length; i++) {
            if (course_outcomes[i] && course_outcomes[i].trim()) {
              await query(
                'INSERT INTO course_outcomes (course_id, outcome_number, description) VALUES (?, ?, ?)',
                [courseId, i + 1, course_outcomes[i]]
              );
            }
          }
        } catch (err) {
          console.log('Course outcomes table does not exist or error occurred:', err.message);
        }
      }

      await connection.promise().execute('COMMIT');

      res.status(201).json({
        message: 'Course created successfully',
        course: {
          id: courseId,
          name,
          code,
          department
        }
      });
    } catch (error) {
      await connection.promise().execute('ROLLBACK');
      throw error;
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating course', error: err.message });
  }
};

// PUT /api/courses/:id - Update course (admin/faculty)
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if course exists
    const existingCourse = await query('SELECT * FROM courses WHERE id = ?', [id]);
    if (existingCourse.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Build dynamic update query
    const allowedFields = [
      'name', 'code', 'department', 'semester', 'credits', 'theory_hours', 'practical_hours',
      'faculty', 'description', 'prerequisites', 'status', 'syllabus_status'
    ];

    const updateFields = [];
    const updateValues = [];

    for (const [key, value] of Object.entries(updateData)) {
      if (allowedFields.includes(key) && value !== undefined) {
        updateFields.push(`${key} = ?`);
        updateValues.push(value);
      }
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No valid fields to update' });
    }

    updateValues.push(id);

    // Update course record
    const updateQuery = `UPDATE courses SET ${updateFields.join(', ')} WHERE id = ?`;
    await query(updateQuery, updateValues);

    res.json({ message: 'Course updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating course', error: err.message });
  }
};

// DELETE /api/courses/:id - Delete course (admin only)
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if course exists
    const existingCourse = await query('SELECT * FROM courses WHERE id = ?', [id]);
    if (existingCourse.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if course has enrollments (if table exists)
    try {
      const enrollments = await query('SELECT id FROM course_enrollments WHERE course_id = ?', [id]);
      if (enrollments.length > 0) {
        return res.status(400).json({ 
          message: 'Cannot delete course with existing enrollments. Please remove enrollments first.' 
        });
      }
    } catch (err) {
      console.log('Course enrollments table does not exist or error occurred:', err.message);
    }

    // Delete course (this will cascade delete related records due to foreign key constraints)
    await query('DELETE FROM courses WHERE id = ?', [id]);

    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting course', error: err.message });
  }
};

// GET /api/courses/departments - Get all departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await query('SELECT DISTINCT department FROM courses ORDER BY department');
    res.json({ departments: departments.map(d => d.department) });
  } catch (err) {
    console.log('Error fetching departments:', err);
    res.json({ departments: [] });
  }
};

// GET /api/courses/semesters - Get all semesters
exports.getSemesters = async (req, res) => {
  try {
    const semesters = await query('SELECT DISTINCT semester FROM courses ORDER BY semester');
    res.json({ semesters: semesters.map(s => s.semester) });
  } catch (err) {
    console.log('Error fetching semesters:', err);
    res.json({ semesters: [] });
  }
};

// POST /api/courses/:id/co-po-mapping - Update CO-PO mapping
exports.updateCOPOMapping = async (req, res) => {
  try {
    const { id } = req.params;
    const { mappings } = req.body;

    // Check if course exists
    const existingCourse = await query('SELECT * FROM courses WHERE id = ?', [id]);
    if (existingCourse.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    try {
      // Delete existing mappings
      await query('DELETE FROM co_po_mappings WHERE course_id = ?', [id]);

      // Insert new mappings
      if (mappings && Array.isArray(mappings)) {
        for (const mapping of mappings) {
          await query(
            'INSERT INTO co_po_mappings (course_id, co_number, po_number, strength) VALUES (?, ?, ?, ?)',
            [id, mapping.co_number, mapping.po_number, mapping.strength]
          );
        }
      }
    } catch (err) {
      console.log('CO-PO mappings table does not exist or error occurred:', err.message);
      return res.status(500).json({ message: 'CO-PO mappings table not available' });
    }

    res.json({ message: 'CO-PO mapping updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating CO-PO mapping', error: err.message });
  }
};

// GET /api/courses/:id/co-po-mapping - Get CO-PO mapping
exports.getCOPOMapping = async (req, res) => {
  try {
    const { id } = req.params;
    
    try {
      const mappings = await query(
        'SELECT * FROM co_po_mappings WHERE course_id = ? ORDER BY co_number, po_number',
        [id]
      );
      
      res.json({ mappings });
    } catch (err) {
      console.log('CO-PO mappings table does not exist or error occurred:', err.message);
      res.json({ mappings: [] });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching CO-PO mapping', error: err.message });
  }
};

// POST /api/courses/init-db - Initialize database tables
exports.initDatabase = async (req, res) => {
  try {
    console.log('Initializing course database tables...');
    
    // Create courses table if it doesn't exist
    await query(`
      CREATE TABLE IF NOT EXISTS courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(20) UNIQUE NOT NULL,
        department VARCHAR(100) NOT NULL,
        semester VARCHAR(20) NOT NULL,
        credits INT NOT NULL DEFAULT 3,
        theory_hours INT DEFAULT 3,
        practical_hours INT DEFAULT 0,
        faculty VARCHAR(255),
        description TEXT,
        prerequisites TEXT,
        status ENUM('Active', 'Inactive', 'Under Review') DEFAULT 'Active',
        syllabus_status ENUM('Updated', 'Outdated', 'Review Pending') DEFAULT 'Updated',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // Create course outcomes table
    await query(`
      CREATE TABLE IF NOT EXISTS course_outcomes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        course_id INT NOT NULL,
        outcome_number INT NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
        UNIQUE KEY unique_course_outcome (course_id, outcome_number)
      )
    `);
    
    // Create CO-PO mappings table
    await query(`
      CREATE TABLE IF NOT EXISTS co_po_mappings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        course_id INT NOT NULL,
        co_number INT NOT NULL,
        po_number INT NOT NULL,
        strength INT DEFAULT 0 CHECK (strength IN (0, 1, 2, 3)),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
        UNIQUE KEY unique_co_po_mapping (course_id, co_number, po_number)
      )
    `);
    
    // Create course enrollments table
    await query(`
      CREATE TABLE IF NOT EXISTS course_enrollments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        course_id INT NOT NULL,
        student_id INT NOT NULL,
        enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('enrolled', 'completed', 'dropped') DEFAULT 'enrolled',
        grade VARCHAR(5),
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
        FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
        UNIQUE KEY unique_enrollment (course_id, student_id)
      )
    `);
    
    // Insert sample data if tables are empty
    const courseCount = await query('SELECT COUNT(*) as count FROM courses');
    if (courseCount[0].count === 0) {
      console.log('Inserting sample course data...');
      
      // Insert sample courses
      await query(`
        INSERT INTO courses (name, code, department, semester, credits, theory_hours, practical_hours, faculty, description, status, syllabus_status) VALUES 
        ('Data Structures and Algorithms', 'CSE101', 'Computer Science & Engineering', '3rd Semester', 4, 3, 2, 'Dr. Rajesh Kumar', 'Fundamental data structures and algorithms for problem solving', 'Active', 'Updated'),
        ('Digital Signal Processing', 'ECE201', 'Electronics & Communication', '5th Semester', 4, 3, 2, 'Dr. Priya Sharma', 'Analysis and design of digital signal processing systems', 'Active', 'Updated'),
        ('Thermodynamics', 'ME301', 'Mechanical Engineering', '4th Semester', 3, 3, 0, 'Prof. Amit Patel', 'Laws of thermodynamics and their applications', 'Active', 'Review Pending'),
        ('Machine Learning', 'CSE401', 'Computer Science & Engineering', '7th Semester', 4, 3, 2, 'Dr. Sneha Desai', 'Introduction to machine learning algorithms and applications', 'Active', 'Updated'),
        ('Structural Analysis', 'CE501', 'Civil Engineering', '6th Semester', 4, 3, 2, 'Prof. Arjun Singh', 'Analysis of determinate and indeterminate structures', 'Inactive', 'Outdated')
      `);
      
      // Get course IDs for sample data
      const courses = await query('SELECT id, code FROM courses');
      
      // Insert sample course outcomes
      for (const course of courses) {
        const outcomes = getDefaultCourseOutcomes(course.code);
        for (let i = 0; i < outcomes.length; i++) {
          await query(
            'INSERT INTO course_outcomes (course_id, outcome_number, description) VALUES (?, ?, ?)',
            [course.id, i + 1, outcomes[i]]
          );
        }
      }
      
      // Insert sample CO-PO mappings
      for (const course of courses) {
        const mappings = getDefaultCOPOMappings();
        for (const mapping of mappings) {
          await query(
            'INSERT INTO co_po_mappings (course_id, co_number, po_number, strength) VALUES (?, ?, ?, ?)',
            [course.id, mapping.co, mapping.po, mapping.strength]
          );
        }
      }
      
      console.log('Sample course data inserted successfully!');
    }
    
    res.json({ message: 'Course database initialized successfully' });
    
  } catch (error) {
    console.error('Course database initialization failed:', error);
    res.status(500).json({ message: 'Course database initialization failed', error: error.message });
  }
};

// Helper function to get default course outcomes
function getDefaultCourseOutcomes(courseCode) {
  const outcomes = {
    'CSE101': [
      'Analyze the performance of algorithms',
      'Implement various data structures',
      'Design efficient algorithms for problem solving',
      'Apply appropriate data structures for specific problems'
    ],
    'ECE201': [
      'Understand discrete-time signals and systems',
      'Analyze digital filters',
      'Design FIR and IIR filters',
      'Implement DSP algorithms'
    ],
    'ME301': [
      'Apply the laws of thermodynamics',
      'Analyze thermodynamic cycles',
      'Calculate properties of substances',
      'Design thermal systems'
    ],
    'CSE401': [
      'Understand machine learning algorithms',
      'Implement supervised learning methods',
      'Apply unsupervised learning techniques',
      'Evaluate model performance'
    ],
    'CE501': [
      'Analyze statically determinate structures',
      'Apply force and displacement methods',
      'Design structural elements',
      'Use analysis software tools'
    ]
  };
  
  return outcomes[courseCode] || [
    'Course outcome 1',
    'Course outcome 2', 
    'Course outcome 3',
    'Course outcome 4'
  ];
}

// Helper function to get default CO-PO mappings
function getDefaultCOPOMappings() {
  const mappings = [];
  // Generate sample mappings for 4 COs and 5 POs
  for (let co = 1; co <= 4; co++) {
    for (let po = 1; po <= 5; po++) {
      mappings.push({
        co: co,
        po: po,
        strength: Math.floor(Math.random() * 4) // Random strength 0-3
      });
    }
  }
  return mappings;
}