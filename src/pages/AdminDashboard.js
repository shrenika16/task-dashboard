import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/adminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/dashboard/stats", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        <h2 className="adminTitle">
          Admin Dashboard
        </h2>

        <div className="statsGrid">
          <div className="statCard">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>

          <div className="statCard">
            <h3>Total Tasks</h3>
            <p>{stats.totalTasks}</p>
          </div>

          <div className="statCard">
            <h3>Completed Tasks</h3>
            <p>{stats.completedTasks}</p>
          </div>

          <div className="statCard">
            <h3>Pending Tasks</h3>
            <p>{stats.pendingTasks}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;