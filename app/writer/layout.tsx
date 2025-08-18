import { WriterAuthProvider } from '@/hooks/useWriterAuth'

export default function WriterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WriterAuthProvider>
      {children}
    </WriterAuthProvider>
  )
}
