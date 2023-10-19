import { createAsyncThunk, createSelector, createSlice, isFulfilled, isRejected, isPending } from '@reduxjs/toolkit'
import * as spotify from '../spotify'
import * as utils from '../utils'

const authEntity = (auth = {}) => ({
  accessToken: '',
  refreshToken: '',
  scopes: '',
  expiryTime: 0,
  lastRefreshed: 0,
  ...auth
})

const initialState = {
  auth: null,
  fetchingId: ''
}

const auth = auth => auth?.auth
const accessToken = auth => auth(auth)?.accessToken
const refreshToken = auth => auth(auth)?.refreshToken
const expiryTime = auth => auth(auth)?.expiryTime
const lastRefreshed = auth => auth(auth)?.lastRefreshed
const fetchingId = auth => auth?.fetchingId
const isFetching = auth => !!fetchingId(auth)

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    destroy: (state, action) => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(fetchTokens, refreshTokens), (state = initialState, { meta }) => {
        if (isFetching(state)) {
          return state
        }

        return { ...state, fetchingId: meta.requestId }
      })
      .addMatcher(isRejected(fetchTokens, refreshTokens), (state = initialState, { error, meta }) => {
        if (fetchingId(state) !== meta.requestId) {
          return state
        }

        return { ...state, fetchingId: '' }
      })
      .addMatcher(isFulfilled(fetchTokens, refreshTokens), (state = initialState, { payload, meta }) => {
        if (fetchingId(state) !== meta.requestId) {
          return state
        }

        const { expiresIn, ...tokens } = payload
        const auth = authEntity({
          ...tokens,
          expiryTime: meta.requestStart + expiresIn,
          lastRefreshed: utils.utcSecondsNow()
        })

        return { ...state, auth, fetchingId: '' }
      })
  }
})

const fetchTokens = createAsyncThunk(
  'auth/tokens',
  async (code, { fulfillWithValue }) => {
    if (!code) {
      throw Error('no code')
    }

    const requestStart = utils.utcSecondsNow()
    const tokens = await spotify.authTokens(code)
    return fulfillWithValue(tokens, { requestStart })
  }
)

const refreshTokens = createAsyncThunk(
  'auth/refresh',
  async (_, { getState, fulfillWithValue }) => {
    const refreshToken = selectors.refreshToken(getState())

    if (!refreshToken) {
      throw Error('no refresh token')
    }

    const requestStart = utils.utcSecondsNow()
    const tokens = await spotify.refreshTokens({ refreshToken })
    return fulfillWithValue(tokens, { requestStart })
  }
)

export const actions = {
  ...slice.actions,
  fetchTokens,
  refreshTokens
}

const scoped = selector => state => selector(state[slice.name])
export const selectors = {
  auth: scoped(auth),
  accessToken: scoped(accessToken),
  refreshToken: scoped(refreshToken),
  expiryTime: scoped(expiryTime),
  lastRefreshed: scoped(lastRefreshed),
  isFetching: scoped(isFetching)
}
