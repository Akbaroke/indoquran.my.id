import { ActionStore, StateStore } from '@/interfaces'
import ActionType from '../actionType'
import Decrypt from '@/utils/Decrypt'

const initState: StateStore = {
  like: [],
  bookmark: null,
}

const reduceStore = (
  state: StateStore = initState,
  action: ActionStore
): StateStore => {
  switch (action.type) {
    case ActionType.ADD_LIKE:
      return {
        ...state,
        like: [
          ...state.like,
          {
            nomorSurat: action.payload.nomorSurat,
            nomorAyat: action.payload.nomorAyat,
            namaSurat: action.payload.namaSurat,
            url: action.payload.url,
            timestamp: action.payload.timestamp,
          },
        ],
      }
    case ActionType.REMOVE_LIKE:
      return {
        ...state,
        like: state.like.filter(
          data =>
            data.nomorSurat !== action.payload.namaSurat &&
            data.nomorAyat !== action.payload.nomorAyat
        ),
      }
    case ActionType.ADD_BOOKMARK:
      return {
        ...state,
        bookmark: {
          nomorSurat: action.payload.nomorSurat,
          nomorAyat: action.payload.nomorAyat,
          namaSurat: action.payload.namaSurat,
          url: action.payload.url,
          timestamp: action.payload.timestamp,
        },
      }
    case ActionType.REMOVE_BOOKMARK:
      return {
        ...state,
        bookmark: null,
      }
    case ActionType.RESTORE:
      const getData = localStorage.getItem('store')
      if (getData) {
        const result = Decrypt(getData)
        return result
      }
      return {
        like: [],
        bookmark: null,
      }
    default:
      return state
  }
}

export default reduceStore
