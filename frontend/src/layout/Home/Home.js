/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react'
import "./Home.css"
import axios from 'axios'

const Home = () => {

  const [mydata,setmydata]=useState([]);
 
  useEffect(() => {
    axios.get('http://localhost:4000/api/v1/products')
    .then((res)=>setmydata(res.data.products))
    .catch((error)=>{
      console.log(error);
    })
    
  },[]);
  return (
    <section>
<div id="carouselExampleControls" class="carousel slide carousel-fade" data-interval="5000" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
    <img src="/images/poster1.png" class="d-block w-100" alt="Image"/>
    </div>
    <div class="carousel-item">
    <img src="/images/poster2.png" class="d-block w-100" alt="Image"/>
    </div>
    <div class="carousel-item">
    <img src="/images/poster1.webp" class="d-block w-100" alt="Image"/>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
  <div class="p"></div>
</div>

<div class="container">
  <div class="row">
  <a href='/category/watch'>
<div class="card card1 card-image">
     
    <div class="col">
      <h5 class="pink-text"><i class="fas fa-chart-pie"></i> Watches</h5>
  </div>
  
</div>
</a>
<a href='/category/perfume'>
<div class="card card2 card-image">
     
    <div class="col">
      <h5 class="pink-text">Perfumes</h5>
  </div>
 
</div>
</a>
<div class="q"></div>
</div>
</div>
<center><h1>&nbsp;&nbsp;Popular In Store&nbsp; &nbsp;</h1></center>

<div >
<div id='productcard'class="container" >
  
  <div class="gallery row">
{mydata.slice(0,2).map((post)=>{

const {price,_id,images,name,category}=post;
return(
<>
      <div class="content col">
<a className='productCard' href={`/products/${_id}`}>
  <img src={images[0].url} alt={name} width="100px" height="100px"/></a>
        
      <p>{name}</p>
      <span>{`₹${price}`}</span>
      <br></br>
        <div>{category}</div>
      </div>
    
  </>
)




})


}
</div>
</div>
</div>

</section>
  

  )}



export default Home;
