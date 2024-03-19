import { redirect } from 'next/navigation'
import * as spotify from 'spotify'

export default async function LoginPage () {
  const authUrl = await spotify.userAuthorizationUrl()
  redirect(authUrl)
}
