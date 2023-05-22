/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import "./Admin.css"
const Panel = () => {
  return (
    <div>
      <section id="logo">
    <nav class="navbar navbar-expand-lg " id="navbar-custom">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-auto">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/admin/create">Create Product</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/admin/delete">Delete Product</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/admin/update">Update Product</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/">See Product IDs</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  </section>
    </div>
  )
}


export default Panel
