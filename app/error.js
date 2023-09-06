'use client'

export default async function Error ({ error, reset }) {
  return <p>Error: {error.message}</p>
}
