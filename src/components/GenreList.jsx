/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';

const GenreList = ({ genres }) => {
    return (
        <div className='genres-links-wrapper'>
            {genres.map((genre) => (
                <Link to={`/genres/${genre._id}`}>
                    <div key={genre._id} className='genre-box'>                    
                        <h3>{genre.name}</h3>                    
                    </div>
                </Link>
            ))}
        </div>
    );
};


export default GenreList;