import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore, createTransform } from 'redux-persist'
import { initialState, reducers, name } from 'slices'
import storage from './storage'

const devNodeEnv = process.env.NODE_ENV !== 'production'

const FetchingTransformer = createTransform(
  ({ fetchingId, ...state }, key) => state,
  state => state,
  { blacklist: [name.sources, name.spotify] }
)

const rootReducer = persistReducer(
  {
    key: 'root',
    storage,
    debug: devNodeEnv,
    transforms: [FetchingTransformer]
  },
  combineReducers(reducers)
)

export default function configure () {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
    devTools: devNodeEnv
  })
  const persistor = persistStore(store)

  return { store, persistor }
}
