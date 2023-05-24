import React,{useEffect,useState} from 'react'
import './Login.css'
import axios from 'axios';
const url = 'http://localhost:4000/api/v1/login';
const Login = () => {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
	try{
		const res =await axios.post(url,{email,password});
		console.log(res.data.user);
		// eslint-disable-next-line no-restricted-globals
		alert("Successfully Logged In");
		localStorage.setItem("loggedin", true);
		localStorage.setItem("id", res.data.user._id);
		localStorage.setItem("status", res.data.user.role);
		window.location.replace("/");
	}
	catch(error){
		console.log(error)
		alert(error.response.data.message);
	}
  };
  return (
    <div>
      <div class="box-form">
	<div class="left">
		<div class="overlay">
		<h1 class="lname">Join Us Today</h1>
		</div>
	</div>
		<div class="right">
		<h5 class="login">Login</h5>
		<p>Don't have an account? <a href="/register">Register</a> it takes less than a minute</p>
		<form>
		<div class="inputs">
			<input type="email" placeholder="user name" id="email" value={email}
            onChange={(e) => setEmail(e.target.value)}/>
			
			<input type="password" placeholder="password" id='password' value={password}
            onChange={(e) => setPassword(e.target.value)}/>
		</div>
			
		<div class="remember-me--forget-password">
		</div>
			<button type='submit' onClick={handleSubmit}>Login</button>
			</form>
	</div>
</div>
    </div>
	)
}


export default Login
