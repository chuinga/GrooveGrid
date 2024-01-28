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
        console.log(data);
        setAlbum(data);
      } catch (error) {
        console.error("Error fetching album:", error);
      }
    };

    fetchAlbum();
  }, [albumId]);

  if (!album) return <div>Loading...</div>;

  // To format the Release Date
  const formattedReleaseDate = new Date(album.releaseDate).toLocaleDateString();

  return (
    <div>
      <h2>{album.title.name}</h2>
      <p>Artist: {album.artist.name}</p>
      <p>Release Date: {formattedReleaseDate}</p>
      <p>Genre: {album.genre.name}</p>
      <img src={album.coverImageUrl} alt={album.title.name} />
      <p>Description: {album.description}</p>
    </div>
  );
};

export default AlbumDetails;
