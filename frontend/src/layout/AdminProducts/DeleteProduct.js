import React,{useState} from 'react'
import './Admin.css'
import axios from 'axios';
const DeleteProduct = () => {

  const [id, setID] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
	try{
		const res =await axios.delete(`http://localhost:4000/api/v1/admin/products/${id}`);
        console.log(res);
		alert("Successfully Deleted");
		window.location.replace("/");
	}
	catch(error){
		console.log(error)
		alert(error.response);
	}
  };
  return (
    <div id="admin">
      <div class="box-form">
	<div class="left">
		<div class="overlay">
		<h1>Delete Product</h1>
		</div>
	</div>
		<div class="right">
		<form onSubmit={handleSubmit}>
        <div class="inputs">
			<input type="text" placeholder="Product ID" id="id" value={id}
            onChange={(e) => setID(e.target.value)}/>
		</div>
			<button type='submit'>Delete</button>
			</form>
	</div>
</div>
    </div>
	)
}
export default DeleteProduct
