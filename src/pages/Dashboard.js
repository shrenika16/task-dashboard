import React, {
  useEffect,
  useState,
  useMemo
} from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    setLoading(true);

    fetch("http://localhost:5000/tasks?page=1&limit=100", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 400) {
          localStorage.clear();
          navigate("/");
          return;
        }

        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setTasks(data);
        } else if (data.tasks) {
          setTasks(data.tasks);
        } else {
          setTasks([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const userName = localStorage.getItem("user");

  // Performance Optimization
  const totalTasks = useMemo(
    () => tasks.length,
    [tasks]
  );

  const completedTasks = useMemo(
    () =>
      tasks.filter(
        (task) => task.status === "Completed"
      ).length,
    [tasks]
  );

  const pendingTasks = useMemo(
    () =>
      tasks.filter(
        (task) => task.status === "Pending"
      ).length,
    [tasks]
  );

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        <h2 className="dashboardTitle">
          Welcome {userName}
        </h2>

        {loading && <p>Loading...</p>}

        <div className="cards">
          <div
            className="card total"
            onClick={() => navigate("/tasks")}
          >
            <h3>Total Tasks</h3>
            <p>{totalTasks}</p>
          </div>

          <div
            className="card completed"
            onClick={() =>
              navigate("/tasks?status=Completed")
            }
          >
            <h3>Completed Tasks</h3>
            <p>{completedTasks}</p>
          </div>

          <div
            className="card pending"
            onClick={() =>
              navigate("/tasks?status=Pending")
            }
          >
            <h3>Pending Tasks</h3>
            <p>{pendingTasks}</p>
          </div>
        </div>

        <button onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;