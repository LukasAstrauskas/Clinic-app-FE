import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }) => {
    const response = await axios.post('http://localhost:8080/login', payload);
    return response.data;
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('isLogged');
  localStorage.removeItem('type');
});
