import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChefHat, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-cream-50 to-amber-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <ChefHat className="w-16 h-16 text-green-400 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-green-800 mb-4">Recipe Not Found</h2>
        <p className="text-green-600 mb-6">The recipe you&apos;re looking for doesn&apos;t exist or may have been removed.</p>
        <Link href="/">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Home className="w-4 h-4 mr-2" />
            Back to Recipe Book
          </Button>
        </Link>
      </div>
    </div>
  )
}
