import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/context.jsx";
import "./Navbar.css";

const Navbar = () => {
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
    <div className="navbar-container">
      <div className="navbar-card-container">
        <h1 className="heading" onClick={() => navigate("/home")}>
          Daynt Dashboard
        </h1>
        <p className="paragraph">Admin</p>
      </div>
      <button className="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
