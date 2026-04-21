import React from "react";

function TaskCard({title,desc,status,updateTaskStatus,deleteTask}){

return(

<div className="taskCard">

<h3>{title}</h3>

<p>{desc}</p>

<span className={`status ${status==="Completed"?"completed":"pending"}`}>
{status}
</span>

<div className="taskActions">

<button onClick={updateTaskStatus}>
Update
</button>

<button onClick={deleteTask}>
Delete
</button>

</div>

</div>

)

}

export default TaskCard