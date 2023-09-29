import 'normalize.css/normalize.css'
import { Nunito_Sans } from 'next/font/google'

export const metadata = {
  title: {
    default: 'iTunes to Spotify'
  }
}

const appFont = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap'
})

export default function RootLayout ({ children }) {
  return (
    <html lang='en' className={appFont.className}>
      <body>
        {children}
      </body>
    </html>
  )
}
