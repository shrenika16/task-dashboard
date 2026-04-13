import React from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css";

function Register(){

return(

<div className="container">

<div className="box">

<h2>Create Account</h2>
<p className="subtitle">Register to start managing your tasks</p>

<form>

<input type="text" placeholder="Enter Full Name" required/>

<input type="email" placeholder="Enter Email" required/>

<input type="password" placeholder="Enter Password" required/>

<input type="password" placeholder="Confirm Password" required/>

<button type="submit">Register</button>

</form>

<p className="switchText">
Already have an account?
<Link to="/"> Login</Link>
</p>

</div>

</div>

)

}

export default Register;