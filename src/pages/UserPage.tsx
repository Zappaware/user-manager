import React from 'react';
import { useParams } from 'react-router-dom';
import UserDetails from '../components/UserDetails';
import { Container } from '@mui/material';

const UserPage: React.FC = () => {
    // @ts-expect-error id is for other use
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id } = useParams<{ id: string }>();

    return (
        <Container>
            <UserDetails />
        </Container>
    );
};

export default UserPage;
