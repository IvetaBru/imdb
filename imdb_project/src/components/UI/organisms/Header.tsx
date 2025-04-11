import { NavLink, Link } from 'react-router';

const Header = () => {
    return ( 
       <header>
        <div>
            <NavLink to='/'>Logo</NavLink>
        </div>
        <nav>
            <ul>
                <div>
                    <button>Menu</button>
                    <input type="text" />
                    <button>IMDBPro</button>
                </div>
                <div>
                    <button><Link to='/watchlist'>Watchlist</Link></button>
                    <button><Link to='/login'>SignIn</Link></button>
                    <button>EN</button>
                </div>
            </ul>
        </nav>
       </header>
     );
}
 
export default Header;