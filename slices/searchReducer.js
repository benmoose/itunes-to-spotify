import {
  TRACK_SEARCH_REQUEST,
  TRACK_SEARCH_SUCCESS,
  TRACK_SEARCH_FAILURE,
  SET_SELECTED_SEARCH_RESULT_TRACK
} from '../actions/searchActions'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case TRACK_SEARCH_REQUEST:
      return {
        ...state,
        [action.payload.trackID]: { isFetching: true }
      }

    case TRACK_SEARCH_SUCCESS:
      const { ...data } = action.payload
      return {
        ...state,
        [action.payload.trackID]: {
          ...data,
          isFetching: false
        }
      }

    case TRACK_SEARCH_FAILURE:
      const { error } = action.payload
      return {
        ...state,
        [action.payload.trackID]: {
          error,
          isFetching: false
        }
      }
    case SET_SELECTED_SEARCH_RESULT_TRACK:
      return {
        ...state,
        [action.payload.trackID]: {
          ...state[action.payload.trackID],
          selectedSearchResultID: action.payload.searchResultID
        }
      }
  }
  return state
}
