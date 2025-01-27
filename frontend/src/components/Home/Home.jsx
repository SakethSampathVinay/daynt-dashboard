import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-heading">Welcome to Daynt Dashboard</h1>
      <p className="home-paragraph">
        This is a simple dashboard to manage your data efficiently.
      </p>
      <h2 className="features-heading">Key Features</h2>
      <ul className="features-list">
        <li>Add new users to the system.</li>
        <li>Edit user details such as name and date of birth.</li>
        <li>Delete users with a single click.</li>
        <li>Secure login and logout functionality.</li>
        <li>
          Built using:
          <ul>
            <li>Node.js and Express.js for the backend.</li>
            <li>Vite and React.js for the frontend.</li>
            <li>Toastify for displaying toast messages.</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Home;
