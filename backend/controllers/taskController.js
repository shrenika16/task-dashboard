const Task = require("../models/TaskModel");

// GET /tasks
exports.getTasks = async (req, res, next) => {
  try {
    const {
      status,
      sort,
      search,
      page = 1,
      limit = 5
    } = req.query;

    let query = {};

    // Role-based access
    if (req.user.role !== "Admin") {
      query.userId = req.user.userId;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Optimized Search
    if (search) {
      query.$text = {
        $search: search
      };
    }

    // Total count
    const total = await Task.countDocuments(query);

    let tasksQuery = Task.find(query);

    // Sorting
    if (sort === "latest") {
      tasksQuery = tasksQuery.sort({
        createdAt: -1
      });
    } else if (sort === "oldest") {
      tasksQuery = tasksQuery.sort({
        createdAt: 1
      });
    } else {
      tasksQuery = tasksQuery.sort({
        createdAt: -1
      });
    }

    // Pagination + lean
    const result = await tasksQuery
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    res.json({
      tasks: result,
      total,
      page: Number(page),
      limit: Number(limit)
    });

  } catch (error) {
    next(error);
  }
};

// POST /tasks
exports.addTask = async (req, res, next) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      userId: req.user.userId
    });

    const savedTask = await newTask.save();

    res.json({
      message: "Task added",
      task: savedTask
    });

  } catch (error) {
    next(error);
  }
};

// ADD SAMPLE TASKS (Optimized)
exports.addSampleTasks = async (req, res, next) => {
  try {
    const sampleTasks = [
      {
        title: "Math Homework",
        description: "Complete algebra",
        status: "Completed",
        userId: req.user.userId
      },
      {
        title: "React Practice",
        description: "Build components",
        status: "Pending",
        userId: req.user.userId
      },
      {
        title: "Project Work",
        description: "Task manager app",
        status: "Completed",
        userId: req.user.userId
      },
      {
        title: "Node Study",
        description: "Learn Express",
        status: "Pending",
        userId: req.user.userId
      }
    ];

    const savedTasks =
      await Task.insertMany(sampleTasks);

    res.json({
      message: "Sample tasks added",
      tasks: savedTasks
    });

  } catch (error) {
    next(error);
  }
};

// UPDATE task
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    if (
      req.user.role !== "Admin" &&
      task.userId.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const updatedTask =
      await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      ).lean();

    res.json({
      message: "Task updated",
      task: updatedTask
    });

  } catch (error) {
    next(error);
  }
};

// DELETE task
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    if (
      req.user.role !== "Admin" &&
      task.userId.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task deleted"
    });

  } catch (error) {
    next(error);
  }
};