import React from 'react';
import styled from 'styled-components';
import UserProfile from './UserProfile';

const HeaderContainer = styled.header`
    background: white;
    padding: 1rem 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Logo = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
`;

interface HeaderProps {
    user: {
        name: string;
        picture: string;
    };
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
    return (
        <HeaderContainer>
            <Logo>Reports</Logo>
            <UserProfile user={user} onLogout={onLogout} />
        </HeaderContainer>
    );
};

export default Header; 