import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Login(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const loginUser = async (e) => {

e.preventDefault();

const response = await fetch("http://localhost:5000/auth/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email,
password
})
});

const data = await response.json();

if(response.ok){
alert("Hi " + data.name);
localStorage.setItem("user",data.name);
localStorage.setItem("token", data.token);
navigate("/dashboard");
}
else{
alert(data.message);
}

};

return(

<div className="container">

<div className="box">

<h2>Welcome Back</h2>
<p className="subtitle">Login to your account</p>

<form onSubmit={loginUser}>

<input
type="email"
placeholder="Enter Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="Enter Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

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
