import styled from "styled-components";
import {Link, useNavigate} from "react-router";
import {Movie} from "../../../types";

import { TurnedIn, Add, Star, StarOutline  } from '@mui/icons-material';

const Flag = styled(TurnedIn)`
  &.override
  { 
    font-size: 60px;
    position: absolute;
    bottom: 0;
    top:  0;

    margin-top: -8px;
    margin-left: -13px;    

    opacity: 0.8;
    color: rgba(25,29,28,255);
  }
`;

const AddSymbol = styled(Add)`
  &.override
  { 
    font-size: 25px;
    position: absolute;
    bottom: 0;
    top:  0;
    
    margin-top: 6px;
    margin-left: 5px;    

    opacity: 0.8;
    color: white;
  }
`;


const StyledMovieCard = styled.div`
 #container
 { 
  width: 180px;
  border: 1px solid black;
  border-radius: 5px;
  flex: 1;

  position: relative;

  .blue 
  {
    color: #0ab3dd;
  }
  > a
  {
    text-decoration: none;
    color: white;

    > img{
      width: 100%;
      height: 267.583px;
      object-fit: cover;
    }
  }  
  
  > .filmName 
  {
    margin-left: 18px;
    margin-top: 12px;
  }
  > div.stars
    {
      display: flex;
      justify-content: space-evenly;
      > div
      {
        display: flex;      
        align-items: center;
        gap: 8px;
        padding-right: 15px;
        margin-right: 30px;

        > .star 
        {
          color: yellow;
        }

        > h3 
        {
          margin: 0;
        }
      }

      > .starEmpty
      {        
        color: lightblue;
      }
    }

  > div.more
    { 
      display: flex;
      justify-content: center;
      margin-top: 12px;

        > #button
        {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(44,44,44,255);
          border-radius: 75px;
          height: 40px;
          width: 150px;
          margin-bottom: 12px;

          > span 
          {
             margin-right: 5px;
          }
        }
    }
 }
`;

const MovieCard = () => {
  return ( 
    <StyledMovieCard>
      <div id="container">
        <Flag className={'override'}/>
        <AddSymbol className={'override'}/>
        
        <a href="">
          <img src="http://pngimg.com/d/mario_PNG125.png" alt="" />
        </a>

        <div className="stars">
          <div>
            <Star className={'star'}/>
            <h3>6.6</h3>              
          </div>
          <StarOutline className={'starEmpty'}/>  
        </div>

        <a href="" className="filmName">Linkas</a>

        <div className="more">
          <div id="button">      
            <Add className={'blue'}/>
            <span className="blue">Watchlist</span>
          </div>

          <div className="trailer">
          </div>

        </div>
      </div>
    </StyledMovieCard>
  );
}
 
export default MovieCard;