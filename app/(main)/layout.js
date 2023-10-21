import styles from './styles.module.css'

export default function Layout ({ navbar, form }) {
  return (
    <div className={styles.app}>
      {navbar}
      <main className={styles.main}>
        {form}
      </main>
    </div>
  )
}
