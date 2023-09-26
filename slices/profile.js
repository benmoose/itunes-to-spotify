import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { spotify } from '../clients'
import { auth } from './'

const initialState = {
  id: '',
  username: '',
  displayName: '',
  spotifyProfileUrl: '',
  fetching: false,
  error: null
}

const getUserProfile = createAsyncThunk(
  'userProfile',
  (_, { getState, rejectWithValue }) => {
    const accessToken = auth.selectors.accessToken(getState())

    return spotify.getProfile(accessToken)
  }
)

const profileSlice = createSlice({
  name: 'profile',

  initialState,

  reducers: {
    setDisplayName: (state = initialState, action) => (
      { ...state, username: action.payload, displayName: action.payload }
    ),
    setProfileUrl: (state = initialState, action) => (
      { ...state, profileUrl: action.payload }
    )
  },

  extraReducers: (builder) => {
    builder.addCase(getUserProfile.pending, (state = initialState, action) => {
      state.fetching = true
    })
    builder.addCase(getUserProfile.rejected, (state = initialState, { payload }) => {
      state.error = payload
      state.fetching = false
    })
    builder.addCase(getUserProfile.fulfilled, (state = initialState, { payload }) => {
      state.displayName ||= payload.display_name
      state.id ||= payload.id
      state.fetching = false
      state.profileUrl ||= payload.external_urls?.spotify
      state.username ||= payload.display_name
    })
  }
})

const displayName = state => state?.profile?.displayName
const profileUrl = state => state?.profile?.spotifyProfileUrl
const username = state => state?.profile?.username
const fetching = state => state?.profile?.fetching

export default {
  slice: profileSlice,
  selectors: {
    displayName,
    profileUrl,
    username
  },
  actions: {
    getUserProfile
  }
}