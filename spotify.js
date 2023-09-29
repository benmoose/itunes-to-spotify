'use server'

import qs from 'querystring'

export async function profile ({ accessToken }) {
  const endpoint = new URL(process.env.SPOTIFY_PROFILE_URL, process.env.SPOTIFY_API_ORIGIN)
  return fetch(endpoint.href, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` }
  })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => ({
      id: data.id,
      href: data.href,
      images: data.images,
      displayName: data.display_name,
      profileURL: data?.external_urls?.spotify
    }))
}

export async function authTokens (code) {
  const endpoint = new URL(process.env.SPOTIFY_TOKEN_URL, process.env.SPOTIFY_AUTH_ORIGIN)
  const base64ClientAuth = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64url')
  const body = {
    code,
    grant_type: 'authorization_code',
    redirect_uri: new URL(process.env.SPOTIFY_AUTH_REDIRECT_URL, process.env.HOST_URL).href
  }

  return fetch(endpoint.href, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${base64ClientAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: qs.encode(body)
  })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => ({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
      scopes: data.scopes
    }))
}

export async function authUrl () {
  const params = new URLSearchParams({
    response_type: 'code',
    scope: 'playlist-modify-public',
    client_id: process.env.SPOTIFY_CLIENT_ID,
    redirect_uri: new URL(process.env.SPOTIFY_AUTH_REDIRECT_URL, process.env.HOST_URL).href,
    state: 'moose:'
  })
  const endpoint = new URL(
    `${process.env.SPOTIFY_AUTH_URL}?${params.toString()}`,
    process.env.SPOTIFY_AUTH_ORIGIN
  )

  return endpoint
}
