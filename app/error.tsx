"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChefHat, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-cream-50 to-amber-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <ChefHat className="w-16 h-16 text-green-400 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-green-800 mb-4">Something went wrong!</h2>
        <p className="text-green-600 mb-6">
          We encountered an error while loading your recipe book. Don&apos;t worry, your recipes are safe!
        </p>
        <Button onClick={reset} className="bg-green-600 hover:bg-green-700 text-white">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try again
        </Button>
      </div>
    </div>
  )
}
