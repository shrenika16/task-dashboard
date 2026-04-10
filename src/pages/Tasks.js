import React,{useState,useEffect} from "react"
import Sidebar from "../components/Sidebar"
import TaskCard from "../components/TaskCard"

function Tasks(){

const [tasks,setTasks]=useState([])

useEffect(()=>{

const savedTasks = localStorage.getItem("tasks")

if(savedTasks){
setTasks(JSON.parse(savedTasks))
}

},[])

const addTask=()=>{

const newTasks=[...tasks,{
title:"New Task",
desc:"Task description",
status:"Pending"
}]

setTasks(newTasks)

localStorage.setItem("tasks",JSON.stringify(newTasks))

}

return(

<div className="dashboard">

<Sidebar/>

<div className="main">

<button onClick={addTask}>Add Task</button>

{tasks.map((t,i)=>(

<TaskCard
key={i}
title={t.title}
desc={t.desc}
status={t.status}
/>

))}

</div>

</div>

)

}

export default Tasks;