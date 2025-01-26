import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
// import Contact from "./pages/Contact";

import { AuthContext } from "./context/context.jsx";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <div className="container">
      <ToastContainer />
      {/* <Navbar /> */}
      <Routes>
        {/* Public Routes */}
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/contact" element={<Contact />} /> */}

        {/* Protected Routes */}
        <Route path="/dashboard" element={token ? <Dashboard /> : <Login />} />
        {/* <Route path="/profile" element={token ? <Profile /> : <Login />} /> */}
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
