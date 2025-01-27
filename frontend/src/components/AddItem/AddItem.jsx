import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/context";
import "./AddItem.css";

const AddUser = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [response, setResponse] = useState(null);

  const { backendUrl, token } = useContext(AuthContext);

  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      if (!token) {
        toast.error("User is not authenticated!");
        return;
      }

      const { data } = await axios.post(
        backendUrl + "/api/add-user",
        { name, dob },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data?.success) {
        setResponse(data.record);
        setName("");
        setDob("");
        toast.success("User added successfully");
      } else {
        toast.error(data?.message || "Failed to add user");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding user");
    }
  };

  return (
    <div className="add-user-container">
      <h1 className="home-heading">Add New User</h1>
      <form onSubmit={handleAddUser} className="form-box">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter user name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          Add User
        </button>
      </form>
      {response && (
        <div className="response-box">
          <h2>User Added Successfully</h2>
          <p>
            <strong>Name:</strong> {response.name}
          </p>
          <p>
            <strong>Date of Birth:</strong>{" "}
            {new Date(response.dob).toLocaleDateString()}
          </p>
          <p>
            <strong>Age:</strong> {response.age}
          </p>
          <p>
            <strong>User ID:</strong> {response.userId}
          </p>
        </div>
      )}
    </div>
  );
};

export default AddUser;
