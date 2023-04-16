import { combineReducers } from '@reduxjs/toolkit'
import reducerModal from './modal'
import reduceStore from './store'
import reducerTheme from './theme'

const rootReducer = combineReducers({
  modal: reducerModal,
  store: reduceStore,
  theme: reducerTheme,
})

export default rootReducer
