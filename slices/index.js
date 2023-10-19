import * as auth from './auth'
import * as profile from './profile'
import * as sources from 'slices/sources'

const combineModules = (fn) => [auth, profile, sources].reduce(
  (acc, mod) => ({ ...acc, [mod.slice.name]: fn(mod) }), {}
)

export const actions = combineModules(mod => mod.actions)
export const initialState = combineModules(mod => mod.slice.getInitialState())
export const reducers = combineModules(mod => mod.slice.reducer)
export const selectors = combineModules(mod => mod.selectors)
