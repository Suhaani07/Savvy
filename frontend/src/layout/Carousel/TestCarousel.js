/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import "./Carousel.css"
const TestCarousel = () => {
  return (
    <>
    <div class="Testi">

    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
    "I was blown away by the quality of the perfumes and watches I received from Drippy. 
    <br></br>
    The scents were unique and long-lasting, and the watches were absolutely stunning.
    <br></br>
    I would highly recommend this website to anyone looking for luxury items at an affordable price."
    <br></br> - Sarah L.
    </div>
    <div class="carousel-item">
    "I had a fantastic experience shopping on Drippy.<br></br>
    The website was easy to navigate and the customer service was excellent. 
    <br></br>I received my order quickly and everything was packaged beautifully. 
    <br></br>I will definitely be a repeat customer."<br></br>- John S.
    </div>
    <div class="carousel-item">
    "Drippy has become my go-to for luxury items. 
    <br></br>Their selection of perfumes and watches is unmatched, and the quality is top-notch. 
    <br></br>Plus, their prices are very reasonable. 
    <br></br>I highly recommend checking out this website if you're in the market for luxury items." 
    <br></br>- Emily H.
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>

    </div>
    
    </>
  )
}


export default TestCarousel
