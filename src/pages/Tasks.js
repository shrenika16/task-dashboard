import React from "react";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import "../styles/task.css";

function Tasks(){

const tasks=[
{title:"Complete UI",desc:"Finish dashboard design",status:"Pending"},
{title:"Fix Login",desc:"Fix login bug",status:"Completed"},
{title:"Add Modal",desc:"Add task modal popup",status:"Pending"}
]

return(

<div className="dashboard">

<Sidebar/>

<div className="main">

<h2 className="taskTitle">Tasks</h2>

<button className="addBtn">+ Add Task</button>

<div className="taskGrid">

{tasks.map((task,index)=>(
<TaskCard
key={index}
title={task.title}
desc={task.desc}
status={task.status}
/>
))}

</div>

</div>

</div>

)

}

export default Tasks