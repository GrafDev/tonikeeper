import '@/styles/globals.css'
import type { Metadata } from 'next'
import React from "react";

export const metadata: Metadata = {
    title: 'TON Wallet App',
    description: 'A simple TON wallet application',
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
            { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
            { url: '/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
        other: [
            { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
            { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
    },
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 ">
        <div className=" mx-auto bg-white bg-opacity-90 min-h-screen shadow-lg ">
            {children}
        </div>
        </body>
        </html>
    )
}
