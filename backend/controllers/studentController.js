const bcrypt = require('bcryptjs');
const { query } = require('../database/databaseConfig');

// Generate unique student ID
const generateStudentId = async () => {
  const year = new Date().getFullYear();
  const prefix = `STU${year}`;
  
  // Get the last student ID for this year
  const result = await query(
    'SELECT student_id FROM students WHERE student_id LIKE ? ORDER BY student_id DESC LIMIT 1',
    [`${prefix}%`]
  );
  
  if (result.length === 0) {
    return `${prefix}001`;
  }
  
  const lastId = result[0].student_id;
  const number = parseInt(lastId.replace(prefix, '')) + 1;
  return `${prefix}${number.toString().padStart(3, '0')}`;
};

// GET /api/students - Get all students (admin only)
exports.getAllStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = '', branch = '' } = req.query;
    
    // Ensure page and limit are valid integers
    const pageInt = Math.max(1, parseInt(page) || 1);
    const limitInt = Math.max(1, Math.min(100, parseInt(limit) || 10)); // Cap at 100
    const offset = (pageInt - 1) * limitInt;
    
    // First check if students table exists
    try {
      await query('SELECT 1 FROM students LIMIT 1');
    } catch (tableError) {
      console.log('Students table does not exist, returning empty result');
      return res.json({
        students: [],
        pagination: {
          currentPage: pageInt,
          totalPages: 0,
          totalStudents: 0,
          limit: limitInt
        }
      });
    }
    
    let whereClause = 'WHERE 1=1';
    let params = [];
    
    if (search) {
      whereClause += ' AND (s.first_name LIKE ? OR s.last_name LIKE ? OR s.student_id LIKE ? OR s.email LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }
    
    if (status) {
      whereClause += ' AND s.status = ?';
      params.push(status);
    }
    
    if (branch) {
      whereClause += ' AND s.branch = ?';
      params.push(branch);
    }
    
    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM students s 
      ${whereClause}
    `;
    const countResult = await query(countQuery, params);
    const total = countResult[0].total;
    
    // Get students with pagination - using queryDirect to avoid prepared statement issues
    const studentsQueryTemplate = `
      SELECT s.*, u.role, u.created_at as user_created_at
      FROM students s
      LEFT JOIN users u ON s.user_id = u.id
      ${whereClause}
      ORDER BY s.created_at DESC
      LIMIT ${limitInt} OFFSET ${offset}
    `;
    
    console.log('Query:', studentsQueryTemplate);
    console.log('Params:', params);
    console.log('Limit:', limitInt, 'Offset:', offset);
    
    // Try the new queryDirect method for better compatibility
    const { queryDirect } = require('../database/databaseConfig');
    const students = await queryDirect(studentsQueryTemplate, params);
    
    res.json({
      students,
      pagination: {
        currentPage: pageInt,
        totalPages: Math.ceil(total / limitInt),
        totalStudents: total,
        limit: limitInt
      }
    });
  } catch (err) {
    console.error('Error in getAllStudents:', err);
    res.status(500).json({ message: 'Error fetching students', error: err.message });
  }
};

// GET /api/students/:id - Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const studentQuery = `
      SELECT s.*, u.role, u.created_at as user_created_at
      FROM students s
      LEFT JOIN users u ON s.user_id = u.id
      WHERE s.id = ?
    `;
    
    const students = await query(studentQuery, [id]);
    
    if (students.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.json({ student: students[0] });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching student', error: err.message });
  }
};

// POST /api/students - Create new student (admin only)
exports.createStudent = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      phone,
      date_of_birth,
      gender,
      address,
      city,
      state,
      pincode,
      father_name,
      mother_name,
      father_phone,
      mother_phone,
      emergency_contact,
      blood_group,
      admission_date,
      current_semester,
      academic_year,
      branch,
      course
    } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ 
        message: 'First name, last name, email and password are required' 
      });
    }

    // Check if email already exists
    const existingUser = await query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Start transaction
    const connection = await require('../database/databaseConfig').getConnection();
    await connection.promise().execute('START TRANSACTION');

    try {
      // Create user account
      const userResult = await query(
        `INSERT INTO users (first_name, last_name, email, password, phone, role) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [first_name, last_name, email, hashedPassword, phone, 'student']
      );

      const userId = userResult.insertId;

      // Generate student ID
      const studentId = await generateStudentId();

      // Create student record
      const studentResult = await query(
        `INSERT INTO students (
          user_id, student_id, first_name, last_name, email, phone, 
          date_of_birth, gender, address, city, state, pincode,
          father_name, mother_name, father_phone, mother_phone, emergency_contact,
          blood_group, admission_date, current_semester, academic_year, branch, course
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userId, studentId, first_name, last_name, email, phone,
          date_of_birth, gender, address, city, state, pincode,
          father_name, mother_name, father_phone, mother_phone, emergency_contact,
          blood_group, admission_date, current_semester, academic_year, branch, course
        ]
      );

      await connection.promise().execute('COMMIT');

      res.status(201).json({
        message: 'Student created successfully',
        student: {
          id: studentResult.insertId,
          student_id: studentId,
          user_id: userId,
          first_name,
          last_name,
          email
        }
      });
    } catch (error) {
      await connection.promise().execute('ROLLBACK');
      throw error;
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating student', error: err.message });
  }
};

// PUT /api/students/:id - Update student (admin only)
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if student exists
    const existingStudent = await query('SELECT * FROM students WHERE id = ?', [id]);
    if (existingStudent.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Build dynamic update query
    const allowedFields = [
      'first_name', 'last_name', 'email', 'phone', 'date_of_birth', 'gender',
      'address', 'city', 'state', 'pincode', 'father_name', 'mother_name',
      'father_phone', 'mother_phone', 'emergency_contact', 'blood_group',
      'admission_date', 'current_semester', 'academic_year', 'branch', 'course', 'status'
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

    // Update student record
    const updateQuery = `UPDATE students SET ${updateFields.join(', ')} WHERE id = ?`;
    await query(updateQuery, updateValues);

    // If email is being updated, also update the users table
    if (updateData.email) {
      await query(
        'UPDATE users SET email = ? WHERE id = ?',
        [updateData.email, existingStudent[0].user_id]
      );
    }

    res.json({ message: 'Student updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating student', error: err.message });
  }
};

// DELETE /api/students/:id - Delete student (admin only)
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if student exists
    const existingStudent = await query('SELECT * FROM students WHERE id = ?', [id]);
    if (existingStudent.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Delete student (this will cascade delete the user due to foreign key constraint)
    await query('DELETE FROM students WHERE id = ?', [id]);

    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting student', error: err.message });
  }
};

// GET /api/students/branches - Get all branches
exports.getBranches = async (req, res) => {
  try {
    const branches = await query('SELECT * FROM branches ORDER BY name');
    res.json({ branches });
  } catch (err) {
    console.log('Branches table does not exist, returning empty result');
    res.json({ branches: [] });
  }
};

// GET /api/students/courses - Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await query('SELECT * FROM courses ORDER BY name');
    res.json({ courses });
  } catch (err) {
    console.log('Courses table does not exist, returning empty result');
    res.json({ courses: [] });
  }
};

// POST /api/students/init-db - Initialize database tables
exports.initDatabase = async (req, res) => {
  try {
    console.log('Initializing database tables...');
    
    // Create users table if it doesn't exist
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('student', 'faculty', 'admin', 'hod', 'principal') NOT NULL DEFAULT 'student',
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // Create students table if it doesn't exist
    await query(`
      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        student_id VARCHAR(20) UNIQUE NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        date_of_birth DATE,
        gender ENUM('male', 'female', 'other'),
        address TEXT,
        city VARCHAR(100),
        state VARCHAR(100),
        pincode VARCHAR(10),
        father_name VARCHAR(100),
        mother_name VARCHAR(100),
        father_phone VARCHAR(20),
        mother_phone VARCHAR(20),
        emergency_contact VARCHAR(20),
        blood_group VARCHAR(5),
        admission_date DATE,
        current_semester INT DEFAULT 1,
        academic_year VARCHAR(10),
        branch VARCHAR(100),
        course VARCHAR(100),
        status ENUM('active', 'inactive', 'graduated', 'suspended') DEFAULT 'active',
        profile_image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    
    // Create branches table if it doesn't exist
    await query(`
      CREATE TABLE IF NOT EXISTS branches (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        code VARCHAR(10) UNIQUE NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create courses table if it doesn't exist
    await query(`
      CREATE TABLE IF NOT EXISTS courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        code VARCHAR(10) UNIQUE NOT NULL,
        duration_years INT DEFAULT 4,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Insert sample data if tables are empty
    const userCount = await query('SELECT COUNT(*) as count FROM users');
    if (userCount[0].count === 0) {
      console.log('Inserting sample data...');
      
      // Insert sample admin user (password: password123)
      await query(`
        INSERT INTO users (first_name, last_name, email, password, role) 
        VALUES ('Admin', 'User', 'admin@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin')
      `);
      
      // Insert sample branches
      await query(`
        INSERT INTO branches (name, code, description) VALUES 
        ('Computer Science', 'CS', 'Computer Science Engineering'),
        ('Electronics & Communication', 'EC', 'Electronics and Communication Engineering'),
        ('Mechanical Engineering', 'ME', 'Mechanical Engineering'),
        ('Civil Engineering', 'CE', 'Civil Engineering')
      `);
      
      // Insert sample courses
      await query(`
        INSERT INTO courses (name, code, duration_years, description) VALUES 
        ('Bachelor of Technology', 'B.Tech', 4, 'Bachelor of Technology'),
        ('Master of Technology', 'M.Tech', 2, 'Master of Technology'),
        ('Bachelor of Engineering', 'B.E', 4, 'Bachelor of Engineering')
      `);
      
      console.log('Sample data inserted successfully!');
    }
    
    res.json({ message: 'Database initialized successfully' });
    
  } catch (error) {
    console.error('Database initialization failed:', error);
    res.status(500).json({ message: 'Database initialization failed', error: error.message });
  }
};