//archivo principal donde podemos colocar los componentes
import React from 'react'
import '../styles/globals.css'
import AuthState from '../context/auth/authState'

function MyApp({ Component, pageProps }) {
  return <AuthState>
      <Component {...pageProps} />
  </AuthState>
}

export default MyApp
