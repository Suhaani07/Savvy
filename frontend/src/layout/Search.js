/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react'
import "./Products/Products.css"
import axios from 'axios'
import { useParams } from 'react-router-dom';

const Search = () => {
  const [mydata,setmydata]=useState([]);
  useEffect(() => {
    axios.get('http://localhost:4000/api/v1/products')
    .then((res)=>setmydata(res.data.products))
    .catch((error)=>{
      console.log(error);
    })
  },[]);
  const {name} = useParams();
    let s=name;
  return (
  <section>
<div className='grid'>
{
mydata.map((post)=>{

const {price,_id,images,name,NumofReview,category,description}=post;
s=s.toLowerCase();
if(category.toLowerCase().includes(s)||name.toLowerCase().includes(s)||description.toLowerCase().includes(s))
{
return(
<>

  <div id='productcard' key={_id}>
  
    <div class="gallery">
      <div class="content">
      
<a className='productCard' href={`/products/${_id}`}>
  <img src={images[0].url} alt={name} width="100px" height="120px"/></a>
        
      <p>{name}</p>
        <span>({NumofReview} Reviews)</span>
        <br></br>
        <span>{`₹${price}`}</span>
        <ul>
          <li><i class="fa fa-star" aria-hidden="true"></i></li>
          <li><i class="fa fa-star" aria-hidden="true"></i></li>
          <li><i class="fa fa-star" aria-hidden="true"></i></li>
          <li><i class="fa fa-star" aria-hidden="true"></i></li>
          <li><i class="fa fa-star" aria-hidden="true"></i></li>
        </ul>
      </div>
    </div>
  
    

  </div>
  </>
)
}



})


}
</div>

</section>
  

  )}
export default Search;
