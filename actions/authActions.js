import axios from 'axios'

const authPrefix = "AUTH/"

export const GET_USER_PROFILE_REQUEST = authPrefix + "GET_USER_PROFILE_REQUEST"
const getUserProfileRequest = () => {
  return {
    type: GET_USER_PROFILE_REQUEST,
  }
}
export const GET_USER_PROFILE_SUCCESS = authPrefix + "GET_USER_PROFILE_SUCCESS"
const getUserProfileSuccess = () => {
  return {
    type: GET_USER_PROFILE_SUCCESS,
    payload: {

    }
  }
}
export const GET_USER_PROFILE_FAILURE = authPrefix + "GET_USER_PROFILE_FAILURE"
const getUserProfileFailure = (error) => {
  return {
    type: GET_USER_PROFILE_FAILURE,
    payload: {error},
  }
}

export const getUserProfile = (accessToken) => {
  return dispatch => {
    dispatch(getUserProfileRequest())
    axios.post()
  }
}
