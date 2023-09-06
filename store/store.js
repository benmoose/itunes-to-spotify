import { combineReducers } from 'redux'
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from './storage'
import { configureStore } from '@reduxjs/toolkit'
import { auth, profile } from '../slices'

const combineSlices = (...slices) => combineReducers(
  slices.reduce((reducer, slice) => ({
    [slice.name.toString()]: persistReducer({ key: `${slice.name}.state`, storage }, slice.reducer)
  }), {})
)

export default configureStore({
  reducer: combineSlices(auth, profile),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})
