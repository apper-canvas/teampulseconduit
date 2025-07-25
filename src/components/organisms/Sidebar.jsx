import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const Sidebar = ({ isOpen, onClose }) => {
  const navigation = [
    { name: "All Employees", href: "/employees", icon: "Users" },
    { name: "Departments", href: "/departments", icon: "Building2" },
    { name: "Export Data", href: "/export", icon: "Download" }
  ]

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="px-6 py-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <ApperIcon name="Users" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              TeamPulse
            </h2>
            <p className="text-xs text-gray-500">Employee Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            onClick={() => onClose?.()}
            className={({ isActive }) => cn(
              "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            )}
          >
            {({ isActive }) => (
              <>
                <ApperIcon 
                  name={item.icon} 
                  className={cn(
                    "w-5 h-5",
                    isActive ? "text-white" : "text-gray-400"
                  )} 
                />
                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto px-6 py-4">
        <div className="text-xs text-gray-400">
          © 2024 TeamPulse
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-white lg:border-r lg:border-gray-200 lg:h-screen">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Users" className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-display font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                  TeamPulse
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <nav className="px-4 py-4 space-y-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className={({ isActive }) => cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    )}
                  >
                    {({ isActive }) => (
                      <>
                        <ApperIcon 
                          name={item.icon} 
                          className={cn(
                            "w-5 h-5",
                            isActive ? "text-white" : "text-gray-400"
                          )} 
                        />
                        <span>{item.name}</span>
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}

export default Sidebar