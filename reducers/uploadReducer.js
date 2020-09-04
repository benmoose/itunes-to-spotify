import { SET_TRACKS, SET_TRACK_ORDER } from '../actions/uploadActions'

const initialState = {
  trackOrder: [],
  tracks: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TRACK_ORDER:
      return { ...state, trackOrder: action.payload }
    case SET_TRACKS:
      return {...state, tracks: action.payload}
  }
  return state
}
