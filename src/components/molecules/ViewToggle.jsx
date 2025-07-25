import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const ViewToggle = ({ view, onViewChange }) => {
  const views = [
    { key: "grid", icon: "Grid3X3", label: "Grid" },
    { key: "list", icon: "List", label: "List" }
  ]

  return (
    <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
      {views.map((viewOption) => (
        <motion.button
          key={viewOption.key}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onViewChange(viewOption.key)}
          className={cn(
            "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
            view === viewOption.key
              ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          )}
        >
          <ApperIcon name={viewOption.icon} className="w-4 h-4" />
          <span className="hidden sm:inline">{viewOption.label}</span>
        </motion.button>
      ))}
    </div>
  )
}

export default ViewToggle