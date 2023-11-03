import * as auth from './auth'
import * as profile from './profile'
import * as sources from './sources'
import * as spotify from './spotify'

const combineModules = (fn) => [auth, profile, sources, spotify].reduce(
  (acc, mod) => ({ ...acc, [mod.slice.name]: fn(mod) }), {}
)

export const actions = combineModules(mod => mod.actions)
export const initialState = combineModules(mod => mod.slice.getInitialState())
export const reducers = combineModules(mod => mod.slice.reducer)
export const selectors = combineModules(mod => mod.selectors)
export const name = combineModules(mod => mod.name)
