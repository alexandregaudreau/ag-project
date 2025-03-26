import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_KEY = process.env.REACT_APP_TMDB_API_KEY
const API_URL = 'https://api.themoviedb.org/3/movie/popular'

function MoviesPage() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    axios
      .get(`${API_URL}?api_key=${API_KEY}&language=fr-FR&page=1`)
      .then((response) => {
        setMovies(response.data.results)
      })
      .catch((error) => {
        console.error('Error fetching movies :', error)
      })
  }, [])

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Films Populaires</h2>
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-3 mb-4">
            <div className="card">
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
    </div>
  )
}

export default MoviesPage
