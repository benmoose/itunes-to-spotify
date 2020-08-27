import { combineReducers } from 'redux'

import authReducer from './authReducer'
import dbReducer from './dbReducer'
import searchReducer from './searchReducer'
import uploadReducer from './uploadReducer'
import playlistReducer from './playlistReducer'

export default combineReducers({
  auth: authReducer,
  db: dbReducer,
  playlist: playlistReducer,
  search: searchReducer,
  upload: uploadReducer,
})
