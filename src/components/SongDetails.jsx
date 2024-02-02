import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// Import images
import Player from "../assets/Audio-Player.png";
// Import Styling
import "../styles/SongDetailsPage.css";

const SongDetails = () => {
  const { songId } = useParams();
  const [song, setSong] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL.endsWith("/")
          ? import.meta.env.VITE_API_URL.slice(0, -1)
          : import.meta.env.VITE_API_URL;

        const response = await fetch(`${baseUrl}/api/songs/${songId}`);
        if (!response.ok) throw new Error("Song fetch failed");
        const data = await response.json();

        setSong(data);
      } catch (error) {
        console.error("Error fetching song:", error);
      }
    };

    fetchSong();
  }, [songId]);

  if (!song) return <div>Loading...</div>;

  return (
    <div className="song-detail-page">
      <div className="song-detail-card">
        <h2 className="song-title">{song.title}</h2>
        <p className="song-artist">Artist: {song.artist.name}</p>
        <p className="song-album">Album: {song.album.title}</p>
        <p className="song-genre">
          Genres: {song.genres.map((genre) => genre.name).join(", ")}
        </p>
        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Player} alt="Player" className="song-image" />
        </a>
      </div>
    </div>
  );
};

export default SongDetails;
