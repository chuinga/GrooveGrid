import { useState, useEffect, useContext } from "react";
import SongsList from "../components/SongList";
import { AuthContext } from "../context/auth.context";

function SongsPage() {
  const { storedToken, user } = useContext(AuthContext);
  const [songs, setSongs] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
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
      }
    };

    const fetchUserPlaylists = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL.endsWith("/")
          ? import.meta.env.VITE_API_URL.slice(0, -1)
          : import.meta.env.VITE_API_URL;
        const response = await fetch(
          `${baseUrl}/api/playlists?userId=${user._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        if (!response.ok) throw new Error("Data fetch failed");
        const data = await response.json();
        console.log("data", data);
        setUserPlaylists(data);
      } catch (error) {
        console.error({ message: "Error fetching playlists", error });
      }
    };

    fetchSongs();
    user && fetchUserPlaylists();
  }, [user, storedToken]);

  return (
    <div className="songs-page-wrapper">
      <h1>Songs</h1>
      <p>Here you can find Songs from various Artists</p>
      <div className="songs-wrapper">
        <SongsList songs={songs} userPlaylists={userPlaylists} />
      </div>
    </div>
  );
}

export default SongsPage;
