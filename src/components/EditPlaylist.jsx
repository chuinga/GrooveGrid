/* eslint-disable react/prop-types */
import { useState } from "react";

const EditPlaylist = ({ onSave, onCancel }) => {
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const handleSave = () => {
    onSave(newPlaylistName);
  };

  return (
    <div>
      <input
        type="text"
        value={newPlaylistName}
        onChange={(e) => setNewPlaylistName(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditPlaylist;
