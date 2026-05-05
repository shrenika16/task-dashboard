const Task = require("../models/TaskModel");

// GET /tasks
exports.getTasks = async (req,res)=>{

try{

const { status, sort, search, page = 1, limit = 5 } = req.query;

let query = {
userId: req.user.userId
};

// Filter
if(status){
query.status = status;
}

// Search
if(search){
query.title = {
$regex: search,
$options: "i"
};
}

// Total tasks count
const total = await Task.countDocuments(query);

// Query build
let tasks = Task.find(query);

// Sorting
if(sort === "latest"){
tasks = tasks.sort({ createdAt: -1 });
}

if(sort === "oldest"){
tasks = tasks.sort({ createdAt: 1 });
}

// Pagination
tasks = tasks.skip((page - 1) * limit).limit(Number(limit));

const result = await tasks;

res.json({
tasks: result,
total,
page: Number(page),
limit: Number(limit)
});

}catch(error){

res.status(500).json({
message:error.message
});

}

};


// POST /tasks
exports.addTask = async (req,res)=>{

try{

const newTask = new Task({
title:req.body.title,
description:req.body.description,
status:req.body.status,
userId:req.user.userId
});

const savedTask = await newTask.save();

res.json({
message:"Task added",
task:savedTask
});

}catch(error){

res.status(500).json({
message:error.message
});

}

};


// UPDATE task
exports.updateTask = async (req,res)=>{

try{

const updatedTask = await Task.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
);

if(!updatedTask){
return res.status(404).json({
message:"Task not found"
});
}

res.json({
message:"Task updated",
task:updatedTask
});

}catch(error){

res.status(500).json({
message:error.message
});

}

};


// DELETE task
exports.deleteTask = async (req,res)=>{

try{

const deletedTask = await Task.findByIdAndDelete(
req.params.id
);

if(!deletedTask){
return res.status(404).json({
message:"Task not found"
});
}

res.json({
message:"Task deleted"
});

}catch(error){

res.status(500).json({
message:error.message
});

}

};