import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { LoggedUser } from '../../../model/Model';
import axios from 'axios';
import { BASE_URL, LOGIN, LOGIN_URL } from '../../../utils/httpConstants';

interface LoggedUserState {
  loggedUser: LoggedUser | null;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const loggedUserState: LoggedUserState = {
  loggedUser: null,
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk(
  'loggedUser/login',
  async (payload: { email: string; password: string }) => {
    const response = await axios
      .post(BASE_URL.concat(LOGIN), payload)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        // sessionStorage.setItem('isLogged', 'true');
        // console.log(response.data.loggedUser);
        // sessionStorage.setItem('userId', response.data.id);
        // sessionStorage.setItem('type', response.data.type);
        return response;
      });

    return response.data;
  },
);

const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState: loggedUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.loggedUser = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(login.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error.message ?? 'Login failed';
      state.status = 'failed';
    });
  },
});

export default loggedUserSlice.reducer;
