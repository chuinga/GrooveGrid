/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5005';

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [authError, setAuthError] = useState(null);

    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
    };

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
        // Upon logout, remove the token from the localStorage
        localStorage.removeItem('authToken');
    };

    const logOutUser = () => {
        removeToken();
        authenticateUser();
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
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthProviderWrapper, AuthContext };
