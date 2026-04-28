import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard(){

const navigate = useNavigate();
const [tasks,setTasks] = useState([]);

useEffect(()=>{

const token = localStorage.getItem("token");

if(!token){
navigate("/");
return;
}

fetch("http://localhost:5000/tasks",{
headers:{
Authorization: token
}
})
.then(res => res.json())
.then(data => setTasks(data))
.catch(err => console.log(err));

},[navigate]);

const logout = () => {
localStorage.clear();
navigate("/");
};

const userName = localStorage.getItem("user");

const totalTasks = tasks.length;
const completedTasks = tasks.filter(
task => task.status === "Completed"
).length;

const pendingTasks = tasks.filter(
task => task.status === "Pending"
).length;

return(

<div className="dashboard">

<Sidebar/>

<div className="main">

<h2 className="dashboardTitle">
Welcome {userName}
</h2>

<button onClick={logout}>
Logout
</button>

<div className="cards">

<div className="card total">
<h3>Total Tasks</h3>
<p>{totalTasks}</p>
</div>

<div className="card completed">
<h3>Completed Tasks</h3>
<p>{completedTasks}</p>
</div>

<div className="card pending">
<h3>Pending Tasks</h3>
<p>{pendingTasks}</p>
</div>

</div>

</div>

</div>

)

}

export default Dashboard;