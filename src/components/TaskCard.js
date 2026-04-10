import React from "react";
import "../styles/task.css";

function TaskCard({title,desc,status}){

return(

<div className="taskCard">

<h3>{title}</h3>

<p>{desc}</p>

<p>Status: {status}</p>

</div>

)

}

export default TaskCard;