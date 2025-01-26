import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store the logged-in user's data
  const [token, setToken] = useState(localStorage.getItem("token")); // Store JWT token

  const backendUrl = "http://localhost:4000";

  // Fetch dashboard data
  const fetchDashboardRecords = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data; // Return the fetched records
    } catch (error) {
      toast.error("Failed to fetch records!");
      return [];
    }
  };

  // Add a dashboard record
  const addDashboardRecord = async (name, dob) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/add-user`,
        { name, dob },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Record added successfully!");
      return res.data;
    } catch (error) {
      toast.error("Failed to add record!");
    }
  };

  // Update a dashboard record
  const updateDashboardRecord = async (id, name, dob) => {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/update-dashboard/${id}`,
        { name, dob },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Record updated successfully!");
      return res.data;
    } catch (error) {
      toast.error("Failed to update record!");
    }
  };

  // Delete a dashboard record
  const deleteDashboardRecord = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/dashboard/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Record deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete record!");
    }
  };

  // Check if user is logged in
  useEffect(() => {
    if (token) {
      // Optionally, fetch user info here if needed
      setUser({ token });
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setToken,
        fetchDashboardRecords,
        addDashboardRecord,
        updateDashboardRecord,
        deleteDashboardRecord,
        backendUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
