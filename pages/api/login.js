import querystring from 'querystring'
import shortid from 'shortid'

const AUTH_URL = 'https://accounts.spotify.com/authorize'

export default async (req, res) => {
  const clientID = process.env.SPOTIFY_CLIENT_ID
  const redirectURI = process.env.SPOTIFY_REDIRECT_URI
  const state = `moose:${shortid.generate()}`
  const authURLRedirect = getSpotifyAuthURL({ clientID, redirectURI, state })

  res.statusCode = 301
  res.setHeader('Location', authURLRedirect)
  res.end()
}

function getSpotifyAuthURL ({ clientID, redirectURI, state }) {
  const params = {
    response_type: 'code',
    scope: 'playlist-modify-public',
    client_id: clientID,
    redirect_uri: redirectURI,
    state
  }
  return `${AUTH_URL}?${querystring.stringify(params)}`
}
