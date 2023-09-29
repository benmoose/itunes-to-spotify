import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'
import { reducers, initialState } from 'slices'
import storage from './storage'

const developmentEnv = process.env.NODE_ENV !== 'production'

const rootReducer = persistReducer(
  {
    key: 'root',
    debug: developmentEnv,
    storage
  }, combineReducers(reducers)
)

export default function configure () {
  const store = configureStore({
    devTools: developmentEnv,
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  })
  const persistor = persistStore(store)

  return { store, persistor }
}
