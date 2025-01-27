import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Dashboard.css";
import { AuthContext } from "../../context/context";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  const { backendUrl, token } = useContext(AuthContext);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(data.records);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
      setLoading(false);
    }
  };

  const editUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/update-dashboard/${editingUser}`,
        { name, dob },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success("User updated successfully");
        fetchUsers(); // Refresh data
        setEditingUser(null);
        setName("");
        setDob("");
      } else {
        toast.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  const deleteUser = async (id) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/dashboard/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        toast.success("User deleted successfully");
        fetchUsers(); // Refresh data
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="home-heading">Dashboard</h1>
      {editingUser && (
        <form onSubmit={editUser} className="form-box">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
          <button type="submit">Update</button>
          <button
            type="button"
            onClick={() => {
              setEditingUser(null);
              setName("");
              setDob("");
            }}
          >
            Cancel
          </button>
        </form>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{new Date(user.dob).toLocaleDateString()}</td>
                <td>
                  {new Date().getFullYear() - new Date(user.dob).getFullYear()}
                </td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => {
                      setEditingUser(user._id);
                      setName(user.name);
                      setDob(user.dob.split("T")[0]); // Format date for input
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
