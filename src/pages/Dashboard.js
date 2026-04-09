import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function Dashboard(){

return(

<div className="dashboard">

<Sidebar/>

<div className="main">

<div className="welcome">
<h2>Welcome to Dashboard</h2>
</div>

<div className="cards">

<div className="card">
<h3>Total Tasks</h3>
<p>10</p>
</div>

<div className="card">
<h3>Completed</h3>
<p>5</p>
</div>

<div className="card">
<h3>Pending</h3>
<p>5</p>
</div>

</div>

</div>

</div>

)

}

export default Dashboard