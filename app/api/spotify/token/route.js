'use server'

import { NextResponse } from 'next/server'

import { spotify } from 'clients'

export async function GET (request) {
  const params = request.nextUrl.searchParams
  const serverTimeMs = Date.now()

  if (!params.has('code') || !params.has('state')) {
    return NextResponse.json({ error: 'missing required query params' }, { status: 400 })
  }
  const state = params.get('state')
  if (!validateState(state)) {
    return NextResponse.json({ error: 'bad request' }, { status: 400 })
  }

  const code = params.get('code')
  const { access_token, refresh_token, expires_in, scope } = await spotify.authTokens(code)

  return NextResponse.json({
    accessToken: access_token,
    refreshToken: refresh_token,
    expiresAt: (expires_in * 1000) + serverTimeMs,
    scope
  })
}

function validateState (state) {
  return typeof state === 'string' && state.startsWith('moose:')
}
