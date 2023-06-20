import type { AppProps } from 'next/app'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    max-width: 100vw;
    overflow-x: hidden;
  }
`

interface ThemeInterface {
  main: string;
  colors: {
    primary: string
  }
}

const theme: ThemeInterface = {
  main: '#f0f0f5',
  colors: {
    primary: '#FF8A00',
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