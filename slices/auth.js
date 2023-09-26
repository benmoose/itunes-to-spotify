import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: '',
  refreshToken: '',
  expiresAt: null
}

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    setAccessToken: (state = initialState, action) => (
      { ...state, accessToken: action.payload }
    ),
    setRefreshToken: (state = initialState, action) => (
      { ...state, refreshToken: action.payload }
    ),
    setExpiresAt: (state = initialState, action) => (
      { ...state, expiresAt: action.payload }
    )
  }
})

const userAuthenticated = ({ auth }) => (
  auth?.accessToken &&
    Number.isSafeInteger(auth?.expiresAt) &&
    auth.expiresAt > Math.floor(Date.now() / 1000)
)
const accessToken = state => state?.auth?.accessToken
const refreshToken = state => state?.auth?.refreshToken

export default {
  slice: authSlice,
  selectors: {
    userAuthenticated,
    accessToken,
    refreshToken
  },
  actions: {}
}
