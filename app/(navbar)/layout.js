import Navbar from './nav'

export default function Layout ({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
