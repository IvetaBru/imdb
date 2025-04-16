import React, { useEffect, useState } from 'react';
import Modal from '../molecules/Modal';
import styled from 'styled-components';
import { Movie } from '../../../types';
import MovieCard from '../molecules/MovieCard';

const StyledPage = styled.section`
  .App {
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #121212;
    min-height: 100vh;
    color: white;
  }

  h1 {
    color: white;
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: flex-start;
    margin-top: 20px;
  }
`;

const MovieListWithModal: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const openModal = (movie: Movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  useEffect(() => {
    fetch("http://localhost:8080/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Nepavyko gauti filmų:", error);
        setLoading(false);
      });
  }, []);

  return (
    <StyledPage>
      <div className="App">
        <h1>Movie List</h1>

        {loading ? (
          <p>Kraunama...</p>
        ) : (
          <div className="card-container">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                data={movie}
                onClick={() => openModal(movie)}
              />
            ))}
          </div>
        )}

        {selectedMovie && <Modal movie={selectedMovie} onClose={closeModal} />}
      </div>
    </StyledPage>
  );
};

export default MovieListWithModal;

