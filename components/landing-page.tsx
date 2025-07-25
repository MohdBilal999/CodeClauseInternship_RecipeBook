"use client"

import { ChefHat, BookOpen, Heart, Smartphone, Search, Plus, Edit3, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface LandingPageProps {
  onGetStarted: () => void
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: Plus,
      title: "Easy Recipe Creation",
      description:
        "Add your favorite recipes with ingredients, instructions, and beautiful photos in just a few clicks.",
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Find any recipe instantly with our powerful search that looks through names and descriptions.",
    },
    {
      icon: Edit3,
      title: "Edit & Organize",
      description: "Update recipes anytime and keep your collection perfectly organized and up-to-date.",
    },
    {
      icon: Smartphone,
      title: "Fully Responsive",
      description: "Access your recipes on any device - desktop, tablet, or mobile with a beautiful interface.",
    },
    {
      icon: BookOpen,
      title: "Offline Ready",
      description: "All your recipes are stored locally, so you can cook even without an internet connection.",
    },
    {
      icon: Heart,
      title: "Beautiful Design",
      description: "Enjoy a clean, intuitive interface with smooth animations and a soothing color palette.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-cream-50 to-amber-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="text-center animate-fade-in">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="relative">
                <ChefHat className="w-16 h-16 md:w-20 md:h-20 text-green-600 animate-bounce" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-green-800 font-serif">Recipe Book</h1>
            </div>

            <p className="text-xl md:text-2xl text-green-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your personal culinary companion. Discover, create, and organize your favorite recipes in one beautiful,
              intuitive place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <ChefHat className="w-5 h-5 mr-2" />
                Start Cooking
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-green-300 text-green-700 hover:bg-green-50 px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105 bg-transparent"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
              </Button>
            </div>

            {/* Hero Image Placeholder */}
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-green-100 p-8 animate-slide-up">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🥗</span>
                    </div>
                    <h3 className="font-semibold text-green-800 mb-2">Fresh Salads</h3>
                    <p className="text-green-600 text-sm">Healthy & Delicious</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-amber-300 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🍝</span>
                    </div>
                    <h3 className="font-semibold text-amber-800 mb-2">Pasta Dishes</h3>
                    <p className="text-amber-600 text-sm">Comfort Food</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🍰</span>
                    </div>
                    <h3 className="font-semibold text-red-800 mb-2">Sweet Treats</h3>
                    <p className="text-red-600 text-sm">Desserts & More</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-amber-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-300 rounded-full opacity-25 animate-pulse"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6 font-serif">Everything You Need</h2>
            <p className="text-xl text-green-600 max-w-2xl mx-auto">
              Powerful features designed to make recipe management effortless and enjoyable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group bg-white/80 backdrop-blur-sm border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors duration-300">
                    <feature.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-4">{feature.title}</h3>
                  <p className="text-green-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-12 text-center text-white animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-serif">Join the Culinary Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">∞</div>
                <p className="text-green-100">Unlimited Recipes</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
                <p className="text-green-100">Offline Ready</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">0</div>
                <p className="text-green-100">Cost Forever</p>
              </div>
            </div>
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-white text-green-700 hover:bg-green-50 px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105"
            >
              <Star className="w-5 h-5 mr-2" />
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <ChefHat className="w-8 h-8" />
              <h3 className="text-2xl font-bold font-serif">Recipe Book</h3>
            </div>
            <p className="text-green-200 mb-6 max-w-2xl mx-auto">
              Your personal culinary companion for discovering, creating, and organizing recipes. Built with love for
              food enthusiasts everywhere.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-green-300">
              <span>Made with ❤️ for cooking enthusiasts</span>
              <span>•</span>
              <span>100% Free & Open Source</span>
              <span>•</span>
              <span>No Registration Required</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
