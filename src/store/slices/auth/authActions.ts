import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../../model/Model';
import { BASE_USER_URL, LOGIN_URL } from '../../../utils/httpConstants';

import authHeader from '../../../authentication/authHeader';

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }) => {
    const response = await axios.post(LOGIN_URL, payload);
    localStorage.setItem('token', JSON.stringify(response.data.token));
    sessionStorage.setItem('isLogged', 'true');
    sessionStorage.setItem('type', response.data.type);
    sessionStorage.setItem('userId', response.data.id);

    return response.data;
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('isLogged');
  sessionStorage.removeItem('type');
  sessionStorage.removeItem('name');
  sessionStorage.removeItem('userId');
});

export const authFetchUserById = createAsyncThunk<User, string>(
  'auth/authFetchUserById',
  async (id) => {
    const response = await axios.get(`${BASE_USER_URL}${id}`, {
      headers: authHeader(),
    });
    sessionStorage.setItem('name', response.data.name);

    return response.data as User;
  },
);
