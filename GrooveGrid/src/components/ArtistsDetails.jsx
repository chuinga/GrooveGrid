import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ArtistDetails = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        // Ensure there's no extra slash at the end of VITE_API_URL
        const baseUrl = import.meta.env.VITE_API_URL.endsWith("/")
          ? import.meta.env.VITE_API_URL.slice(0, -1)
          : import.meta.env.VITE_API_URL;

        const response = await fetch(`${baseUrl}/api/artists/${artistId}`);
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
      <h1>Artist Details</h1>
      <>
        <h2>{artist.name}</h2>
        <p>Genre: {artist.genre}</p>
        <img src={artist.imageUrl} alt={artist.name} />
      </>
    </div>
  );
};

export default ArtistDetails;
