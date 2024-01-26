import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ArtistDetails = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/artists/${artistId}`
        );
        if (!response.ok) throw new Error("Artist fetch failed");
        const data = await response.json();
        setArtist(data);
      } catch (error) {
        console.error("Error fetching artist:", error);
      }
    };

    fetchArtist();
  }, [artistId]);

  if (!artist) return <div>Loading...</div>;

  return (
    <div>
      <h2>{artist.name}</h2>
      <p>Genre: {artist.genre}</p>
      <img src={artist.imageUrl} alt={artist.name} />
      <p>{artist.bio}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default ArtistDetails;
