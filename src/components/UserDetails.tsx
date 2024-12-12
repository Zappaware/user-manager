// src/components/UserDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    phone: string;
    website: string;
}

const UserDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!user) {
        return <Typography color="error">User not found</Typography>;
    }

    return (
        <Paper elevation={3} style={{ padding: '2rem', maxWidth: '600px', margin: '2rem auto' }}>
            <Typography variant="h4" component="h2" gutterBottom>
                {user.name}
            </Typography>
            <Typography variant="body1">
                <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1">
                <strong>Username:</strong> {user.username}
            </Typography>
            <Typography variant="body1">
                <strong>Phone:</strong> {user.phone}
            </Typography>
            <Typography variant="body1">
                <strong>Website:</strong> {user.website}
            </Typography>
            <Button variant="contained" color="secondary" onClick={() => navigate('/home')}>
                Back to Users
            </Button>
        </Paper>
    );
};

export default UserDetails;
