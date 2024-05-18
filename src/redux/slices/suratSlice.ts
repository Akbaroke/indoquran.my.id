import { SuratSliceState } from '@/models/stateModel';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState: SuratSliceState = {
  status: null,
  data: [],
};

const fetchSurat = createAsyncThunk('api/surat', async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_1}/surat`);
  return data.data;
});

export const suratSlice = createSlice({
  name: 'surat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSurat.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSurat.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(fetchSurat.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export { fetchSurat };
export default suratSlice.reducer;
