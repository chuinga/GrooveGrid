import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import ProfileIcon from '../assets/profile-icon.png';
import PlaylistList from '../components/PlaylistList';
import { Link } from 'react-router-dom';

import '../styles/UserProfilePage.css';

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = 'http://localhost:5005';

function UserProfilePage() {
    const [userProfile, setUserProfile] = useState(null);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [loading, setLoading] = useState(true);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const getUser = async () => {
            const storedToken = localStorage.getItem('authToken');

            if (storedToken) {
                try {
                    const response = await fetch(
                        `${API_URL}/api/profile/${user._id}`,
                        {
                            method: 'GET',
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

    if (errorMessage) {
        return <div>{errorMessage}</div>;
    }
    if (loading) {
        return <div>Loading...</div>;
    }

    return userProfile ? (
        <div className='user-profile-page-container'>
            <img src={ProfileIcon} alt='profile-photo' />
            <h1>{userProfile.name}</h1>

            <div>
                <p>
                    <strong>Email:</strong> {userProfile.email}
                </p>
                <div>
                    <Link to='/playlists'>
                        <PlaylistList playlists={userProfile.playlists} />
                    </Link>
                </div>
            </div>
        </div>
    ) : null;
}
export default UserProfilePage;
