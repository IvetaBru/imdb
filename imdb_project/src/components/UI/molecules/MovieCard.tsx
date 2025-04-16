import styled from "styled-components";
import React from "react";
import { Movie } from "../../../types";
import { TurnedIn, Add, Star, StarOutline } from "@mui/icons-material";

const Wrapper = styled.div`
  width: 200px;
  border: 1px solid black;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  background-color: #1e1e1e;
  color: white;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }

  img {
    width: 100%;
    height: 267.583px;
    object-fit: cover;
  }

  .stars {
    display: flex;
    justify-content: space-evenly;
    margin-top: 8px;

    > div {
      display: flex;
      align-items: center;
      gap: 8px;
      padding-right: 15px;
      margin-right: 30px;

      .star {
        color: yellow;
      }

      h3 {
        margin: 0;
      }
    }

    .starEmpty {
      color: lightblue;
    }
  }

  .link {
    padding: 5px 15px;

    .filmName {
      display: block;
      font-size: 1.1em;
      font-weight: bold;
    }
  }

  .more {
    display: flex;
    justify-content: center;
    margin-top: 12px;

    #button {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(44, 44, 44, 255);
      border-radius: 75px;
      height: 40px;
      width: 150px;
      margin-bottom: 12px;

      .blue {
        color: #0ab3dd;
        margin-right: 10px;
      }
    }
  }
`;

interface MovieCardProps {
  data: Movie;
  onClick?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ data, onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <TurnedIn
        style={{
          fontSize: "60px",
          position: "absolute",
          top: 0,
          left: 0,
          marginTop: "-8px",
          marginLeft: "-13px",
          opacity: 0.8,
          color: "rgba(25,29,28,255)",
          pointerEvents: "none", // 🧠 ŠITAS YRA SVARBIAUSIAS
        }}
      />
      <Add
        style={{
          fontSize: "25px",
          position: "absolute",
          top: 0,
          left: 0,
          marginTop: "6px",
          marginLeft: "5px",
          opacity: 0.8,
          color: "white",
          pointerEvents: "none", // 🧠 ŠITAS TAIP PAT
        }}
      />

      <img src={data.photos.poster[0]} alt={data.title} />

      <div className="stars">
        <div>
          <Star className="star" />
          <h3>{data.IMDB.totalScore}</h3>
        </div>
        <StarOutline className="starEmpty" />
      </div>

      <div className="link">
        <span className="filmName">{data.title}</span>
      </div>

      <div className="more">
        <div id="button">
          <Add className="blue" />
          <span className="blue">Watchlist</span>
        </div>
      </div>
    </Wrapper>
  );
};

export default MovieCard;
