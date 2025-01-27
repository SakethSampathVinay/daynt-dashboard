import React, { useContext } from "react";
import { AuthContext } from "../../context/context";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/login");
    if (token) {
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  return (
    <div className="sidebar-container">
      {token && (
        <ul className="sidebar-list">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <p className="sidebar-text">Home</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-person"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <p className="sidebar-text">Add New User</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <p className="sidebar-text">Users Dashboard</p>
            </NavLink>
          </li>
        </ul>
      )}
      <button className="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;