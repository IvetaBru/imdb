import { Link } from 'react-router';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

const StyledHeader = styled.header`
    margin: 0;
    padding: 10px 300px;
    height: 56px;
    background-color: #1a1a1a;
    line-height: 0;
    display: flex;
    justify-content: center;
    
    >nav{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        >div{
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
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
            >.menu, .language{
                display: flex;
                justify-content:center;
                align-items: center;
                padding: 8px 15px;
                gap: 5px;
                font-weight: 700;

                background-color: #1a1a1a;
                border: none;
                cursor: pointer;
            }
            >.pro{
                background-color: #1a1a1a;
                border: none;
                padding: 8px 15px;
                >a{
                    cursor: pointer;
                    font-weight: 900;
                    color: white;
                    text-decoration: none;
                    letter-spacing: -1px;
                    >span{
                        color: #2196da;
                    }
                }
            }
            >.watchlist{
                background-color: #1a1a1a;
                padding: 5px 15px;
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
            >.menu:hover, .pro:hover, .language:hover, .login:hover, .watchlist:hover{
                background-color: #252525;
                border-radius: 15px;
                border: none;
            }
        }
        >div:last-child{
            padding-left: 5px;
            border-left: #474646 2px solid;
        }
    }
`

const Header = () => {
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
                    <input type="text" placeholder='Search IMDb' />
                    <button className='pro'>
                        <a href="https://pro.imdb.com/login/ap?u=/login/lwa&imdbPageAction=signUp&rf=cons_nb_hm&ref_=cons_nb_hm" 
                        target="_blank" 
                        >IMDb<span>Pro</span>
                        </a>
                    </button>
                </div>
                <div>
                    <button className='watchlist'><Link to='/watchlist'><BookmarkAddIcon />Watchlist</Link></button>
                    <button className='login'><Link to='/login'>Sign In</Link></button>
                    <button className='language'>EN</button>
                </div>
        </nav>
       </StyledHeader>
     );
}
export default Header;