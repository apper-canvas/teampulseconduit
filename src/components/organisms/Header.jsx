import { useState } from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import SearchBar from "@/components/molecules/SearchBar"
import ViewToggle from "@/components/molecules/ViewToggle"
import Button from "@/components/atoms/Button"

const Header = ({ 
  title, 
  onSearch, 
  view, 
  onViewChange, 
  showViewToggle = false,
  showSearch = false,
  actions = []
}) => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {title}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Desktop Search */}
          {showSearch && (
            <div className="hidden md:block">
              <SearchBar 
                placeholder="Search employees..." 
                onSearch={onSearch}
                className="w-80"
              />
            </div>
          )}

          {/* Mobile Search Toggle */}
          {showSearch && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="md:hidden"
            >
              <ApperIcon name="Search" className="w-5 h-5" />
            </Button>
          )}

          {showViewToggle && <ViewToggle view={view} onViewChange={onViewChange} />}

          {actions.map((action, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {action}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Search */}
      {showSearch && isMobileSearchOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 md:hidden"
        >
          <SearchBar 
            placeholder="Search employees..." 
            onSearch={onSearch}
          />
        </motion.div>
      )}
    </div>
  )
}

export default Header