import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Login(){

const navigate = useNavigate();

const handleLogin=(e)=>{
e.preventDefault();

localStorage.setItem("user","loggedIn");

navigate("/dashboard");
}

return(

<div className="container">

<div className="box">

<h2>Login</h2>

<form onSubmit={handleLogin}>

<input type="email" placeholder="Email" required/>

<input type="password" placeholder="Password" required/>

<button type="submit">Login</button>

</form>

<p>
Don't have account?
<Link to="/register"> Register</Link>
</p>

</div>

</div>

)

}

export default Login;