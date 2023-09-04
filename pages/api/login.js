import querystring from 'querystring'
import shortid from 'shortid'

export default async (req, res) => {
  const state = `moose:${shortid.generate()}`
  const authURLRedirect = getSpotifyAuthURL(state)

  res.statusCode = 301
  res.setHeader('Location', authURLRedirect)
  res.end()
}

function getSpotifyAuthURL (state) {
  const params = {
    response_type: 'code',
    scope: 'playlist-modify-public',
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
    state
  }

  return `${process.env.NEXT_PUBLIC_SPOTIFY_AUTHORIZATION_URL}?${querystring.stringify(params)}`
}
