"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"

function AdminPostersComponent() {
  const router = useRouter()
  const sp = useSearchParams()

  useEffect(() => {
    const extra = sp?.toString()
    router.replace(`/admin/dashboard?tab=posters${extra ? `&${extra}` : ''}`)
  }, [router, sp])

  return null
}

export default function AdminPostersRoute() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminPostersComponent />
    </Suspense>
  )
}


