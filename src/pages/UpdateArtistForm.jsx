// UpdateArtistForm.jsx

import React, { useState, useEffect } from "react";



const UpdateArtistForm = ({ artist, onUpdateArtist, genres }) => {
  const [updatedArtistData, setUpdatedArtistData] = useState({
    name: artist.name,
    genre: artist.genre._id, // Assuming the genre field is an object with _id
    image: artist.image,
  });

  useEffect(() => {
    setUpdatedArtistData({
      name: artist.name,
      genre: artist.genre._id,
      image: artist.image,
    });
  }, [artist]);

  const handleUpdateArtist = async (updatedArtistData) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL.endsWith("/")
        ? import.meta.env.VITE_API_URL.slice(0, -1)
        : import.meta.env.VITE_API_URL;

      const response = await fetch(
        `${baseUrl}/api/artists/${artist._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify(updatedArtistData),
        }
      );

      if (!response.ok) throw new Error("Artist update failed");

      const updatedArtist = await response.json();

      // Update the state with the updated artist
      setArtists((prevArtists) =>
        prevArtists.map((a) =>
          a._id === updatedArtist._id ? updatedArtist : a
        )
      );

      // Clear the selected artist
      setSelectedArtist(null);
    } catch (error) {
      console.error("Error updating artist:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedArtistData({ ...updatedArtistData, [name]: value });
  };

  /* const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onUpdateArtist function to update the artist
    onUpdateArtist(updatedArtistData);
  }; */

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const baseUrl = import.meta.env.VITE_API_URL.endsWith("/")
          ? import.meta.env.VITE_API_URL.slice(0, -1)
          : import.meta.env.VITE_API_URL;

        const response = await fetch(`${baseUrl}/api/artists/${artist._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify(updatedArtistData),
        });

        if (!response.ok) throw new Error("Artist update failed");

        const updatedArtist = await response.json();

        // Call the onUpdateArtist function to update the artist in the parent component
        onUpdateArtist(updatedArtist);

        // Optionally, you can reset the form or perform any other post-update actions
      } catch (error) {
        console.error("Error updating artist:", error);
      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={updatedArtistData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Genre:
        <select
          name="genre"
          value={updatedArtistData.genre}
          onChange={handleInputChange}
        >
          {genres.map((genre) => (
            <option key={genre._id} value={genre._id}>
              {genre.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Image URL:
        <input
          type="text"
          name="image"
          value={updatedArtistData.image}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Update Artist</button>
    </form>
  );
};

export default UpdateArtistForm;
