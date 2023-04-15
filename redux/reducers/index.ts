import { combineReducers } from '@reduxjs/toolkit'
import reducerModal from './modal'
import reduceStore from './store'

const rootReducer = combineReducers({
  modal: reducerModal,
  store: reduceStore,
})

export default rootReducer
