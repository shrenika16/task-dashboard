import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import "../styles/task.css";

function Tasks(){

const [tasks,setTasks] = useState([]);
const [title,setTitle] = useState("");
const [description,setDescription] = useState("");
const [status,setStatus] = useState("Pending");
const [loading,setLoading] = useState(false);

// Fetch tasks from backend
useEffect(()=>{

fetch("http://localhost:5000/tasks")
.then(res => res.json())
.then(data => setTasks(data))
.catch(err => console.log(err));

},[]);

// Add task using POST API
const addTask = async () => {

if(!title || !description){
alert("Please fill all fields");
return;
}

setLoading(true);

const response = await fetch("http://localhost:5000/tasks",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
title,
description,
status
})
});

const data = await response.json();

setTasks([...tasks,data.task]);

setTitle("");
setDescription("");
setStatus("Pending");

setLoading(false);

};

return(

<div className="dashboard">

<Sidebar/>

<div className="main">

<h2 className="taskTitle">Tasks</h2>

<div className="taskForm">

<input
type="text"
placeholder="Task Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<input
type="text"
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<select
value={status}
onChange={(e)=>setStatus(e.target.value)}
>
<option>Pending</option>
<option>Completed</option>
</select>

<button onClick={addTask}>
{loading ? "Adding..." : "Add Task"}
</button>

</div>

<div className="taskGrid">

{tasks.map((task)=>(
<TaskCard
key={task._id}
title={task.title}
desc={task.description}
status={task.status}
/>
))}

</div>

</div>

</div>

)

}

export default Tasks;