'use client'

import { useDispatch, useSelector } from 'react-redux'
import { actions, selectors } from 'slices'
import Form from './form-components/form'

export default function Page () {
  const dispatch = useDispatch()
  const sources = useSelector(selectors.sources.sources)
  const loading = useSelector(selectors.spotify.loading)

  const handleReset = (event) => {
    event.preventDefault()
    dispatch(actions.spotify.reset())
    dispatch(actions.sources.reset())
  }

  const handleFileInput = (event) => {
    dispatch(actions.sources.parse(event.currentTarget))
      .unwrap()
      .then(sources => Object.values(sources).flatMap(source => source.order.map(id => source.tracks[id])))
      .then(tracks => tracks.forEach(track => dispatch(actions.spotify.search({
        search: [track.name, track.artist].join(' '),
        sourceTrackId: track.id
      }))))
  }

  return <Form loading={loading} sources={sources} handleUpload={handleFileInput} handleReset={handleReset} />
}
