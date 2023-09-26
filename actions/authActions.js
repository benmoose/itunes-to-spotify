const authPrefix = 'AUTH/'

export const SET_ACCESS_TOKEN = authPrefix + 'SET_ACCESS_TOKEN'
export const setAccessToken = (accessToken, refreshToken, expiresAt) => ({
  type: SET_ACCESS_TOKEN,
  payload: { accessToken, refreshToken, expiresAt }
})

export const GET_USER_PROFILE_REQUEST = authPrefix + 'GET_USER_PROFILE_REQUEST'
const getUserProfileRequest = () => ({
  type: GET_USER_PROFILE_REQUEST
})
export const GET_USER_PROFILE_SUCCESS = authPrefix + 'GET_USER_PROFILE_SUCCESS'
const getUserProfileSuccess = (data) => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: {
    id: data.id,
    username: data.display_name,
    profileUrl: data.external_urls.spotify
  }
})
export const GET_USER_PROFILE_FAILURE = authPrefix + 'GET_USER_PROFILE_FAILURE'
const getUserProfileFailure = (error) => {
  return {
    type: GET_USER_PROFILE_FAILURE,
    payload: { error }
  }
}
export const getUserProfile = () => {
  return (dispatch, getState) => {
    const accessToken = getAccessToken(getState())
    (getUserProfileRequest())
    return fetch(process.env.NEXT_PUBLIC_SPOTIFY_GET_USER_PROFILE_URL, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: 10 }
    })
      .then(res => dispatch(getUserProfileSuccess(res.data)))
      .catch(err => dispatch(getUserProfileFailure(err)))
  }
}

const getAccessToken = (state) => {
  return state.auth.accessToken
}
