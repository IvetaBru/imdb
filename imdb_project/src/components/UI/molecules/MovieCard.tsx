import styled from "styled-components";
import { Link } from "react-router";
import React, { useState, useRef } from "react";

import { TurnedIn, Add, Star, StarOutline } from "@mui/icons-material";
import { Movie } from "../../../types";
import HoverModal from "../organisms/HoverModal";

const Flag = styled(TurnedIn)`
  &.override {
    font-size: 60px;
    position: absolute;
    bottom: 0;
    top: 0;
    margin-top: -8px;
    margin-left: -13px;
    opacity: 0.8;
    color: rgba(25, 29, 28, 255);
  }
`;

const AddSymbol = styled(Add)`
  &.override {
    font-size: 25px;
    position: absolute;
    bottom: 0;
    top: 0;
    margin-top: 6px;
    margin-left: 5px;
    opacity: 0.8;
    color: white;
  }
`;

const StyledMovieCard = styled.div`  position: relative;

  #container {
    width: 200px;
    height: auto;
    border: 1px solid black;
    border-radius: 10px;
    flex: 1;
    position: relative;
    background-color:  #1a1a1a;

    .blue {
      color: #4479c9;
      font-weight: 600;
    }

    > a {
      
      > img {
        width: 100%;
        height: 267.583px;
        object-fit: cover;
        border-radius: 10px 10px 0px 0px;
      }
    }

    > div.link {
      padding: 5px 5px;
      min-height: 100px;

      > .filmName {
        padding: 5px 15px;
        display: block;
        /* width: auto; */
        /* text-indent: 0; */
        text-decoration: none;
        color: white;
      }
      >.filmName:hover{
        text-decoration: underline;
      }
    }

    > div.stars {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 20px;
      padding-left: 15px;
      padding-top: 10px;

      > div {
        display: flex;
        align-items: center;
        gap: 2px;
        > .star {
          color: #f1dd23;
        }
        > h3 {
          margin: 0;
        }
      }
      > .starEmpty {
        color: #4479c9;
      }
    }

    > div.more {
      display: flex;
      justify-content: center;
      margin-top: 12px;

      > #button {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(44, 44, 44, 255);
        border-radius: 75px;
        height: 40px;
        width: 150px;
        margin-bottom: 12px;
        cursor: pointer;

        > span {
          margin-right: 10px;
        }
      }
    }
  }
`;

type Props = {
  data: Movie;
};

const MovieCard: React.FC<Props> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const timerRef = useRef<number | null>(null); // <- naudoti number vietoj NodeJS.Timeout

  const handleMouseEnter = () => {
    timerRef.current = window.setTimeout(() => {
      setShowModal(true);
    }, 800);
  };

  const handleMouseLeave = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setShowModal(false);
  };

  return (
    <StyledMovieCard
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div id="container">
        <Flag className={"override"} />
        <AddSymbol className={"override"} />

        <Link to={`movie/${data.id}`}>
          <img src={data.photos.poster[0]} alt={data.title} />
        </Link>

        <div className="stars">
          <div>
            <Star className={"star"} />
            <h3>{data.IMDB.totalScore}</h3>
          </div>
          <StarOutline className={"starEmpty"} />
        </div>

        <div className="link">
          <Link to={`movie/${data.id}`} className="filmName">
            {data.title}
          </Link>
        </div>

        <div className="more">
          <div id="button">
            <Add className={"blue"} />
            <span className="blue">Watchlist</span>
          </div>
        </div>
      </div>

      {showModal && <HoverModal movie={data} />}
    </StyledMovieCard>
  );
};

export default MovieCard;

