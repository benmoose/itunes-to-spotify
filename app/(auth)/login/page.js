import { redirect } from 'next/navigation'
import { authUrl } from 'spotify'

export default async function LoginPage () {
  const url = await authUrl()

  redirect(url.href)
}
