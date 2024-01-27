/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const AlbumList = ({ albums }) => {
    return (
        <div>
            {Array.isArray(albums) && albums.length > 0 ? (
                albums.map((album) => (
                    <div key={album._id}>
                        <h3>
                            <Link to={`/albums/${album._id}`}>
                                {album.title}
                            </Link>
                        </h3>
                    </div>
                ))
            ) : (
                <p>No albums available.</p>
            )}
        </div>
    );
};

export default AlbumList;
