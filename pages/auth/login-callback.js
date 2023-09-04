import axios from 'axios'
import React from 'react'
import URL, { URLSearchParams } from 'url'
import qs from 'querystring'
import Router from 'next/router'
import { connect } from 'react-redux'

import { setAccessToken, getUserProfile } from '../../actions/authActions'

const SPOTIFY_ACCESS_TOKEN_URL = 'https://accounts.spotify.com/api/token'

class AuthLoginCallbackPage extends React.Component {
  componentDidMount () {
    const { setAccessToken, getUserProfile, accessToken, refreshToken, expiresAt, error } = this.props
    if (error) {
      return
    }
    setAccessToken(accessToken, refreshToken, expiresAt)
    window.localStorage.setItem('auth:access', accessToken)
    window.localStorage.setItem('auth:refresh', refreshToken)
    getUserProfile()
      .then(() => Router.replace('/'))
  }

  render () {
    const { accessToken, refreshToken, error } = this.props
    if (!accessToken || !refreshToken) {
      return (
        <div>
          An error occurred
          {error && <pre>{error}</pre>}
        </div>
      )
    }
    return <div />
  }
}

export async function getServerSideProps ({ req, res }) {
  const url = URL.parse(req.url)

  if (!url.query) {
    res.statusCode = 400
    return { props: { error: 'missing required params' } }
  }

  const params = new URLSearchParams(url.query)
  if (!validateState(params.get('state'))) {
    res.statusCode = 400
    return { props: { error: 'invalid params' } }
  }

  if (!params.get('code')) {
    res.statusCode = 400
    return { props: { error: 'invalid params' } }
  }

  try {
    const response = await makeSpotifyAccessTokenRequest(
      process.env.SPOTIFY_CLIENT_ID,
      process.env.SPOTIFY_CLIENT_SECRET,
      process.env.SPOTIFY_REDIRECT_URI,
      params.get('code')
    )
    const nowMs = Date.now()
    return {
      props: {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresAt: nowMs + (response.data.expires_in * 1000)
      }
    }
  } catch (e) {
    res.statusCode = 500
    return { props: { error: `error retrieving Spotify access token: ${e.message}` } }
  }
}

const mapDispatchToProps = {
  setAccessToken,
  getUserProfile
}

export default connect(null, mapDispatchToProps)(AuthLoginCallbackPage)

/**
 * TODO: This should be implemented properly :)
 */
function validateState (state) {
  if (!state || state.substr(0, 6) !== 'moose:') {
    return false
  }
  return true
}

function makeSpotifyAccessTokenRequest (clientId, clientSecret, redirectUri, code) {
  const body = {
    grant_type: 'authorization_code',
    redirect_uri: redirectUri,
    code,
    client_id: clientId,
    client_secret: clientSecret
  }
  // OAuth specifies application/x-www-form-urlencoded encoding
  return axios.post(SPOTIFY_ACCESS_TOKEN_URL, qs.stringify(body), {
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  })
}
