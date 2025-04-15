import { useContext } from "react";
import styled from "styled-components";
import MovieCard from "../UI/molecules/MovieCard";
import { ArrowForwardIos } from '@mui/icons-material';

// TODO context
// import MerchContext from "../../contexts/MerchContext";

const StyledSection = styled.section`
 
  padding: 0 18px;
  margin: 30px 0;
  
  > .headerContainer
  {
    display: flex;
    gap: 5px;
    margin: 16px 0;
    padding: 0 16px;

  }

  > .cardsContainer
  {
    display: flex;
    padding: 0 16px;
    gap: 15px;
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

    // TODO: context
    // const { merch } = useContext(MerchContext)!;
    // const { merch } = useContext(MerchContext) as MerchContextTypes;
   
    return ( 
      <>
        <StyledSection>
          {/* <h3 className="title">Top Picks</h3> */}
          <div className="headerContainer">
          <StyledHeader>Top Picks</StyledHeader>
          <Arrow className={'override'} />
          </div>
          
          <div className="cardsContainer">
            <MovieCard/>
            <MovieCard/>
          </div>
        </StyledSection>
        <StyledSection>
         <div className="headerContainer">
            <StyledHeader>Top Picks</StyledHeader>
            <Arrow className={'override'} />
          </div>
          <div className="cardsContainer">
            <MovieCard/>
            <MovieCard/>
          </div>
        </StyledSection>
      </>   
     );
}
 
export default Home;