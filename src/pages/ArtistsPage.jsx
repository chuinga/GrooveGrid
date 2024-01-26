import React, { useState, useEffect } from "react";
import ArtistList from "../components/ArtistList.jsx";


const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);

  // Function to fetch artists from the backend
  const fetchArtists = async () => {
    try {

      /* const baseUrl= import.meta.env.VITE_API_URL.endsWith("/") 
        ? import.meta.env.VITE_API_URL.slice(0,-1)
        : import.meta.env.VITE_API_URL */


      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/artists`);
      if (!response.ok) throw new Error("Data fetch failed");
      const data = await response.json();
      setArtists(data);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  return (
    <div>
      <h1>Artists</h1>
      <ArtistList artists={artists} />
    </div>
  );
};

export default ArtistsPage;
