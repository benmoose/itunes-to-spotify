import {
  CREATE_PLAYLIST_REQUEST,
  CREATE_PLAYLIST_SUCCESS,
  CREATE_PLAYLIST_FAILURE,
  ADD_TRACKS_TO_PLAYLIST_REQUEST,
  ADD_TRACKS_TO_PLAYLIST_SUCCESS,
  ADD_TRACKS_TO_PLAYLIST_FAILURE,
} from '../actions/playlistActions'

const initialState = {
  isFetching: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PLAYLIST_REQUEST:
      return {...state, isFetching: true}
    case CREATE_PLAYLIST_SUCCESS:
      return {...state, isFetching: false, ...action.payload}
    case CREATE_PLAYLIST_FAILURE:
      return {...state, isFetching: false}
    case ADD_TRACKS_TO_PLAYLIST_REQUEST:
      return {...state, isFetching: true}
    case ADD_TRACKS_TO_PLAYLIST_SUCCESS:
    case ADD_TRACKS_TO_PLAYLIST_FAILURE:
      return {...state, isFetching: false}
  }
  return state
}
