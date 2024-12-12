// src/components/UserTable.tsx
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

    const [users, setUsers] = useState<User[]>([]); // Estado local para usuarios
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // Estado para usuarios filtrados
    const [searchTerm, setSearchTerm] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    // Estado para el nuevo usuario
    const [newUser, setNewUser] = useState<User>({
        id: 0, // Esto se sobrescribirá al agregar
        name: '',
        email: '',
        username: '',
        phone: '',
    });

    // Obtener usuarios de la API al montar el componente
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                setUsers(response.data); // Guardar usuarios en el estado local
                setFilteredUsers(response.data); // Inicializar usuarios filtrados
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    // Actualizar usuarios filtrados cuando cambia el término de búsqueda o la lista de usuarios
    useEffect(() => {
        setFilteredUsers(
            users.filter(
                (user) =>
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, users]);

    const handleDelete = (id: number) => {
        setUsers(users.filter((user) => user.id !== id)); // Eliminar usuario localmente
    };

    const handleAddUser = () => {
        if (newUser.name && newUser.email && newUser.username && newUser.phone) {
            const id = users.length > 0 ? users[users.length - 1].id + 1 : 1; // Generar un ID único
            const userToAdd: User = { ...newUser, id }; // Crear usuario con el tipo `User`
            setUsers([...users, userToAdd]); // Agregar nuevo usuario a la lista local
            setNewUser({ id: 0, name: '', email: '', username: '', phone: '' }); // Resetear el formulario
            setOpenDialog(false);
        }
    };

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

            {/* Botón para agregar un usuario */}
            <Box display="flex" justifyContent="center" marginBottom="1rem">
                <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
                    Add User
                </Button>
            </Box>

            {/* Tabla de usuarios */}
            <TableContainer component={Paper}>
                <Table>
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
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
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
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No users found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialogo para agregar un nuevo usuario */}
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
