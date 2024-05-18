import Decrypt from '@/helpers/Decrypt';
import Encrypt from '@/helpers/Encrypt';
import {
  BookmarkAyat,
  BookmarkDoa,
  BookmarkHadits,
  BookmarkSliceState,
} from '@/models/stateModel';
import { AudioIndexType } from '@/models/suratModel';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: BookmarkSliceState = {
  ayat: [],
  doa: [],
  hadits: [],
  adzan: {
    irama: 'jiharkah',
    isPlaying: false,
    volume: 10,
  },
  qori: '05',
};

export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    addBookmarkAyat: (state, action: PayloadAction<BookmarkAyat>) => {
      state.ayat = [
        ...state.ayat,
        {
          ...action.payload,
          time: new Date(),
        },
      ];
      saveInLocalStorage(state);
    },
    removeBookmarkAyat: (state, action: PayloadAction<{ id: string }>) => {
      state.ayat = state.ayat.filter(
        (item: { id: string }) => item.id !== action.payload.id
      );
      saveInLocalStorage(state);
    },
    deleteAllBookmarkAyat: (state) => {
      state.ayat = [];
      saveInLocalStorage(state);
    },

    addBookmarkDoa: (state, action: PayloadAction<BookmarkDoa>) => {
      state.doa = [
        ...state.doa,
        {
          ...action.payload,
          time: new Date(),
        },
      ];
      saveInLocalStorage(state);
    },
    removeBookmarkDoa: (state, action: PayloadAction<{ id: string }>) => {
      state.doa = state.doa.filter(
        (item: { id: string }) => item.id !== action.payload.id
      );
      saveInLocalStorage(state);
    },
    deleteAllBookmarkDoa: (state) => {
      state.doa = [];
      saveInLocalStorage(state);
    },

    addBookmarkHadits: (state, action: PayloadAction<BookmarkHadits>) => {
      state.hadits = [
        ...state.hadits,
        {
          ...action.payload,
          time: new Date(),
        },
      ];
      saveInLocalStorage(state);
    },
    removeBookmarkHadits: (state, action: PayloadAction<{ id: string }>) => {
      state.hadits = state.hadits.filter(
        (item: { id: string }) => item.id !== action.payload.id
      );
      saveInLocalStorage(state);
    },
    deleteAllBookmarkHadits: (state) => {
      state.hadits = [];
      saveInLocalStorage(state);
    },

    restoreBookmark: (state) => {
      const getData = localStorage.getItem('indoquran-store');
      if (getData) {
        state.ayat = Decrypt(getData).ayat;
        state.doa = Decrypt(getData).doa;
        state.hadits = Decrypt(getData).hadits;
        state.adzan = Decrypt(getData).adzan;
        state.qori = Decrypt(getData).qori;
      }
    },
    setBookmarkAdzan: (
      state,
      action: PayloadAction<{
        irama?: string;
        isPlaying?: boolean;
        volume?: number;
      }>
    ) => {
      state.adzan = {
        ...state.adzan,
        ...action.payload,
      };
      saveInLocalStorage(state);
    },
    setBookmarkQori: (
      state,
      action: PayloadAction<{
        qori: AudioIndexType;
      }>
    ) => {
      state.qori = action.payload.qori;
      saveInLocalStorage(state);
    },
  },
});

export const {
  addBookmarkAyat,
  removeBookmarkAyat,
  deleteAllBookmarkAyat,
  addBookmarkDoa,
  removeBookmarkDoa,
  deleteAllBookmarkDoa,
  restoreBookmark,
  setBookmarkAdzan,
  addBookmarkHadits,
  removeBookmarkHadits,
  deleteAllBookmarkHadits,
  setBookmarkQori,
} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;

export const saveInLocalStorage = (data: any) => {
  const result = Encrypt(data);
  localStorage.setItem('indoquran-store', result);
};
