import { createSlice, createSelector, nanoid } from '@reduxjs/toolkit'

const buildSource = (source = {}) => ({
  id: nanoid(),
  name: '',
  tracks: {},
  order: [],
  ...source
})

const buildSourceTrack = (track = {}) => ({
  title: '',
  release: '',
  artists: [],
  year: null,
  ...track
})

const initialState = {
  sources: {},
  order: []
}

export const slice = createSlice({
  name: 'sources',
  initialState,
  reducers: {
    setSources: (state, action) => {
      const entities = action.payload.map(buildSource)
      const order = entities.map(source => source.id)
      const sources = entities.reduce((acc, source) => ({ ...acc, [source.id]: source }), {})
      return { ...state, sources, order }
    }
  }
})

const sources = createSelector(
  [state => state.sources.order, state => state.sources.sources],
  (order, sources) => order.map(id => sources[id]))

export const selectors = {
  sources
}
