import { useState, useEffect } from 'react';
import AlbumList from '../components/AlbumList';

import '../styles/AlbumsPage.css';

const AlbumsPage = () => {
    const [albums, setAlbums] = useState([]);
    const [filteredAlbums, setFilteredAlbums] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');

    const fetchAlbums = async () => {
        try {
            setIsLoading(true);
            const baseUrl = import.meta.env.VITE_API_URL.endsWith('/')
                ? import.meta.env.VITE_API_URL.slice(0, -1)
                : import.meta.env.VITE_API_URL;

            const response = await fetch(`${baseUrl}/api/album`);
            if (!response.ok) throw new Error('Data fetch failed');
            const data = await response.json();
            setAlbums(data);
            setFilteredAlbums(data);
        } catch (error) {
            console.error('Error fetching albums:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAlbums();
    }, []);

    useEffect(() => {
        const filtered = albums.filter((album) =>
            album.title.toLowerCase().includes(searchInput.trim().toLowerCase())
        );
        setFilteredAlbums(filtered);
    }, [searchInput, albums]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='albums-page-wrapper'>
            <h1>Albums</h1>
            <input
                type='text'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder='Search albums...'
            />
            <div className='albums-list-wrapper'>
                <AlbumList albums={filteredAlbums} />
            </div>
        </div>
    );
};

export default AlbumsPage;
