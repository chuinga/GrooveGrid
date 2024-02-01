import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
// Contexts
import { AuthContext } from "../context/auth.context";
// Icons
import ProfileIcon from "../assets/profile-icon.png";
// Import Styles
import "../styles/UserProfilePage.css";

// Import the string from the .env with URL of the API/server - http://localhost:5005
/* const API_URL = 'http://localhost:5005'; */

function UserProfilePage() {
  const [userProfile, setUserProfile] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const getUser = async () => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/profile/${user._id}`,
            /* `${API_URL}/api/profile/${user._id}`, */
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            }
          );

          if (!response.ok) {
            const errorData = response.json();
            const errorDescription = errorData.message;
            throw new Error(errorDescription);
          }

          const data = await response.json();
          setUserProfile(data);
          setLoading(false);
        } catch (error) {
          setErrorMessage(error.message);
        }
      } else {
        setErrorMessage(errorMessage);
      }
    };

    getUser();
  }, [errorMessage, user._id]);

  // CHANGE USERNAME
  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const storedToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/profile/${user._id}/update`, // Adjust the URL according to your API
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify({ name: newUsername }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const updatedUserProfile = await response.json();
      setUserProfile(updatedUserProfile);
      setUser(updatedUserProfile);
      setModalVisible(false);
      setSuccessMessage("Successfully updated username!");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Function to open the modal
  const openModal = () => {
    setModalVisible(true);
    setSuccessMessage(""); // Reset success message when opening the modal
  };

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return userProfile ? (
    <div className="user-profile-page-container">
      <img src={ProfileIcon} alt="profile-photo" className="profile-image" />
      <h1 className="profile-name">{userProfile.name}</h1>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <button onClick={openModal} className="update-button">
        Update Username
      </button>

      {modalVisible && (
        <div className="modal">
          <form onSubmit={handleFormSubmit}>
            <label>
              New Username:
              <input
                type="text"
                value={newUsername}
                onChange={handleUsernameChange}
                className="input-username"
              />
            </label>
            <button type="submit" className="update-username">
              Update Username
            </button>
            <button onClick={() => setModalVisible(false)} className="close">
              Close
            </button>
          </form>
        </div>
      )}

      <div>
        <Link to="/playlists" className="playlist-button">
          Your Playlists
        </Link>
      </div>
    </div>
  ) : null;
}
export default UserProfilePage;
