import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
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
.then(res => {

if(res.status === 401 || res.status === 400){
localStorage.clear();
navigate("/");
return;
}

return res.json();

})
.then(data => {
if(data){
setTasks(data.tasks || []);
}
})
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

<Navbar />

<h2 className="dashboardTitle">
Welcome {userName}
</h2>

<div className="cards">

<div
className="card total"
onClick={()=>navigate("/tasks")}
>
<h3>Total Tasks</h3>
<p>{totalTasks}</p>
</div>

<div
className="card completed"
onClick={()=>navigate("/tasks?status=Completed")}
>
<h3>Completed Tasks</h3>
<p>{completedTasks}</p>
</div>

<div
className="card pending"
onClick={()=>navigate("/tasks?status=Pending")}
>
<h3>Pending Tasks</h3>
<p>{pendingTasks}</p>
</div>

</div>

<button onClick={logout}>
Logout
</button>

</div>

</div>

)

}

export default Dashboard;