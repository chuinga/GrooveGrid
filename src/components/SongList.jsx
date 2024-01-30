/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

import '../styles/SongsList.css';

const SongsList = ({ songs, userPlaylists }) => {
    const { storedToken, user } = useContext(AuthContext);

    const handleAddToPlaylist = async (song, playlist) => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL.endsWith('/')
                ? import.meta.env.VITE_API_URL.slice(0, -1)
                : import.meta.env.VITE_API_URL;
            const response = await fetch(
                `${baseUrl}/api/playlists/${playlist._id}/addsong/${song?._id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`,
                    },
                    body: JSON.stringify({
                        createdBy: user._id,
                        song: {
                            title: song?.title,
                            artist: song?.artist?.name,
                        },
                    }),
                }
            );

            if (response.ok) {
                console.log('Song added to playlist successfully');
                // fetch SINGULAR playlist info
            } else {
                console.error('Failed to add song to playlist');
            }
        } catch (error) {
            console.error('Error adding song to playlist:', error);
        }
    };

    return (
        <ul className='songs-list-wrapper'>
            <div></div>
            {songs.map((song) => (
                <li key={song._id} className='song-title-and-artist'>
                    <span>{song.title}</span>
                    <span>{song.artist.name}</span>
                    <div className='Add-to-playlist-buttons'>
                        {userPlaylists.map((playlist) => (
                            <button
                                key={playlist._id}
                                onClick={() =>
                                    handleAddToPlaylist(song, playlist)
                                }
                            >
                                Add to {playlist.name}
                            </button>
                        ))}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default SongsList;
