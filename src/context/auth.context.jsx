/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5005';

const AuthContext = createContext();

function AuthProviderWrapper({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [authError, setAuthError] = useState(null);

    const navigate = useNavigate();

    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
    };

    // Move the storedToken declaration inside the component
    const authenticateUser = () => {
        const storedToken = localStorage.getItem('authToken');

        if (storedToken) {
            fetch(`${API_URL}/api/auth/verify`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${storedToken}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
                .then((user) => {
                    setIsLoggedIn(true);
                    setIsLoading(false);
                    setUser(user);
                })
                .catch((error) => {
                    setIsLoggedIn(false);
                    setIsLoading(false);
                    setUser(null);
                    setAuthError(error.message || 'Erro na autenticação');
                });
        } else {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
        }
    };

    const removeToken = () => {
        localStorage.removeItem('authToken');
    };

    const logOutUser = async () => {
        removeToken();
        await authenticateUser(); // Wait for authenticateUser to complete
        navigate('/');
    };

    useEffect(() => {
        authenticateUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                isLoading,
                user,
                storeToken,
                authenticateUser,
                logOutUser,
                authError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProviderWrapper, AuthContext };
