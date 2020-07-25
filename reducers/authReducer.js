import { SET_ACCESS_TOKEN, GET_USER_PROFILE_SUCCESS } from '../actions/authActions'

const initialState = {
  accessToken: "",
  refreshToken: "",
  expiresAt: null,
  username: "",
  profileUrl: "",
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {...state, ...action.payload}
    case GET_USER_PROFILE_SUCCESS:
      return {...state, ...action.payload}
  }
  return state
}
