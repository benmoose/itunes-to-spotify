import { combineReducers } from 'redux'

import authReducer from './authReducer'
import playlistReducer from './playlistReducer'

export default combineReducers({
  auth: authReducer,
  playlist: playlistReducer,
})
