import 'normalize.css/normalize.css'

export const metadata = {
  title: {
    default: 'iTunes to Spotify'
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
