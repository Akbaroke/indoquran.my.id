export default interface SuratModel {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: {
    [index in AudioIndexType]: string;
  };
  ayat: AyatModel[];
  suratSelanjutnya?: SuratNextPrevModel;
  suratSebelumnya?: SuratNextPrevModel;
}

export interface TafsirModel {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: {
    [index in AudioIndexType]: string;
  };
  tafsir: {
    ayat: number;
    teks: string;
  }[];
}

export interface AyatModel {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: {
    [index in AudioIndexType]: string;
  };
}

export interface SuratNextPrevModel {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
}

export type AudioIndexType = '01' | '02' | '03' | '04' | '05';
