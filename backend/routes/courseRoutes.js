const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const courseController = require('../controllers/courseController');

// Apply auth middleware to all routes
router.use(authMiddleware);

// Course CRUD operations
router.get('/', courseController.getAllCourses);
router.get('/departments', courseController.getDepartments);
router.get('/semesters', courseController.getSemesters);
router.get('/:id', courseController.getCourseById);
router.post('/', courseController.createCourse);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

// CO-PO Mapping operations
router.get('/:id/co-po-mapping', courseController.getCOPOMapping);
router.post('/:id/co-po-mapping', courseController.updateCOPOMapping);

// Database initialization (admin only)
router.post('/init-db', courseController.initDatabase);

module.exports = router;