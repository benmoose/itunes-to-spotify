import Providers from 'app/providers'
import { useDispatch } from 'react-redux'
import { actions } from 'slices'
import Navbar from './navbar'

export default function Layout ({ children }) {
  async function handleForm (formData) {
    'use server'

    const dispatch = useDispatch()
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`)
    }
  }

  return (
    <Providers>
      <Navbar handleFormSubmit={handleForm} />
      <main>{children}</main>
    </Providers>
  )
}
