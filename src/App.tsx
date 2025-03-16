import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/Login';
import GanttChart from './components/GanttChart/GanttChart';
import Header from './components/Header';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

interface User {
    name: string;
    picture: string;
}

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (token && userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogin = (token: string, userData: User) => {
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            {isAuthenticated ? (
                <div>
                    <Header user={user!} onLogout={handleLogout} />
                    <GanttChart />
                </div>
            ) : (
                <Login onLogin={handleLogin} />
            )}
        </GoogleOAuthProvider>
    );
};

export default App;
