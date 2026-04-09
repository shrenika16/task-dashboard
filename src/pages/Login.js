import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/auth.css";

function Login() {

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [errors,setErrors] = useState({})

const handleSubmit = (e) => {

e.preventDefault()

let newErrors = {}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(!email){
newErrors.email="Email is required"
}
else if(!emailRegex.test(email)){
newErrors.email="Invalid email format"
}

if(!password){
newErrors.password="Password is required"
}
else if(password.length < 6){
newErrors.password="Password must be at least 6 characters"
}

setErrors(newErrors)

}

return(

<div className="container">

<div className="box">

<h2>Login</h2>

<form onSubmit={handleSubmit}>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

{errors.email && <p className="error">{errors.email}</p>}

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

{errors.password && <p className="error">{errors.password}</p>}

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

export default Login