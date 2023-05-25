import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Appointment, Timeslots } from '../../../model/Model';
import axios from 'axios';
import { RootState } from '../../types';
import {
  getTimeslot,
  deleteTimeslot,
  postTimeslot,
  deletePatientFromTimeslot,
  deletePatientFromUpcomingTimeslot,
} from './timeslotActions';
import authHeader from '../../../authentication/authHeader';

interface TimeslotState {
  timeslots: Timeslots[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TimeslotState = {
  timeslots: [],
  status: 'idle',
  error: null,
};

export const bookTimeslot = createAsyncThunk(
  'timeslot/bookTimeslot',
  async (appointment: Appointment) => {
    await axios
      .patch('http://localhost:8080/timeslot', appointment, {
        headers: authHeader(),
      })
      .catch((error) => {
        throw new Error(
          `You already have an appointment with this physician: ${error.message}`,
        );
      });
  },
);

export const timeslotSlice = createSlice({
  name: 'timeslot',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTimeslot.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        getTimeslot.fulfilled,
        (state, action: PayloadAction<Timeslots[]>) => {
          state.status = 'succeeded';
          state.timeslots = action.payload;
        },
      )
      .addCase(getTimeslot.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong.';
      })
      .addCase(bookTimeslot.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(bookTimeslot.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(bookTimeslot.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to book.';
      })
      .addCase(deleteTimeslot.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteTimeslot.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(deleteTimeslot.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to delete.';
      })
      .addCase(deletePatientFromUpcomingTimeslot.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deletePatientFromUpcomingTimeslot.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(deletePatientFromUpcomingTimeslot.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to delete.';
      })
      .addCase(deletePatientFromTimeslot.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deletePatientFromTimeslot.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(deletePatientFromTimeslot.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to delete.';
      })
      .addCase(postTimeslot.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(postTimeslot.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(postTimeslot.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to post.';
      });
  },
});

export const selectTimeslotState = (state: RootState) => state.timeslot;

export const selectTimeslots = (state: RootState) =>
  selectTimeslotState(state).timeslots;

export default timeslotSlice.reducer;
