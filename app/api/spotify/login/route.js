'use server'
//
// import { randomUUID } from 'crypto'
// import qs from 'querystring'
import { NextResponse } from 'next/server'
//
export async function GET () {
  return NextResponse.json({
    foo: {
      x: 56,
      y: { aaa: [12, 3] }
    }
  })
}
//
// const getSpotifyAuthURL = ({ state }) => {
//   console.log(`!! process.env.NEXT_PUBLIC_HOST_URL = '${process.env.NEXT_PUBLIC_HOST_URL}'`)
//   const params = {
//     client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
//     redirect_uri: process.env.NEXT_PUBLIC_HOST_URL + process.env.NEXT_PUBLIC_SPOTIFY_AUTH_REDIRECT_URI,
//     response_type: 'code',
//     scope: 'playlist-modify-public',
//     state
//   }
//
//   return `${process.env.NEXT_PUBLIC_SPOTIFY_AUTH_URL}?${qs.stringify(params)}`
// }
//
// const generateState = () => `moose:${randomUUID()}`
