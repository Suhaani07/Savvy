/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react'
import "./Cart.css"
import axios from 'axios'

const Cart = () => {
  const [mydata,setmydata]=useState([]);
 
  useEffect(() => {
    axios.get(`http://localhost:4000/api/v1/products`)
    .then((res)=>setmydata(res.data.products))
    .catch((error)=>{
      console.log(error);
    })
    
  },[]);
  return (
  <section>
    <center><h1>&nbsp;&nbsp;My Cart&nbsp; &nbsp;</h1></center>
<div> 
{
mydata.slice(0).map((post)=>{
const {price,_id,images,name}=post;

for (var i = 0; i < localStorage.length; i++){
  if(localStorage.getItem(localStorage.key(i))<=0)
  {
localStorage.removeItem(localStorage.key(i));
  }

    if(localStorage.key(i)===_id)
return(
<>
    <table>
    <tr>
      <td>
        <a href={`/products/${_id}`}>
        <img src={images[0].url} alt={name} /></a>
  </td>
      <td>
          <div>
            <h2>{name}</h2>
            <p>{localStorage.key(i)}</p>
          </div>
        
      </td>
      <td>
      <div class="square" id={localStorage.key(i)} 
      onClick={(e) => {
        var p=e.currentTarget.id;
        var a=Number(localStorage.getItem(p));
        localStorage.setItem(p,a-1);
       window.location.reload();
       
       }}
      >-</div>
      </td>
      <td>
        <h2>{localStorage.getItem(localStorage.key(i))}</h2>
        </td>
        <td>
        <div  id={localStorage.key(i)} class="square" onClick={(e) => {
           var p=e.currentTarget.id;
           var a=Number(localStorage.getItem(p));
           localStorage.setItem(p,a+1);
          window.location.reload();
         }}> +</div>
        </td>
      <td><h2>{`₹${price}`}</h2></td>
    </tr>
  </table>
  <br></br>
  </>
  
)
}



}

)


}

</div>

</section>
  

  )
  

}



export default Cart;
