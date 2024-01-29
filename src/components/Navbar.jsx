import { Link } from 'react-router-dom';
import logo from '../assets/Logo3.png';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

import '../styles/Navbar.css';

function Navbar() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    return (
        <nav className='navbar-main'>
            <div className='linksWrapper'>
                <Link to='/'>
                    <img className='logo' src={logo} alt='Groove Grid' />
                </Link>
                <Link to='/genre'>Genre</Link>
                <Link to='/artists'>Artists</Link>
                {/* Conditional rendering of Playlist Link */}
                {isLoggedIn && <Link to='/playlists'>Playlist</Link>}
                <Link to='/about'>About</Link>
            </div>
            <div className='user-profile-wrapper'>
                {isLoggedIn ? (
                    <div className='signed-in-buttons'>
                        <Link to='/profile'>
                            <span>{user && user.name}</span>
                        </Link>
                        <button onClick={logOutUser}>Logout</button>
                    </div>
                ) : (
                    <div className='signed-out-buttons'>
                        <Link to='/signup'>Sign Up</Link>
                        <Link to='/login'>Login</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
