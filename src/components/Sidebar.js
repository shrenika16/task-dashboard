import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function Sidebar() {

const navigate = useNavigate();

const handleLogout = () => {
localStorage.removeItem("user");
navigate("/");
};

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
<button onClick={handleLogout}>Logout</button>
</li>

</ul>

</div>

)

}

export default Sidebar;