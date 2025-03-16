import React, { useState } from 'react';
import styled from 'styled-components';
import { LogOut, User } from 'lucide-react';

const ProfileContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const ProfileButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        background: #f0f0f0;
    }
`;

const ProfileMenu = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 8px;
    z-index: 1000;
`;

const MenuItem = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 8px 16px;
    border: none;
    background: none;
    cursor: pointer;
    color: #333;
    
    &:hover {
        background: #f0f0f0;
    }
`;

const UserAvatar = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
`;

interface UserProfileProps {
    user: {
        name: string;
        picture: string;
    };
    onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <ProfileContainer>
            <ProfileButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <UserAvatar src={user.picture} alt={user.name} />
            </ProfileButton>
            
            {isMenuOpen && (
                <ProfileMenu>
                    <MenuItem onClick={() => setIsMenuOpen(false)}>
                        <User size={16} />
                        {user.name}
                    </MenuItem>
                    <MenuItem onClick={onLogout}>
                        <LogOut size={16} />
                        Выйти
                    </MenuItem>
                </ProfileMenu>
            )}
        </ProfileContainer>
    );
};

export default UserProfile; 