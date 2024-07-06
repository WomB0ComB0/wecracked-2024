import '@/styles/globals.css';

import { Inter } from 'next/font/google';

import MainFooter from '@/components/Footer';
import type { ChildrenProps } from '@/types';

export const metadata = {
  description:
    'Wecracked 2024',
  keywords:
    'wecracked, 2024, typescript, tailwind css, prettier, eslint, husky, seo',
  title: 'Wecracked 2024',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
});

export default async function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} h-full flex flex-col justify-between`}
      >
        <section className="flex-1">{children}</section>
        <MainFooter />
      </body>
    </html>
  );
}
