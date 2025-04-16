import styled from "styled-components";
import MovieCard from "../UI/molecules/MovieCard";
import { ArrowForwardIos } from '@mui/icons-material';
import { useContext, useEffect, useState } from "react";

import useMoviesContext from "../../contexts/MoviesContext";
import { Movie, SearchContextType } from "../../types";
import SearchContext from "../../contexts/SearchContext";

const StyledSection = styled.section`
 
  padding: 0 18px;
  margin: 30px 15px;
  
  > .headerContainer
  {
    display: flex;
    gap: 5px;
    margin: 16px 0;
    padding: 0 16px;

  }

  > .cardsContainer
  {
    /* display: flex;
    
    */

    display: grid;
    grid-template-columns: repeat(6, auto) ;
    gap: 15px;
    padding: 0 16px;
}
  

`;

const StyledHeader = styled.h3`
  border-left: 6px solid yellow;
  height: auto;
  padding: 0 12px;  
  margin: 0; 
`;

const Arrow = styled(ArrowForwardIos)`
  &.override
  {
    margin-top: 3px;
  }
`;

const Home = () => {    
   
  const { movies } = useMoviesContext(); 
  const { searchValue } = useContext(SearchContext) as SearchContextType;  
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies);

  useEffect(() => {
    const filtered = movies.filter((movie) => movie.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
    setFilteredMovies(filtered);
  }, [searchValue, movies])


    return ( 
      <>
        <StyledSection>
           
          <div className="headerContainer">
          <StyledHeader>Top Picks</StyledHeader>
          <Arrow className={'override'} />
          </div>
          
          <div className="cardsContainer">
          {!movies.length ? (
              <p>Loading...</p>
            ) : searchValue === '' ? (
              movies.map((movie) => (
                <MovieCard data={movie} key={movie.id} />
              ))
            ) : filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <MovieCard data={movie} key={movie.id} />
              ))
            ) : (
              <p>No results found.</p>
          )}           
          </div>
        </StyledSection>        
      </>   
     );
}
 
export default Home;