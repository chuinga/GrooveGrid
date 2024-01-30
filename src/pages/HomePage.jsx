import { Link } from 'react-router-dom';

import '../styles/HomePage.css';

const HomePage = () => {
    return (
        <div className='home-page-wrapper'>
            <h1>Welcome to GrooveGrid</h1>
            <p>
                Explore a wide range of music genres, albums, and songs from
                various artists.
            </p>
            <p>
                <Link to='/genre'>Browse Genres</Link>
            </p>
            <p>
                <Link to='/artists'>Browse Artists</Link>
            </p>
            <p>
                <Link to='/albums'>Browse Albums</Link>
            </p>
            <p>
                <Link to='/songs'>Browse Songs</Link>
            </p>
        </div>
    );
};

export default HomePage;
