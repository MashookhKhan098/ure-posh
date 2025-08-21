"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"

function AdminSettingsComponent() {
  const router = useRouter()
  const sp = useSearchParams()

  useEffect(() => {
    const extra = sp?.toString()
    router.replace(`/admin/dashboard?tab=settings${extra ? `&${extra}` : ''}`)
  }, [router, sp])

  return null
}

export default function AdminSettingsRoute() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminSettingsComponent />
    </Suspense>
  )
}


