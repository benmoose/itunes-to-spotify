import Head from 'next/head'
import { Provider } from 'react-redux'
import Favicon from '../public/img/fav.svg'

import 'normalize.css/normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'

import store from '../store'

function CustomApp ({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <link rel='icon' type='image/x-icon' href={Favicon} />
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}

export default CustomApp
