import React, { memo } from "react";

function TaskCard({
  task,
  updateTaskStatus,
  deleteTask
}) {
  return (
    <div className="taskCard">
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <span
        className={`status ${
          task.status === "Completed"
            ? "completed"
            : "pending"
        }`}
      >
        {task.status}
      </span>

      <div className="taskActions">
        <button
          onClick={() =>
            updateTaskStatus(task)
          }
        >
          Update
        </button>

        <button
          onClick={() =>
            deleteTask(task._id)
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default memo(TaskCard);