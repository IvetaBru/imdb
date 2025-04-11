import { Link } from 'react-router';
import styled from 'styled-components';

const StyledHeader = styled.header`
    margin: 0;
    padding: 10px 300px;
    height: 56px;
    background-color: #1a1a1a;
    font-size: 16px;
    font-weight: 400;
    line-height: 0;
    
    >nav{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        >div{
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            >a{
                >img{
                    height: 30px;
                }
            }
        }
        >.searchPart{
            >input{
                width: 400px;
                height: 28px;
                background-color: white;
                color: black;
                border: none;
                border-radius: 5px;
            }
        }
        >.userPart{
            padding-left: 20px;
            border-left: #474646 2px solid;
        }
    }
`

const Header = () => {
    return ( 
       <StyledHeader>
        <nav>
                <div className='logoPart'>
                    <Link to='/'>
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1280px-IMDB_Logo_2016.svg.png" 
                            alt="logo" 
                        />
                    </Link>
                </div>
                <div className='searchPart'>
                    <button>Menu</button>
                    <input type="text" />
                    <button>IMDb<span>Pro</span></button>
                </div>
                <div className='userPart'>
                    <button><Link to='/watchlist'>Watchlist</Link></button>
                    <button><Link to='/login'>SignIn</Link></button>
                    <button>EN</button>
                </div>
        </nav>
       </StyledHeader>
     );
}
export default Header;