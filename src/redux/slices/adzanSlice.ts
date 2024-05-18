import {
  AdzanSliceState,
  AdzanTimeType,
  StatusAdzan,
} from '@/models/stateModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AdzanSliceState = {
  currentTime: '',
  nextAdzan: {
    name: '',
    time: '',
  },
  prevAdzan: {
    name: '',
    time: '',
  },
  percentage: 0,
  status: 'already',
  location: 'Kota Jakarta',
};

const adzanSlice = createSlice({
  name: 'countdown',
  initialState,
  reducers: {
    setRealTime: (state, action: PayloadAction<{ currentTime: string }>) => {
      state.currentTime = action.payload.currentTime;
    },
    setAdzan: (
      state,
      action: PayloadAction<{
        nextAdzan: AdzanTimeType;
        prevAdzan: AdzanTimeType;
      }>
    ) => {
      state.nextAdzan = action.payload.nextAdzan;
      state.prevAdzan = action.payload.prevAdzan;
      state.status = 'waiting';
    },
    setPercentage: (state, action: PayloadAction<{ percentage: number }>) => {
      state.percentage = action.payload.percentage;
    },
    setStatusAdzan: (state, action: PayloadAction<{ status: StatusAdzan }>) => {
      state.status = action.payload.status;
    },
    setLocationAdzan: (state, action: PayloadAction<{ location: string }>) => {
      state.location = action.payload.location;
    },
  },
});

export const {
  setRealTime,
  setAdzan,
  setPercentage,
  setStatusAdzan,
  setLocationAdzan,
} = adzanSlice.actions;

export default adzanSlice.reducer;
