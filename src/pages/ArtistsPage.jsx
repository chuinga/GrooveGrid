import { useState, useEffect, useContext } from 'react';
import ArtistList from '../components/ArtistList.jsx';
import CreateArtistForm from '../components/CreateArtistForm.jsx';
import Modal from '../components/ModalComponent.jsx';
import { AuthContext } from '../context/auth.context.jsx';

const ArtistsPage = () => {
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredArtists, setFilteredArtists] = useState([]);
    const { user, storedToken } = useContext(AuthContext);

    // State for managing modal visibility
    const [isCreateArtistModalOpen, setIsCreateArtistModalOpen] =
        useState(false);
    const [isDeleteArtistModalOpen, setIsDeleteArtistModalOpen] =
        useState(false);
    const [selectedArtistId, setSelectedArtistId] = useState(null);
    const [deleteArtistSearch, setDeleteArtistSearch] = useState('');

    const filteredArtistsForDeletion = deleteArtistSearch
        ? artists.filter((artist) =>
              artist.name
                  .toLowerCase()
                  .includes(deleteArtistSearch.toLowerCase())
          )
        : artists;

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
    }, [storedToken]);

    useEffect(() => {
        const filtered = artists.filter((artist) =>
            artist.name.toLowerCase().includes(searchInput.trim().toLowerCase())
        );
        setFilteredArtists(filtered);
    }, [searchInput, artists]);

    const handleCreateArtist = async (artistData) => {
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
        setIsDeleteArtistModalOpen(false);
    };
    const handleDeleteArtist = async () => {
        if (!selectedArtistId) return;

        try {
            const baseUrl = import.meta.env.VITE_API_URL.endsWith('/')
                ? import.meta.env.VITE_API_URL.slice(0, -1)
                : import.meta.env.VITE_API_URL;

            const response = await fetch(
                `${baseUrl}/api/artists/${selectedArtistId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                }
            );

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }

            // Update the artists state to remove the deleted artist
            setArtists((prevArtists) =>
                prevArtists.filter((artist) => artist._id !== selectedArtistId)
            );
            setFilteredArtists((prevFilteredArtists) =>
                prevFilteredArtists.filter(
                    (artist) => artist._id !== selectedArtistId
                )
            );

            // Reset the selected artist ID and close the modal
            setSelectedArtistId(null);
            setIsDeleteArtistModalOpen(false);

            alert('Artist deleted successfully');
        } catch (error) {
            console.error('Error deleting artist:', error);
            alert('Error deleting artist: ' + error.message);
        }
    };

    return (
        <div>
            <div className='search-bar-and-buttons'>
                <h1>Artists</h1>
                <input
                    type='text'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder='Search artists...'
                />
                <div className='add-and-delete-buttons'>
                    {user && (
                        <button
                            onClick={() => setIsCreateArtistModalOpen(true)}
                        >
                            Add New Artist
                        </button>
                    )}

                    <Modal
                        isOpen={isCreateArtistModalOpen}
                        onClose={() => setIsCreateArtistModalOpen(false)}
                    >
                        <CreateArtistForm
                            className='create-artist-form'
                            onCreateArtist={handleCreateArtist}
                            genres={genres}
                        />
                    </Modal>

                    {user && (
                        <button
                            onClick={() => setIsDeleteArtistModalOpen(true)}
                        >
                            Delete Artist
                        </button>
                    )}
                </div>
            </div>

            <div>
                <Modal
                    isOpen={isDeleteArtistModalOpen}
                    onClose={() => setIsDeleteArtistModalOpen(false)}
                >
                    <h3>Delete</h3>
                    <input
                        type='text'
                        value={deleteArtistSearch}
                        onChange={(e) => setDeleteArtistSearch(e.target.value)}
                        placeholder='Search artist to delete...'
                    />
                    {filteredArtistsForDeletion.map((artist) => (
                        <div key={artist._id}>
                            <p>{artist.name}</p>
                            <button
                                onClick={() => setSelectedArtistId(artist._id)}
                            >
                                Select for Deletion
                            </button>
                        </div>
                    ))}
                    {selectedArtistId && (
                        <button onClick={handleDeleteArtist}>
                            Confirm Delete
                        </button>
                    )}
                </Modal>
            </div>

            <ArtistList artists={filteredArtists} />
        </div>
    );
};

export default ArtistsPage;
