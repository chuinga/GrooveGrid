import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const API_URL = 'http://localhost:5005';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        const requestBody = { email, password };

        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorDescription =
                    errorData.message || 'Erro na requisição';
                throw new Error(errorDescription);
            }

            const responseData = await response.json();
            console.log('JWT token', responseData.authToken);

            storeToken(responseData.authToken);
            authenticateUser();
            navigate('/');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <form onSubmit={handleLoginSubmit}>
                <h3>Login</h3>

                <label>Email</label>
                <input
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleEmail}
                    autoComplete='off'
                />

                <label>Password</label>
                <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={handlePassword}
                    autoComplete='off'
                />

                <button type='submit'>Log In</button>
            </form>

            <p>Don&apos;t have an account yet?</p>

            {errorMessage && <p>{errorMessage}</p>}
        </>
    );
}

export default LoginPage;
