import PropTypes from "prop-types";
import { useContext, useState } from "react";
// Import Context
import { AuthContext } from "../context/auth.context";
import { PlaylistsContext } from "../context/Playlists.context";
// Import Components
import UpdatePlaylist from "./UpdatePlaylist";
import CreatePlaylist from "./CreatePlaylist";
import Modal from "./ModalComponent";
// Import Styles
import "../styles/Playlist.css";

const PlaylistList = (props) => {
  const { playlists } = props;
  const [editingPlaylistId, setEditingPlaylistId] = useState(null);
  const [creatingPlaylist, setCreatingPlaylist] = useState(false);

  const { storedToken, user } = useContext(AuthContext);
  const { fetchPlaylists, fetchPlaylistById } = useContext(PlaylistsContext);
  // Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPlaylistId, setCurrentPlaylistId] = useState(null);
  const [showDeleteSongModal, setShowDeleteSongModal] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [currentPlaylistIdForSong, setCurrentPlaylistIdForSong] =
    useState(null);

  const handleEditPlaylist = (playlistId) => {
    setCurrentPlaylistId(playlistId);
    setShowEditModal(true);
  };

  const handleCreatePlaylist = () => {
    setShowCreateModal(true);
  };

  const handleDeletePlaylist = (playlistId) => {
    setCurrentPlaylistId(playlistId);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setSuccessMessage("");
  };

  const handleSuccess = () => {
    setShowCreateModal(false);
    setSuccessMessage("Playlist Created Successfully!");
    fetchPlaylists();
  };

  const handleEditSuccess = (playlistId) => {
    setShowEditModal(false);
    setSuccessMessage("Playlist Updated Successfully!");
    fetchPlaylistById(playlistId);
  };

  const handleDeleteSuccess = () => {
    setShowDeleteModal(false);
    setSuccessMessage("Playlist Deleted Successfully!");
    fetchPlaylists();
  };

  // Function to handle opening the delete song modal
  const openDeleteSongModal = (songId, playlistId) => {
    console.log(
      "Opening delete song modal with songId:",
      songId,
      "and playlistId:",
      playlistId
    );
    setSelectedSongId(songId);
    setCurrentPlaylistIdForSong(playlistId);
    setShowDeleteSongModal(true);
  };

  const handleError = () => {
    setEditingPlaylistId(null);
    setCreatingPlaylist(false);
  };

  const handleDelete = (playlistId) => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/playlists/${currentPlaylistId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          createdBy: user._id,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status}`);
          return;
        }
        fetchPlaylists();
        handleDeleteSuccess();
      })
      .catch((error) => {
        console.error("Error deleting playlist:", error);
      });
  };

  // Function to handle deleting a song
  const handleDeleteSong = () => {
    console.log(
      "Deleting song with songId:",
      selectedSongId,
      "from playlistId:",
      currentPlaylistIdForSong
    );
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/api/playlists/${currentPlaylistIdForSong}/removesong/${selectedSongId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete song");
        }
        // Refresh the playlist to reflect the changes
        fetchPlaylistById(currentPlaylistIdForSong);
        setShowDeleteSongModal(false);
      })
      .catch((error) => {
        console.error("Error deleting song:", error);
      });
  };

  return (
    <div>
      {successMessage && <div>{successMessage}</div>}

      <button onClick={handleCreatePlaylist}>Create Playlist</button>

      <Modal isOpen={showCreateModal} onClose={handleCloseModal}>
        <CreatePlaylist
          userId={user._id} // Make sure this is _id and not __id
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </Modal>

      {playlists?.map((playlist) => (
        <div key={playlist._id} className="playlist-item">
          {showEditModal && currentPlaylistId === playlist._id ? (
            <Modal
              isOpen={showEditModal}
              onClose={() => setShowEditModal(false)}
            >
              <UpdatePlaylist
                playlistId={playlist._id}
                onSuccess={handleEditSuccess}
                onCancel={() => setShowEditModal(false)}
                onError={handleError}
              />
            </Modal>
          ) : (
            <div>
              <h3>{playlist.name}</h3>
              <button onClick={() => handleEditPlaylist(playlist._id)}>
                Edit Name of the Playlist
              </button>
              <div>
                <button onClick={() => handleDeletePlaylist(playlist._id)}>
                  Delete Playlist
                </button>
                <p>
                  <strong>Artists:</strong>{" "}
                  {playlist.artists?.map((artist) => (
                    <span key={artist._id}>{artist.name}, </span>
                  ))}
                </p>
                <div>
                  {/* Add a button for each song to open the delete modal */}
                  {playlist.songs?.map((song) => (
                    <div key={song._id}>
                      <span>{song.title}</span>
                      <button
                        onClick={() =>
                          openDeleteSongModal(song._id, playlist._id)
                        }
                      >
                        Delete Song
                      </button>
                    </div>
                  ))}
                </div>
                <p>
                  <strong>Image:</strong>
                  {playlist.artists?.length > 0 && (
                    <img
                      src={playlist.artists[0].image}
                      alt={`${playlist.name} Image`}
                    />
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Delete Playlist Modal */}
      {showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
        >
          <div>
            <p>Are you sure you want to delete this playlist?</p>
            <button onClick={handleDelete}>Confirm Delete</button>
            <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
          </div>
        </Modal>
      )}
      {/* Delete Song Modal */}
      {showDeleteSongModal && (
        <Modal
          isOpen={showDeleteSongModal}
          onClose={() => setShowDeleteSongModal(false)}
        >
          <div>
            <p>Are you sure you want to delete this song from the playlist?</p>
            <button onClick={handleDeleteSong}>Confirm Delete</button>
            <button onClick={() => setShowDeleteSongModal(false)}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

PlaylistList.propTypes = {
  playlists: PropTypes.array,
  setPlaylists: PropTypes.func,
  playlistId: PropTypes.string,
};

export default PlaylistList;
