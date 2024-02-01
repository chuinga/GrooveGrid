import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import Modal from './ModalComponent'; // Import Modal Component

import '../styles/ArtistsPage.css';

const ArtistDetails = () => {
    const { artistId } = useParams();
    const [artist, setArtist] = useState(null);
    const { user, storedToken } = useContext(AuthContext);
    const [genres, setGenres] = useState([]); //
    const [newAlbum, setNewAlbum] = useState({
        name: '',
        releaseDate: '',
        coverImageUrl: '',
        genre: '',
    });

    // State for managing modal visibility
    const [isAddAlbumModalOpen, setIsAddAlbumModalOpen] = useState(false);
    const [isDeleteAlbumModalOpen, setIsDeleteAlbumModalOpen] = useState(false);
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);

    useEffect(() => {
        // Fetch artist and genres
        const fetchData = async () => {
            try {
                const baseUrl = import.meta.env.VITE_API_URL.endsWith('/')
                    ? import.meta.env.VITE_API_URL.slice(0, -1)
                    : import.meta.env.VITE_API_URL;

                // Fetch artist
                const artistResponse = await fetch(
                    `${baseUrl}/api/artists/${artistId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${storedToken}`,
                        },
                    }
                );
                if (!artistResponse.ok) throw new Error('Artist fetch failed');
                const artistData = await artistResponse.json();
                // Sort albums by release date, newest first
                artistData.albums = artistData.albums.sort((a, b) => {
                    return new Date(b.releaseDate) - new Date(a.releaseDate);
                });
                setArtist(artistData);

                // Fetch genres
                const genreResponse = await fetch(`${baseUrl}/api/genre`, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                });
                if (!genreResponse.ok) throw new Error('Genre fetch failed');
                const genreData = await genreResponse.json();
                setGenres(genreData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [artistId, storedToken]);

    const handleInputChange = (e) => {
        setNewAlbum({
            ...newAlbum,
            [e.target.name]: e.target.value,
        });
    };

    // Add ALBUM Modal
    const openAddAlbumModal = () => setIsAddAlbumModalOpen(true);
    const closeAddAlbumModal = () => setIsAddAlbumModalOpen(false);

    // DELETE ALBUM Modal
    const openDeleteAlbumModal = () => setIsDeleteAlbumModalOpen(true);
    const closeDeleteAlbumModal = () => {
        setIsDeleteAlbumModalOpen(false);
        setSelectedAlbumId(null); // Reset the selected album ID when closing the modal
    };

    const handleAddAlbum = async (e) => {
        e.preventDefault();

        // Ensure album name is not empty
        if (!newAlbum.name.trim()) {
            alert('Album name cannot be empty');
            return;
        }

        // Check for duplicate album
        const albumExists = artist.albums.some(
            (album) =>
                album.title.toLowerCase() === newAlbum.name.trim().toLowerCase()
        );

        if (albumExists) {
            alert('An album with this name already exists!');
            return;
        }

        try {
            // Construct the URL for the API endpoint
            const baseUrl = import.meta.env.VITE_API_URL.endsWith('/')
                ? import.meta.env.VITE_API_URL.slice(0, -1)
                : import.meta.env.VITE_API_URL;

            // Prepare the album data to be sent
            const albumData = {
                ...newAlbum,
                title: newAlbum.name, // Assuming 'title' is the correct field name in your backend model
                artist: artistId,
                createdBy: user._id,
            };

            // Send a POST request to create the album
            const response = await fetch(`${baseUrl}/api/album`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${storedToken}`, // Include the auth token
                },
                body: JSON.stringify(albumData),
            });

            if (!response.ok) {
                throw new Error('Failed to add album');
            }

            // Handle the successful response, e.g., refreshing the artist's albums
            const newAlbumData = await response.json();
            setArtist({
                ...artist,
                albums: [...artist.albums, newAlbumData],
            });

            // Reset the form fields
            setNewAlbum({
                name: '',
                releaseDate: '',
                coverImageUrl: '',
                genre: '',
            });
        } catch (error) {
            console.error('Error adding album:', error);
        }
    };
    const handleDeleteAlbum = async () => {
        if (!selectedAlbumId) return;

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/album/${selectedAlbumId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error('Failed to delete album');
            }
            // Update the artist state to remove the deleted album
            setArtist((prevArtist) => ({
                ...prevArtist,
                albums: prevArtist.albums.filter(
                    (album) => album._id !== selectedAlbumId
                ),
            }));
            alert('Album deleted successfully');
            closeDeleteAlbumModal();
        } catch (error) {
            console.error('Error deleting album:', error);
            alert('Error deleting album');
        }
    };
    if (!artist) return <div>Loading...</div>;

    return (
        <div className='main-wrapper'>
            <div className='artists-details-wrapper'>
                <div>
                    <h1>Artist Details</h1>
                    <h2>{artist.name}</h2>
                    <img src={artist.image} alt={`${artist.name} thumbnail`} />
                    <p>Genre: {artist.genre.name}</p>
                    <div className='albuns-and-buttons-wrapper'>
                        <h3>Albums:</h3>
                        <ul>
                            {artist.albums.map((album) => (
                                <li key={album._id}>
                                    <Link to={`/albums/${album._id}`}>
                                        {album.title}
                                    </Link>{' '}
                                    - Released:{' '}
                                    {new Date(
                                        album.releaseDate
                                    ).toLocaleDateString()}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {user && (
                    <>
                        <button onClick={openAddAlbumModal}>
                            Add New Album
                        </button>
                        <Modal
                            isOpen={isAddAlbumModalOpen}
                            onClose={closeAddAlbumModal}
                        >
                            <form
                                onSubmit={handleAddAlbum}
                                className='add-album-form-wrapper'
                            >
                                <input
                                    type='text'
                                    placeholder='Album Name'
                                    name='name'
                                    value={newAlbum.name}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type='date'
                                    placeholder='Release Date'
                                    name='releaseDate'
                                    value={newAlbum.releaseDate}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type='text'
                                    placeholder='Cover Image URL'
                                    name='coverImageUrl'
                                    value={newAlbum.coverImageUrl}
                                    onChange={handleInputChange}
                                />

                                <label>
                                    Genre:
                                    <select
                                        name='genre'
                                        value={newAlbum.genre}
                                        onChange={handleInputChange}
                                    >
                                        {genres.map((genre) => (
                                            <option
                                                value={genre._id}
                                                key={genre._id}
                                            >
                                                {genre.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <button type='submit'>Add Album</button>
                            </form>
                        </Modal>

                        <button onClick={openDeleteAlbumModal}>
                            Delete Album
                        </button>
                        <Modal
                            isOpen={isDeleteAlbumModalOpen}
                            onClose={closeDeleteAlbumModal}
                        >
                            <h3>Delete an Album</h3>

                            {artist.albums.map((album) => (
                                <div key={album._id}>
                                    <p>{album.title}</p>
                                    <button
                                        onClick={() =>
                                            setSelectedAlbumId(album._id)
                                        }
                                    >
                                        Select for Deletion
                                    </button>
                                </div>
                            ))}
                            {selectedAlbumId && (
                                <button onClick={handleDeleteAlbum}>
                                    Confirm Delete
                                </button>
                            )}
                        </Modal>
                    </>
                )}
            </div>
        </div>
    );
};

export default ArtistDetails;
