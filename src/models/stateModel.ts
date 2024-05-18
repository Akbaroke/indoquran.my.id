import SuratModel, { AudioIndexType } from './suratModel';

type Status = 'loading' | 'success' | 'error' | null;

export interface StoreModel {
  surat: SuratSliceState;
  bookmark: BookmarkSliceState;
  adzan: AdzanSliceState;
}

export interface SuratSliceState {
  status: Status;
  data: SuratModel[];
}

export interface BookmarkSliceState {
  ayat: BookmarkAyat[];
  doa: BookmarkDoa[];
  hadits: BookmarkHadits[];
  adzan: BookmarkAzan;
  qori: AudioIndexType;
}

export type StatusAdzan = 'waiting' | 'adzan' | 'already';
export type AdzanTimeType = {
  name: string;
  time: string;
};

export interface AdzanSliceState {
  currentTime: string;
  nextAdzan: AdzanTimeType;
  prevAdzan: AdzanTimeType;
  percentage: number;
  status: StatusAdzan;
  location: string;
}

export interface BookmarkAyat {
  id: string;
  arab: string;
  latin: string;
  arti: string;
  link: string;
  time?: Date
}

export interface BookmarkDoa {
  id: string;
  judul: string;
  arab: string;
  arti: string;
  link: string;
  time?: Date;
}

export interface BookmarkHadits {
  id: string;
  arab: string;
  arti: string;
  link: string;
  time?: Date;
}

export interface BookmarkAzan {
  irama: string;
  isPlaying: boolean;
  volume: number;
}

export interface JadwalSholatSliceState {
  status: Status;
  upComming: {
    name: string;
    time: string;
  };
}
