import ActionType from '../actionType'

export const modalLoading = (message?: string) => ({
  type: ActionType.LOADING_OPEN,
  payload: {
    message: message,
  },
})

export const modalSorry = () => ({
  type: ActionType.MESSAGE_SORRY,
})

export const unsetModal = () => ({
  type: ActionType.UNSET_MODAL,
})
