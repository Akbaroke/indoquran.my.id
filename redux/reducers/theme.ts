import { ActionTheme, StateTheme } from '@/interfaces'
import ActionType from '../actionType'

const initialState: StateTheme = {
  mode: 'light',
}

const reducerTheme = (
  state: StateTheme = initialState,
  action: ActionTheme
): StateTheme => {
  switch (action.type) {
    case ActionType.SET_THEME:
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload.mode)
      }
      return {
        mode: action.payload.mode,
      }
    default:
      return state
  }
}

export default reducerTheme
