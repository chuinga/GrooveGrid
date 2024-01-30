import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const ArtistDetails = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const { user, storedToken } = useContext(AuthContext);
  const [genres, setGenres] = useState([]); //
  const [newAlbum, setNewAlbum] = useState({
    name: "",
    releaseDate: "",
    coverImageUrl: "",
    genre: "",
  });

  useEffect(() => {
    // Fetch artist and genres
    const fetchData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL.endsWith("/")
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
        if (!artistResponse.ok) throw new Error("Artist fetch failed");
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
        if (!genreResponse.ok) throw new Error("Genre fetch failed");
        const genreData = await genreResponse.json();
        setGenres(genreData);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  const handleAddAlbum = async (e) => {
    e.preventDefault();

    // Ensure album name is not empty
    if (!newAlbum.name.trim()) {
      alert("Album name cannot be empty");
      return;
    }

    // Check for duplicate album
    const albumExists = artist.albums.some(
      (album) =>
        album.title.toLowerCase() === newAlbum.name.trim().toLowerCase()
    );

    if (albumExists) {
      alert("An album with this name already exists!");
      return;
    }

    try {
      // Construct the URL for the API endpoint
      const baseUrl = import.meta.env.VITE_API_URL.endsWith("/")
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`, // Include the auth token
        },
        body: JSON.stringify(albumData),
      });

      if (!response.ok) {
        throw new Error("Failed to add album");
      }

      // Handle the successful response, e.g., refreshing the artist's albums
      const newAlbumData = await response.json();
      setArtist({
        ...artist,
        albums: [...artist.albums, newAlbumData],
      });

      // Reset the form fields
      setNewAlbum({
        name: "",
        releaseDate: "",
        coverImageUrl: "",
        genre: "",
      });
    } catch (error) {
      console.error("Error adding album:", error);
    }
  };

  if (!artist) return <div>Loading...</div>;

  return (
    <div>
      <h1>Artist Details</h1>
      <h2>{artist.name}</h2>
      <img src={artist.image} alt={`${artist.name} thumbnail`} />
      <p>Genre: {artist.genre.name}</p>

      {user && (
        <div>
          <h2>Add New Album</h2>
          <form onSubmit={handleAddAlbum}>
            <input
              type="text"
              placeholder="Album Name"
              name="name"
              value={newAlbum.name}
              onChange={handleInputChange}
            />
            <input
              type="date"
              placeholder="Release Date"
              name="releaseDate"
              value={newAlbum.releaseDate}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Cover Image URL"
              name="coverImageUrl"
              value={newAlbum.coverImageUrl}
              onChange={handleInputChange}
            />

            {/* Genre dropdown field */}
            <label>
              Genre:
              <select
                name="genre"
                value={newAlbum.genre}
                onChange={handleInputChange}
              >
                {genres.map((genre) => (
                  <option value={genre._id} key={genre._id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </label>

            <button type="submit">Add Album</button>
          </form>
        </div>
      )}

      <div>
        <h3>Albums:</h3>
        <ul>
          {artist.albums.map((album) => (
            <li key={album._id}>
              <Link to={`/albums/${album._id}`}>{album.title}</Link> - Released:{" "}
              {new Date(album.releaseDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArtistDetails;
