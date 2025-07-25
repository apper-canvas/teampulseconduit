import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

const Button = React.forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  children, 
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:shadow-xl hover:from-primary-600 hover:to-primary-700",
    secondary: "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-lg hover:shadow-xl hover:from-secondary-600 hover:to-secondary-700",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900",
    outline: "border-2 border-primary-500 text-primary-600 hover:bg-primary-50 hover:text-primary-700",
    success: "bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg hover:shadow-xl hover:from-accent-600 hover:to-accent-700",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700"
  }

  const sizes = {
    sm: "px-3 py-2 text-sm",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
})

Button.displayName = "Button"

export default Button