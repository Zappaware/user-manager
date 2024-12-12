// src/components/UserTable.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    CircularProgress,
    TextField,
    Box,
} from '@mui/material';

const UserTable: React.FC = () => {
    const users = useSelector((state: RootState) => state.users.data);
    const loading = useSelector((state: RootState) => state.users.loading);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    type User = {
        id: number;
        name: string;
        email: string;
        username: string;
        phone: string;
    };

    // Filtrar usuarios por nombre o correo electrónico
    const filteredUsers = users.filter((user: User) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <CircularProgress />;

    return (
        <Box>
            {/* Campo de búsqueda */}
            <Box display="flex" justifyContent="center" marginBottom="1rem">
                <TextField
                    label="Search by Name or Email"
                    variant="outlined"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '300px' }}
                />
            </Box>

            {/* Tabla de usuarios */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user: User) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => navigate(`/users/${user.id}`)}
                                        >
                                            View Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No users found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UserTable;
