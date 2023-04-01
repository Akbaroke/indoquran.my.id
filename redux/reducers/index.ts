import { combineReducers } from '@reduxjs/toolkit'
import reducerModal from './modal'

const rootReducer = combineReducers({
  modal: reducerModal,
})

export default rootReducer
