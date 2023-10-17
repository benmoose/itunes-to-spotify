import 'normalize.css/normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import styles from './styles.modue.css'

export const metadata = {
  title: {
    default: 'CrateConv',
    template: '%s | CrateConv'
  }
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body className={styles.body}>
        {children}
      </body>
    </html>
  )
}
