import { Link } from "react-router";
import styled from "styled-components";
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import ShareIcon from '@mui/icons-material/Share';

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

`

const SpecificCard = () => {
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
            <div>
                <div></div>
                <div></div>
            </div>
        </StyledSection>
     );
}
 
export default SpecificCard;