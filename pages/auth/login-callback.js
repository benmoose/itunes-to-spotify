import axios from 'axios'
import Router from 'next/router'
import qs from 'querystring'
import React from 'react'
import { connect } from 'react-redux'
import URL, { URLSearchParams } from 'url'

import { setAccessToken, getUserProfile } from '../../actions/authActions'

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

  if (!validateState(params.get('state')) || !params.get('code')) {
    res.statusCode = 400
    return { props: { error: 'invalid params' } }
  }

  try {
    const nowMillis = Date.now()
    const response = await makeSpotifyAccessTokenRequest(params.get('code'))
    return {
      props: {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresAt: nowMillis + (response.data.expires_in * 1000)
      }
    }
  } catch (e) {
    res.statusCode = 500
    return { props: { error: `error retrieving Spotify access token: ${e.message}` } }
  }
}

// TODO: implement properly :)
const validateState = state => typeof state === 'string' && state.substring(0, 6) === 'moose:'

const makeSpotifyAccessTokenRequest = (code) => {
  const body = {
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    code,
    grant_type: 'authorization_code',
    redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI
  }

  // OAuth specifies application/x-www-form-urlencoded encoding
  return axios.post(process.env.NEXT_PUBLIC_SPOTIFY_ACCESS_TOKEN_URL, qs.stringify(body), {
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  })
}

const mapDispatchToProps = {
  setAccessToken,
  getUserProfile
}

export default connect(null, mapDispatchToProps)(AuthLoginCallbackPage)
