import { SET_TRACKS } from '../actions/searchActions'

const defaultState = {
  tracks: {}
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_TRACKS:
      return {
        ...state,
        tracks: { ...state.tracks, ...action.payload.tracks }
      }
  }
  return state
}
