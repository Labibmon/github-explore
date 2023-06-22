import type { AppProps } from 'next/app'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    max-width: 100vw;
    overflow-x: hidden;
  };
`

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
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}