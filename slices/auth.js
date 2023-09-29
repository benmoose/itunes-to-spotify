import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: '',
  refreshToken: '',
  scopes: '',
  expiresAt: undefined,
  fetching: false,
}

const accessToken = state => state?.auth?.accessToken
const refreshToken = state => state?.auth?.refreshToken
const expiresAt = state => state?.auth?.expiresAt
const fetching = state => state?.auth?.fetching

const authenticated = createSelector(
  [accessToken, expiresAt],
  (accessToken, expiresAt) => (
    accessToken && Number.isSafeInteger(expiresAt) && expiresAt > new Date().getTime()
  )
)

const fetchAuthTokens = createAsyncThunk(
  'auth/authTokens',
  ({ code, state }, { fulfillWithValue }) => {
    const requestedAt = new Date().getTime()
    return fetch(`/api/spotify/token?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`)
      .then(res => res.json())
      .then(data => fulfillWithValue(data, { requestedAt }))
  }
)

export const actions = {
  fetchAuthTokens
}

export const selectors = {
  authenticated,
  accessToken,
  refreshToken,
  expiresAt,
  fetching
}

export const { name, reducer, getInitialState } = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAuthTokens.pending, (state = initialState, action) => {
        return { ...state, fetching: true }
      })
    builder.addCase(fetchAuthTokens.rejected, (state = initialState, { payload }) => {
      return { ...state, fetching: false, error: payload }
    })
    builder.addCase(fetchAuthTokens.fulfilled, (state = initialState, { payload, meta }) => {
      const { accessToken, refreshToken, scopes, expiresIn } = action.payload
      const expiryTime = meta.requestedAt + expiresIn

      return { ...state, accessToken, refreshToken, scopes, expiryTime }
    })
  }
})
