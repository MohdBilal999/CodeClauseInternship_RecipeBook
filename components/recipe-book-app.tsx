"use client"

import { useState, useEffect } from "react"
import { Plus, Search, ChefHat, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import RecipeCard from "@/components/recipe-card"
import RecipeFormModal from "@/components/recipe-form-modal"
import Toast from "@/components/toast"
import { type Recipe, getRecipes, deleteRecipe } from "@/lib/localStorage"

interface RecipeBookAppProps {
  onBackToLanding: () => void
}

export default function RecipeBookApp({ onBackToLanding }: RecipeBookAppProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  useEffect(() => {
    const loadedRecipes = getRecipes()
    setRecipes(loadedRecipes)
    setFilteredRecipes(loadedRecipes)
  }, [])

  useEffect(() => {
    const filtered = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredRecipes(filtered)
  }, [searchTerm, recipes])

  const handleAddRecipe = () => {
    setEditingRecipe(null)
    setIsModalOpen(true)
  }

  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe)
    setIsModalOpen(true)
  }

  const handleDeleteRecipe = (id: string) => {
    deleteRecipe(id)
    const updatedRecipes = getRecipes()
    setRecipes(updatedRecipes)
    showToast("Recipe deleted successfully!", "success")
  }

  const handleRecipeSaved = () => {
    const updatedRecipes = getRecipes()
    setRecipes(updatedRecipes)
    setIsModalOpen(false)
    showToast(editingRecipe ? "Recipe updated successfully!" : "Recipe added successfully!", "success")
  }

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-cream-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Button
              variant="ghost"
              onClick={onBackToLanding}
              className="absolute left-4 top-8 text-green-600 hover:text-green-800 hover:bg-green-50"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
            <ChefHat className="w-10 h-10 text-green-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 font-serif">My Recipe Book</h1>
          </div>
          <p className="text-green-600 text-lg max-w-2xl mx-auto">
            Discover, create, and organize your favorite recipes in one beautiful place
          </p>
        </div>

        {/* Search and Add Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 border-green-200 focus:border-green-400 focus:ring-green-400 bg-white/80 backdrop-blur-sm"
            />
          </div>
          <Button
            onClick={handleAddRecipe}
            className="h-12 px-6 bg-green-600 hover:bg-green-700 text-white font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Recipe
          </Button>
        </div>

        {/* Recipes Grid */}
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <ChefHat className="w-24 h-24 text-green-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-green-700 mb-4">
              {searchTerm ? "No recipes found" : "No recipes yet"}
            </h3>
            <p className="text-green-600 mb-8 max-w-md mx-auto">
              {searchTerm
                ? "Try adjusting your search terms to find what you're looking for."
                : "Start building your recipe collection by adding your first recipe!"}
            </p>
            {!searchTerm && (
              <Button
                onClick={handleAddRecipe}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg transition-all duration-200 hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Recipe
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onEdit={handleEditRecipe}
                onDelete={handleDeleteRecipe}
                animationDelay={index * 100}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <RecipeFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipe={editingRecipe}
        onSave={handleRecipeSaved}
      />

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
