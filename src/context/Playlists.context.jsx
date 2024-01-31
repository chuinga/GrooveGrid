import { useState, useEffect, createContext, useContext } from "react";
import PropTypes from "prop-types";

import { AuthContext } from "./auth.context";

export const PlaylistsContext = createContext();

export const PlaylistsContextProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchPlaylists = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL.endsWith("/")
        ? import.meta.env.VITE_API_URL.slice(0, -1)
        : import.meta.env.VITE_API_URL;

      const response = await fetch(
        `${baseUrl}/api/playlists?userId=${user?._id}`
      );

      if (!response.ok) {
        throw new Error("Data fetch failed");
      }
      setIsLoading(false);
      const data = await response.json();
      setPlaylists(data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  const fetchPlaylistById = async (playlistId) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL.endsWith("/")
        ? import.meta.env.VITE_API_URL.slice(0, -1)
        : import.meta.env.VITE_API_URL;

      const response = await fetch(
        `${baseUrl}/api/playlists/${playlistId}?userId=${user?._id}`
      );

      if (!response.ok) {
        throw new Error("Data fetch failed");
      }
      setIsLoading(false);
      const fetchedPlaylist = await response.json();
      const existingPlaylistIndex = playlists?.findIndex(
        (item) => item._id === playlistId
      );

      if (existingPlaylistIndex !== -1) {
        const updatedPlaylists = [...playlists];
        updatedPlaylists[existingPlaylistIndex] = fetchedPlaylist;
        setPlaylists(updatedPlaylists);
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  // New method to refresh a specific playlist
  const refreshPlaylist = async (playlistId) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL.endsWith("/")
        ? import.meta.env.VITE_API_URL.slice(0, -1)
        : import.meta.env.VITE_API_URL;

      const response = await fetch(
        `${baseUrl}/api/playlists/${playlistId}?userId=${user?._id}`
      );

      if (!response.ok) {
        throw new Error("Data fetch failed");
      }
      const fetchedPlaylist = await response.json();
      const updatedPlaylists = playlists.map((p) =>
        p._id === playlistId ? fetchedPlaylist : p
      );
      setPlaylists(updatedPlaylists);
    } catch (error) {
      console.error("Error refreshing playlist:", error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchPlaylists();
    }
  }, [user?._id]);

  return (
    <PlaylistsContext.Provider
      value={{
        fetchPlaylists,
        fetchPlaylistById,
        playlists,
        isLoading,
        refreshPlaylist,
      }}
    >
      {children}
    </PlaylistsContext.Provider>
  );
};

PlaylistsContextProvider.propTypes = {
  children: PropTypes.node,
};

export default PlaylistsContextProvider;
