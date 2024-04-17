import { FixedPlugin, Layout } from '@/components';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components';
import { useEffect } from 'react';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: '개발서버 배포 프로그램',
  description: 'created by ws',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <script
          defer
          data-site='hi'
          src=''></script>
        <link
          rel='shortcut icon'
          href='/favicon.png'
          type='image/png'
        />
      </head>
      <body className={roboto.className}>
        <Navbar />
        <Layout>{children}</Layout>
        <FixedPlugin />
      </body>
    </html>
  );
}
