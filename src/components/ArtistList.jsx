
import { Link } from 'react-router-dom';

import '../styles/ArtistsPage.css';

const ArtistList = ({ artists }) => {
    return (
        <div className='artists-wrapper'>
            {artists.map((artist) => (
                <div key={artist._id}>
                    <Link to={`/artists/${artist._id}`}>
                        <img
                            src={artist.image}
                            alt={`${artist.name} thumbnail`}
                        />
                        <div>{artist.name}</div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ArtistList;
