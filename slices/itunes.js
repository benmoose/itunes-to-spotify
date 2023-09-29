import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  playlistName: undefined,
  order: [],
  repo: {}
}

const playlistName = state => state?.playlistName
const tracksOrdered = state => state?.order?.map(id => state.repo[id])
const tracksById = state => state?.repo

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
  tracksOrdered: scoped(tracksOrdered),
  tracksById: scoped(tracksById)
}
