import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_USER_URL, LOGIN_URL } from '../../../utils/httpConstants';
import { User } from '../../../model/Model';

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

export const authFetchUserById = createAsyncThunk<User, string>(
  'auth/authFetchUserById',
  async (id) => {
    const response = await axios.get(`${BASE_USER_URL}${id}`);
    return response.data as User;
  },
);
