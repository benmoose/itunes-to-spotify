import * as auth from './auth'
import * as profile from './profile'

export const reducers = {
  [auth.name]: auth.reducer,
  [profile.name]: profile.reducer
}

export const initialState = {
  [auth.name]: auth.getInitialState(),
  [profile.name]: profile.getInitialState()
}
