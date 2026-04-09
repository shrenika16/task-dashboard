import React from "react";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

function Sidebar() {

return(

<div className="sidebar">

<h3>Task App</h3>

<ul>

<li>
<Link to="/dashboard">Dashboard</Link>
</li>

<li>
<Link to="/tasks">Tasks</Link>
</li>

<li>
<Link to="/">Logout</Link>
</li>

</ul>

</div>

)

}

export default Sidebar