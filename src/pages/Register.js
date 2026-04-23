import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";


function Register(){

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");
const navigate = useNavigate();

const registerUser = async (e) => {

e.preventDefault();

if(password !== confirmPassword){
alert("Passwords do not match");
return;
}

const response = await fetch("http://localhost:5000/auth/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name,
email,
password
})
});

const data = await response.json();

if(response.status === 201){
alert("Registration successful. Please login.");
navigate("/");
}
else{
alert(data.message);
}

};

return(

<div className="container">

<div className="box">

<h2>Create Account</h2>
<p className="subtitle">Register to start managing your tasks</p>

<form onSubmit={registerUser}>

<input
type="text"
placeholder="Enter Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>

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

<input
type="password"
placeholder="Confirm Password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
required
/>

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
