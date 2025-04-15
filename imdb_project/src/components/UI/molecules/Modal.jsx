import React from 'react';
import styled from 'styled-components';

const StyledModal = styled.Modal`
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.video-container {
  margin-top: 20px;
}

`

function Modal({ movie, onClose }) {
  const { title, releaseYear, eirinCategory, length, IMDB, genres, description, videos } = movie;

  return (
    <StyledModal>
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{title}</h2>
        <p><strong>Year:</strong> {releaseYear}</p>
        <p><strong>Category:</strong> {eirinCategory}</p>
        <p><strong>Length:</strong> {length} min</p>
        <p><strong>IMDb total Score:</strong> {IMDB.totalScore}</p>
        <p><strong>Genres:</strong> {genres.join(', ')}</p>
        <p><strong>Description:</strong> {description}</p>

        {videos.trailers && videos.trailers[0] && (
          <div className="video-container">
            <h4>Trailers:</h4>
            <iframe
              width="100%"
              height="315"
              src={convertToEmbed(videos.trailers[0])}
              title="Traileris"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
    </StyledModal>
  );
}

// Youtube URL konvertavimas į embed formą
function convertToEmbed(url) {
  const videoId = url.split('v=')[1]?.split('&')[0];
  return `https://www.youtube.com/embed/${videoId}`;
}

export default Modal;
