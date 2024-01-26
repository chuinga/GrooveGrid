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

  const { name, genre, imageUrl } = artist;

  return (
    <div>
      <h1>Artist Details</h1>
      {artist ? (
        <>
          <h2>{artist.name}</h2>
          <p>Genre: {artist.genre}</p>
          <img src={artist.imageUrl} alt={`${artist.name} thumbnail`} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
  
};

export default ArtistDetails;
