import { combineReducers } from 'redux'

import authReducer from './authReducer'
import searchReducer from './searchReducer'
import dbReducer from './dbReducer'

export default combineReducers({
  auth: authReducer,
  search: searchReducer,
  db: dbReducer,
})
