/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

import '../styles/AlbumsPage.css';

const AlbumList = ({ albums }) => {
    return (
        <div className='image-album-wrapper'>
            {Array.isArray(albums) && albums.length > 0 ? (
                albums.map((album) => (
                    <div key={album._id} style={{ textAlign: 'center' }}>
                        <Link
                            to={`/albums/${album._id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            {album.coverImageUrl && (
                                <img
                                    src={album.coverImageUrl}
                                    alt={`${album.title} cover`}
                                />
                            )}
                            <div>{album.title}</div>
                        </Link>
                    </div>
                ))
            ) : (
                <p>No albums available.</p>
            )}
        </div>
    );
};

export default AlbumList;
