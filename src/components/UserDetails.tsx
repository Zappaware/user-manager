import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Box, Typography, Button, Paper } from '@mui/material';

interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    phone: string;
    address: {
        street: string;
        city: string;
        zipcode: string;
    };
    company: {
        name: string;
    };
}

const UserDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Get user data from Redux state
    // @ts-expect-error Type 'User | undefined' is not assignable to type 'User'.
    const user: User = useSelector((state: RootState) =>
        state.users.data.find((user: User) => user.id === id)
    );

    if (!user) {
        return (
            <Box textAlign="center" marginTop={5}>
                <Typography variant="h5">User not found</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/')}
                >
                    Back to Home
                </Button>
            </Box>
        );
    }

    return (
        <Paper
            elevation={3}
            style={{
                padding: '2rem',
                margin: '2rem auto',
                maxWidth: '600px',
            }}
        >
            <Typography variant="h4" gutterBottom>
                {user.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Username:</strong> {user.username}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Phone:</strong> {user.phone}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Address:</strong>{' '}
                {`${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Company:</strong> {user.company.name}
            </Typography>
            <Button
                variant="contained"
                color="secondary"
                style={{ marginTop: '1rem' }}
                onClick={() => navigate('/')}
            >
                Back to Home
            </Button>
        </Paper>
    );
};

export default UserDetails;
