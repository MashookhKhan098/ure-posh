import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import NavbarWrapper from './components/NavbarWrapper'
import ConditionalFooter from "./components/ConditionalFooter"
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
  const isAdminPage = pathname.startsWith('/admin')

  // Debug logging (will show in server console)
  console.log('Layout Debug:', { pathname, isWriterPage, isAdminPage })

  return (
    <html lang="en" data-admin={isAdminPage ? "true" : "false"}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Navbar - hidden for admin and writer pages */}
          {!isWriterPage && !isAdminPage && <NavbarWrapper />}
          
          {/* Main content */}
          <main className="min-h-screen">{children}</main>
          
          {/* Footer - Conditionally rendered based on path */}
          <ConditionalFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
