import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
  playlistName: undefined,
  order: [],
  repo: {}
}

const playlistName = state => state?.playlistName
const order = state => state?.order
const repo = state => state?.repo

export const { name, actions, reducer, getInitialState } = createSlice({
  name: 'itunes',
  initialState,
  reducers: {
    setTracks: (state, action) => ({ ...state, repo: action.payload }),
    setTrackOrder: (state, action) => ({ ...state, order: action.payload }),
    setPlaylistName: (state, action) => ({ ...state, playlistName: action.payload })
  }
})

const scoped = selector => state => selector(state?.[name])

export const selectors = {
  playlistName: scoped(playlistName),
  tracksById: scoped(repo),
  tracksOrdered: createSelector([scoped(order), scoped(repo)], (order, repo) => order.map(id => repo[id]))
}
