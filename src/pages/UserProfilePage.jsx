import { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../context/auth.context';

// Import the string from the .env with URL of the API/server - http://localhost:5005
const API_URL = 'http://localhost:5005';

function UserProfilePage() {
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState(undefined);

    useEffect(() => {
        const getStudent = async () => {
            const storedToken = localStorage.getItem('authToken');

            if (storedToken) {
                try {
                    const response = await fetch(
                        `${API_URL}/api/users/${user._id}`,
                        {
                            method: 'GET',
                            headers: {
                                Authorization: `Bearer ${storedToken}`,
                            },
                        }
                    );

                    if (!response.ok) {
                        const errorData = await response.json();
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

        getStudent();
    }, [user._id]);

    if (errorMessage) return { errorMessage };
}
export default UserProfilePage;
