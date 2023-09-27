import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'
import { auth, profile } from 'slices'
import storage from './storage'

const allSlices = [auth.slice, profile.slice]

const shouldDebug = process.env.NODE_ENV !== 'production'

const rootReducer = persistReducer(
  { key: 'root', debug: shouldDebug, storage },
  combineReducers(
    allSlices.reduce((reducers, slice) => ({ ...reducers, [slice.name]: slice.reducer }), {})
  )
)

export default () => {
  const store = configureStore({
    devTools: shouldDebug,
    reducer: rootReducer,
    preloadedState: allSlices.reduce((state, slice) => Object.assign(state, { [slice.name]: slice.getInitialState() }), {}),
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  })
  const persistor = persistStore(store)

  return { store, persistor }
}
