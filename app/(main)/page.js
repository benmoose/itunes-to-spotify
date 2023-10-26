'use client'

import { useDispatch, useSelector } from 'react-redux'
import { actions, selectors } from 'slices'
import Form from './form-components/form'

export default function Page () {
  const dispatch = useDispatch()
  const sources = useSelector(selectors.sources.sources)
  const handleFileInput = (event) => {
    dispatch(actions.sources.parse(event.currentTarget))
  }

  return <Form sources={sources} handleUpload={handleFileInput} />
}
