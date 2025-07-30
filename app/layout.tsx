import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import NavbarWrapper from './components/NavbarWrapper'
import Footer from "./components/Footer"
import { headers } from 'next/headers'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ureposh - Transforming Workplaces",
  description: "Creating safe, inclusive, and compliant workplaces across India through comprehensive POSH solutions.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers()
  const pathname = headersList.get('x-pathname') || headersList.get('x-invoke-path') || ''
  const isWriterPage = pathname.startsWith('/writer')

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {!isWriterPage && <NavbarWrapper />}
          <main className="min-h-screen">{children}</main>
          {!isWriterPage && <Footer />}
        </ThemeProvider>
      </body>
    </html>
  )
}
