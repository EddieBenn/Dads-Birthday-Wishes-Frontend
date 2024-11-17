import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { AlertProvider } from "next-alert";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900">
          <AlertProvider>
              <Header />
              <main className='inconsolata z-0'>
                {children}
              </main>
              <Footer />
          </AlertProvider>
      </body>
    </html>
  );
}