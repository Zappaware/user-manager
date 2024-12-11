import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { getUsers } from '../redux/userSlice';
import UserTable from '../components/UserTable';
import { Typography, Container } from '@mui/material';

const HomePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Fetch users on component mount
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                User Management
            </Typography>
            <UserTable />
        </Container>
    );
};

export default HomePage;
