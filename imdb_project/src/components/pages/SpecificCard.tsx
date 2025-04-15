import { Link, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { Movie, MoviesContextTypes } from "../../types";
import styled from "styled-components";
import MoviesContext from "../../contexts/MoviesContext";
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import ShareIcon from '@mui/icons-material/Share';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ShowChartIcon from '@mui/icons-material/ShowChart';

const StyledSection = styled.section`
    padding: 10px 200px;
    color: white;
    .menu{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 14px;
        font-weight: 600;
        >a{
            display: flex;
            align-items: center;
            padding: 5px 8px;
            color: white;
            text-decoration: none;
        }
        >a:hover{
            text-decoration: underline;
        }
        >a:last-child:hover{
            background-color: #3f3e3e;
            border-radius: 15px;

        }
    }
    .imdb{
        border-left: #585858 1px solid;
        border-right: #585858 1px solid;
    }
    .topics{
        border-right: #585858 1px solid;
    }
    .info, .castAndRatings{
        display: flex;
        justify-content: space-between;
    }
    .info{
        >div:first-child{
            >h2{
                font-size: 40px;
                font-weight: 400;
                margin: 0;
                line-height: 1.2;
            }
            >span{
                font-size: 12px;
                font-weight: 500;
                color: #b4b4b4;
            }
            >.eirin{
                padding-left: 10px;
                padding-right: 10px;
            }
        }
        >div:last-child{
            display: flex;
            gap: 20px;
            padding-top: 15px;
            font-size: 12px;
            font-weight: 600;
            >div{
                display: flex;
                justify-content: center;
                align-self: flex-start;
                flex-direction: column;
                >div{
                    display: flex;
                    align-items: center;
                    >span{
                        font-size: 18px;
                        font-weight: 600;
                    }
                    >.star{
                        color: #f1dd23;
                    }
                }
                >.rate, .chart{
                    color: #0c9bd3;
                    font-size: 18px;
                    font-weight: 600;
                }
                >.chart{
                    color: #ffffff;
                    >svg{
                        color: #149c14;
                    }
                    >span{
                        padding-left: 5px;
                        font-size: 13px;
                        color: #b4b4b4;
                    }
                }
            }
        }
    }
    .mediaContainer{
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
        gap: 5px;
        margin: 10px auto;
    }
    .media{
        >iframe{
            width: 100%;
            height: 100%;
            border-radius: 10px;
        }
        >img{
            height: 100%;
            width: 100%;
            border-radius: 10px;
        }
    }
    .mediaButtons{
        display: flex;
        flex-direction: column;
        gap: 5px;
        >button{
            height: 50%;
            cursor: pointer;
            border-radius: 10px;
            border: none;
        }
    }
`

const SpecificCard = () => {

    const { id } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const {findMovie} = useContext(MoviesContext) as MoviesContextTypes;
    
    useEffect(() => {
        if(id){
            const result = findMovie(id);
            if(typeof result === "string"){
                setMovie(null);
            }else{
                setMovie(result);
            }
        }
    }, [id, findMovie]);

    const youtubeUrl = movie?.videos?.trailers?.[0];
    const getEmbedUrl = (url: string) => {
    const match = url.match(/v=([^&]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    };
    const embedUrl = youtubeUrl ? getEmbedUrl(youtubeUrl) : null;

    const totalVideos = 
    (movie?.videos?.trailers?.length || 0) +
    (movie?.videos?.cutscenes?.length || 0);

    const totalPhotos = 
    (movie?.photos.poster.length || 0) +
    (movie?.photos.cutscenes.length || 0)

    const movieLength = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}min`;
    };
    
    return ( 
        <StyledSection>
           <div className="menu">
            <Link to="castAndCrew">Cast & crew</Link>
            <Link to="/">User reviews</Link>
            <Link to='/'>Trivia</Link>
            <Link to="/">FAQ</Link>
            <a href="https://pro.imdb.com/title/tt7286456/?rf=cons_tt_ov_hdr&ref_=cons_tt_ov_hdr" className="imdb">IMDbPro</a>
            <Link to="/" className="topics"><AutoAwesomeMosaicIcon/>All topics</Link>
            <a href="#"><ShareIcon /></a>
            </div> 
            <div className="info">
                <div>
                    <h2>{movie?.title}</h2>
                    <span>{movie?.releaseYear}</span>
                    <span className="eirin">{movie?.eirinCategory}</span>
                    <span>{movie?.length ? movieLength(movie.length) : null}</span>
                </div>
                <div>
                    <div>IMDb RATING <div><StarIcon className="star"/> <span>{movie?.IMDB.totalScore}</span>/10</div> </div>
                    <div>YOUR RATING <div className="rate"><StarBorderIcon/> Rate</div></div>
                    <div>POPULARITY <div className="chart"><ShowChartIcon /> {movie?.popularity?.ranking}<span>{movie?.popularity?.weeklyChange}</span></div></div>
                </div>
            </div>
            <div className="mediaContainer">
                <div className="media">
                    <img src={movie?.photos.poster[0]} alt="poster" />
                </div>
                <div className="media">
                    {
                        embedUrl && (
                        <iframe 
                            width="640"
                            height="360"
                            src={embedUrl}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        >
                        </iframe>
                        )
                    }
                </div>
                <div className="mediaButtons">
                    <button><VideoLibraryIcon />{totalVideos} videos</button>
                    <button><PhotoLibraryIcon/>{totalPhotos} photos</button>
                </div>
            </div>
            <div className="castAndRatings">
                <div>
                    {
                    movie?.genres?.map((genre, index) => (
                    <span 
                        key={index} 
                        className="genre"
                    >{genre}</span>
                    ))
                    }
                    <p>{movie?.description}</p>
                    <p>Director <a href="#">{movie?.castAndCrew.director}</a></p>
                    <p>Writers
                        {
                            movie?.castAndCrew.writers.slice(0,3).map((writer, index) => (
                                <a href="#"
                                    key={index}
                                    className="writer"
                                >{writer.name}</a>
                            ))
                        }
                    <ArrowForwardIosIcon />
                    </p>
                    <Link to="castAndCrew"><p>Stars
                        {
                            movie?.castAndCrew.actors.slice(0,3).map((actor, index) => (
                                <span
                                    key={index}
                                    className="writer"
                                >{actor.name}</span>
                            ))
                        }
                    <ArrowForwardIosIcon />
                    </p>
                    </Link>
                    <p>
                        <span>IMDb<span>Pro</span></span> 
                        <a href="https://pro.imdb.com/title/tt7286456/?rf=cons_tt_atf&ref_=cons_tt_atf">
                        See production info at IMDbPro 
                        <OpenInNewIcon/></a>
                    </p>
                </div>
                <div>
                    <button>Add to watch list <span>Added by 1.0M users</span></button>
                    <span>{movie?.reviews?.users} User reviews</span>
                    <span>{movie?.reviews?.critics} Critic reviews</span>
                    <span><span>{movie?.reviews?.metascore}</span> Metascore</span>
                </div>
            </div>
        </StyledSection>
     );
}
 
export default SpecificCard;