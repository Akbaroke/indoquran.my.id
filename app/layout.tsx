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
      </head>
      <body className="bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100">
        <Provider store={store}>
          <Navbar />
          <Modal />
          <div className="py-2 px-2 sm:py-5 sm:px-5">{children}</div>
        </Provider>
      </body>
    </html>
  )
}
