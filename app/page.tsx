"use client"

import { useState } from "react"
import LandingPage from "@/components/landing-page"
import RecipeBookApp from "@/components/recipe-book-app"

export default function Home() {
  const [showApp, setShowApp] = useState(false)

  if (showApp) {
    return <RecipeBookApp onBackToLanding={() => setShowApp(false)} />
  }

  return <LandingPage onGetStarted={() => setShowApp(true)} />
}
