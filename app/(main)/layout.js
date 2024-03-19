import styles from './styles.module.css'

export default function Layout ({ children, navbar }) {
  return (
    <>
      {navbar}
      <main className={styles.main}>
        {children}
      </main>
    </>
  )
}
