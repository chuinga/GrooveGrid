import PropTypes from 'prop-types';

import '../styles/Playlist.css';

const PlaylistList = ({ playlists }) => {
    if (!playlists) {
        return <p>No playlists available.</p>;
    }
    return (
        <div>
            {playlists?.map((playlist) => (
                <div key={playlist._id} className='playlist-item'>
                    <h3>{playlist.name}</h3>
                    <p>
                        <strong>Artists:</strong>{' '}
                        {playlist.artists.map((artist) => (
                            <span key={artist._id}>{artist.name}, </span>
                        ))}
                    </p>
                    <p>
                        <strong>Songs:</strong>{' '}
                        {playlist.songs.map((song) => (
                            <span key={song._id}>
                                {song.title} (Album: {song.album}, Genre:{' '}
                                {song.genres.join(', ')})
                            </span>
                        ))}
                    </p>
                    <p>
                        <strong>Image:</strong>{' '}
                        <img
                            src={playlist.artists[0].image}
                            alt={`${playlist.name} Image`}
                        />
                    </p>
                </div>
            ))}
        </div>
    );
};

PlaylistList.propTypes = {
    playlists: PropTypes.array,
};

export default PlaylistList;
