import React,{useEffect,useState} from 'react'
import './Admin.css'
import axios from 'axios';
const CreateProduct = () => {

  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [public_id, setID] = useState('');
  const [url, setUrl] = useState('');
  var images=[];

  const handleSubmit = async (e) => {
    e.preventDefault();
	try{
		
		images.push({public_id,
			url});
		const res =await axios.post("http://localhost:4000/api/v1/admin/products/new",
		{name,description,category,price,images});
		console.log(res);
		alert("Successfully Created");
		window.location.replace("/");
	}
	catch(error){
		console.log(error)
		alert(error.response);
	}
  };
  return (
    <div>
      <div class="box-form">
	<div class="left">
		<div class="overlay">
		<h1>Create Product</h1>
		</div>
	</div>
		<div class="right">
		<form onSubmit={handleSubmit}>
        <div class="inputs">
			<input type="text" placeholder="Name" id="name" value={name}
            onChange={(e) => setName(e.target.value)}/>
		
			<input type="text" placeholder="Description" id="description" value={description}
            onChange={(e) => setDescription(e.target.value)}/>
			
			<input type="text" placeholder="Category" id='category' value={category}
            onChange={(e) => setCategory(e.target.value)}/>

<input type="number" placeholder="Price" id="price" value={price}
            onChange={(e) => setPrice(e.target.value)}/>
			
			<input type="text" placeholder="Image url" id='url' 
            onChange={(e) => (setUrl(e.target.value),setID(e.target.value))}/>
			
		</div>
			<button type='submit'>Create</button>
			</form>
	</div>
</div>
    </div>
	)
}
export default CreateProduct
