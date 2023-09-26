import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { spotify } from '../clients'
import { authSelectors } from './'

const initialState = {
  id: '',
  username: '',
  displayName: '',
  spotifyProfileUrl: '',

  loading: false
}

const getUserProfile = createAsyncThunk(
  'userProfile',
  async (_, { getState }) => {
    const accessToken = authSelectors.accessToken(getState())

    const profile = await spotify.getProfile(accessToken)

    if (profile.type !== 'user') {
      thunkApi.rejectWithValue(new Error(`user profile response type is '${data?.type}' not 'user'`))
    }

    return data
  }
)

const profile = createSlice({
  name: 'profile',

  initialState,

  reducers: {
    setDisplayName: (state, action) => (
      { ...state, username: action.payload, displayName: action.payload }
    ),
    setProfileUrl: (state, action) => (
      { ...state, profileUrl: action.payload }
    )
  },

  extraReducers: (builder) => {
    builder.addCase(getUserProfile.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.loading = false
    })
    builder.addCase(getUserProfile.fulfilled, (state, { payload }) => {
      state.displayName ||= payload.display_name
      state.id ||= payload.id
      state.profileUrl ||= payload.external_urls?.spotify
      state.username ||= payload.display_name
      state.loading = false
    })
  }
})

export const displayName = state => state?.profile?.displayName
export const profileUrl = state => state?.profile?.spotifyProfileUrl
export const username = state => state?.profile?.username
export default profile
