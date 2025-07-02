import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileX, ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-md">
        <Card>
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <FileX className="h-8 w-8 text-gray-400" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Post Not Found</h1>
              <p className="text-gray-600">The post you're looking for doesn't exist or has been moved.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/posts">
                <Button variant="default" className="w-full sm:w-auto">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  All Posts
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
