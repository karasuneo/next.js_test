import { css } from "@emotion/react"
//import Header from "../lib/header"
import type { AppProps } from "next/app"
import { AuthProvider } from "../lib/AuthContext"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
     
      <Component
        {...pageProps}
      />
    </AuthProvider>
  )
}

export default App