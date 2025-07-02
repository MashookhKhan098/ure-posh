import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "./components/Navbar"
import BackgroundImage from './components/BackgroundImage'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ureposh - Empowering Safe & Inclusive Workplaces",
  description:
    "Leading POSH compliance and workplace safety solutions. We craft learning experiences that feel personal, relatable, and worth your time.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative`}>
        <BackgroundImage />
        <div className="relative z-10">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  )
}
