"use client"

import { useState } from "react"
import { X, Edit, Trash2, Clock, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Recipe } from "@/lib/localStorage"

interface RecipeViewModalProps {
  isOpen: boolean
  onClose: () => void
  recipe: Recipe
  onEdit: (recipe: Recipe) => void
  onDelete: (id: string) => void
}

export default function RecipeViewModal({ isOpen, onClose, recipe, onEdit, onDelete }: RecipeViewModalProps) {
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set())
  const [checkedInstructions, setCheckedInstructions] = useState<Set<number>>(new Set())
  const [imageError, setImageError] = useState(false)

  const toggleIngredient = (index: number) => {
    const newChecked = new Set(checkedIngredients)
    if (newChecked.has(index)) {
      newChecked.delete(index)
    } else {
      newChecked.add(index)
    }
    setCheckedIngredients(newChecked)
  }

  const toggleInstruction = (index: number) => {
    const newChecked = new Set(checkedInstructions)
    if (newChecked.has(index)) {
      newChecked.delete(index)
    } else {
      newChecked.add(index)
    }
    setCheckedInstructions(newChecked)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-green-100 p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-green-800 mb-2">{recipe.name}</h1>
              <p className="text-green-600 text-lg">{recipe.description}</p>
              <div className="flex items-center gap-6 mt-4 text-sm text-green-600">
                {recipe.cookingTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.cookingTime}</span>
                  </div>
                )}
                {recipe.servings && (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings} servings</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(recipe)}
                className="border-green-200 text-green-700 hover:bg-green-50"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onDelete(recipe.id)
                  onClose()
                }}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-green-600 hover:text-green-800 hover:bg-green-50"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image */}
            {recipe.image && !imageError && (
              <div className="lg:col-span-2">
                <img
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.name}
                  className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
                  onError={() => setImageError(true)}
                />
              </div>
            )}

            {/* Ingredients */}
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-4">Ingredients</h2>
              <div className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:bg-green-50 ${
                      checkedIngredients.has(index)
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-white border-green-100"
                    }`}
                    onClick={() => toggleIngredient(index)}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        checkedIngredients.has(index) ? "border-green-500 bg-green-500" : "border-green-300"
                      }`}
                    >
                      {checkedIngredients.has(index) && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`flex-1 ${checkedIngredients.has(index) ? "line-through" : ""}`}>
                      {ingredient}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-4">Instructions</h2>
              <div className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <div
                    key={index}
                    className={`flex gap-4 p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:bg-green-50 ${
                      checkedInstructions.has(index) ? "bg-green-50 border-green-200" : "bg-white border-green-100"
                    }`}
                    onClick={() => toggleInstruction(index)}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                        checkedInstructions.has(index) ? "bg-green-500 text-white" : "bg-green-100 text-green-700"
                      }`}
                    >
                      {checkedInstructions.has(index) ? <CheckCircle className="w-4 h-4" /> : index + 1}
                    </div>
                    <p
                      className={`flex-1 leading-relaxed ${
                        checkedInstructions.has(index) ? "line-through text-green-600" : "text-green-800"
                      }`}
                    >
                      {instruction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
