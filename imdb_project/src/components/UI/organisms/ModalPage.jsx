import React, { useState } from 'react';
import data from './data.json';
import Modal from '../UI/molecules/Modal';

const StyledPage = styled.Page`
.App {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  background: #f0f0f0;
  border-radius: 8px;
  padding: 10px;
  width: 180px;
  cursor: pointer;
  transition: 0.2s;
  text-align: center;
}

.card:hover {
  background: #e0e0e0;
}

.poster {
  width: 100%;
  border-radius: 5px;
}

`

function ModalPage() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const openModal = (movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  return (
    <StyledPage>
    <div className="App">
      <h1>Movie</h1>
      <div className="card-container">
        {data.movies.map((movie) => (
          <div key={movie.id} className="card" onClick={() => openModal(movie)}>
            <img src={movie.photos.poster[0]} alt={movie.title} className="poster" />
            <h3>{movie.title}</h3>
            <p>{movie.releaseYear}</p>
          </div>
        ))}
      </div>
      {selectedMovie && <Modal movie={selectedMovie} onClose={closeModal} />}
    </div>
    </StyledPage>
  );
}

export default ModalPage;
