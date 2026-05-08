const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending"
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Performance Optimization (Search faster)
taskSchema.index({
  title: "text"
});

module.exports = mongoose.model("Task", taskSchema);