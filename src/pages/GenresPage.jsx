// GenrePage.jsx
import React, { useState, useEffect } from "react";
import GenreList from "../components/GenreList";

const GenrePage = () => {
  const [genres, setGenres] = useState([]);

  // Function to fetch genres from the backend
  const fetchGenres = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL.endsWith("/")
        ? import.meta.env.VITE_API_URL.slice(0, -1)
        : import.meta.env.VITE_API_URL;

      const response = await fetch(`${baseUrl}/api/genre`);
      if (!response.ok) throw new Error("Data fetch failed");
      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <div>
      <h1>Genres</h1>
      <GenreList genres={genres} />
    </div>
  );
};

export default GenrePage;
