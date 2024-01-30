import { useState, useEffect, useContext } from 'react';
import ArtistList from '../components/ArtistList.jsx';
import CreateArtistForm from '../components/CreateArtistForm.jsx';
import { AuthContext } from '../context/auth.context.jsx';

const ArtistsPage = () => {
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredArtists, setFilteredArtists] = useState([]);
    const { user, storedToken } = useContext(AuthContext);

    const fetchArtists = async () => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL.endsWith('/')
                ? import.meta.env.VITE_API_URL.slice(0, -1)
                : import.meta.env.VITE_API_URL;

            const response = await fetch(`${baseUrl}/api/artists`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });

            if (!response.ok) throw new Error('Data fetch failed');
            let data = await response.json();

            // Sort the artists alphabetically by name
            data = data.sort((a, b) => a.name.localeCompare(b.name));

            setArtists(data);
            setFilteredArtists(data);

            const genreResponse = await fetch(`${baseUrl}/api/genre`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });

            if (!genreResponse.ok) throw new Error('Data fetch failed');
            const genreData = await genreResponse.json();
            setGenres(genreData);
        } catch (error) {
            console.error('Error fetching artists:', error);
        }
    };

    useEffect(() => {
        fetchArtists();
    }, []);

    useEffect(() => {
        const filtered = artists.filter((artist) =>
            artist.name.toLowerCase().includes(searchInput.trim().toLowerCase())
        );
        setFilteredArtists(filtered);
    }, [searchInput, artists]);

    const createArtist = async (artistData) => {
        const artistExists = artists.some(
            (artist) =>
                artist.name.toLowerCase() === artistData.name.toLowerCase()
        );

        if (artistExists) {
            alert('Artist with this name already exists!');
            return;
        }
        try {
            const baseUrl = import.meta.env.VITE_API_URL.endsWith('/')
                ? import.meta.env.VITE_API_URL.slice(0, -1)
                : import.meta.env.VITE_API_URL;

            const response = await fetch(`${baseUrl}/api/artists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${storedToken}`,
                },
                body: JSON.stringify(artistData),
            });

            if (!response.ok) throw new Error('Artist creation failed');

            const createdArtist = await response.json();
            setArtists([...artists, createdArtist]);
            setFilteredArtists([...artists, createdArtist]);
        } catch (error) {
            console.error('Error creating artist:', error);
        }
    };

    return (
        <div>
            <h1>Artists</h1>
            <input
                type='text'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder='Search artists...'
            />

            {/* Render CreateArtistForm only for logged-in users */}
            {user && (
                <CreateArtistForm
                    onCreateArtist={createArtist}
                    genres={genres}
                />
            )}

            <ArtistList artists={filteredArtists} />
        </div>
    );
};

export default ArtistsPage;
