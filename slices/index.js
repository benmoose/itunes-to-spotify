import * as auth from './auth'
import * as profile from './profile'
import * as itunes from './itunes'

console.log(auth.name, profile.name)

const reduceSlices = (fn) => [auth, profile, itunes].reduce(
  (acc, mod) => ({ ...acc, [mod.name]: fn(mod) }), {}
)

export const actions = reduceSlices(slice => slice.actions)
export const initialState = reduceSlices(slice => slice.initialState)
export const reducers = reduceSlices(slice => slice.reducer)
export const selectors = reduceSlices(slice => slice.selectors)
