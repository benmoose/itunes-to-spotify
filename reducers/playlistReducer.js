import {
  CREATE_PLAYLIST_REQUEST,
  CREATE_PLAYLIST_SUCCESS,
  CREATE_PLAYLIST_FAILURE,
  ADD_TRACKS_TO_PLAYLIST_REQUEST,
  ADD_TRACKS_TO_PLAYLIST_SUCCESS,
  ADD_TRACKS_TO_PLAYLIST_FAILURE,
  SET_PLAYLIST_NAME
} from '../actions/playlistActions'

const initialState = {
  isFetching: false,
  playlistData: null,
  playlistName: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PLAYLIST_REQUEST:
      return { ...state, isFetching: true }
    case CREATE_PLAYLIST_SUCCESS:
      return { ...state, isFetching: false, playlistData: action.payload }
    case CREATE_PLAYLIST_FAILURE:
      return { ...state, isFetching: false }
    case ADD_TRACKS_TO_PLAYLIST_REQUEST:
      return { ...state, isFetching: true }
    case ADD_TRACKS_TO_PLAYLIST_SUCCESS:
      return { ...state, isFetching: false }
    case ADD_TRACKS_TO_PLAYLIST_FAILURE:
      return { ...state, isFetching: false }
    case SET_PLAYLIST_NAME:
      return { ...state, playlistName: action.payload }
  }
  return state
}
