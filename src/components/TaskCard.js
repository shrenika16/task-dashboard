import React from "react";

function TaskCard({title,desc,status}){

return(

<div className="task-card">

<h3>{title}</h3>

<p>{desc}</p>

<span>{status}</span>

</div>

)

}

export default TaskCard