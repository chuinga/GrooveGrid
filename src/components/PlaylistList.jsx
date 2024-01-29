import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';

import UpdatePlaylist from './UpdatePlaylist';
import '../styles/Playlist.css';

const PlaylistList = ({ playlists, playlistId }) => {
    const [editingPlaylistId, setEditingPlaylistId] = useState(null);
    const { storedToken } = useContext(AuthContext);

    const handleEditPlaylist = (playlistId) => {
        setEditingPlaylistId(playlistId);
    };

    const handleSuccess = () => {
        setEditingPlaylistId(null);
    };

    const handleError = () => {
        setEditingPlaylistId(null);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/playlists/${playlistId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`,
                    },
                }
            );

            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status}`);
                return;
            }
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div>
            {playlists?.map((playlist) => (
                <div key={playlist._id} className='playlist-item'>
                    {editingPlaylistId === playlist._id ? (
                        <UpdatePlaylist
                            playlistId={playlist._id}
                            onSuccess={handleSuccess}
                            onError={handleError}
                        />
                    ) : (
                        <div>
                            <h3>{playlist.name}</h3>
                            <button
                                onClick={() => handleEditPlaylist(playlist._id)}
                            >
                                Edit Name
                            </button>
                            <div>
                                {' '}
                                <button onClick={handleDelete}>
                                    Delete
                                </button>{' '}
                            </div>

                            <p>
                                <strong>Artists:</strong>{' '}
                                {playlist.artists.map((artist) => (
                                    <span key={artist._id}>
                                        {artist.name},{' '}
                                    </span>
                                ))}
                            </p>
                            <p>
                                <strong>Songs:</strong>{' '}
                                {playlist.songs.map((song) => (
                                    <span key={song._id}>
                                        {song.title} (Album: {song.album},
                                        Genre: {song.genres.join(', ')})
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
                    )}
                </div>
            ))}
        </div>
    );
};

PlaylistList.propTypes = {
    playlists: PropTypes.array,
    setPlaylists: PropTypes.func,
    playlistId: PropTypes.string,
};

export default PlaylistList;
