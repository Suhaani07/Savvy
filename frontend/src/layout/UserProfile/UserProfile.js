import React,{useEffect,useState} from 'react'
import './UserProfile.css'
import axios from 'axios';
const UserProfile = () => {
    const id=window.localStorage.getItem("id");
    console.log(id);
    const [userdata,setuserdata]=useState([]);
    useEffect(() => {
      axios.get(`http://localhost:4000/api/v1/myprofile/${id}`)

      .then((res)=>setuserdata(res.data.user))
      
      
      .catch((error)=>{
        console.log(error);
        
      })
    },[]);
      return (
        <>
        <div>
      <div class="box-form">
	<div class="left">
		<div class="overlay">
		<h1 class="lname">&nbsp;&nbsp;My Profile</h1>
		</div>
	</div>
		<div class="right">
		<h5 class="login">{userdata.name}</h5>
        <span class="useremail">{userdata.email}</span>
        <br></br>
		<span class="userrole">{userdata.role}</span>
        <br></br>
        <div>
         <form action="/logout" method="get"> 
        <button type='submit' id="logout">Logout</button>
        </form>
        <form action="/login/update" method="get"> 
        <button type='submit' id="logout">Update</button>
        </form>
        </div>
		</div>
			
			
	</div>
</div>
    
        </>
       
      )
}
	

export default UserProfile


  