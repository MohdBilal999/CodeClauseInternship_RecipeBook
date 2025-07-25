"use client"

import { useEffect } from "react"
import { CheckCircle, X, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ToastProps {
  message: string
  type: "success" | "error"
  onClose: () => void
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div
        className={`flex items-center gap-3 p-4 rounded-lg shadow-lg border backdrop-blur-sm ${
          type === "success"
            ? "bg-green-50/90 border-green-200 text-green-800"
            : "bg-red-50/90 border-red-200 text-red-800"
        }`}
      >
        {type === "success" ? (
          <CheckCircle className="w-5 h-5 text-green-600" />
        ) : (
          <AlertCircle className="w-5 h-5 text-red-600" />
        )}
        <span className="font-medium">{message}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className={`p-1 h-auto ${
            type === "success"
              ? "text-green-600 hover:text-green-800 hover:bg-green-100"
              : "text-red-600 hover:text-red-800 hover:bg-red-100"
          }`}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
