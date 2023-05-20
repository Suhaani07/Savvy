import React from 'react'
import ReactStars from "react-rating-stars-component"
import {Link} from "react-router-dom"
import "./Home.css"


const Product = ({product}) => {
  const options={
    edit:false,
    color:"rgba(20,10,20,0.1)",
    activeColor : "tomato",
    size:window.innerWidth>600?30:20,
    value : product.ratings,
    isHalf:true,


}
  return (
    
      <Link className='productCard' to={`/products/${product._id}`}>
      <img src={product.images[0].url} alt={product.name}/>
      <p>{product.name}</p>
      <div>
      <ReactStars {...options} />
      
      <span>({product.NumofReview} Reviews)</span>
      </div>
      <span>{`₹${product.price}`}</span>
      
      </Link>
    
  )
}

export default Product
