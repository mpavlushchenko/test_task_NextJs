import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

import { BurgerMenuProvider } from '@components/BurgerMenuContext';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.variable}>
      <BurgerMenuProvider>
        <Component {...pageProps} />
      </BurgerMenuProvider>
    </main>
  );
}
