/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
// Import Assets
import logo from '../assets/Logo3.png';
import arrowDown from '../assets/arrowDown.png';
// Import Styling
import '../styles/Navbar.css';

function Navbar() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const [genres, setGenres] = useState([]);
    const [playlistSongs, setPlaylistSongs] = useState([]);

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

    const fetchPlaylistSongs = async () => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL.endsWith('/')
                ? import.meta.env.VITE_API_URL.slice(0, -1)
                : import.meta.env.VITE_API_URL;

            const response = await fetch(`${baseUrl}/api/playlists`);
            if (!response.ok) throw new Error('Data fetch failed');
            const data = await response.json();
            setPlaylistSongs(data);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    useEffect(() => {
        fetchGenres();
        fetchPlaylistSongs();
    }, []);

    const [hoverTimeout, setHoverTimeout] = useState(null);

    const showDropdown = () => {
        if (hoverTimeout) clearTimeout(hoverTimeout);
        setIsDropdown(true);
    };

    const hideDropdownWithDelay = () => {
        const timeoutId = setTimeout(() => {
            setIsDropdown(false);
        }, 100);
        setHoverTimeout(timeoutId);
    };

    useEffect(() => {
        return () => {
            if (hoverTimeout) clearTimeout(hoverTimeout);
        };
    }, [hoverTimeout]);

    return (
        <nav className='navbar-main'>
            <div className='linksWrapper'>
                <NavLink to='/'>
                    <img className='logo' src={logo} alt='Groove Grid' />
                </NavLink>

                <div
                    className='dropdown'
                    onMouseEnter={showDropdown}
                    onMouseLeave={hideDropdownWithDelay}
                >
                    <span className='genre-link'>Genre</span>
                    <img className='downArrow' src={arrowDown} alt='Arrow' />
                    {isDropdown && (
                        <div className='dropdown-content'>
                            <NavLink to='/genre'>See all</NavLink>
                            {genres.map((genre) => (
                                <NavLink
                                    key={genre.name}
                                    to={`/genres/${genre._id}`}
                                >
                                    {genre.name}
                                </NavLink>
                            ))}
                        </div>
                    )}
                </div>

                <div
                    className='dropdown'
                    onMouseEnter={showDropdown}
                    onMouseLeave={hideDropdownWithDelay}
                >
                    <span className='genre-link'>Artists</span>
                    <img className='downArrow' src={arrowDown} alt='Arrow' />
                    {isDropdown && (
                        <div className='dropdown-content'>
                            <NavLink to='/artists'>All Artists</NavLink>
                            <NavLink to='/albums'>All Albums</NavLink>
                            <NavLink to='/songs'>All Songs</NavLink>
                        </div>
                    )}
                </div>

                {isLoggedIn && (
                    <div
                        className='dropdown'
                        onMouseEnter={showDropdown}
                        onMouseLeave={hideDropdownWithDelay}
                    >
                        <span className='genre-link'>Playlist</span>
                        <img
                            className='downArrow'
                            src={arrowDown}
                            alt='Arrow'
                        />
                        {isDropdown && (
                            <div className='dropdown-content'>
                                <NavLink to='/playlists'>
                                    Your Playlists
                                </NavLink>
                                {playlistSongs.map((genre) => (
                                    <NavLink
                                        key={playlistSongs.name}
                                        to={`/playlists/${playlistSongs._id}`}
                                    >
                                        {playlistSongs.name}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className='user-profile-wrapper'>
                {isLoggedIn ? (
                    <div className='signed-in-buttons'>
                        <NavLink to='/profile'>
                            <button className='user-name-button'>
                                <span>{user && user.name}</span>
                            </button>
                        </NavLink>
                        <button onClick={logOutUser}>Logout</button>
                    </div>
                ) : (
                    <div className='signed-out-buttons'>
                        <NavLink to='/signup' className='sign-up'>
                            Sign Up
                        </NavLink>
                        <NavLink to='/login' className='sign-in'>
                            Login
                        </NavLink>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
