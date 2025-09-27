const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getBranches,
  getCourses,
  initDatabase
} = require('../controllers/studentController');

// Admin-only middleware
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
  next();
};

// POST /api/students/init-db - Initialize database (no auth required for setup)
router.post('/init-db', initDatabase);

// All other student routes require authentication and admin privileges
router.use(authMiddleware);
router.use(adminOnly);

// GET /api/students - Get all students with pagination and search
router.get('/', getAllStudents);

// GET /api/students/branches - Get all branches
router.get('/branches', getBranches);

// GET /api/students/courses - Get all courses
router.get('/courses', getCourses);

// GET /api/students/:id - Get student by ID
router.get('/:id', getStudentById);

// POST /api/students - Create new student
router.post('/', createStudent);

// PUT /api/students/:id - Update student
router.put('/:id', updateStudent);

// DELETE /api/students/:id - Delete student
router.delete('/:id', deleteStudent);

module.exports = router;
