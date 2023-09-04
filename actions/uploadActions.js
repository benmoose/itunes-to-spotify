const uploadPrefix = 'UPLOAD/'

export const SET_TRACKS = uploadPrefix + 'SET_TRACKS'
export const setTracks = (tracksByID) => ({
  type: SET_TRACKS,
  payload: tracksByID
})

export const SET_TRACK_ORDER = uploadPrefix + 'SET_TRACK_ORDER'
export const setTrackOrder = (trackIDs) => ({
  type: SET_TRACK_ORDER,
  payload: trackIDs
})
