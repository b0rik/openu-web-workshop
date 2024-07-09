import { cn } from '@/lib/utils';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';
import { NavBar } from '@/components/navbar/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Meditask Manager',
  description: 'Your medical tasks manager!',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang='en' className='h-full'>
        <body className={cn('flex min-h-full flex-col', inter.className)}>
          <NavBar />
          <main className='flex grow flex-col items-center justify-center bg-gradient-to-b from-sky-800 to-sky-400 p-6'>
            <div className='w-full'>{children}</div>
          </main>
        </body>
      </html>
    </SessionProvider>
  );
}
