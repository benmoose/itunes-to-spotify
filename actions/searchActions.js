import axios from 'axios'
import {normalize, schema} from 'normalizr'

const Track = new schema.Entity('track')

const SPOTIFY_TRACK_SEARCH_ENDPOINT = "https://api.spotify.com/v1/search"
const trackPrefix = "TRACK/"

export const TRACK_SEARCH_REQUEST = trackPrefix + "TRACK_SEARCH_REQUEST"
const trackSearchRequest = (trackID) => ({
  type: TRACK_SEARCH_REQUEST,
  payload: {trackID},
})
export const TRACK_SEARCH_SUCCESS = trackPrefix + "TRACK_SEARCH_SUCCESS"
const trackSearchSuccess = (trackID, searchResultIDs) => ({
  type: TRACK_SEARCH_SUCCESS,
  payload: {
    searchResultIDs,
    trackID,
  },
})
export const TRACK_SEARCH_FAILURE = trackPrefix + "TRACK_SEARCH_FAILURE"
const trackSearchFailure = (trackID, error) => {
  return {
    type: TRACK_SEARCH_FAILURE,
    payload: {
      trackID,
      error,
    },
  }
}
export const SET_TRACKS = trackPrefix + "SET_TRACKS"
const setTracks = (tracks) => ({
  type: SET_TRACKS,
  payload: { tracks }
})

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
      .then(res => res.data.tracks.items)
      .then(items => normalize(items, [Track]))
      .then(({ entities, result }) => {
        dispatch(trackSearchSuccess(trackID, result))
        if (entities.track) {
          dispatch(setTracks(entities.track))
        }
      })
      .catch(err => dispatch(trackSearchFailure(trackID, err)))
  }
}

const getAccessToken = (state) => {
  return state.auth.accessToken
}
