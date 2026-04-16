const Task = require("../models/TaskModel");

// GET /tasks
exports.getTasks = async (req,res)=>{

try{

const tasks = await Task.find();

res.json(tasks);

}catch(error){

res.status(500).json({message:error.message});

}

};


// POST /tasks
exports.addTask = async (req,res)=>{

try{

const newTask = new Task({

title:req.body.title,
description:req.body.description,
status:req.body.status

});

const savedTask = await newTask.save();

res.json({
message:"Task added",
task:savedTask
});

}catch(error){

res.status(500).json({message:error.message});

}

};