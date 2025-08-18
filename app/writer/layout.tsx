import { WriterAuthProvider } from '@/hooks/useWriterAuth'

export default function WriterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="writer-theme min-h-screen">
      <WriterAuthProvider>
        {children}
      </WriterAuthProvider>
    </div>
  )
}
