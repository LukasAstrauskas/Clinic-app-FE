import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { LOGIN_URL } from '../../../utils/httpConstants';

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }) => {
    const response = await axios.post(LOGIN_URL, payload);
    return response.data;
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  sessionStorage.removeItem('isLogged');
  sessionStorage.removeItem('type');
});
