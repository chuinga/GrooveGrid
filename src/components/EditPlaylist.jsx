/* eslint-disable react/prop-types */
import { useState } from 'react';

import '../styles/Playlist.css';

const EditPlaylist = ({ onSave, onCancel }) => {
    const [newPlaylistName, setNewPlaylistName] = useState('');

    const handleSave = () => {
        onSave(newPlaylistName);
    };

    return (
        <div className='edit-name-playlist-wrapper'>
            <input
                placeholder='Playlist name'
                type='text'
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default EditPlaylist;
