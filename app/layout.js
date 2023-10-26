import 'normalize.css/normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import Providers from 'app/providers'
import styles from './styles.module.css'

export const metadata = {
  title: {
    default: 'CrateConv',
    template: '%s | CrateConv'
  }
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en' className={styles.app}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
