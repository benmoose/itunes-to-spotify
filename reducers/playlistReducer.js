import { CREATE_PLAYLIST_REQUEST } from '../actions/playlistActions'

const initialState = {
  isFetching: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PLAYLIST_REQUEST:
      return {...state, isFetching: true}
  }
  return state
}
