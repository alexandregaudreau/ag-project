import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { API_KEY, API_URL } from '../config/config'

function MovieDetail() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`${API_URL}${id}?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        setMovie(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p className="text-center mt-4">Loading...</p>
  if (!movie) return <p className="text-center mt-4">Movie not found</p>

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-8">
          <h2>{movie.title}</h2>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average} / 10
          </p>
          <p>
            <strong>Genres:</strong>{' '}
            {movie.genres.map((genre) => genre.name).join(', ')}
          </p>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail
