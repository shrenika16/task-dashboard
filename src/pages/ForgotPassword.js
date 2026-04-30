import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const resetPassword = async (e) => {
e.preventDefault();

const response = await fetch(
"http://localhost:5000/auth/forgot-password",
{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email,
password
})
}
);

const data = await response.json();

alert(data.message);

if(response.ok){
navigate("/");
}

};

return(

<div className="container">

<div className="box">

<h2>Reset Password</h2>

<form onSubmit={resetPassword}>

<input
type="email"
placeholder="Enter Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="New Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button type="submit">
Reset Password
</button>

</form>

</div>

</div>

)

}

export default ForgotPassword;