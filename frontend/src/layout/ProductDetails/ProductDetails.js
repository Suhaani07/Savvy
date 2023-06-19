import React, { useEffect, useState } from 'react'
import "./ProductDetails.css"
import axios from "axios"
import { useParams } from 'react-router-dom';
import { Alert } from 'bootstrap';
function ProductDetails() {
  const [mydata,setmydata]=useState([]);
 
  useEffect(() => {
    axios.get('http://localhost:4000/api/v1/products')
    .then((res)=>setmydata(res.data.products))
    .catch((error)=>{
      console.log(error);
    })
  },[]);
    const {_id} = useParams()
    let s=_id
    const Add = async (e) => {
  
    try{
      localStorage.setItem(document.getElementsByClassName("pname")[0].innerHTML,`${_id}` );
        alert("Added to Cart");
      
    }
    catch(error){
      console.log(error)
      
    }
    };
    return (
 <div>
      {
      mydata.map((post)=>{
        const {price,_id,images,name,description}=post;
        if(s===_id)
        {
        return(
          
          <div key={_id}>
<>
<section>
    <div class="product-img">
                <img src={images[0].url} alt={name} width="250" height="250"/>
              </div>
              <div class="p"></div>
              <div class="q"></div>  
              <div class="product-info">
<div class="product-price-btn">
<h1 class="pname">{name}</h1>
<br></br>
<span class="pspan">{`₹${price}`}</span>
<br/>
<span>
<button type="button" id="buy" >Buy now</button>
<button type="button" id="buy" onClick={Add}>Add to Cart</button>
</span>
<br></br>
<span class="pdes">{description}</span>
        
        <br/>
      </div>
    </div>  
   
</section>
</>
</div>
        )
        }
        })
      }            
        </div>
    )
}
export default ProductDetails
