import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, USER } from '../../../utils/httpConstants';
import { bearerToken } from '../../../authentication/authHeader';
import { User } from '../../../model/Model';

export const getUsers = createAsyncThunk(
  'user/getUsers',
  async ({
    offset = 0,
    userType = 'physician',
  }: {
    offset?: number;
    userType?: string;
  }) => {
    const responce = await axios.get(
      BASE_URL.concat(USER).concat(`?userType=${userType}`),
      { headers: bearerToken() },
    );
    return responce.data;
  },
);
