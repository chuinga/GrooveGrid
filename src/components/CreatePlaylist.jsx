/* eslint-disable react/prop-types */
import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';

const CreatePlaylist = ({ onSuccess, onError }) => {
    const { storedToken, user } = useContext(AuthContext);
    const [playlistName, setPlaylistName] = useState('');

    const handleCreatePlaylist = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/playlists`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${storedToken}`,
                    },
                    body: JSON.stringify({
                        name: playlistName,
                        createdBy: user._id,
                    }),
                }
            );

            if (response.ok) {
                onSuccess();
            } else {
                console.error('Error creating playlist');
                onError();
            }
        } catch (error) {
            console.error('Error creating playlist:', error);
            onError();
        }
    };

    return (
        <div>
            <input
                type='text'
                placeholder='Playlist name'
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
            />
            <button onClick={handleCreatePlaylist}>Create Playlist</button>
        </div>
    );
};

export default CreatePlaylist;
