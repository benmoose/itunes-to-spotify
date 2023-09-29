import 'normalize.css/normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'

export const metadata = {
  title: {
    default: 'CrateConv',
    template: '%s | CrateConv'
  }
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body>
        {children}
      </body>
    </html>
  )
}
