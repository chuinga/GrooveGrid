import { useState, useEffect } from 'react'; // Import useState hook
import { Link } from 'react-router-dom';
import logo from '../assets/Logo3.png';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import GenreList from './GenreList';

import '../styles/Navbar.css';

function Navbar() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const [genres, setGenres] = useState([]);

    // State to manage visibility of dropdown menu
    const [isDropdown, setIsDropdown] = useState(false);

    const fetchGenres = async () => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL.endsWith('/')
                ? import.meta.env.VITE_API_URL.slice(0, -1)
                : import.meta.env.VITE_API_URL;

            const response = await fetch(`${baseUrl}/api/genre`);
            if (!response.ok) throw new Error('Data fetch failed');
            const data = await response.json();
            setGenres(data);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    useEffect(() => {
        fetchGenres();
    }, []);


    return (
        <nav className='navbar-main'>           
            <div className='linksWrapper'>
                <Link to='/'>
                    <img className='logo' src={logo} alt='Groove Grid' />
                </Link>
                
                {/* Dropdown Menu for Genre */}
                <div className="dropdown" onMouseEnter={() => setIsDropdown(true)} onMouseLeave={() => setIsDropdown(false)}>
                    <span className="genre-link">Genre</span>
                    {isDropdown && (
                        <div className="dropdown-content">
                            <Link to='/genre'>See all</Link>
                            {genres.map(genre => (
                                <Link key={genre.name} to={`/genres/${genre._id}`}>{genre.name}</Link>                              
                            ))}                           
                        </div>
                    )}
                    
                </div>

                <Link to='/artists'>Artists</Link>

                {isLoggedIn && <Link to='/playlists'>Playlist</Link>}
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






/* import { Link } from 'react-router-dom';
import logo from '../assets/Logo3.png';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

import '../styles/Navbar.css';

function Navbar() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <nav className='navbar-main'> */
            {/* <div className='linksWrapper'>
                <Link to='/'>
                    <img className='logo' src={logo} alt='Groove Grid' />
                </Link>
                <div className='dropdown'>
                    <button className='dropbtn'>
                        <div className='dropdown-content'>
                        <Link to='/genre'>See all</Link>

                        </div>
                    </button>

                </div>

                
                <Link to='/artists'>Artists</Link>

                {isLoggedIn && <Link to='/playlists'>Playlist</Link>}
            </div> */}
            
            /* {<div className='linksWrapper'>
                <Link to='/'>
                    <img className='logo' src={logo} alt='Groove Grid' />
                </Link>
                <Link to='/genre'>Genre</Link>
                <Link to='/artists'>Artists</Link>

                {isLoggedIn && <Link to='/playlists'>Playlist</Link>}
            </div>}
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
 */