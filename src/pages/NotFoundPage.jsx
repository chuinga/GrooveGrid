import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for doesn't exist.</p>
      <p>
        <Link to="/">Go Home</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
