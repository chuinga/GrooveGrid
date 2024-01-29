
// 29/01 às 16:41

import React, { useState } from "react";

const CreateArtistForm = ({ onCreateArtist, genres }) => {
  const [artistData, setArtistData] = useState({
    name: "",
    genre: "",
    image: "",
    // add other fields as needed
  });

  const handleInputChange = (e) => {
    setArtistData({
      ...artistData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the function to create a new artist
    onCreateArtist(artistData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={artistData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Genre:
        <select onChange={handleInputChange} name="genre">
{genres.map(genre => {
    return (<option value={genre._id} key={genre._id}>{genre.name}</option>)
})}
        </select>
      </label>
      <label>
        Image:
        <input
          type="text"
          name="image"
          value={artistData.image}
          onChange={handleInputChange}
        />
      </label>
      {/* add other input fields as needed */}
      <button type="submit">Create Artist</button>
    </form>
  );
};

export default CreateArtistForm;
