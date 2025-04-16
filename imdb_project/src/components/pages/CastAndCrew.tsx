
import {  useParams } from "react-router";
import styled from "styled-components";
import useMoviesContext from "../../contexts/MoviesContext";


const Page = styled.div`
  display: flex;
  justify-content: center;
  margin: 25px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  min-width: 700px;
  font-family: Arial, sans-serif;

  h3 
  {
    color: black;
  }

  span 
  {
    color: blue;
  }

  p 
  {
    color: blue;
  }

  .black 
  {
    color: black;
  }
  
  .dots 
  {
    margin-right: 5px;
  }
`;

const Container = styled.div`
  width: 100%;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Poster = styled.img`
  width: 112px;
  height: 156px;
  object-fit: contain;
  margin-right: 20px;
`;

const TitleSection = styled.div`
  flex: 1;
  margin-top: 10px;

  > p {
    color: blue;
    font-size: 20px;
    margin: 0;

    > span {
      color: black;
      font-size: 16px;
    }
  }

  > h1 {
    margin-top: 5px;
    font-size: 26px;
    color: black;
  }

  .imdb-pro {
    display: flex;
    align-items: center;
    margin-top: 10px;

    > img {
      height: 15px;
      margin-right: 6px;
    }

    > p {
      margin: 0;
      color: blue;
      font-size: 14px;
    }
  }
`;

const EditLink = styled.a`
  color: black;
  font-size: 14px;
  cursor: pointer;
`;

const Section = styled.div`
  margin-top: 20px;

  > h3 {
    border-bottom: 1px dotted gray;
    padding-bottom: 4px;
    margin-bottom: 10px;
  }

  > p {
    margin: 6px 0;
  }
`;

const CreditName = styled.span`
  color: #0056b3;
  margin-right: 10px;
`;

const CastList = styled.div`
  margin-top: 10px;
`;

const CastItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: #f5f5f5;
  margin-bottom: 6px;
  border-radius: 4px;

  > img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
  }

  > span 
  {    
    flex: 1;  
  }

  > small 
  {
    color: #666;
  }
`;

const CastItem2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  margin-bottom: 6px;
  border-radius: 4px;

  > img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
  }

  > span 
  {    
    flex: 1;  
  }

  > small 
  {
    color: #666;
  }
`;


const CastAndCrew = () => {

    const { movies } = useMoviesContext(); 
    let {id} = useParams();    
    const thisMovie = movies.filter((movie) => movie.id === `${id}`);    
   

     console.log(id);
  return (
    <Page>
      <Container>
        <TopRow>
          <div style={{ display: "flex" }}>
            <Poster src={thisMovie[0].photos.poster[0]} alt="Poster" />
            <TitleSection>
              <p>{thisMovie[0].title} <span>({thisMovie[0].releaseYear})</span></p>
              <h1>Full Cast & Crew</h1>
              <div className="imdb-pro">
                <img src="https://www.pngkit.com/png/full/193-1934837_imdb-imdb-app-logo-png-imdb-pro-logo.png" alt="IMDbPro" />
                <p>See agents for this cast & crew on IMDbPro</p>
              </div>
            </TitleSection>
          </div>
          <EditLink>Edit</EditLink>
        </TopRow>

        <Section>
          <h3>Directed by</h3>   
            <CastItem2>
                <p><CreditName> {thisMovie[0].castAndCrew.director}</CreditName> </p>
                <p className="black"><span className="dots black">...</span> (directed by) </p>         
            </CastItem2>
        </Section>

        <Section>
          <h3>Writing Credits <small>(WGA)</small></h3>
        
            {  
                thisMovie[0].castAndCrew.writers.map((writer) => (
                    <CastItem2>
                    <p><CreditName>{writer.name}</CreditName> </p>          
                    <p className="black"><span className="dots black">...</span> ({writer.role}) </p>
                    </CastItem2>
                 ))
            }   
        </Section>

        <Section>
          <h3>Cast <small>(in credits order)</small> verified as complete</h3>
          <CastList>
            {  
                thisMovie[0].castAndCrew.actors.map((actor) => (       
                    <CastItem>
                    <img src= {actor.actorPhoto} />
                    <span>{actor.name}</span>
                    <p>...  {actor.character[0]}</p>
                    </CastItem>
                ))
            }             
          </CastList>
        </Section>
      </Container>
    </Page>
  );
};

export default CastAndCrew;