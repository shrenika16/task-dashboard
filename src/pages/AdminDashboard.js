import React, { useEffect, useState } from "react";

function AdminDashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/dashboard/stats", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div>
        <h3>Total Users: {stats.totalUsers}</h3>
        <h3>Total Tasks: {stats.totalTasks}</h3>
        <h3>Completed: {stats.completedTasks}</h3>
        <h3>Pending: {stats.pendingTasks}</h3>
      </div>
    </div>
  );
}

export default AdminDashboard;