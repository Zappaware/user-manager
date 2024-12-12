// src/components/Auth/LoginForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
       if (email === 'admin' && password === 'admin') {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/home'); // Redirect to HomePage
        } else {
           setError('Invalid username or password');
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '2rem', maxWidth: '400px', margin: '2rem auto' }}>
            <Typography variant="h5" component="h1" gutterBottom>
                Login
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        variant="outlined"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Box>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Login
                </Button>
            </form>
        </Paper>
    );
};

export default LoginForm;
