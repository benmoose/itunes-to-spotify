import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import * as spotify from '../spotify'

const utcSecondsNow = () => {
  const now = new Date()
  const utcMillis = now.getTime() - (now.getTimezoneOffset() * 60 * 1000)
  return Math.ceil(utcMillis / 1000)
}

const initialState = {
  accessToken: undefined,
  refreshToken: undefined,
  scopes: undefined,
  expiryTime: undefined,
  fetching: undefined
}

const accessToken = state => state?.accessToken
const refreshToken = state => state?.refreshToken
const expiryTime = state => state?.expiryTime
const fetchingId = state => state?.fetching
const isFetching = state => state?.fetching !== undefined

const authenticated = (...args) => {
  return createSelector(
    [accessToken, expiryTime],
    (accessToken, expiryTime) => (
      typeof accessToken === 'string' && Number.isSafeInteger(expiryTime)
    )
  )(...args) && expiryTime(...args) > utcSecondsNow()
}

const fetchAuthTokens = createAsyncThunk(
  'auth/tokens',
  async ({ code }, { fulfillWithValue }) => {
    if (!code) {
      throw Error('fetchAuthTokens: no code')
    }

    const requestSentAt = utcSecondsNow()
    const tokens = await spotify.authTokens(code)

    return fulfillWithValue(tokens, { requestSentAt })
  }
)

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    destroy: (state, action) => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthTokens.pending, (state = initialState, { meta }) => {
        if (isFetching(state)) {
          return state
        }

        return { ...state, fetching: meta.requestId }
      })
      .addCase(fetchAuthTokens.rejected, (state = initialState, { error, meta }) => {
        if (fetchingId(state) !== meta.requestId) {
          return state
        }

        return { ...state, error: error.message, fetching: undefined }
      })
      .addCase(fetchAuthTokens.fulfilled, (state = initialState, { payload, meta }) => {
        if (fetchingId(state) !== meta.requestId) {
          return state
        }

        const { expiresIn, ...tokens } = payload
        const expiryTime = meta.requestSentAt + expiresIn
        return { ...state, ...tokens, expiryTime, fetching: undefined }
      })
  }
})

export const actions = {
  ...slice.actions,
  fetchAuthTokens
}

const scoped = selector => state => selector(state?.[slice.name])
export const selectors = {
  authenticated: scoped(authenticated),
  accessToken: scoped(accessToken),
  refreshToken: scoped(refreshToken),
  isFetching: scoped(isFetching)
}

export const { name, reducer, getInitialState } = slice
