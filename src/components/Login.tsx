import React from 'react';
import styled from 'styled-components';
import { GoogleLogin } from '@react-oauth/google';

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f5f5f5;
`;

const LoginBox = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

interface LoginProps {
    onLogin: (token: string, user: { name: string; picture: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            const response = await fetch('http://localhost:3001/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: credentialResponse.credential }),
            });
            
            const data = await response.json();
            if (data.token) {
                onLogin(data.token, data.user);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <LoginContainer>
            <LoginBox>
                <h1>Reports App</h1>
                <p>Please sign in to continue</p>
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => console.log('Login Failed')}
                    useOneTap
                />
            </LoginBox>
        </LoginContainer>
    );
};

export default Login; 