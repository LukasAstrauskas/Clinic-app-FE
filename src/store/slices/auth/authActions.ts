import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../../model/Model';
import { BASE_USER_URL, LOGIN_URL } from '../../../utils/httpConstants';

import authHeader from '../../../authentication/authHeader';

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }) => {
    const response = await axios.post(LOGIN_URL, payload).then((response) => {
      localStorage.setItem('token', response.data.token);
      sessionStorage.setItem('isLogged', 'true');
      // console.log(response.data.loggedUser);
      // sessionStorage.setItem('userId', response.data.id);
      // sessionStorage.setItem('type', response.data.type);
      return response;
    });

    return response.data;
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('isLogged');
  sessionStorage.removeItem('type');
  sessionStorage.removeItem('name');
  sessionStorage.removeItem('userId');
  sessionStorage.removeItem('user');
});

export const authFetchUserById = createAsyncThunk<User, string>(
  'auth/authFetchUserById',
  async (id) => {
    const user: User = await axios
      .get(`${BASE_USER_URL}${id}`, {
        headers: authHeader(),
      })
      .then((response) => {
        sessionStorage.setItem('name', response.data.name);
        sessionStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      });
    return user;
  },
);
