import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: '',
  refreshToken: '',
  expiresAt: null
}

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    setAccessToken: (state, action) => (
      { ...state, accessToken: action.payload }
    ),
    setRefreshToken: (state, action) => (
      { ...state, refreshToken: action.payload }
    ),
    setExpiresAt: (state, action) => (
      { ...state, expiresAt: action.payload }
    )
  }
})

export const userAuthenticated = ({ auth }) => (
  auth?.accessToken &&
    Number.isSafeInteger(auth?.expiresAt) &&
    auth.expiresAt > Math.floor(Date.now() / 1000)
)
export const accessToken = state => state?.auth?.accessToken
export const refreshToken = state => state?.auth?.refreshToken
export default authSlice
