import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

interface ThemeInterface {
  colors: {
    primary: string
    white: string
    black: string
    gray: string
  }
}

const theme: ThemeInterface = {
  colors: {
    primary: '#FF8A00',
    white: '#ffffff',
    black: '#333333',
    gray: '#f0f0f5',
  },
}

export default function App({ Component, pageProps }: AppProps) {
  return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
  )
}