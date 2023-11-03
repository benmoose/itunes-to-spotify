import { createSlice, createSelector, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import Papa from 'papaparse'

const buildSource = (source = {}) => ({
  id: nanoid(),
  name: '',
  tracks: {},
  order: [],
  ...source
})

const buildSourceTrack = (track = {}) => ({
  id: nanoid(),
  name: '',
  album: '',
  year: '',
  artist: '',
  ...track
})

const initialState = {
  sources: {},
  order: [],
  loading: ''
}

const parse = createAsyncThunk(
  'sources/parse',
  (fileTarget, thunkApi) => {
    const promises = []

    for (const file of fileTarget.files) {
      const p = new Promise((resolve, reject) => {
        Papa.parse(file, {
          header: true,
          delimiter: '\t',
          transformHeader: header => header.toLowerCase(),
          complete: (results, file) => {
            const tracks = results.data.map(buildSourceTrack).filter(track => track.name && track.artist)
            const source = buildSource({
              name: file.name,
              order: tracks.map(track => track.id),
              tracks: tracks.reduce((acc, track) => ({ ...acc, [track.id]: track }), {})
            })
            resolve(source)
          },
          error: (error, file) => {
            reject(error)
          }
        })
      })

      promises.push(p)
    }

    return Promise.all(promises)
      .then((sources) => {
        const order = sources.map(source => source.id)
        thunkApi.dispatch(actions.setOrder(order))

        return sources.reduce((acc, source) => ({
          ...acc, [source.id]: source
        }), {})
      })
  }
)

export const slice = createSlice({
  name: 'sources',
  initialState,
  reducers: {
    setOrder: (state = initialState, action) => {
      return { ...state, order: action.payload }
    },
    reset: (state = initialState, action) => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(parse.pending, (state, action) => {
        return { ...state, loading: action.meta.requestId }
      })
      .addCase(parse.rejected, (state, action) => {
        return { ...state, loading: '' }
      })
      .addCase(parse.fulfilled, (state, action) => {
        return { ...state, sources: action.payload, loading: '' }
      })
  }
})

export const actions = {
  ...slice.actions,
  parse
}

const sources = createSelector(
  [state => state[slice.name].order, state => state[slice.name].sources],
  (order, sources) => {
    return order.filter(id => sources.hasOwnProperty(id)).map(id => sources[id])
  }
)

export const selectors = {
  sources
}
