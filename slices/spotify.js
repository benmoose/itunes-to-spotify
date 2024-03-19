import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { selectors as authSelectors } from 'slices/auth'
import * as spotify from 'spotify'

function buildTrack (track = {}) {
  return {
    album: {},
    artists: [],
    durationMs: undefined,
    href: undefined,
    id: undefined,
    name: undefined,
    previewUrl: undefined,
    trackNumber: undefined,
    fetching: false,
    ...track
  }
}

function buildAlbum (artist = {}) {
  return {
    id: undefined,
    type: undefined,
    releaseDate: undefined,
    images: [],
    artists: [],
    ...artist
  }
}

function buildArtist (artist = {}) {
  return {
    id: undefined,
    name: undefined,
    images: [],
    ...artist
  }
}

const initialState = {
  fetching: {},
  trackRepo: {},
  albumRepo: {},
  artistRepo: {},
  order: []
}

const search = createAsyncThunk(
  'spotify/search',
  async ({ search, sourceTrackId }, { getState, fulfillWithValue, rejectWithValue }) => {
    const auth = authSelectors.auth(getState())
    const result = await spotify.search(auth, search)

    if (result.error) {
      return rejectWithValue(result, { sourceTrackId })
    }

    return fulfillWithValue(result, { sourceTrackId })
  }
)

export const slice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    reset: (state = initialState, action) => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state = initialState, action) => {
        state.fetching[action.meta.requestId] = true
        state.trackRepo[action.payload.sourceTrackId].fetching ||= action.meta.requestId
      })
      .addCase(search.rejected, (state = initialState, action) => {
        state.fetching[action.meta.requestId] = false
      })
      .addCase(search.fulfilled, (state = initialState, action) => {
        state.fetching[action.meta.requestId] = false
      })
  }
})

export const actions = {
  ...slice.actions,
  search
}

const loading = createSelector(
  [state => state[slice.name].fetching],
  (fetching) => Object.values(fetching).some(Boolean)
)

export const selectors = {
  loading
}
