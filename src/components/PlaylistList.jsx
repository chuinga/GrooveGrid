import PropTypes from 'prop-types';
import { useContext, useState } from 'react';

import { AuthContext } from '../context/auth.context';
import { PlaylistsContext } from '../context/Playlists.context';

import UpdatePlaylist from './UpdatePlaylist';
import CreatePlaylist from './CreatePlaylist';

import '../styles/Playlist.css';

const PlaylistList = (props) => {
    const { playlists } = props;
    const [editingPlaylistId, setEditingPlaylistId] = useState(null);
    const [creatingPlaylist, setCreatingPlaylist] = useState(false);

    const { storedToken, user } = useContext(AuthContext);
    const { fetchPlaylists, fetchPlaylistById } = useContext(PlaylistsContext);

    const handleEditPlaylist = (playlistId) => {
        setEditingPlaylistId(playlistId);
    };

    const handleCreatePlaylist = () => {
        setCreatingPlaylist(true);
    };

    const handleSuccess = () => {
        setCreatingPlaylist(false);
        fetchPlaylists();
    };

    const handleEditSuccess = (playlistId) => {
        setEditingPlaylistId(null);
        fetchPlaylistById(playlistId);
    };

    const handleError = () => {
        setEditingPlaylistId(null);
        setCreatingPlaylist(false);
    };

    const handleDelete = (playlistId) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/playlists/${playlistId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${storedToken}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    console.error(`HTTP error! Status: ${response.status}`);
                    return;
                }

                fetchPlaylists();
            })
            .catch((error) => {
                console.error('Error deleting playlist:', error);
            });
    };

    return (
        <div>
            {!creatingPlaylist ? (
                <button onClick={handleCreatePlaylist}>Create Playlist</button>
            ) : (
                <CreatePlaylist
                    userId={user.__id}
                    onSuccess={handleSuccess}
                    onError={handleError}
                />
            )}

            {playlists?.map((playlist) => (
                <div key={playlist._id} className='playlist-item'>
                    {editingPlaylistId === playlist._id ? (
                        <UpdatePlaylist
                            playlistId={playlist._id}
                            onSuccess={handleEditSuccess}
                            onCancel={() => setEditingPlaylistId(null)}
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
                                <button
                                    onClick={() => handleDelete(playlist._id)}
                                >
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
                                    <span key={song._id}>{song.title}</span>
                                ))}
                            </p>
                            <p>
                                <strong>Image:</strong>{' '}
                                {playlist.artists &&
                                    playlist.artists.length > 0 && (
                                        <img
                                            src={playlist.artists[0].image}
                                            alt={`${playlist.name} Image`}
                                        />
                                    )}
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
