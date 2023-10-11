import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as spotify from 'spotify'
import { selectors as authSelectors } from './auth'

const initialState = {
  id: undefined,
  displayName: '',
  spotifyProfileUrl: '',
  image: undefined,
  fetching: undefined
}

const hasProfile = state => !!state?.id
const displayName = state => state?.displayName
const profileUrl = state => state?.spotifyProfileUrl
const fetchingId = state => state?.fetching
const isFetching = state => state?.fetching !== undefined

const fetchProfile = createAsyncThunk(
  'profile/fetch',
  async (_, { getState }) => {
    const accessToken = authSelectors.accessToken(getState())
    if (!accessToken) {
      throw Error('no access token')
    }

    return await spotify.profile({ accessToken })
  }
)

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    destroy: (state, action) => {
      return initialState
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProfile.pending, (state = initialState, { meta }) => {
        if (isFetching(state)) {
          return state
        }

        return { ...state, fetching: meta.requestId }
      })
      .addCase(fetchProfile.rejected, (state = initialState, { error, meta }) => {
        if (fetchingId(state) !== meta.requestId) {
          return state
        }

        return { ...state, error: error.message, fetching: undefined }
      })
      .addCase(fetchProfile.fulfilled, (state = initialState, { payload, meta }) => {
        if (fetchingId(state) !== meta.requestId) {
          return state
        }

        return { ...state, ...payload, fetching: undefined }
      })
  }
})

export const actions = {
  ...slice.actions,
  fetchProfile
}

const scoped = selector => state => selector(state?.[slice.name])
export const selectors = {
  hasProfile: scoped(hasProfile),
  displayName: scoped(displayName),
  profileUrl: scoped(profileUrl),
  isFetching: scoped(isFetching)
}

export const { name, reducer, getInitialState } = slice
