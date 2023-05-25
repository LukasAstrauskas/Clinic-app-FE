import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CreateUserDto, UniversalUser, User } from '../../../model/Model';
import {
  ADMINS_URL,
  ADMIN_SEARCH_URL,
  BASE_ADMINS_URL,
  INCOMING_ADMINS_TO_BE_RENDERED_URL,
} from '../../../utils/httpConstants';
import axios from 'axios';
import { RootState } from '../../reducers';
interface AdminState {
  admins: UniversalUser[];
  isLoading: boolean;
  error: string | null;
}
import authHeader from '../../../authentication/authHeader';

const initialState: AdminState = {
  admins: [],
  isLoading: false,
  error: null,
};

export const createAdmin = createAsyncThunk(
  'user/createAdmin',
  async (requestData: CreateUserDto) => {
    const response = await axios.post(`${ADMINS_URL}`, requestData, {
      headers: authHeader(),
    });
    return response.data;
  },
);

export const fetchAdmins = createAsyncThunk<User[]>(
  'user/fetchAdmins',
  async () => {
    const response = await axios.get<User[]>(ADMINS_URL, {
      headers: authHeader(),
    });
    return response.data;
  },
);

export const resetAdminData = createAsyncThunk(
  'user/reset-admins',
  async () => {
    return [];
  },
);

export const fetchMoreAdmins = createAsyncThunk(
  'user/fetchMoreAdmins',
  async (offset: number) => {
    const response = await axios.get<UniversalUser[]>(
      INCOMING_ADMINS_TO_BE_RENDERED_URL + offset,
      {
        headers: authHeader(),
      },
    );
    return response.data;
  },
);

export const deleteAdmin = createAsyncThunk(
  'user/deleteAdmin',
  async (id: string) => {
    const response = await axios.delete<UniversalUser[]>(BASE_ADMINS_URL + id, {
      headers: authHeader(),
    });
    return response.data;
  },
);

export const searchAdmin = createAsyncThunk(
  'user/searchAdmin',
  async (search: string) => {
    const response = await axios.get(ADMIN_SEARCH_URL + search, {
      headers: authHeader(),
    });
    return response.data;
  },
);

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAdmin.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.admins.push(action.payload);
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchAdmins.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchAdmins.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.isLoading = false;
          state.admins = action.payload;
        },
      )
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(deleteAdmin.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchMoreAdmins.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(
        fetchMoreAdmins.fulfilled,
        (state, action: PayloadAction<UniversalUser[]>) => {
          state.isLoading = false;
          state.admins = [...state.admins, ...action.payload];
        },
      )
      .addCase(fetchMoreAdmins.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(searchAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admins = action.payload;
      })
      .addCase(searchAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(resetAdminData.fulfilled, (state, action) => {
        state.admins = action.payload;
      });
  },
});

export const selectAdmin = (state: RootState) => state.admin.admins;

export default adminSlice.reducer;
