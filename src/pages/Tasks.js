import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import "../styles/task.css";
import { useNavigate, useLocation } from "react-router-dom";

function Tasks() {
  const navigate = useNavigate();
  const location = useLocation();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const role = localStorage.getItem("role");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const queryParams = new URLSearchParams(location.search);
  const filterStatus = queryParams.get("status");

  // Fetch Tasks
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    setLoading(true);
    setError("");

    let url = `http://localhost:5000/tasks?page=${page}&limit=5`;

    if (filterStatus) {
      url += `&status=${filterStatus}`;
    }

    fetch(url, {
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
        if (data) {
          setTasks(data.tasks ? data.tasks : data);

          setTotalPages(
            Math.ceil((data.total || 0) / (data.limit || 1))
          );
        }

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch tasks");
        setLoading(false);
      });
  }, [navigate, page, filterStatus]);

  // Add Task
  const addTask = async () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title,
          description,
          status,
        }),
      });

      const data = await response.json();

      setTasks([...tasks, data.task]);

      setTitle("");
      setDescription("");
      setStatus("Pending");
    } catch (err) {
      console.log(err);
      setError("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  // Add Sample Tasks (Admin only)
  const addSampleTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const sampleTasks = [
        {
          title: "Math Homework",
          description: "Complete algebra",
          status: "Completed",
        },
        {
          title: "React Practice",
          description: "Build components",
          status: "Pending",
        },
        {
          title: "Project Work",
          description: "Task manager app",
          status: "Completed",
        },
        {
          title: "Node Study",
          description: "Learn Express",
          status: "Pending",
        },
        {
          title: "MongoDB Practice",
          description: "Database queries",
          status: "Completed",
        },
        {
          title: "API Testing",
          description: "Test all routes",
          status: "Pending",
        },
      ];

      for (let task of sampleTasks) {
        await fetch("http://localhost:5000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(task),
        });
      }

      alert("Sample tasks added");

      const response = await fetch(
        "http://localhost:5000/tasks?page=1&limit=5",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();

      setTasks(data.tasks ? data.tasks : data);
      setPage(1);
    } catch (err) {
      console.log(err);
      setError("Failed to add sample tasks");
    } finally {
      setLoading(false);
    }
  };

  // Update Task Status
  const updateTaskStatus = async (task) => {
    try {
      setError("");

      const newStatus =
        task.status === "Pending" ? "Completed" : "Pending";

      const response = await fetch(
        `http://localhost:5000/tasks/${task._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      setTasks(
        tasks.map((t) =>
          t._id === task._id ? data.task : t
        )
      );
    } catch (err) {
      console.log(err);
      setError("Failed to update task");
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      setError("");

      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
      setError("Failed to delete task");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        <h2 className="taskTitle">Tasks</h2>
        <p>Role: {role}</p>

        {loading && <p>Loading tasks...</p>}
        {error && <p>{error}</p>}

        <div className="taskForm">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Pending</option>
            <option>Completed</option>
          </select>

          <button onClick={addTask}>
            Add Task
          </button>

          {role === "Admin" && (
            <button onClick={addSampleTasks}>
              Add Sample Tasks
            </button>
          )}
        </div>

        <div className="taskGrid">
          {!loading && tasks?.length === 0 && (
            <p>No tasks found</p>
          )}

          {tasks?.map((task) => (
            <TaskCard
              key={task._id}
              title={task.title}
              desc={task.description}
              status={task.status}
              updateTaskStatus={() => updateTaskStatus(task)}
              deleteTask={() => deleteTask(task._id)}
            />
          ))}
        </div>

        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tasks;