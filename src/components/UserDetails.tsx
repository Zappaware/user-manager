import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext'; // Import AuthContext
import axios from 'axios';
import styles from './UserDetails.module.css';

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
    const { isAuthenticated } = useAuth(); // Access authentication status
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/'); // Redirect to login if not authenticated
            return;
        }

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
    }, [id, isAuthenticated, navigate]);

    if (loading) {
        return (
            <div className={styles.container}>
                <CircularProgress />
            </div>
        );
    }

    if (!user) {
        return (
            <div className={styles.container}>
                <p className={styles.error}>User not found</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>{user.name}</h2>
                <p className={styles.detail}>
                    <strong>Email:</strong> {user.email}
                </p>
                <p className={styles.detail}>
                    <strong>Username:</strong> {user.username}
                </p>
                <p className={styles.detail}>
                    <strong>Phone:</strong> {user.phone}
                </p>
                <p className={styles.detail}>
                    <strong>Website:</strong> {user.website}
                </p>
                <button className={styles.button} onClick={() => navigate('/home')}>
                    Back to Users
                </button>
            </div>
        </div>
    );
};

export default UserDetails;
