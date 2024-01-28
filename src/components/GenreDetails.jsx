// GenreDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GenreDetails = () => {
  const { genreId } = useParams();
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const fetchGenreDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/genre/${genreId}/artists`
        );
        if (!response.ok) throw new Error("Genre details fetch failed");
        const data = await response.json();
        setGenre(data);
      } catch (error) {
        console.error("Error fetching genre details:", error);
      }
    };

    fetchGenreDetails();
  }, [genreId]);

  if (!genre) return <div>Loading...</div>;

  return (
    <div>
      <h1>Genre: {genre && genre.genre}</h1>
      {genre && <p>Description: {genre.description}</p>}
      {genre &&
        genre.artists.map((artist) => (
          <div key={artist._id}>
            <h2>{artist.name}</h2>
            <ul>
              {artist.albums.map((album) => (
                <li key={album._id}>{album.title}</li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default GenreDetails;
