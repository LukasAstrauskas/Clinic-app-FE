import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GroupedTimeslots, Timeslot } from '../../../model/Model';
import { RootState } from '../../reducers';
import {
  getTimeslots,
  deleteTimeslot,
  postTimeslot,
  deletePatientFromUpcomingTimeslot,
  cancelAppointment,
  bookTimeslot,
} from './timeslotActions';

interface TimeslotState {
  groupedTimeslots: GroupedTimeslots[];
  selectedTimeslot: Timeslot;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const emptyTimeslot = {
  id: '',
  physicianId: '',
  date: '',
  patientId: '',
};

const initialState: TimeslotState = {
  groupedTimeslots: [],
  selectedTimeslot: emptyTimeslot,
  status: 'idle',
  error: null,
};

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
        state.selectedTimeslot = emptyTimeslot;
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
      .addCase(cancelAppointment.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        const arr: GroupedTimeslots[] = state.groupedTimeslots.map(
          ({ date, timeslots }) => {
            return {
              date: date,
              timeslots: timeslots.map((timeslot) => {
                if (timeslot.id === action.payload) {
                  console.log(timeslot.id + ' ' + timeslot.physicianId);
                  const tstSlot = { ...timeslot, patientId: '' };
                  console.log(tstSlot.id + ' ' + tstSlot.physicianId);
                  return { ...timeslot, patientId: '' };
                } else {
                  return timeslot;
                }
              }),
            };
          },
        );
        state.groupedTimeslots = arr;
        state.status = 'succeeded';
        state.error = null;
        console.log(JSON.stringify(state.groupedTimeslots));
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to cancel appoinment.';
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

export const selectTimeslots = (state: RootState) =>
  state.timeslot.groupedTimeslots;

// export const selectTimeslots = (state: RootState) =>
//   selectTimeslotState(state).groupedTimeslots;

export default timeslotSlice.reducer;
