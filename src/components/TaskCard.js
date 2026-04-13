import React from "react";

function TaskCard({title,desc,status}){

return(

<div className="taskCard">

<h3>{title}</h3>

<p>{desc}</p>

<span className={`status ${status==="Completed"?"completed":"pending"}`}>
{status}
</span>

</div>

)

}

export default TaskCard