import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import styles from './LoginForm.module.css';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === 'admin' && password === 'admin') {
            login();
            navigate('/home'); // Redirect to HomePage
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Typography variant="h5" component="h1" className={styles.title}>
                    Login
                </Typography>
                {error && <Typography className={styles.error}>{error}</Typography>}
                <Box className={styles.field}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Box>
                <Box className={styles.field}>
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Box>
                <Button className={styles.button} variant="contained" type="submit" fullWidth>
                    Login
                </Button>
            </form>
        </div>
    );
};

export default LoginForm;
