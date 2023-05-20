import React,{useEffect,useState} from 'react'
import './Register.css'
import axios from 'axios';
const url = 'http://localhost:4000/api/v1/register';
const Register = () => {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
	try{
		const res =await axios.post(url,{name,email,password});
		console.log(res.data);
		alert("Successfully Registered. Please Proceed to Log In");
		window.location.replace("/login");
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
		<h5 class="login">Register</h5>
		<p>Already have an account? <a href="/login">Login</a> Now</p>
		<form onSubmit={handleSubmit}>
        <div class="inputs">
			<input type="text" placeholder="Name" id="name" value={name}
            onChange={(e) => setName(e.target.value)}/>
		
			<input type="email" placeholder="user name" id="email" value={email}
            onChange={(e) => setEmail(e.target.value)}/>
			
			<input type="password" placeholder="password" id='password' value={password}
            onChange={(e) => setPassword(e.target.value)}/>
		</div>
			<button type='submit'>Register</button>
			</form>
	</div>
</div>
    </div>
	)
}
export default Register
