import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function Dashboard(){

const totalTasks = 10;
const completedTasks = 4;
const pendingTasks = 6;

return(

<div className="dashboard">

<Sidebar/>

<div className="main">

<h2 className="dashboardTitle">Dashboard</h2>

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