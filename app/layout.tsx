
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SpeedInsights } from "@vercel/speed-insights/next"
import dynamic from "next/dynamic"

const NavbarWrapper = dynamic(() => import('./components/NavbarWrapper'), { ssr: false })
const ConditionalFooter = dynamic(() => import('./components/ConditionalFooter'), { ssr: false })

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ureposh - Transforming Workplaces",
  description: "Creating safe, inclusive, and compliant workplaces across India through comprehensive POSH solutions.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          {/* Client-only Navbar and Footer to avoid SSR on admin routes */}
          <NavbarWrapper />
          <main className="min-h-screen">{children}</main>
          <ConditionalFooter />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
