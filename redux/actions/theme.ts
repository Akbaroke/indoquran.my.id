import ActionType from '../actionType'

export const setTheme = (mode?: string) => ({
  type: ActionType.SET_THEME,
  payload: {
    mode: mode,
  },
})
