'use server'

import { NextResponse } from 'next/server'
import querystring from 'querystring'

export default async function GET (req) {
  const serverTimeMillis = Date.now()
  const params = req.nextUrl.searchParams

  if (!params.has('code') || !params.has('state')) {
    return NextResponse.json({ error: 'missing required query params.' }, { status: 400 })
  }

  if (!validateState(params.get('state'))) {
    return NextResponse.json({ error: 'invalid request' }, { status: 400 })
  }

  const response = await getSpotifyAccessToken(params.get('code'))

  return NextResponse.json({
    access_token: response.access_token,
    refresh_token: response.refresh_token,
    expires_at: serverTimeMillis + response.expires_in * 1000
  })
}

async function getSpotifyAccessToken (code) {
  const auth = `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  const body = {
    code,
    grant_type: 'authorization_code',
    redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_AUTH_REDIRECT_URI
  }

  const result = await fetch(process.env.NEXT_PUBLIC_SPOTIFY_ACCESS_TOKEN_URL, {
    body: querystring.encode(body),
    cache: 'no-store',
    headers: {
      Authorization: `Basic ${base64(auth)}`,
      'Context-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST'
  })

  if (!result.ok) {
    throw new Error(`error getting access_token from spotify: ${result.statusText} ${result.body}`)
  }

  return result
}

// TODO implement properly :)
function validateState (state) {
  return typeof state === 'string' && state.substring(0, 6) === 'moose:'
}

function base64 (str) {
  return Buffer.from(str).toString('base64url')
}
