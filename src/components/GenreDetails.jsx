// GenreDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GenreDetails = () => {
  const { genreId } = useParams();
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/genre/${genreId}`
        );
        if (!response.ok) throw new Error("Genre fetch failed");
        const data = await response.json();
        console.log(data);
        setGenre(data);
      } catch (error) {
        console.error("Error fetching genre:", error);
      }
    };

    fetchGenre();
  }, [genreId]);

  if (!genre) return <div>Loading...</div>;

  return (
    <div>
      <h1>Genre Details</h1>
      <>
        <h2>{genre.name}</h2>
        <p>Description: {genre.description}</p>
      </>
    </div>
  );
};

export default GenreDetails;
