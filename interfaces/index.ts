export interface detailSurat {
  nomor: number
  nama: string
  namaLatin: string
  jumlahAyat: number
  tempatTurun: string
  arti: string
}

export interface ayatSurat {
  nomorAyat: number
  teksArab: string
  teksLatin: string
  teksIndonesia: string
  audio: Audio
}

export type Audio = {
  ['01']: string
  ['02']: string
  ['03']: string
  ['04']: string
  ['05']: string
}

export interface ListSurat {
  nomor: number
  namaLatin: string
  arti: string
}


export interface QueryParamsAyat {
  ayat?: string
}