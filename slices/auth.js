import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
  timeNow: 0,
  accessToken: '',
  error: null,
  expiresAt: null,
  fetching: false,
  refreshToken: ''
}

const accessToken = state => state?.auth?.accessToken
const refreshToken = state => state?.auth?.refreshToken
const expiresAt = state => state?.auth?.expiresAt
const fetching = state => state?.auth?.fetching

const isUserAuthenticated = createSelector(
  accessToken,
  expiresAt,
  (accessToken, expiresAt) => typeof accessToken === 'string' && Number.isSafeInteger(expiresAt)
)

const getSpotifyAuthTokens = createAsyncThunk(
  'getAuthTokens',
  ({ code, state }, thunkAPI
  ) => {
    return fetch(`/api/spotify/token?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`)
      .then(res => res.json())
  }
)

const actions = {
  getSpotifyAuthTokens
}

const selectors = {
  isUserAuthenticated,
  accessToken,
  refreshToken,
  fetching
}

const slice = createSlice({
  name: 'auth',

  initialState,

  reducers: {},

  extraReducers: builder => {
    builder.addCase(getSpotifyAuthTokens.pending, (state = initialState, action) => {
      state.fetching = true
    })
    builder.addCase(getSpotifyAuthTokens.rejected, (state = initialState, { payload }) => {
      state.error = payload
      state.fetching = false
    })
    builder.addCase(getSpotifyAuthTokens.fulfilled, (state = initialState, action) => {
      state.fetching = false
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.expiresAt = action.payload.expiresAt
    })
  }
})

export default {
  actions,
  selectors,
  slice,
}
