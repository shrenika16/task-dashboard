import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Login(){

const navigate = useNavigate();

const handleLogin = (e)=>{
e.preventDefault();

localStorage.setItem("user","loggedIn");

navigate("/dashboard");
}

return(

<div className="container">

<div className="box">

<h2>Welcome Back</h2>
<p className="subtitle">Login to your account</p>

<form onSubmit={handleLogin}>

<input type="email" placeholder="Enter Email" required/>

<input type="password" placeholder="Enter Password" required/>

<button type="submit">Login</button>

</form>

<p className="switchText">
Don't have an account?
<Link to="/register"> Register</Link>
</p>

</div>

</div>

)

}

export default Login;