export interface Recipe {
  id: string
  name: string
  description: string
  ingredients: string[]
  instructions: string[]
  image?: string
  cookingTime?: string
  servings?: string
  createdAt: string
}

const STORAGE_KEY = "recipe-book-recipes"

export function getRecipes(): Recipe[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error loading recipes:", error)
    return []
  }
}

export function saveRecipe(recipe: Omit<Recipe, "id" | "createdAt"> | Recipe): Recipe {
  const recipes = getRecipes()

  let savedRecipe: Recipe

  if ("id" in recipe && recipe.id) {
    // Update existing recipe
    const index = recipes.findIndex((r) => r.id === recipe.id)
    savedRecipe = { ...recipe, id: recipe.id, createdAt: recipe.createdAt }
    if (index >= 0) {
      recipes[index] = savedRecipe
    } else {
      recipes.push(savedRecipe)
    }
  } else {
    // Create new recipe
    savedRecipe = {
      ...recipe,
      id: generateId(),
      createdAt: new Date().toISOString(),
    }
    recipes.push(savedRecipe)
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes))
  } catch (error) {
    console.error("Error saving recipe:", error)
    throw new Error("Failed to save recipe")
  }

  return savedRecipe
}

export function deleteRecipe(id: string): void {
  const recipes = getRecipes()
  const filteredRecipes = recipes.filter((recipe) => recipe.id !== id)

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredRecipes))
  } catch (error) {
    console.error("Error deleting recipe:", error)
    throw new Error("Failed to delete recipe")
  }
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
