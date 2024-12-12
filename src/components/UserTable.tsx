import React, { useState, useEffect } from 'react';
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
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import axios from 'axios';
import styles from './UserTable.module.css';

type User = {
    id: number;
    name: string;
    email: string;
    username: string;
    phone: string;
};

const UserTable: React.FC = () => {
    const navigate = useNavigate();
    const loading = useSelector((state: RootState) => state.users.loading);

    const [users, setUsers] = useState<User[]>([]);
    const [visibleUsers, setVisibleUsers] = useState<User[]>([]);
    const [itemsToShow, setItemsToShow] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    const [newUser, setNewUser] = useState<User>({
        id: 0,
        name: '',
        email: '',
        username: '',
        phone: '',
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                setUsers(response.data);
                setVisibleUsers(response.data.slice(0, itemsToShow));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const filtered = users.filter(
            (user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setVisibleUsers(filtered.slice(0, itemsToShow));
    }, [searchTerm, users, itemsToShow]);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight
        ) {
            setItemsToShow((prev) => prev + 5);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDelete = (id: number) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    const handleAddUser = () => {
        if (newUser.name && newUser.email && newUser.username && newUser.phone) {
            const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
            const userToAdd: User = { ...newUser, id };
            setUsers([...users, userToAdd]);
            setNewUser({ id: 0, name: '', email: '', username: '', phone: '' });
            setOpenDialog(false);
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <Box className={styles.container}>
            <Box display="flex" justifyContent="center" marginBottom="1rem">
                <TextField
                    className={styles.searchBar}
                    label="Search by Name or Email"
                    variant="outlined"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Box>

            <Box display="flex" justifyContent="center" marginBottom="1rem">
                <Button
                    className={styles.addButton}
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenDialog(true)}
                >
                    Add User
                </Button>
            </Box>

            <TableContainer component={Paper} className={styles.tableContainer}>
                <Table className={styles.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => navigate(`/users/${user.id}`)}
                                    >
                                        View Details
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(user.id)}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className={styles.cardsContainer}>
                {visibleUsers.map((user) => (
                    <div key={user.id} className={styles.card}>
                        <h4>{user.name}</h4>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate(`/users/${user.id}`)}
                        >
                            View Details
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDelete(user.id)}
                        >
                            Delete
                        </Button>
                    </div>
                ))}
            </div>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Add New User</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Username"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Phone"
                        value={newUser.phone}
                        onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddUser} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserTable;
