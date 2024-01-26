import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5005';

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value);

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        const requestBody = { email, password, name };

        try {
            const response = await fetch(`${API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorDescription = errorData.message || 'Request error';
                throw new Error(errorDescription);
            }

            navigate('/login');
        } catch (error) {
            const errorDescription = error.message || 'Request error';
            setErrorMessage(errorDescription);
        }
    };
    return (
        <div>
            <form onSubmit={handleSignupSubmit}>
                <h3>Sign Up</h3>

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

                <label>Name</label>
                <input
                    type='text'
                    name='name'
                    value={name}
                    onChange={handleName}
                    autoComplete='off'
                />

                <button type='submit'>Create Account</button>
            </form>

            {errorMessage && <p>{errorMessage}</p>}

            <p>Already have an account?</p>
            <Link to={'/login'}> Log in</Link>
        </div>
    );
}

export default SignupPage;
