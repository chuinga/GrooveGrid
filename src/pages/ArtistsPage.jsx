/*  import React, { useState, useEffect } from "react";
import ArtistList from "../components/ArtistList.jsx";
import CreateArtistForm from "./CreateArtistForm";

const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);

  // Function to fetch artists from the backend
  const fetchArtists = async () => {
    try {
       const baseUrl= import.meta.env.VITE_API_URL.endsWith("/") 
        ? import.meta.env.VITE_API_URL.slice(0,-1)
        : import.meta.env.VITE_API_URL 

      const response = await fetch(
        `${baseUrl}/api/artists`
      );
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
 

 */



// 29/01/ 16:39

import React, { useState, useEffect, useContext } from "react";
import ArtistList from "../components/ArtistList.jsx";
import CreateArtistForm from "../components/CreateArtistForm.jsx";
import {AuthContext} from "../context/auth.context.jsx"

const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]); 
  const { storedToken } = useContext(AuthContext);

  
  const fetchArtists = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL.endsWith("/")
        ? import.meta.env.VITE_API_URL.slice(0, -1)
        : import.meta.env.VITE_API_URL;

      
      const response = await fetch(`${baseUrl}/api/artists`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (!response.ok) throw new Error("Data fetch failed");
      const data = await response.json();
      setArtists(data);

      const genreResponse = await fetch(`${baseUrl}/api/genre`, {headers: {Authorization: `Bearer ${storedToken}`}})
      if(!response.ok) throw new Error("Date fetch failed")
      const parsed = await genreResponse.json()
    setGenres(parsed)
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []); 

 

  const createArtist = async (artistData) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL.endsWith("/")
        ? import.meta.env.VITE_API_URL.slice(0, -1)
        : import.meta.env.VITE_API_URL;

      const response = await fetch(`${baseUrl}/api/artists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`
        },
        body: JSON.stringify(artistData),
      });

      if (!response.ok) throw new Error("Artist creation failed");

      const createdArtist = await response.json();
      setArtists([...artists, createdArtist]); // Update the state with the new artist
    } catch (error) {
      console.error("Error creating artist:", error);
    }
  };

  return (
    <div>
      <h1>Artists</h1>
      <CreateArtistForm onCreateArtist={createArtist} genres={genres} />
      <ArtistList artists={artists} />
    </div>
  );
};

export default ArtistsPage;
