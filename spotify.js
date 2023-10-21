'use server'

import qs from 'querystring'
import { utcSecondsNow } from 'utils'

export async function
profile ({ accessToken, refreshToken }) {
  return api({ accessToken, refreshToken }, process.env.SPOTIFY_PROFILE_URL)
    .then((res) => {
      if (!res.ok) {
        return {
          status: res.status,
          message: `spotify-client profile: ${res.statusText}`,
          error: true
        }
      }

      return res.json().then(data => ({
        id: data.id,
        images: data.images,
        displayName: data.display_name,
        profileUrl: data?.external_urls?.spotify
      }))
    })
    .catch(err => ({
      status: 500,
      message: `spotify-client profile: server error (${err.toString()})`,
      error: true
    }))
}

export async function accountsAuth (code) {
  const timeNow = utcSecondsNow()
  const body = {
    code,
    grant_type: 'authorization_code',
    redirect_uri: new URL(process.env.SPOTIFY_AUTH_REDIRECT_URL, process.env.HOST_URL).href
  }

  return accounts(process.env.SPOTIFY_AUTH_TOKEN_URL, {
    body: qs.encode(body)
  })
    .then((res) => {
      if (!res.ok) {
        return {
          status: res.status,
          message: `spotify-client accounts: ${res.statusText}`,
          error: true
        }
      }

      return res.json().then(data => ({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiryTime: timeNow + data.expires_in,
        scope: data.scope
      }))
    })
}

export async function accountsRefresh ({ refreshToken }) {
  const timeNow = utcSecondsNow()
  const body = {
    refresh_token: refreshToken,
    grant_type: 'refresh_token'
  }

  return accounts(process.env.SPOTIFY_AUTH_TOKEN_URL, {
    body: qs.encode(body)
  })
    .then((res) => {
      if (!res.ok) {
        return {
          status: res.status,
          message: `spotify-client accounts refresh: ${res.statusText}`,
          error: true
        }
      }

      return res.json().then(data => ({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiryTime: timeNow + data.expires_in,
        scope: data.scope
      }))
    })
}

export async function userAuthorizationUrl () {
  const params = new URLSearchParams({
    response_type: 'code',
    scope: 'playlist-modify-public',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    redirect_uri: new URL(process.env.SPOTIFY_AUTH_REDIRECT_URL, process.env.HOST_URL).href,
    state: 'moose:'
  })
  const endpoint = new URL(
    `${process.env.SPOTIFY_REQUEST_USER_AUTH_URL}?${params.toString()}`,
    process.env.SPOTIFY_AUTH_ORIGIN
  )

  return endpoint.href
}

// api makes calls to Spotify's API.
function api ({ accessToken, refreshToken }, pathname = '/', config = {}) {
  const { headers, ...rest } = config
  const defaults = { method: 'GET' }

  const endpoint = new URL(pathname, process.env.SPOTIFY_API_ORIGIN)
  const reqConfig = {
    ...defaults,
    ...rest,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...headers
    }
  }

  return fetch(endpoint.href, reqConfig)
}

// accounts makes calls to Spotify's accounts API.
function accounts (pathname, config = {}) {
  const { headers, ...rest } = config
  const defaults = { method: 'POST' }
  const base64ClientAuth = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64url')

  const endpoint = new URL(pathname, process.env.SPOTIFY_AUTH_ORIGIN)
  const reqConfig = {
    ...defaults,
    ...rest,
    headers: {
      Authorization: `Basic ${base64ClientAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      ...headers
    }
  }

  return fetch(endpoint.href, reqConfig)
}
