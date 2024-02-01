import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/GenreDetails.css";

const GenreDetails = () => {
  const { genreId } = useParams();
  const navigate = useNavigate();
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

  const navigateToArtist = (artistId) => {
    navigate(`/artists/${artistId}`);
  };

  if (!genre) return <div>Loading...</div>;


  return (
    <div className="genre-details-wrapper">
      <div className="genre-details-text">
        <h1>Genre: {genre && genre.genre}</h1>
        {genre && <p> <b> Description: </b> {genre.description}</p>}
      </div>
      <div className="genre-examples-wrapper">
        {genre &&
          genre.artists.map((artist) => (
            <div key={artist._id} className="artist-box">
              <h2
                onClick={() => navigateToArtist(artist._id)}
                style={{ cursor: "pointer" }}
              >
                {artist.name}
              </h2>
            </div>
          ))}
      </div>
    </div>
  ); 

}  

export default GenreDetails;
