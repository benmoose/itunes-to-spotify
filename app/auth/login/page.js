'use client'

import { redirect, useSearchParams } from 'next/navigation'

import ReduxProvider from '../../../store/redux-provider'
import { useAppDispatch, useAppSelector } from '../../../store'
import { setAccessToken, authenticatedAuthSelector } from '../../../slices/auth'

async function Login () {
  const dispatch = useAppDispatch()
  const params = useSearchParams()
  const authenticated = useAppSelector(authenticatedAuthSelector)

  if (authenticated) {
    redirect('/')
  }

  const code = params.get('code')
  if (!code) {
    return <p>No code param</p>
  }

  const state = params.get('state')
  if (!state.startsWith('moose:')) {
    return <p>No state param</p>
  }

  const auth = await fetch(`/api/spotify/token?code=${code}&state=${state}`)

  dispatch(setAccessToken(auth.access_token, auth.refresh_token, auth.expires_at))

  window.localStorage.setItem('auth:access', auth.access_token)
  window.localStorage.setItem('auth:refresh', auth.refresh_token)

  // await getUserProfile()

  redirect('/')
}

export default function LoginWrapper () {
  return (
    <ReduxProvider>
      <Login />
    </ReduxProvider>
  )
}
