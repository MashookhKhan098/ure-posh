import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "./components/Navbar"
import BackgroundImage from './components/BackgroundImage'
import NavbarWrapper from './components/NavbarWrapper'

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
          <NavbarWrapper />
          {children}
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
