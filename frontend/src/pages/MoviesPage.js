import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/MoviesPage.css'
import { API_KEY, API_URL } from '../config/config'

function MoviesPage() {
  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [category, setCategory] = useState('now_playing')
  const navigate = useNavigate()

  const pageTitle = {
    popular: 'Popular movies',
    top_rated: 'Top rated movies',
    now_playing: 'Now playing movies',
    upcoming: 'Upcoming movies',
  }[category]

  useEffect(() => {
    fetchMovies(category, currentPage)
  }, [category, currentPage])

  const fetchMovies = (category, page) => {
    axios
      .get(
        `${API_URL}${category}?api_key=${API_KEY}&language=en-US&page=${page}`
      )
      .then((response) => {
        setMovies(response.data.results)
        setTotalPages(response.data.total_pages)
      })
      .catch((error) => {
        console.error('Error fetching movies:', error)
      })
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{pageTitle}</h2>

      <div className="mb-3">
        <label htmlFor="categorySelect" className="form-label fw-bold">
          Sort by:
        </label>
        <select
          id="categorySelect"
          className="form-select"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value)
            setCurrentPage(1)
          }}
        >
          <option value="now_playing">Now playing</option>
          <option value="upcoming">Upcoming</option>
          <option value="popular">Most Popular</option>
          <option value="top_rated">Top Rated</option>
        </select>
      </div>

      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-3 mb-4">
            <div
              className="card"
              onClick={() => navigate(`/movie/${movie.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.release_date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-primary"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  )
}

export default MoviesPage
