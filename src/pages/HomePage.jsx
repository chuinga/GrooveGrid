import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to GrooveGrid</h1>
      <p>
        Explore a wide range of music genres, albums, and songs from various
        artists.
      </p>
      <p>
        <Link to="/albums">Browse Albums</Link>
      </p>
    </div>
  );
};

export default HomePage;