import * as spotify from 'spotify'
import SuccessRedirect from './success-redirect'

export default async function LoginCallbackPage ({ searchParams }) {
  const { code } = searchParams

  const tokens = await spotify.accountsAuth(code)
  const profile = await spotify.profile(tokens)

  return <SuccessRedirect auth={tokens} profile={profile} />
}
