import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GroupedTimeslots, Timeslot } from '../../../model/Model';
import axios from 'axios';
import { RootState } from '../../reducers';
import {
  getTimeslots,
  deleteTimeslot,
  postTimeslot,
  deletePatientFromTimeslot,
  deletePatientFromUpcomingTimeslot,
} from './timeslotActions';
import authHeader from '../../../authentication/authHeader';

interface TimeslotState {
  groupedTimeslots: GroupedTimeslots[];
  selectedTimeslot: Timeslot;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TimeslotState = {
  groupedTimeslots: [],
  selectedTimeslot: {
    id: '',
    physicianId: '',
    date: '',
    patientId: '',
  },
  status: 'idle',
  error: null,
};

export const bookTimeslot = createAsyncThunk(
  'timeslot/bookTimeslot',
  async (appointment: Timeslot) => {
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
  reducers: {
    pickTimeslot(state, action: PayloadAction<Timeslot>) {
      const timeslot = action.payload;
      state.selectedTimeslot = { ...timeslot };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTimeslots.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getTimeslots.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.groupedTimeslots = action.payload;
      })
      .addCase(getTimeslots.rejected, (state, action) => {
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

export const { pickTimeslot } = timeslotSlice.actions;

export const selectTimeslotState = (state: RootState) => state.timeslot;
export const selectTimeslot = (state: RootState) =>
  state.timeslot.selectedTimeslot;

// export const selectTimeslots = (state: RootState) =>
//   selectTimeslotState(state).timeslots;

export const selectTimeslots = (state: RootState) =>
  selectTimeslotState(state).groupedTimeslots;

export default timeslotSlice.reducer;
