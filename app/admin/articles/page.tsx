"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function AdminArticlesRoute() {
  const router = useRouter()
  const sp = useSearchParams()

  useEffect(() => {
    const extra = sp?.toString()
    router.replace(`/admin/dashboard?tab=posts${extra ? `&${extra}` : ''}`)
  }, [router, sp])

  return null
}


