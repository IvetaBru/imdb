
import React from "react";
import styled from "styled-components";
import { Movie } from "../../../types";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 210px;
  width: 700px;
  height: 450px;
  background: #1a1a1a;
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
.Conteiner{
    display: grid;
    grid-template-columns: 4fr 1fr;
    gap: 10px;
}
.List, .AltIcon {
  display: flex;
  justify-content: center; 
  align-items: center;     
  height: 40px;           
  width: auto;            
  background-color: #2b2a2a; 
  border-radius: 8px;    
}
.Alist{
    color: #00c3ff;
    text-decoration: none;  
}
.Plus{
    font-size: 25px;
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
      <section className="Conteiner">
        <div className="List">
            <a className="Alist" href=""><span className="Plus"> + </span> Watchlist</a>
        </div>
        <div className="AltIcon">
        <a href=""><ThumbDownOffAltIcon className="Alist"/></a>
        </div>
      </section>
    </ModalWrapper>
  );
};

export default HoverModal;
