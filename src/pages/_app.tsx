import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Quicksand } from 'next/font/google';
import { Toaster } from 'sonner';
import '@/styles/globals.css';
import NextNProgress from 'nextjs-progressbar';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import Appshell from '@/components/Appshell';
import { store } from '@/redux';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import addSourceLinkOnCopy from '@/helpers/addSourceLinkOnCopy';
import { Analytics } from '@vercel/analytics/react';

const theme = createTheme({
  primaryColor: 'teal',
});

const quicksand = Quicksand({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      duration: 500,
      delay: 0,
      offset: 0,
    });

    addSourceLinkOnCopy();
  }, []);

  return (
    <Provider store={store}>
      <MantineProvider
        theme={theme}
        forceColorScheme="light"
        defaultColorScheme="light">
        <main className={quicksand.className}>
          <Toaster richColors position="top-center" expand={true} closeButton />
          <NextNProgress
            showOnShallow={false}
            options={{ showSpinner: false }}
            color="#00957B"
          />
          <Appshell>
            <Component {...pageProps} />
            <Analytics />
          </Appshell>
        </main>
      </MantineProvider>
    </Provider>
  );
}
