import type { Action } from '@reduxjs/toolkit';
import type { ThunkAction } from 'redux-thunk';
import { RootState } from './reducers';
import store from './store';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;
export type { RootState };
