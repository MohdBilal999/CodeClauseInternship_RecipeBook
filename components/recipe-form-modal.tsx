"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Upload, LinkIcon, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { type Recipe, saveRecipe } from "@/lib/localStorage"

interface RecipeFormModalProps {
  isOpen: boolean
  onClose: () => void
  recipe?: Recipe | null
  onSave: () => void
}

export default function RecipeFormModal({ isOpen, onClose, recipe, onSave }: RecipeFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: [""],
    instructions: [""],
    image: "",
    cookingTime: "",
    servings: "",
  })
  const [imageInputType, setImageInputType] = useState<"url" | "upload">("url")

  useEffect(() => {
    if (recipe) {
      setFormData({
        name: recipe.name,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        image: recipe.image || "",
        cookingTime: recipe.cookingTime || "",
        servings: recipe.servings || "",
      })
    } else {
      setFormData({
        name: "",
        description: "",
        ingredients: [""],
        instructions: [""],
        image: "",
        cookingTime: "",
        servings: "",
      })
    }
  }, [recipe, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const recipeData: Omit<Recipe, "id" | "createdAt"> = {
      name: formData.name,
      description: formData.description,
      ingredients: formData.ingredients.filter((ing) => ing.trim() !== ""),
      instructions: formData.instructions.filter((inst) => inst.trim() !== ""),
      image: formData.image,
      cookingTime: formData.cookingTime,
      servings: formData.servings,
    }

    if (recipe) {
      saveRecipe({ ...recipeData, id: recipe.id, createdAt: recipe.createdAt })
    } else {
      saveRecipe(recipeData)
    }

    onSave()
  }

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }))
  }

  const removeIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }))
  }

  const updateIngredient = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) => (i === index ? value : ing)),
    }))
  }

  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }))
  }

  const removeInstruction = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index),
    }))
  }

  const updateInstruction = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.map((inst, i) => (i === index ? value : inst)),
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="sticky top-0 bg-white border-b border-green-100 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-green-800">{recipe ? "Edit Recipe" : "Add New Recipe"}</h2>
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

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-green-700 font-medium">
                Recipe Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                required
                className="mt-1 border-green-200 focus:border-green-400 focus:ring-green-400"
                placeholder="Enter recipe name"
              />
            </div>
            <div>
              <Label htmlFor="cookingTime" className="text-green-700 font-medium">
                Cooking Time
              </Label>
              <Input
                id="cookingTime"
                value={formData.cookingTime}
                onChange={(e) => setFormData((prev) => ({ ...prev, cookingTime: e.target.value }))}
                className="mt-1 border-green-200 focus:border-green-400 focus:ring-green-400"
                placeholder="e.g., 30 minutes"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="servings" className="text-green-700 font-medium">
                Servings
              </Label>
              <Input
                id="servings"
                value={formData.servings}
                onChange={(e) => setFormData((prev) => ({ ...prev, servings: e.target.value }))}
                className="mt-1 border-green-200 focus:border-green-400 focus:ring-green-400"
                placeholder="e.g., 4"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-green-700 font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="mt-1 border-green-200 focus:border-green-400 focus:ring-green-400 min-h-[80px]"
              placeholder="Describe your recipe..."
            />
          </div>

          {/* Image Section */}
          <div>
            <Label className="text-green-700 font-medium">Recipe Image</Label>
            <div className="mt-2 space-y-3">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={imageInputType === "url" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setImageInputType("url")}
                  className={
                    imageInputType === "url"
                      ? "bg-green-600 hover:bg-green-700"
                      : "border-green-200 text-green-700 hover:bg-green-50"
                  }
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  URL
                </Button>
                <Button
                  type="button"
                  variant={imageInputType === "upload" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setImageInputType("upload")}
                  className={
                    imageInputType === "upload"
                      ? "bg-green-600 hover:bg-green-700"
                      : "border-green-200 text-green-700 hover:bg-green-50"
                  }
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>

              {imageInputType === "url" ? (
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                  placeholder="Enter image URL"
                  className="border-green-200 focus:border-green-400 focus:ring-green-400"
                />
              ) : (
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="border-green-200 focus:border-green-400 focus:ring-green-400"
                />
              )}

              {formData.image && (
                <div className="mt-3">
                  <img
                    src={formData.image || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg border border-green-200"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-green-700 font-medium">Ingredients *</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addIngredient}
                className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={ingredient}
                    onChange={(e) => updateIngredient(index, e.target.value)}
                    placeholder={`Ingredient ${index + 1}`}
                    className="border-green-200 focus:border-green-400 focus:ring-green-400"
                    required={index === 0}
                  />
                  {formData.ingredients.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeIngredient(index)}
                      className="border-red-200 text-red-600 hover:bg-red-50 px-3"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-green-700 font-medium">Instructions *</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addInstruction}
                className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Step
              </Button>
            </div>
            <div className="space-y-3">
              {formData.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-medium text-sm mt-1">
                    {index + 1}
                  </div>
                  <div className="flex-1 flex gap-2">
                    <Textarea
                      value={instruction}
                      onChange={(e) => updateInstruction(index, e.target.value)}
                      placeholder={`Step ${index + 1} instructions...`}
                      className="border-green-200 focus:border-green-400 focus:ring-green-400 min-h-[60px]"
                      required={index === 0}
                    />
                    {formData.instructions.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeInstruction(index)}
                        className="border-red-200 text-red-600 hover:bg-red-50 px-3 h-fit mt-1"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4 border-t border-green-100">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
              {recipe ? "Update Recipe" : "Save Recipe"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
