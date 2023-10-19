import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { LoggedUser } from '../../../model/Model';
import axios from 'axios';
import { BASE_URL, LOGIN } from '../../../utils/httpConstants';
import { RootState } from '../../reducers';

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

export const userLogin = createAsyncThunk(
  'loggedUser/login',
  async (payload: { email: string; password: string }) => {
    const response = await axios
      .post(BASE_URL.concat(LOGIN), payload)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
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
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loggedUser = action.payload.loggedUser;
      state.status = 'succeeded';
    });
    builder.addCase(userLogin.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.error = action.error.message ?? 'Login failed';
      state.status = 'failed';
    });
  },
});

export const selectLoggedUser = (state: RootState) =>
  state.loggedUser.loggedUser;
export const initials = (state: RootState) =>
  state.loggedUser.loggedUser?.initials;
export const selectLoggedUserType = (state: RootState) =>
  state.loggedUser.loggedUser?.type || '';

export const selectIsLogged = (state: RootState) =>
  !!state.loggedUser.loggedUser;
export default loggedUserSlice.reducer;
