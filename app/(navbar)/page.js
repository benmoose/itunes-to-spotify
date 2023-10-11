'use client'

import { useSelector } from 'react-redux'
import Papa from 'papaparse'
import { selectors } from 'slices'

export default function HomePage () {
  const authenticated = useSelector(selectors.auth.authenticated)

  if (!authenticated) {
    return null
  }

  const sourceTracks = useSelector(selectors.itunes.tracksOrdered)
  if (sourceTracks.length === 0) {
    return <p>Choose a playlist</p>
  }

  // Papaparse...
}
