/* eslint-disable import/order */
import {Nunito} from 'next/font/google'

import type {Metadata} from 'next'

import './globals.css'

import {type ReactNode} from 'react'
import SessionProvider from '@/app/providers/SessionProvider'

const nunito = Nunito({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000'],
  subsets: ['latin'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'ivory-next-log',
  description: 'ivory-next-log',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${nunito.variable} antialiased`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
