import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, USER } from '../../../utils/httpConstants';
import { bearerToken } from '../../../authentication/authHeader';
import { PHYSICIAN } from '../../../utils/Users';

export const getUsers = createAsyncThunk(
  'user/getUsers',
  async ({
    offset = 0,
    userType = PHYSICIAN,
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
