const User = require("../models/user");
const Task = require("../models/TaskModel");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({
      status: "Completed",
    });
    const pendingTasks = await Task.countDocuments({
      status: "Pending",
    });

    res.json({
      totalUsers,
      totalTasks,
      completedTasks,
      pendingTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};