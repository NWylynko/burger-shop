import "./background-pattern.css";
import "./globals.css"

import { Roboto } from "@next/font/google"

const roboto = Roboto({
  weight: ["400", "500", "900"],
  subsets: ["latin"],
  variable: "--roboto"
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <title>🍔 Burger Shop 🍔</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={roboto.className}>
        <div className="page">
          <h1 className="title">🍔 Burger Shop 🍔</h1>
          {children}
        </div>
      </body>
    </html>
  )
}
