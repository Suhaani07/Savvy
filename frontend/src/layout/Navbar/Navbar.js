/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import "./Navbar.css"
const Navbar = () => {
  return (
    <div>
      <section id="logo">
    <nav class="navbar navbar-expand-lg " id="navbar-custom">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="/images/logo.png" alt="Logo" width="100" height="70" class="d-inline-block align-text-top"/></a>
        <a class="navbar-brand " id="brand-text" href="/">Savvy</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-auto">
            <li class="nav-item">
              <a class="nav-link active" id="home" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/products">Products</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/login">My Account</a>
            </li>
          </ul>
          <span class="navbar-text">
            <form class="d-flex" role="search" >
              <input class="form-control" type="search" placeholder="Search here" aria-label="Search"/>
              <button class=" btn btn-link" type="submit" ><img src="/images/search.png" alt="Search" width="15" height="15"/></button>
            </form>
          </span>
        </div>
      </div>
    </nav>

  </section>
    </div>
  )
}


export default Navbar
