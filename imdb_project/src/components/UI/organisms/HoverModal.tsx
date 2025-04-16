
import React from "react";
import styled from "styled-components";
import { Movie } from "../../../types";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 210px;
  width: 600px;
  height: 400px;
  background: #120c0c;
  color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  z-index: 100;

  img {
    width: auto;
    height: 250px;
  }
  .Style{
    display: flex;
    gap: 20px;
    
  }
  .Score {
  display: flex;
  align-items: center;
  gap: 8px; 
}

.score-rate {
  display: flex;
  align-items: center;
  gap: 4px; 
  margin-left: 16px; 
  color: #60c1cc;
}

.icon-yellow {
  color: yellow;
}

.icon-blue {
  color: #60c1cc;
}

`;

type Props = {
  movie: Movie;
};

const HoverModal: React.FC<Props> = ({ movie }) => {
  return (
    <ModalWrapper>
        <section className="Style">
            <div>
      <img src={movie.photos.poster[0]} alt={movie.title} />
            </div>
      <div>
      <h1>{movie.title}</h1>
    <p>
  {movie.releaseYear} · {movie.length}min.
    </p>
      <p><strong></strong> {movie.genres.join(' · ')}</p>
      <p className="Score">
  <strong></strong>
  <StarIcon className="icon-yellow" />
  {movie.IMDB.totalScore}/10
  <span className="score-rate">
    <StarBorderIcon className="icon-blue" />
    Rate
  </span>
</p>
      </div>
      </section>
      <p><strong></strong> {movie.description.slice(0, 100)}...</p>
    </ModalWrapper>
  );
};

export default HoverModal;
