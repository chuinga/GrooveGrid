/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
// Import components
import EditPlaylist from "./EditPlaylist";

const UpdatePlaylist = ({ playlistId, onSuccess, onError, onCancel }) => {
  const { storedToken, user } = useContext(AuthContext);

  const handleUpdatePlaylist = async (newPlaylistName) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/playlists/${playlistId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify({
            name: newPlaylistName,
            createdBy: user._id,
          }),
        }
      );

      if (response.ok) {
        onSuccess(playlistId);
      } else {
        console.error("Error updating playlist name");
        onError();
      }
    } catch (error) {
      console.error("Error updating playlist name:", error);
      onError();
    }
  };

  return (
    <div>
      <EditPlaylist onSave={handleUpdatePlaylist} onCancel={onCancel} />
    </div>
  );
};

export default UpdatePlaylist;
