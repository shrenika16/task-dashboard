import React from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css";

function Register(){

return(

<div className="container">

<div className="box">

<h2>Register</h2>

<form>

<input type="text" placeholder="Full Name" />

<input type="email" placeholder="Email" />

<input type="password" placeholder="Password" />

<input type="password" placeholder="Confirm Password" />

<button>Register</button>

</form>

<p>
Already have account?
<Link to="/"> Login</Link>
</p>

</div>

</div>

)

}

export default Register