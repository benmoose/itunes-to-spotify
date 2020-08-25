import { combineReducers } from 'redux'

import authReducer from './authReducer'
import dbReducer from './dbReducer'
import searchReducer from './searchReducer'
import uploadReducer from './uploadReducer'

export default combineReducers({
  auth: authReducer,
  db: dbReducer,
  search: searchReducer,
  upload: uploadReducer,
})
