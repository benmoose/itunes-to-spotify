import { redirect } from 'next/navigation'
import * as spotify from 'spotify'

export default async function LoginPage () {
  const userRedirect = await spotify.userAuthorizationUrl()

  redirect(userRedirect)
}
