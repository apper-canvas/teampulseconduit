import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

const Card = React.forwardRef(({ 
  className, 
  hover = true,
  children, 
  ...props 
}, ref) => {
  const CardComponent = hover ? motion.div : "div"
  const hoverProps = hover ? {
    whileHover: { y: -2, scale: 1.01 },
    transition: { duration: 0.2 }
  } : {}

  return (
    <CardComponent
      ref={ref}
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-100 transition-shadow duration-200",
        hover && "hover:shadow-lg cursor-pointer",
        className
      )}
      {...hoverProps}
      {...props}
    >
      {children}
    </CardComponent>
  )
})

Card.displayName = "Card"

export default Card