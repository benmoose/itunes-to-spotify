'use client'

import { redirect } from 'next/navigation'

import { authSelectors } from '../../../slices'
import { Provider, select } from '../../../store'
import { spotifyAuthUri } from './actions'

async function Login () {
  const authenticated = select(authSelectors.userAuthenticated)

  if (authenticated) {
    redirect('/')
  }

  const authUri = await spotifyAuthUri()
  console.log(`!! authURL = '${authUri}'`)

  redirect(authUri, 'push')
}

export default function LoginWrapper () {
  return (
    <Provider>
      <Login />
    </Provider>
  )
}
