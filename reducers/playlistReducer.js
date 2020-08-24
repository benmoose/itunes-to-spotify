import { TRACK_SEARCH_REQUEST, TRACK_SEARCH_SUCCESS, TRACK_SEARCH_FAILURE } from '../actions/playlistActions'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case TRACK_SEARCH_REQUEST:
      return {...state, [action.payload.trackID]: {isFetching: true}}

    case TRACK_SEARCH_SUCCESS:
      const { ...data } = action.payload
      return {...state, [action.payload.trackID]: {
        ...data,
        isFetching: false,
      }}

    case TRACK_SEARCH_FAILURE:
      const { error } = action.payload
      return {...state, [action.payload.trackID]: {
        error,
        isFetching: false,
      }}
  }
  return state
}
