import { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';

export const PlaylistsContext = createContext();

export const PlaylistsContextProvider = ({ children }) => {
    const [playlists, setPlaylists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPlaylists = async () => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL.endsWith('/')
                ? import.meta.env.VITE_API_URL.slice(0, -1)
                : import.meta.env.VITE_API_URL;

            const response = await fetch(`${baseUrl}/api/playlists`);

            if (!response.ok) {
                throw new Error('Data fetch failed');
            }
            setIsLoading(false);
            const data = await response.json();
            setPlaylists(data);
        } catch (error) {
            console.error('Error fetching playlists:', error);
        }
    };

    useEffect(() => {
        fetchPlaylists();
    }, []);

    return (
        <PlaylistsContext.Provider value={{ playlists, isLoading }}>
            {children}
        </PlaylistsContext.Provider>
    );
};

PlaylistsContextProvider.propTypes = {
    children: PropTypes.node,
};
