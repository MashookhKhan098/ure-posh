import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Navigation Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Header Skeleton */}
        <header className="mb-8 space-y-6">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-12 w-full" />
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-18" />
          </div>
        </header>

        {/* Featured Image Skeleton */}
        <div className="mb-8">
          <Skeleton className="aspect-video w-full rounded-xl" />
        </div>

        {/* Content Skeleton */}
        <Card className="mb-8">
          <CardContent className="p-8 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
        </Card>

        {/* Footer Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-px w-full" />
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
      </div>
    </div>
  )
}
