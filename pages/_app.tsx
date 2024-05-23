import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { SessionProvider } from "next-auth/react"
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.min.css'

import { store } from '@/app/store'

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ToastContainer />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}
