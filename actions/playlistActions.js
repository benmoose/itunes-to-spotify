import axios from 'axios'
import {normalize, schema} from 'normalizr'

const SPOTIFY_TRACK_SEARCH_ENDPOINT = userID => `https://api.spotify.com/v1/users/${userID}/playlists`
const playlistPrefix = "PLAYLIST/"

export const CREATE_PLAYLIST_REQUEST = playlistPrefix + "CREATE_PLAYLIST_REQUEST"
const createPlaylistRequest = () => ({type: CREATE_PLAYLIST_REQUEST})
export const CREATE_PLAYLIST_SUCCESS = playlistPrefix + "CREATE_PLAYLIST_SUCCESS"
const createPlaylistSuccess = (payload) => ({
  type: CREATE_PLAYLIST_SUCCESS,
  payload,
})
export const CREATE_PLAYLIST_FAILURE = playlistPrefix + "CREATE_PLAYLIST_FAILURE"
const createPlaylistFailure = (payload) => ({
  type: CREATE_PLAYLIST_FAILURE,
  payload,
})
export const createPlaylist = ({name, description}) => {
  return (dispatch, getState) => {
    dispatch(createPlaylistRequest())
    const accessToken = getAccessToken(getState())
    const username = getUsername(getState())
    return axios.post(SPOTIFY_TRACK_SEARCH_ENDPOINT(username), {
      name,
      description,
    }, {
      headers: { "Authorization": `Bearer ${accessToken}` },
    })
      .then(res => dispatch(createPlaylistSuccess(res.data)))
      .catch(err => dispatch(createPlaylistFailure(err)))
  }
}

const getAccessToken = (state) => {
  return state.auth.accessToken
}

const getUsername = (state) => {
  return state.auth.username
}
