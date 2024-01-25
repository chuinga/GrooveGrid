import { useState, useEffect } from "react";
import AlbumList from "../components/AlbumList";

const AlbumsPage = () => {
  const [albums, setAlbums] = useState([]);
  // Function to fetch albums from the backend
  const fetchAlbums = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/album`);
      if (!response.ok) throw new Error("Data fetch failed");
      const data = await response.json();
      setAlbums(data);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <h1>Albums</h1>
      <AlbumList albums={albums} />
    </div>
  );
};

export default AlbumsPage;
