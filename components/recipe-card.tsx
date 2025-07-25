"use client"

import { useState } from "react"
import { Edit, Trash2, Clock, Users, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Recipe } from "@/lib/localStorage"
import RecipeViewModal from "@/components/recipe-view-modal"

interface RecipeCardProps {
  recipe: Recipe
  onEdit: (recipe: Recipe) => void
  onDelete: (id: string) => void
  animationDelay?: number
}

export default function RecipeCard({ recipe, onEdit, onDelete, animationDelay = 0 }: RecipeCardProps) {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <>
      <Card
        className="group overflow-hidden bg-white/80 backdrop-blur-sm border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-slide-up cursor-pointer"
        style={{ animationDelay: `${animationDelay}ms` }}
        onClick={() => setIsViewModalOpen(true)}
      >
        <div className="relative overflow-hidden">
          {recipe.image && !imageError ? (
            <img
              src={recipe.image || "/placeholder.svg"}
              alt={recipe.name}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-300 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🍽️</span>
                </div>
                <p className="text-green-600 font-medium">No Image</p>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-green-700 p-2 h-8 w-8"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(recipe)
              }}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="bg-red-500/90 hover:bg-red-600 text-white p-2 h-8 w-8"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(recipe.id)
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-bold text-lg text-green-800 mb-2 line-clamp-1 group-hover:text-green-600 transition-colors">
            {recipe.name}
          </h3>
          <p className="text-green-600 text-sm mb-4 line-clamp-2 leading-relaxed">{recipe.description}</p>

          <div className="flex items-center justify-between text-xs text-green-500">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.cookingTime || "N/A"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{recipe.servings || "N/A"} servings</span>
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <Eye className="w-4 h-4" />
              <span>View</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <RecipeViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        recipe={recipe}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  )
}
