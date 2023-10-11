import Providers from 'app/providers'
import Navbar from './navbar'

export default function Layout ({ children }) {
  return (
    <Providers>
      <Navbar />
      <main>{children}</main>
    </Providers>
  )
}
