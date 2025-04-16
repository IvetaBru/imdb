import { Link, useNavigate } from 'react-router';
import { useContext } from 'react';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';

import UsersContext from '../../../contexts/UsersContext';
import { SearchContextType, UsersContextTypes } from '../../../types';
import SearchContext from '../../../contexts/SearchContext';

const StyledHeader = styled.header`
    margin: 0;
    padding: 10px 200px;
    height: 56px;
    background-color: #1a1a1a;
    line-height: 0;
    display: flex;
    justify-content: center;
  
    >nav{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        >div{
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 5px;
            >a{
                >img{
                    height: 30px;
                }
            }
            >input{
                width: 400px;
                height: 28px;
                padding: 10px;
                background-color: white;
                color: black;
                border: none;
                border-radius: 5px;
            }
            >.menu, .lightMode{
                display: flex;
                justify-content:center;
                align-items: center;
                padding: 8px 10px;
                gap: 5px;
                font-weight: 700;

                background-color: #1a1a1a;
                border: none;

                >svg{
                    font-size: 20px;
                }
            }
            >.pro{
                background-color: #1a1a1a;
                border: none;
                padding: 8px 15px;
                >a{
                    font-weight: 900;
                    color: white;
                    text-decoration: none;
                    letter-spacing: -1px;
                    >span{
                        color: #2196da;
                    }
                }
            }
            >.watchlist, .addMovie{
                background-color: #1a1a1a;
                padding: 5px 10px;
                border: none;
                >a{
                    display: flex;
                    justify-content:center;
                    align-items: center;
                    gap: 5px;
                    font-weight: 700;
                    color: white;
                    text-decoration: none;
                }
            }
            >.login{
                padding: 8px 15px;
                background-color: #1a1a1a;
                border: none;
                >a{
                    font-weight: 700;
                    color: white;
                    text-decoration: none;
                }
            }
            >.menu:hover, .pro:hover, .lightMode:hover, .login:hover, .watchlist:hover, .addMovie:hover, .logout:hover, .avatar:hover{
                background-color: #252525;
                border-radius: 15px;
                border: none;
                cursor: pointer;
            }
        }
        >div:last-child{
            padding-left: 5px;
            border-left: #474646 2px solid;

            >.logout, .avatar{
                padding: 3px 5px;
                font-size: 35px;
            }
            >span{
                font-weight: 600;
            }
        }
    }
`

const Header = () => {

    const { loggedInUser, setLoggedInUser } = useContext(UsersContext) as UsersContextTypes;
    const { searchValue, setSearchValue } = useContext(SearchContext) as SearchContextType;
    const navigate = useNavigate();

    return ( 
       <StyledHeader>
        <nav>
                <div>
                    <Link to='/'>
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1280px-IMDB_Logo_2016.svg.png" 
                            alt="logo" 
                        />
                    </Link>
                </div>
                <div>
                    <button className='menu'><MenuIcon />Menu</button>
                    <input 
                        type="text" 
                        id="filterMovies" name="filterMovies"
                        placeholder='Search IMDb' 
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                    />
                    <button className='pro'>
                        <a href="https://pro.imdb.com/login/ap?u=/login/lwa&imdbPageAction=signUp&rf=cons_nb_hm&ref_=cons_nb_hm" 
                        target="_blank" 
                        >IMDb<span>Pro</span>
                        </a>
                    </button>
                </div>
                <div>
                {
                    loggedInUser ? (loggedInUser.role === 'admin' ? 
                    (
                    <>
                        <button className='addMovie'><Link to='addMovie'><AddIcon /></Link></button>
                        <AccountCircleIcon 
                        onClick={() => navigate("/")}
                        className='avatar'
                        />
                        <span>{loggedInUser.username}</span>
                        <LogoutIcon 
                        onClick={() => {
                            setLoggedInUser(null);
                            navigate("/")
                        }}
                        className='logout'
                        />
                    </>
                    ) : (
                    <>
                        <button className='watchlist'><Link to='/watchlist'><BookmarkAddIcon />Watchlist</Link></button>
                        <AccountCircleIcon 
                        onClick={() => navigate("/")}
                        className='avatar'
                        />
                        <span>{loggedInUser.username}</span>
                        <LogoutIcon 
                        onClick={() => {
                            setLoggedInUser(null);
                            navigate("/")
                        }}
                        className='logout'
                        />
                    </>
                    )) : (
                    <>
                    <button className='watchlist'>
                        <Link to='login'><BookmarkAddIcon />Watchlist</Link>
                    </button>
                    <button className='login'>
                        <Link to='/login'>Sign In</Link>
                    </button>
                    </>
                    )
                }
                <button className='lightMode'><LightModeIcon /></button>
                </div>
        </nav>
       </StyledHeader>
     );
}
export default Header;