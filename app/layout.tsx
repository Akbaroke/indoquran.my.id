'use client'
import * as React from 'react'
import Navbar from '@/components/Navbar'
import './globals.css'
import Modal from '@/components/Modal'
import { Provider } from 'react-redux'
import store from '@/redux'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>IndoQur`an</title>
        <meta name="description" content="Create By Muhammad Akbar" />
        <meta name="google" content="notranslate" />
      </head>
      <Provider store={store}>
        <body className="bg-gray-100 dark:bg-slate-800">
          <Navbar />
          <Modal />
          <div className="py-2 px-2 sm:py-5 sm:px-5">{children}</div>
        </body>
      </Provider>
    </html>
  )
}
