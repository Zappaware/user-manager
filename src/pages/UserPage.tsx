import React from 'react';
import { useParams } from 'react-router-dom';
import UserDetails from '../components/UserDetails';
import { Container } from '@mui/material';

const UserPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <Container>
            <UserDetails />
        </Container>
    );
};

export default UserPage;
