import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  spotifyProfileUrl: ''
}

const profile = createSlice({
  name: 'profile',

  initialState,

  reducers: {
    setUsername: (state, action) => (
      { ...state, username: action.payload }
    ),
    setProfileUrl: (state, action) => (
      { ...state, profileUrl: action.payload }
    )
  }
})

export const username = state => state?.profile?.username
export const profileUrl = state => state?.profile?.spotifyProfileUrl
export default profile
