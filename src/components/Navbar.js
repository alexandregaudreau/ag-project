import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <span className="navbar-brand fs-2 fw-bold text-warning mx-4">
          Alex's Project
        </span>

        <div className="d-flex justify-content-center align-items-center mx-4">
          <Link to="/" className="btn btn-outline-light mx-3">
            Home
          </Link>
          <Link to="/movies" className="btn btn-outline-light mx-3">
            Films
          </Link>

          <input
            type="search"
            className="form-control w-auto mx-4"
            placeholder="Search"
            style={{ width: '150px' }}
          />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
