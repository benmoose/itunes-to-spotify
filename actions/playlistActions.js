import axios from 'axios'

const SPOTIFY_TRACK_SEARCH_ENDPOINT = "https://api.spotify.com/v1/search"
const playlistPrefix = "PLAYLIST/"

export const SET_ACCESS_TOKEN = playlistPrefix + "SET_ACCESS_TOKEN"
export const setAccessToken = (accessToken, refreshToken, expiresAt) => ({
  type: SET_ACCESS_TOKEN,
  payload: {accessToken, refreshToken, expiresAt},
})

export const TRACK_SEARCH_REQUEST = playlistPrefix + "TRACK_SEARCH_REQUEST"
const trackSearchRequest = (trackID) => ({
  type: TRACK_SEARCH_REQUEST,
  payload: {trackID},
})
export const TRACK_SEARCH_SUCCESS = playlistPrefix + "TRACK_SEARCH_SUCCESS"
const trackSearchSuccess = (trackID, data) => ({
  type: TRACK_SEARCH_SUCCESS,
  payload: {
    ...data,
    trackID,
  },
})
export const TRACK_SEARCH_FAILURE = playlistPrefix + "TRACK_SEARCH_FAILURE"
const trackSearchFailure = (trackID, error) => {
  return {
    type: TRACK_SEARCH_FAILURE,
    payload: {
      trackID,
      error,
    },
  }
}
export const trackSearch = (trackID, q) => {
  return (dispatch, getState) => {
    const accessToken = getAccessToken(getState())
    dispatch(trackSearchRequest(trackID))
    return axios.get(SPOTIFY_TRACK_SEARCH_ENDPOINT, {
      headers: { "Authorization": `Bearer ${accessToken}` },
      params: {
        q,
        type: "track",
      },
    })
      .then(res => dispatch(trackSearchSuccess(trackID, res.data)))
      .catch(err => dispatch(trackSearchFailure(trackID, err)))
  }
}

const getAccessToken = (state) => {
  return state.auth.accessToken
}
