import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'

import { slices } from '../slices'
import storage from './storage'

const developmentEnv = process.env.NODE_ENV !== 'production'

const rootReducer = (...slices) => {
  const rootConfig = { key: 'root', debug: developmentEnv, storage }
  const reducers = combineReducers(
    slices.reduce((reducers, slice) => ({ ...reducers, [slice.name]: slice.reducer }), {})
  )

  return persistReducer(rootConfig, reducers)
}

export const store = configureStore({
  reducer: rootReducer(...slices),
  devTools: developmentEnv,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }),
  preloadedState: slices.reduce((state, slice) => ({ ...state, [slice.name]: slice.getInitialState() }))
})

export const persistor = persistStore(store)
