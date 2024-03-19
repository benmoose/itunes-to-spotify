import { createAsyncThunk, createSelector, createSlice, isFulfilled, isRejected, isPending } from '@reduxjs/toolkit'
import * as spotify from '../spotify'
import * as utils from '../utils'

const scoped = selector => state => selector(state[slice.name])

const buildAuth = (auth = {}) => ({
  accessToken: '',
  refreshToken: '',
  scope: '',
  expiryTime: 0,
  lastRefreshed: utils.utcSecondsNow(),
  ...auth
})

const initialState = {
  auth: null,
  fetchingId: ''
}

const auth = local => local?.auth
const accessToken = local => auth(local)?.accessToken
const refreshToken = local => auth(local)?.refreshToken
const expiryTime = local => auth(local)?.expiryTime
const lastRefreshed = local => auth(local)?.lastRefreshed
const fetchingId = local => local?.fetchingId
const isFetching = local => !!fetchingId(local)

const fetch = createAsyncThunk(
  'auth/tokens',
  async ({ code }, { fulfillWithValue }) => {
    if (!code) {
      throw Error('no code')
    }

    const requestStart = utils.utcSecondsNow()
    const tokens = await spotify.accountsAuth(code)
    return fulfillWithValue(tokens, { requestStart })
  }
)

const refresh = createAsyncThunk(
  'auth/refresh',
  async (_, { getState, fulfillWithValue }) => {
    const { auth } = getState()
    const refreshToken = auth.auth.refreshToken

    if (!refreshToken) {
      throw Error('no refresh token')
    }

    const requestStart = utils.utcSecondsNow()
    const tokens = await spotify.accountsRefresh({ refreshToken })
    return fulfillWithValue(tokens, { requestStart })
  }
)

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    set: (state, action) => ({ ...state, auth: buildAuth(action.payload) }),
    destroy: (state, action) => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(fetch, refresh), (state = initialState, { meta }) => {
        if (isFetching(state)) {
          return state
        }

        return { ...state, fetchingId: meta.requestId }
      })
      .addMatcher(isRejected(fetch, refresh), (state = initialState, { error, meta }) => {
        if (fetchingId(state) !== meta.requestId) {
          return state
        }

        return { ...state, fetchingId: '' }
      })
      .addMatcher(isFulfilled(fetch, refresh), (state = initialState, { payload, meta }) => {
        if (fetchingId(state) !== meta.requestId) {
          return state
        }

        const { expiresIn, ...tokens } = payload
        const auth = buildAuth({
          ...tokens,
          expiryTime: meta.requestStart + expiresIn,
          lastRefreshed: utils.utcSecondsNow()
        })

        return { ...state, auth, fetchingId: '' }
      })
  }
})

export const actions = {
  ...slice.actions,
  fetch,
  refresh
}

export const selectors = {
  auth: scoped(auth),
  accessToken: scoped(accessToken),
  refreshToken: scoped(refreshToken),
  expiryTime: scoped(expiryTime),
  lastRefreshed: scoped(lastRefreshed),
  isFetching: scoped(isFetching)
}
