import { redirect } from 'next/navigation'
import querystring from 'querystring'
import shortid from 'shortid'

export async function GET () {
  const spotifyAuthURL = getSpotifyAuthURL({
    state: generateState()
  })

  return redirect(spotifyAuthURL)
}

const getSpotifyAuthURL = ({ state }) => {
  const params = {
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    redirect_uri: process.env.NEXT_PUBLIC_HOST_URL + process.env.NEXT_PUBLIC_SPOTIFY_AUTH_REDIRECT_URI,
    response_type: 'code',
    scope: 'playlist-modify-public',
    state
  }

  return `${process.env.NEXT_PUBLIC_SPOTIFY_AUTH_URL}?${querystring.stringify(params)}`
}

const generateState = () => `moose:${shortid.generate()}`
