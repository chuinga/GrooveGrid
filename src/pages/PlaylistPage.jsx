// PlaylistPage.jsx
import { useState, useEffect } from 'react';
import PlaylistList from '../components/PlaylistList';

const PlaylistPage = () => {
    const [playlists, setPlaylists] = useState([]);

    const fetchPlaylists = async () => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL.endsWith('/')
                ? import.meta.env.VITE_API_URL.slice(0, -1)
                : import.meta.env.VITE_API_URL;

            const response = await fetch(`${baseUrl}/api/playlists`);
            if (!response.ok) throw new Error('Data fetch failed');
            const data = await response.json();
            console.log('Fetched playlists:', data);
            setPlaylists(data);
        } catch (error) {
            console.error('Error fetching playlists:', error);
        }
    };

    useEffect(() => {
        fetchPlaylists();
    }, []);

    return (
        <div>
            <h5>Playlists</h5>
            <PlaylistList playlists={playlists} />
        </div>
    );
};

export default PlaylistPage;
