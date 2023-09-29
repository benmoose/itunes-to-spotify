import { createSlice } from '@reduxjs/toolkit'

import { SET_TRACKS, trackSearch } from '../actions/searchActions'

const initialState = {
  tracks: {}
}

const dbSlice = createSlice({
  name: 'db',
  initialState,
  reducers: {
    setTracks: (state, action) => {
      state.tracks.push(...action.payload)
    }
  }
})

export default dbSlice

// export default (state = getInitialState, action) => {
//   switch (action.type) {
//     case SET_TRACKS:
//       return {
//         ...state,
//         tracks: { ...state.tracks, ...action.payload.tracks }
//       }
//   }
//   return state
// }
