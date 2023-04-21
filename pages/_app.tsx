/** @jsxImportSource theme-ui */
import type { AppProps } from 'next/app'

import { ThemeProvider } from 'theme-ui'
import { theme } from '../theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <main sx={{ p: 4 }}>
          <h1
          sx={{
            color: 'primary',
            fontFamily: 'heading',
          }}>
          SliceGPT
        </h1>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  )
}
