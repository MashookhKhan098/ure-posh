"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"

function AdminWritersComponent() {
  const router = useRouter()
  const sp = useSearchParams()

  useEffect(() => {
    const extra = sp?.toString()
    router.replace(`/admin/dashboard?tab=writers${extra ? `&${extra}` : ''}`)
  }, [router, sp])

  return null
}

export default function AdminWritersRoute() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminWritersComponent />
    </Suspense>
  )
}


