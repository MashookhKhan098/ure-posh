"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"

function AdminArticlesComponent() {
  const router = useRouter()
  const sp = useSearchParams()

  useEffect(() => {
    const extra = sp?.toString()
    router.replace(`/admin/dashboard?tab=posts${extra ? `&${extra}` : ''}`)
  }, [router, sp])

  return null
}

export default function AdminArticlesRoute() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminArticlesComponent />
    </Suspense>
  )
}


