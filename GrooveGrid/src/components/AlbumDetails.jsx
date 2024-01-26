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

        const response = await fetch(`${baseUrl}/api/album/${albumId}`);
        if (!response.ok) throw new Error("Album fetch failed");
        const data = await response.json();
        setArtist(data);
      } catch (error) {
        console.error("Error fetching artist:", error);
      }
    };

    fetchArtist();
  }, [artistId]);

  if (!artist) return <div>Loading...</div>;

  // To format the Release Date
  const formattedReleaseDate = new Date(album.releaseDate).toLocaleDateString();

  return (
    <div>
      <h2>{album.title.name}</h2> {console.log(album)}
      <p>Artist: {album.artist.name}</p>
      <p>Release Date: {formattedReleaseDate}</p>
      <p>Genre: {album.genre.name}</p>
      <img src={album.coverImageUrl} alt={album.title.name} />
      <p>Description: {album.description}</p>
      <div></div>
    </div>
  );
};

export default ArtistDetails;
