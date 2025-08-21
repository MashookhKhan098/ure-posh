"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function AdminSettingsRoute() {
  const router = useRouter()
  const sp = useSearchParams()

  useEffect(() => {
    const extra = sp?.toString()
    router.replace(`/admin/dashboard?tab=settings${extra ? `&${extra}` : ''}`)
  }, [router, sp])

  return null
}


