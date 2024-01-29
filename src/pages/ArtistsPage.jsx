import React, { useState, useEffect } from "react";
import ArtistList from "../components/ArtistList.jsx";

const ArtistsPage = () => {
  const [allArtists, setAllArtists] = useState([]); // Holds all artists
  const [filteredArtists, setFilteredArtists] = useState([]); // Holds filtered artists for display
  const [searchInput, setSearchInput] = useState("");

  const fetchArtists = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL.endsWith("/")
        ? import.meta.env.VITE_API_URL.slice(0, -1)
        : import.meta.env.VITE_API_URL;

      const response = await fetch(`${baseUrl}/api/artists`);
      if (!response.ok) throw new Error("Data fetch failed");
      const data = await response.json();
      setAllArtists(data);
      setFilteredArtists(data); // Initially, all artists are displayed
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  useEffect(() => {
    // Filter artists as the search input changes
    const filtered = allArtists.filter((artist) =>
      artist.name.toLowerCase().includes(searchInput.trim().toLowerCase())
    );
    setFilteredArtists(filtered);
  }, [searchInput, allArtists]);

  return (
    <div>
      <h1>Artists</h1>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search artists..."
      />
      <ArtistList artists={filteredArtists} />
    </div>
  );
};

export default ArtistsPage;
