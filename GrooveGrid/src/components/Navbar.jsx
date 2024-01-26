import { Link } from 'react-router-dom';
import logo from '../assets/Logo3.png';
import { useContext } from 'react';

import { AuthContext } from '../context/auth.context';

function Navbar() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <nav>
            <Link to='/'>
                <img src={logo} alt='Groove Grid' />
            </Link>
            <Link to='/genre'>Genre</Link>
            <Link to='/artists'>Artists</Link>
            <Link to='/aboutus'>About Us</Link>

            {isLoggedIn ? (
                <>
                    <button onClick={logOutUser}>Logout</button>
                    <span>{user && user.name}</span>
                </>
            ) : (
                <div>
                    <Link to='/signup'>Sign Up</Link>
                    <Link to='/login'>Login</Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
