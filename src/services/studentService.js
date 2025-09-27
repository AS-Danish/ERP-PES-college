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

export default studentService;
