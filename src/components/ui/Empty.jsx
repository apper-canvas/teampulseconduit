import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "No items found", 
  description = "There are no items to display at the moment.", 
  action,
  icon = "Users"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name={icon} className="w-10 h-10 text-gray-400" />
        </div>
        
        <h3 className="text-xl font-display font-semibold text-gray-900 mb-3 bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {description}
        </p>
        
        {action && (
          <motion.div
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            {action}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Empty