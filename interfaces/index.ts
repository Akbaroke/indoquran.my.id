import ActionType from '@/redux/actionType'

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

export interface ayatTafsir {
  ayat: number
  teks: string
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

export interface ActionModal {
  type: typeof ActionType.LOADING_OPEN
  payload: {
    message: string
  }
}
export interface ActionTheme {
  type: typeof ActionType.SET_THEME
  payload: {
    mode: string
  }
}
export interface ActionStore {
  type: typeof ActionType.ADD_LIKE
  payload: Like
}

export interface StateModal {
  isOpen: boolean
  type: string | null
  message: string | null
}

export interface StateStore {
  like: Like[]
  bookmark: Like | null
}
export interface StateTheme {
  mode: string
}

export interface Like {
  nomorSurat: number | undefined
  nomorAyat: number | undefined
  namaSurat?: string | undefined
  url?: string | undefined
  timestamp?: number | undefined
}

export interface RootState {
  modal: StateModal
  store: StateStore
  theme: StateTheme
}
