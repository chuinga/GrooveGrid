import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AlbumDetails = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        // Ensure there's no extra slash at the end of VITE_API_URL
        const baseUrl = import.meta.env.VITE_API_URL.endsWith("/")
          ? import.meta.env.VITE_API_URL.slice(0, -1)
          : import.meta.env.VITE_API_URL;

        const response = await fetch(`${baseUrl}/api/album/${albumId}`);
        if (!response.ok) throw new Error("Album fetch failed");
        const data = await response.json();
        setAlbum(data);
      } catch (error) {
        console.error("Error fetching album:", error);
      }
    };

    fetchAlbum();
  }, [albumId]);

  if (!album) return <div>Loading...</div>;

  return (
    <div>
      <h2>{album.title}</h2>
      <p>Artist: {album.artist}</p>
      <p>Release Date: {album.releaseDate}</p>
      <p>Genre: {album.genre}</p>
      <img src={album.coverImageUrl} alt={album.title} />
      <p>Description: {album.description}</p>
      <div>
        <h3>Tracks:</h3>
      </div>
    </div>
  );
};

export default AlbumDetails;
