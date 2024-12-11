// src/redux/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers } from '../services/api';

export const getUsers = createAsyncThunk('users/getUsers', fetchUsers);

const userSlice = createSlice({
    name: 'users',
    initialState: { data: [], loading: false, error: undefined as string | undefined },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export default userSlice.reducer;
