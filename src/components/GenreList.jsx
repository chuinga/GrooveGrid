/* 
import { Link } from 'react-router-dom';

const GenreList = ({ genres }) => {
    return (
        <div className='genres-links-wrapper'>
            {genres.map((genre) => (
                <div key={genre._id}>
                    <h3>
                        <Link to={`/genres/${genre._id}`}>{genre.name}</Link>
                    </h3>
                </div>
            ))}
        </div>
    );
};

export default GenreList;
 */

import { Link } from 'react-router-dom';

const GenreList = ({ genres }) => {
    return (
        <div className='genres-links-wrapper'>
            {genres.map((genre) => (
                <div key={genre._id} className="genre-box">
                    <h3>
                        <Link to={`/genres/${genre._id}`}>{genre.name}</Link>
                    </h3>
                </div>
            ))}
        </div>
    );
};

export default GenreList;
