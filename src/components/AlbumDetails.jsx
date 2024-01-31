import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context"; 
import Modal from "./ModalComponent"; 

const AlbumDetails = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [editAlbumData, setEditAlbumData] = useState({
    description: "",
    releaseDate: "",
  });
  const [newSong, setNewSong] = useState({
   
    title: "",
    artist: "",
   
  });
  const { user, storedToken } = useContext(AuthContext);

  // State for managing modal visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddSongModalOpen, setIsAddSongModalOpen] = useState(false);
  // State for managing modal Delete
  const [isDeleteSongModalOpen, setIsDeleteSongModalOpen] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL.endsWith("/")
          ? import.meta.env.VITE_API_URL.slice(0, -1)
          : import.meta.env.VITE_API_URL;

        const response = await fetch(`${baseUrl}/api/album/${albumId}`);
        if (!response.ok) throw new Error("Album fetch failed");
        const data = await response.json();

        setAlbum(data);
        setEditAlbumData({
          description: data.description || "",
          releaseDate: data.releaseDate || "",
        });
      } catch (error) {
        console.error("Error fetching album:", error);
      }
    };

    fetchAlbum();
  }, [albumId]);

  const handleInputChange = (e) => {
    setEditAlbumData({
      ...editAlbumData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewSongChange = (e) => {
    // New handler for song input changes
    setNewSong({
      ...newSong,
      [e.target.name]: e.target.value,
    });
  };

  // Edit ALBUM //
  const handleEditAlbum = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/album/${albumId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify(editAlbumData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update album");
      }

      const updatedAlbum = await response.json();
  
      setAlbum((prevAlbum) => ({
        ...prevAlbum,
        ...updatedAlbum,
        songs: prevAlbum.songs,
      }));

      alert("Album updated successfully"); 

      // Optionally clear the editAlbumData state
      setEditAlbumData({
        description: "",
        releaseDate: "",
      });
    } catch (error) {
      console.error("Error updating album:", error);
      alert("Error updating album");
    }
  };

  // Add SONGS
  const handleAddSong = async (e) => {
    e.preventDefault();
    try {
      // Assuming the album state has artist information including the ID
      const artistId = album.artist._id;

      const songPayload = {
        ...newSong,
        artist: artistId, // Directly use the artist ID from the album data
        album: albumId,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/songs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify(songPayload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add song");
      }

      const addedSong = await response.json();
      setAlbum({ ...album, songs: [...album.songs, addedSong] });
      alert("Song added successfully");

      setNewSong({
        title: "",
        artist: "", 
      });
    } catch (error) {
      console.error("Error adding song:", error);
      alert("Error adding song");
    }
  };

  // DELETE songs
  const handleDeleteSong = async () => {
    if (!selectedSongId) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/songs/${selectedSongId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete song");
      }

      // Update the album state to remove the deleted song
      setAlbum((prevAlbum) => ({
        ...prevAlbum,
        songs: prevAlbum.songs.filter((song) => song._id !== selectedSongId),
      }));
      alert("Song deleted successfully");
      setIsDeleteSongModalOpen(false);
      setSelectedSongId(null); // Reset the selected song ID
    } catch (error) {
      console.error("Error deleting song:", error);
      alert("Error deleting song");
    }
  };

  if (!album) return <div>Loading...</div>;

  const handleSelectSongForDeletion = (songId) => {
    setSelectedSongId(songId);
  };

  // To format the Release Date
  const formattedReleaseDate = new Date(album.releaseDate).toLocaleDateString();

  return (
    <div>
      <h2>{album.title}</h2>
      <p>Artist: {album.artist.name}</p>
      <p>Release Date: {formattedReleaseDate}</p>
      <p>Genre: {album.genre.name}</p>
      <img src={album.coverImageUrl} alt={album.title} />
      <p>Description: {album.description}</p>
      <div>
        <h3>Songs in this Album</h3>
        {album.songs &&
          album.songs.map((song) => (
            <div key={song._id}>
              <p>{song.title}</p>
           
            </div>
          ))}
      </div>

      {user && (
        <div>
          {/* Button to open edit album modal */}
          <button onClick={() => setIsEditModalOpen(true)}>Edit Album</button>
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
          >
            {/* Edit Album Form inside the Modal */}
            <form onSubmit={handleEditAlbum}>
              <input
                type="text"
                name="description"
                placeholder="Album Description"
                value={editAlbumData.description}
                onChange={handleInputChange}
              />
              <input
                type="date"
                name="releaseDate"
                value={editAlbumData.releaseDate}
                onChange={handleInputChange}
              />
              <button type="submit">Update Album</button>
            </form>
          </Modal>

          {/* Button to open add song modal */}
          <button onClick={() => setIsAddSongModalOpen(true)}>
            Add a Song
          </button>
          <Modal
            isOpen={isAddSongModalOpen}
            onClose={() => setIsAddSongModalOpen(false)}
          >
            {/* Add Song Form inside the Modal */}
            <form onSubmit={handleAddSong}>
              <input
                type="text"
                name="title"
                placeholder="Song Title"
                value={newSong.title}
                onChange={handleNewSongChange}
              />
              <button type="submit">Add Song</button>
            </form>
          </Modal>
          {/* Button to open delete song modal */}
          <button onClick={() => setIsDeleteSongModalOpen(true)}>
            Delete a Song
          </button>
          <Modal
            isOpen={isDeleteSongModalOpen}
            onClose={() => {
              setIsDeleteSongModalOpen(false);
              setSelectedSongId(null); // Reset the selection when closing the modal
            }}
          >
            <h3>Delete a Song</h3>
            {album.songs.map((song) => (
              <div
                key={song._id}
                style={{
                  backgroundColor:
                    selectedSongId === song._id ? "#f0f0f0" : "transparent",
                }}
              >
                <p>{song.title}</p>
                <button onClick={() => handleSelectSongForDeletion(song._id)}>
                  Select for Deletion
                </button>
              </div>
            ))}
            {selectedSongId && ( // Only show the delete button if a song has been selected
              <button onClick={handleDeleteSong}>Delete Selected Song</button>
            )}
          </Modal>
        </div>
      )}
    </div>
  );
};

export default AlbumDetails;
