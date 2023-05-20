import React,{useEffect,useState} from 'react'
import axios from 'axios';
const Update = () => {
    const id=window.localStorage.getItem("id");
    console.log(id);
    const [userdata,setuserdata]=useState([]);
    useEffect(() => {
      axios.get(`http://localhost:4000/api/v1/myprofile/${id}`)
      .then((res)=>setuserdata(res.data.user))
      .catch((error)=>{
        console.log(error);
      })
      
    },[]);;
    const [email, setEmail] = useState(userdata.email);
    const [name, setName] = useState(userdata.name);
  
    const update = async (e) => {
      e.preventDefault();
    try{
      const res =await axios.put(`http://localhost:4000/api/v1/myprofile/${id}/update`,{name,email});
      console.log(res.data);
      alert("Successfully Updated");
      window.location.replace("/login");
    }
    catch(error){
      console.log(error)
      alert(error.response.data.message);
    }
    };
      return (
        
        <>
        <div>
      <div class="box-form">
	<div class="left">
		<div class="overlay">
		<h1 class="lname">Update Profile</h1>
		</div>
	</div>
		<div class="right">
		<h5 class="login">Update Details</h5>
		<form onSubmit={update}>
        <div class="inputs">
			<input type="text" placeholder="Name" id="namebox" defaultValue={userdata.name}
      onChange={(e) => setName(e.target.value)} />
		
			<input type="email" placeholder="Email" id="email" defaultValue={userdata.email}
      onChange={(e) => setEmail(e.target.value)}/>
		</div>
    <form action='/login' method='get'>
      <button type='submit' >Cancel</button>
      </form>
			<button type='submit' >Done</button>

     
			</form>
	</div>
</div>
    </div>
        </>
      )     
}
export default Update
