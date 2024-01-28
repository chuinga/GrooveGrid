import { useState, useEffect } from "react";
import SongsList from "../components/SongList";

function SongsPage() {
  const [songs, setSongs] = useState([]);

  const fetchSongs = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL.endsWith("/")
        ? import.meta.env.VITE_API_URL.slice(0, -1)
        : import.meta.env.VITE_API_URL;
      const response = await fetch(`${baseUrl}/api/songs`);
      if (!response.ok) throw new Error("Data fetch failed");
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error({ message: "Error fetching songs", error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div>
      <h1>Songs</h1>
      <SongsList songs={songs} />
    </div>
  );
}

export default SongsPage;
