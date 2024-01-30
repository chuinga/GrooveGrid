import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Player from "../assets/Audio-Player.png";

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
    <div>
      <h2>{song.title}</h2>
      <p>Artist: {song.artist.name}</p>
      <p>Album: {song.album.title}</p>
      <p>Genres: {song.genres.map((genre) => genre.name).join(", ")}</p>
      <img src={Player} alt="Player" />
    </div>
  );
};

export default SongDetails;
