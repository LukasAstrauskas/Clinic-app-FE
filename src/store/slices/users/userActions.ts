import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { bearerToken } from '../../../authentication/authHeader';
import { User } from '../../../model/Model';
import { BASE_URL, USER } from '../../../utils/httpConstants';

export const getUsers = createAsyncThunk(
  'user/getPatients',
  async ({
    offset = 0,
    search = '',
    occupationId,
    userType,
  }: {
    offset?: number;
    search?: string;
    occupationId?: string;
    userType: string;
  }) => {
    const params = new URLSearchParams();
    params.append('search', search);
    params.append('offset', offset.toString());
    params.append('userType', userType);
    if (occupationId) params.append('occupatioinId', occupationId);
    console.log(`${BASE_URL}${USER}?${params}`);
    const responce = await axios.get<User[]>(`${BASE_URL}${USER}?${params}`, {
      headers: bearerToken(),
    });
    return responce.data;
  },
);
