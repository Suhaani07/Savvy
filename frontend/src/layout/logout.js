import React,{useEffect,useState} from 'react'
import axios from 'axios';
const logout = () => {
    alert("Logged Out");
    localStorage.removeItem("loggedin");
		localStorage.removeItem("id");
		localStorage.removeItem("status",);
    window.location.replace("/");
      return (
        <>
    
        </>
       
      )
}
	

export default logout


  