import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { spotify } from 'clients'
import { select } from 'store'
import { auth } from './'
console.log("profile auth = ", typeof auth, auth)

const initialState = {
  id: '',
  displayName: '',
  spotifyProfileUrl: '',
  fetching: false,
  error: null
}

const displayName = state => state?.profile?.displayName
const profileUrl = state => state?.profile?.spotifyProfileUrl
const fetching = state => state?.profile?.fetching

const getUserProfile = createAsyncThunk(
  'getUserProfile',
  (_, thunkAPI) => {
    const accessToken = select(auth.selectors.accessToken)

    return spotify.getProfile(accessToken)
  }
)

const actions = {
  getUserProfile
}

const selectors = {
  displayName,
  profileUrl,
  fetching
}

const slice = createSlice({
  name: 'profile',

  initialState,

  reducers: {},

  extraReducers: builder => {
    builder.addCase(getUserProfile.pending, (state = initialState, action) => {
      state.fetching = true
    })
    builder.addCase(getUserProfile.rejected, (state = initialState, action) => {
      state.error = action.payload
      state.fetching = false
    })
    builder.addCase(getUserProfile.fulfilled, (state = initialState, { payload }) => {
      state.displayName = payload.display_name
      state.id = payload.id
      state.fetching = false
      state.profileUrl = payload.external_urls?.spotify
    })
  }
})

export default {
  actions,
  selectors,
  slice,
}
