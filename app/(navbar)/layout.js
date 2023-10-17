import Providers from 'app/providers'
import Navbar from './navbar'
import styles from './styles.module.css'

export default function Layout ({ children }) {
  return (
    <Providers>
      <Navbar />
      <main className={styles.main}>{children}</main>
    </Providers>
  )
}
