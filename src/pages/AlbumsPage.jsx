import { useState, useEffect } from "react";
import AlbumList from "../components/AlbumList";

const AlbumsPage = () => {
  const [albums, setAlbums] = useState([]);

  const fetchAlbums = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL.endsWith("/")
        ? import.meta.env.VITE_API_URL.slice(0, -1)
        : import.meta.env.VITE_API_URL;

      const response = await fetch(`${baseUrl}/api/album`);
      if (!response.ok) throw new Error("Data fetch failed");
      const data = await response.json();
      setAlbums(data);
    } catch (error) {
      console.error("Error fetching albums:", error);
    } finally {
      setIsLoading(false);
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
