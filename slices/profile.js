import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as spotify from 'spotify'
import { selectors as authSelectors, actions as authActions } from './auth'
import { refreshTokens } from 'spotify'

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
  async (_, { getState, dispatch }) => {
    const accessToken = authSelectors.accessToken(getState())
    const refreshToken = authSelectors.refreshToken(getState())
    if (!accessToken) {
      throw Error('no access token')
    }
    if (!refreshToken) {
      throw Error('no refresh token')
    }

    return await spotify.profile({ accessToken, refreshToken })
      .catch((res) => {
        // if permission denied try once more after refreshing tokens.
        if (res.status === 401) {
          console.log('spotify api returned 401. refreshing auth tokens...')
          return dispatch(authActions.refreshAuthTokens())
            .unwrap()
            .then(() => spotify.profile({
              accessToken: authSelectors.accessToken(getState()),
              refreshToken: authSelectors.refreshToken(getState())
            }))
        }
        return Promise.reject(res)
      })
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
