"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"

function AdminPeopleComponent() {
  const router = useRouter()
  const sp = useSearchParams()

  useEffect(() => {
    const extra = sp?.toString()
    router.replace(`/admin/dashboard?tab=people${extra ? `&${extra}` : ''}`)
  }, [router, sp])

  return null
}

export default function AdminPeopleRoute() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminPeopleComponent />
    </Suspense>
  )
}


