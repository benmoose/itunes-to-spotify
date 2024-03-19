'use client'

import { redirect } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { actions } from 'slices'

export default function SuccessRedirect ({ auth, profile }) {
  const dispatch = useDispatch()

  dispatch(actions.auth.set(auth))
  dispatch(actions.profile.set(profile))

  redirect('/', 'replace')
}
