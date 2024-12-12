// src/components/UserTable.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material';

const UserTable: React.FC = () => {
    const users = useSelector((state: RootState) => state.users.data);
    const navigate = useNavigate();
    const loading = useSelector((state: RootState) => state.users.loading);
    type User  = {
        id: number;
        name: string;
        email: string;
        username: string;
        phone: string
    };

    if (loading) return <CircularProgress />;

    return (
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
                    {users.map((user: User) => (
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
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserTable;
