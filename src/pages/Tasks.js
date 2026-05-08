import React, {
  useEffect,
  useState,
  useCallback
} from "react";
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
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const role = localStorage.getItem("role");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const queryParams = new URLSearchParams(location.search);
  const filterStatus = queryParams.get("status");

  useEffect(() => {
    setPage(1);
  }, [filterStatus]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    setLoading(true);
    setError("");

    let url =
      `http://localhost:5000/tasks?page=${page}&limit=5`;

    if (filterStatus) {
      url += `&status=${filterStatus}`;
    }

    if (search) {
      url += `&search=${search}`;
    }

    fetch(url, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (
          res.status === 401 ||
          res.status === 400
        ) {
          localStorage.clear();
          navigate("/");
          return;
        }

        return res.json();
      })
      .then((data) => {
        setTasks(data.tasks || []);
        setTotalPages(
          Math.ceil(
            (data.total || 0) /
            (data.limit || 1)
          )
        );

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch tasks");
        setLoading(false);
      });
  }, [
    navigate,
    page,
    filterStatus,
    search
  ]);

  const addTask = useCallback(async () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              localStorage.getItem("token"),
          },
          body: JSON.stringify({
            title,
            description,
            status,
          }),
        }
      );

      const data = await response.json();

      setTasks((prev) => [
        ...prev,
        data.task
      ]);

      setTitle("");
      setDescription("");
      setStatus("Pending");
    } catch (err) {
      console.log(err);
    }
  }, [title, description, status]);

  const updateTaskStatus =
    useCallback(async (task) => {
      try {
        const newStatus =
          task.status === "Pending"
            ? "Completed"
            : "Pending";

        const response = await fetch(
          `http://localhost:5000/tasks/${task._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
              Authorization:
                localStorage.getItem(
                  "token"
                ),
            },
            body: JSON.stringify({
              status: newStatus,
            }),
          }
        );

        const data =
          await response.json();

        setTasks((prev) =>
          prev.map((t) =>
            t._id === task._id
              ? data.task
              : t
          )
        );
      } catch (err) {
        console.log(err);
      }
    }, []);

  const deleteTask =
    useCallback(async (id) => {
      try {
        await fetch(
          `http://localhost:5000/tasks/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization:
                localStorage.getItem(
                  "token"
                ),
            },
          }
        );

        setTasks((prev) =>
          prev.filter(
            (task) =>
              task._id !== id
          )
        );
      } catch (err) {
        console.log(err);
      }
    }, []);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Navbar />

        <h2 className="taskTitle">
          Tasks
        </h2>

        <p>Role: {role}</p>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <div className="taskForm">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
          >
            <option>
              Pending
            </option>
            <option>
              Completed
            </option>
          </select>

          <input
            type="text"
            placeholder="Search Task"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <button onClick={addTask}>
            Add Task
          </button>
        </div>

        <div className="taskGrid">
          {!loading &&
            tasks.length === 0 && (
              <p>
                No tasks found
              </p>
            )}

          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              updateTaskStatus={
                updateTaskStatus
              }
              deleteTask={
                deleteTask
              }
            />
          ))}
        </div>

        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() =>
              setPage(page - 1)
            }
          >
            Previous
          </button>

          <span>
            Page {page} of{" "}
            {totalPages}
          </span>

          <button
            disabled={
              page === totalPages
            }
            onClick={() =>
              setPage(page + 1)
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tasks;