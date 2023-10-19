import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as spotify from 'spotify'
import { selectors as authSelectors, actions as authActions } from './auth'

const buildProfile = (user = {}) => ({
  id: '',
  displayName: '',
  profileUrl: '',
  imageUrl: ''
})

const initialState = {
  profile: null,
  fetchingId: ''
}

const profile = profile => profile?.profile
const id = profile => profile?.profile?.id
const displayName = profile => profile?.profile?.displayName
const profileUrl = profile => profile?.profile?.profileUrl
const imageUrl = profile => profile?.profile?.imageUrl
const fetchingId = profile => profile?.fetchingId
const isFetching = profile => !!fetchingId(profile)

export const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    destroy: (state = initialState, action) => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProfile.pending, (state = initialState, { meta }) => {
        if (isFetching(state)) {
          return state
        }

        return { ...state, fetchingId: meta.requestId }
      })
      .addCase(fetchProfile.rejected, (state = initialState, { meta }) => {
        if (fetchingId(state) !== meta.requestId) {
          return state
        }

        return { ...state, fetchingId: '' }
      })
      .addCase(fetchProfile.fulfilled, (state = initialState, { payload, meta }) => {
        if (fetchingId(state) !== meta.requestId) {
          return state
        }

        const profile = buildProfile({
          id: payload.id,
          displayName: payload.displayName,
          profileUrl: payload.profileUrl
        })

        return { ...state, fetchingId: '', profile }
      })
  }
})

const fetchProfile = createAsyncThunk(
  'profile/fetch',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const auth = authSelectors.auth(getState())

    if (!auth) {
      throw new Error('not authenticated')
    }

    const profile = await spotify.profile(auth)
      .then((res) => {
        if (res.error && res.status === 401) {
          console.log('>>> profile', 'refreshing tokens')
          return dispatch(authActions.refreshTokens())
            .then(() => spotify.profile(authSelectors.auth(getState())))
        }

        return res
      })

    if (profile.error) {
      rejectWithValue(profile)
    }

    return profile
  }
)

export const actions = {
  ...slice.actions,
  fetchProfile
}

const scoped = selector => state => selector(state[slice.name])
export const selectors = {
  profile: scoped(profile),
  id: scoped(id),
  displayName: scoped(displayName),
  profileUrl: scoped(profileUrl),
  isFetching: scoped(isFetching)
}
