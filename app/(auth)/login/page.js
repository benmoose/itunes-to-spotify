import { redirect } from 'next/navigation'
import { authUrl } from 'spotify'

export default async function LoginPage () {
  redirect(await authUrl())
}
