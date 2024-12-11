// src/components/UserTable.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';

const UserTable: React.FC = () => {
    const { data, loading } = useSelector((state: RootState) => state.users);
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
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Phone</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((user: User) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserTable;
