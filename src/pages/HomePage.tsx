import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { getUsers } from '../redux/userSlice';
import UserTable from '../components/UserTable';
import { Typography } from '@mui/material';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Fetch users on component mount
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <Typography className={styles.header} variant="h3" gutterBottom>
                User Management
            </Typography>
            <div className={styles.subContainer}>
                <UserTable />
            </div>
        </div>
    );
};

export default HomePage;
