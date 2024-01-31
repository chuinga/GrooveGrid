/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { PlaylistsContext } from "../context/Playlists.context"; // Import PlaylistsContext
// Import Styles
import "../styles/SongsList.css";

const SongsList = ({ songs, userPlaylists }) => {
  const { storedToken, user } = useContext(AuthContext);
  const { refreshPlaylist } = useContext(PlaylistsContext); // Use refreshPlaylist from context
  const [successMessage, setSuccessMessage] = useState(""); // State to store success message

  const handleAddToPlaylist = async (song, playlist) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL.endsWith("/")
        ? import.meta.env.VITE_API_URL.slice(0, -1)
        : import.meta.env.VITE_API_URL;
      const response = await fetch(
        `${baseUrl}/api/playlists/${playlist._id}/addsong/${song?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify({
            createdBy: user._id,
            song: {
              title: song?.title,
              artist: song?.artist?.name,
            },
          }),
        }
      );

      if (response.ok) {
        setSuccessMessage(
          `'${song.title}' added to '${playlist.name}' successfully!`
        );
        console.log("Song added to playlist successfully");
        // fetch SINGULAR playlist info
        refreshPlaylist(playlist._id); // Refresh the specific playlist
      } else {
        console.error("Failed to add song to playlist");
      }
    } catch (error) {
      console.error("Error adding song to playlist:", error);
    }
  };

  return (
    <div>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <ul className="songs-list-wrapper">
        {songs.map((song) => (
          <li key={song._id} className="song-title-and-artist">
            {song.album && (
              <img
                src={song.album.coverImageUrl}
                alt={`${song.title} album cover`}
                className="album-image"
              />
            )}
            <span>{song.title}</span>
            <span>{song.artist.name}</span>
            <div className="Add-to-playlist-buttons">
              {userPlaylists.map((playlist) => (
                <button
                  key={playlist._id}
                  onClick={() => handleAddToPlaylist(song, playlist)}
                >
                  Add to {playlist.name}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongsList;
