import React from "react";
import "../styles/modal.css";

function TaskModal({ close }){

return(

<div className="modal">

<div className="modal-box">

<h3>Add Task</h3>

<input
type="text"
placeholder="Task Title"
/>

<textarea
placeholder="Task Description"
></textarea>

<button>
Save
</button>

<button onClick={close}>
Cancel
</button>

</div>

</div>

)

}

export default TaskModal;