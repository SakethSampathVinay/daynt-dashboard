import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/context";

const Dashboard = () => {
  const { fetchDashboardRecords, logout } = useContext(AuthContext);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDashboardRecords(); // Fetch data from context
      setRecords(data);
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record._id}>
              <td>{record.name}</td>
              <td>{record.dob.split("T")[0]}</td>
              <td>{record.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
