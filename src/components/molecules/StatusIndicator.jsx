import { cn } from "@/utils/cn"

const StatusIndicator = ({ status, size = "sm" }) => {
  const sizes = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4"
  }

  const colors = {
    active: "bg-green-500",
    inactive: "bg-gray-400"
  }

  return (
    <div className={cn(
      "rounded-full",
      sizes[size],
      colors[status] || colors.inactive
    )} />
  )
}

export default StatusIndicator