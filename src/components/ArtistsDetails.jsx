import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const ArtistDetails = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [genres, setGenres] = useState([]);
  const {storedToken} = useContext(AuthContext)

  const fetchArtist = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/artists/${artistId}`
      );
      if (!response.ok) throw new Error("Artist fetch failed");
      const data = await response.json();
      console.log(data);
      setArtist(data);
      const genreResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/genre`, {headers: {Authorization: `Bearer ${storedToken}`}})
      if(!response.ok) throw new Error("Date fetch failed")
      const parsed = await genreResponse.json()
    setGenres(parsed)
    } catch (error) {
      console.error("Error fetching artist:", error);
    }
  };

  useEffect(() => {
    fetchArtist();
  }, [artistId]);

  const handleInputChange = (e) => {
    setArtist({
      ...artist,
      [e.target.name]: e.target.value,
    });
  };

  if (!artist) return <div>Loading...</div>;

  return (
    <div>
      <h1>Artist Details</h1>
      <h2>{artist.name}</h2>
      <img src={artist.image} alt={`${artist.name} thumbnail`} />
      <p>Genre: {artist.genre.name}</p>
      <div>
        <h3>Albums:</h3>
        <ul>
          {artist.albums.map((album) => (
            <li key={album._id}>
              <Link to={`/albums/${album._id}`}>{album.title}</Link> - Released:{" "}
              {new Date(album.releaseDate).toLocaleDateString()}
              {/* More album details here */}
            </li>
          ))}
        </ul>

        <button onClick={() => setShowForm(!showForm)}> Update Artist </button>
        {showForm && (
          <form>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={artist.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Genre:
              <select onChange={handleInputChange} name="genre" defaultValue={artist.genre.name}>
                {genres.map(genre => {
                  return (<option value={genre._id} key={genre._id}>{genre.name}</option>)
                })}
              </select>
            </label>
            <label>
              Image:
              <input
                type="text"
                name="image"
                value={artist.image}
                onChange={handleInputChange}
              />
            </label>
            {/* add other input fields as needed */}
            <button type="submit">Create Artist</button>
          </form>

        )}

      </div>
    </div>
  );
};

export default ArtistDetails;
