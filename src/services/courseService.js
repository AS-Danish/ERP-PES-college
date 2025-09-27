import api from './axiosConfig';

// Auth API Service
export const authService = {
  // Verify token
  verifyToken: async () => {
    try {
      const response = await api.get('/verify-token');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

// Student Management API Service
export const studentService = {
  // Get all students with pagination and search
  getAllStudents: async (params = {}) => {
    try {
      const response = await api.get('/students', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  // Get student by ID
  getStudentById: async (id) => {
    try {
      const response = await api.get(`/students/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  // Create new student
  createStudent: async (studentData) => {
    try {
      const response = await api.post('/students', studentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  // Update student
  updateStudent: async (id, studentData) => {
    try {
      const response = await api.put(`/students/${id}`, studentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  // Delete student
  deleteStudent: async (id) => {
    try {
      const response = await api.delete(`/students/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  // Get all branches
  getBranches: async () => {
    try {
      const response = await api.get('/students/branches');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  // Get all courses
  getCourses: async () => {
    try {
      const response = await api.get('/students/courses');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  // Initialize database
  initDatabase: async () => {
    try {
      const response = await api.post('/students/init-db');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

// Course Management API Service
export const courseService = {
  // Get all courses with pagination and search
  getAllCourses: async (params = {}) => {
    try {
      const response = await api.get('/courses', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  // Get course by ID
  getCourseById: async (id) => {
    try {
      const response = await api.get(`/courses/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  // Create new course
  createCourse: async (courseData) => {
    try {
      const response = await api.post('/courses', courseData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  // Update course
  updateCourse: async (id, courseData) => {
    try {
      const response = await api.put(`/courses/${id}`, courseData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  // Delete course
  deleteCourse: async (id) => {
    try {
      const response = await api.delete(`/courses/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  // Get all departments
  getDepartments: async () => {
    try {
      const response = await api.get('/courses/departments');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  // Get all semesters
  getSemesters: async () => {
    try {
      const response = await api.get('/courses/semesters');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  // Get CO-PO mapping for a course
  getCOPOMapping: async (courseId) => {
    try {
      const response = await api.get(`/courses/${courseId}/co-po-mapping`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  // Update CO-PO mapping for a course
  updateCOPOMapping: async (courseId, mappings) => {
    try {
      const response = await api.post(`/courses/${courseId}/co-po-mapping`, { mappings });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  
  // Initialize course database
  initDatabase: async () => {
    try {
      const response = await api.post('/courses/init-db');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default { authService, studentService, courseService };