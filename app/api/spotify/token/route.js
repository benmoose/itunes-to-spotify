'use server'

import { NextResponse } from 'next/server'
import { spotify } from 'clients'

export async function GET (request) {
  const params = request.nextUrl.searchParams

  if (!params.has('code') || !params.has('state')) {
    return NextResponse.json({ error: 'missing required query params' }, { status: 400 })
  }
  const state = params.get('state')
  if (!validateState(state)) {
    return NextResponse.json({ error: 'bad request' }, { status: 400 })
  }

  const code = params.get('code')
  const { accessToken, refreshToken, scopes, expiresIn } = await spotify.authTokens(code)

  return NextResponse.json({
    accessToken,
    refreshToken,
    scopes,
    expiresIn,
  })
}

function validateState (state) {
  return typeof state === 'string' && state.startsWith('moose:')
}
