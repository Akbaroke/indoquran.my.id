import { Like } from '@/interfaces'
import ActionType from '../actionType'

export const addLike = ({
  nomorSurat,
  nomorAyat,
  namaSurat,
  url,
  timestamp,
}: Like) => ({
  type: ActionType.ADD_LIKE,
  payload: {
    nomorSurat,
    nomorAyat,
    namaSurat,
    url,
    timestamp,
  },
})

export const removeLike = ({ nomorSurat, nomorAyat }: Like) => ({
  type: ActionType.REMOVE_LIKE,
  payload: {
    nomorSurat,
    nomorAyat,
  },
})

export const addBookmark = ({
  nomorSurat,
  nomorAyat,
  namaSurat,
  url,
  timestamp,
}: Like) => ({
  type: ActionType.ADD_BOOKMARK,
  payload: {
    nomorSurat,
    nomorAyat,
    namaSurat,
    url,
    timestamp,
  },
})

export const removeBookmark = () => ({
  type: ActionType.REMOVE_BOOKMARK,
})

export const restore = () => ({
  type: ActionType.RESTORE,
})
