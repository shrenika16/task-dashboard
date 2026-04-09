import React from "react";

function TaskModal({close}){

return(

<div className="modal">

<div className="modal-box">

<h3>Add Task</h3>

<input placeholder="Title"/>

<textarea placeholder="Description"></textarea>

<button>Save</button>

<button onClick={close}>Cancel</button>

</div>

</div>

)

}

export default TaskModal