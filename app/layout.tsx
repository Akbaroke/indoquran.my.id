'use client'
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
        <title>Al-Quran | Indonesia</title>
        <meta name="description" content="Create By Muhammad Akbar" />
        <link rel="icon" href="../assets/logo-alquran.png" />
      </head>
      <Provider store={store}>
        <body className="bg-gray-100">
          <Navbar />
          <Modal />
          <div className="py-5 px-5">{children}</div>
        </body>
      </Provider>
    </html>
  )
}
