import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/axiosConfig";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    role: "student",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = "First name is required";
    if (!formData.last_name) newErrors.last_name = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email)) newErrors.email = "Invalid email";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await api.post("/register", formData);
      setSubmitSuccess(true);
      setTimeout(() => navigate("/", { replace: true }), 750);
    } catch (err) {
      setErrors({ form: err.response?.data?.message || "Registration failed" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mr-3">
            <span className="text-white font-medium text-sm">P</span>
          </div>
          <h1 className="text-2xl font-medium text-gray-900">PES ERP</h1>
        </div>

        <div className="w-full max-w-lg">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Create account</h2>
                <p className="text-gray-600">Register to get started</p>
              </div>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                  Registration successful! Redirecting to login...
                </div>
              )}
              {errors.form && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                  {errors.form}
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First name</label>
                  <input name="first_name" value={formData.first_name} onChange={handleChange} className={`w-full px-3 py-2 border rounded-lg ${errors.first_name ? "border-red-300 bg-red-50" : "border-gray-300 bg-gray-50"}`} />
                  {errors.first_name && <p className="text-xs text-red-600 mt-1">{errors.first_name}</p>}
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last name</label>
                  <input name="last_name" value={formData.last_name} onChange={handleChange} className={`w-full px-3 py-2 border rounded-lg ${errors.last_name ? "border-red-300 bg-red-50" : "border-gray-300 bg-gray-50"}`} />
                  {errors.last_name && <p className="text-xs text-red-600 mt-1">{errors.last_name}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-3 py-2 border rounded-lg ${errors.email ? "border-red-300 bg-red-50" : "border-gray-300 bg-gray-50"}`} />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} className={`w-full px-3 py-2 border rounded-lg ${errors.password ? "border-red-300 bg-red-50" : "border-gray-300 bg-gray-50"}`} />
                  {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone (optional)</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg border-gray-300 bg-gray-50" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                  <select name="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg border-gray-300 bg-gray-50">
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="hod">HOD</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <button type="submit" disabled={isSubmitting} className={`w-full py-3 rounded-lg text-sm font-medium text-white ${isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}>
                    {isSubmitting ? "Creating..." : "Create account"}
                  </button>
                </div>
                <div className="md:col-span-2 text-center text-sm text-gray-600">
                  Already have an account? <Link to="/" className="text-blue-600 hover:underline">Sign in</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
