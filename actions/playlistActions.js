// import axios from 'axios'
//
// const SPOTIFY_TRACK_SEARCH_ENDPOINT = userID => `https://api.spotify.com/v1/users/${userID}/playlists`
// const SPOTIFY_ADD_TRACKS_ENDPOINT = playlistID => `https://api.spotify.com/v1/playlists/${playlistID}/tracks`
// const playlistPrefix = 'PLAYLIST/'
//
// export const CREATE_PLAYLIST_REQUEST = playlistPrefix + 'CREATE_PLAYLIST_REQUEST'
// const createPlaylistRequest = () => ({ type: CREATE_PLAYLIST_REQUEST })
// export const CREATE_PLAYLIST_SUCCESS = playlistPrefix + 'CREATE_PLAYLIST_SUCCESS'
// const createPlaylistSuccess = (payload) => ({
//   type: CREATE_PLAYLIST_SUCCESS,
//   payload
// })
// export const CREATE_PLAYLIST_FAILURE = playlistPrefix + 'CREATE_PLAYLIST_FAILURE'
// const createPlaylistFailure = (payload) => ({
//   type: CREATE_PLAYLIST_FAILURE,
//   payload
// })
// export const createPlaylist = ({ name, description, trackURIs }) => {
//   return (dispatch, getState) => {
//     dispatch(createPlaylistRequest())
//     const accessToken = getAccessToken(getState())
//     const username = getUsername(getState())
//     return axios.post(SPOTIFY_TRACK_SEARCH_ENDPOINT(username), {
//       name,
//       description
//     }, {
//       headers: { Authorization: `Bearer ${accessToken}` }
//     })
//       .then(res => {
//         dispatch(createPlaylistSuccess(res.data))
//         dispatch(addTracksToPlaylist(res.data.id, trackURIs))
//         return res.data
//       })
//       .catch(err => dispatch(createPlaylistFailure(err)))
//   }
// }
//
// export const ADD_TRACKS_TO_PLAYLIST_REQUEST = playlistPrefix + 'ADD_TRACKS_TO_PLAYLIST_REQUEST'
// export const addTrackToPlaylistRequest = () => ({
//   type: ADD_TRACKS_TO_PLAYLIST_REQUEST
// })
// export const ADD_TRACKS_TO_PLAYLIST_SUCCESS = playlistPrefix + 'ADD_TRACKS_TO_PLAYLIST_SUCCESS'
// export const addTrackToPlaylistSuccess = (payload) => ({
//   type: ADD_TRACKS_TO_PLAYLIST_SUCCESS,
//   payload
// })
// export const ADD_TRACKS_TO_PLAYLIST_FAILURE = playlistPrefix + 'ADD_TRACKS_TO_PLAYLIST_FAILURE'
// export const addTrackToPlaylistFailure = (payload) => ({
//   type: ADD_TRACKS_TO_PLAYLIST_FAILURE,
//   payload
// })
// const addTracksToPlaylist = (playlistID, trackURIs) => {
//   return (dispatch, getState) => {
//     dispatch(addTrackToPlaylistRequest())
//     const accessToken = getAccessToken(getState())
//     return axios.post(SPOTIFY_ADD_TRACKS_ENDPOINT(playlistID), {
//       uris: trackURIs
//     }, {
//       headers: { Authorization: `Bearer ${accessToken}` }
//     })
//       .then(res => dispatch(addTrackToPlaylistSuccess(res.data)))
//       .catch(err => dispatch(addTrackToPlaylistFailure(err)))
//   }
// }
//
// export const SET_PLAYLIST_NAME = playlistPrefix + 'SET_PLAYLIST_NAME'
// export const setPlaylistName = (payload) => ({
//   type: SET_PLAYLIST_NAME,
//   payload
// })
//
// const getAccessToken = (state) => {
//   return state.auth.accessToken
// }
//
// const getUsername = (state) => {
//   return state.auth.id
// }
