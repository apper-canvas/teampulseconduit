import { motion } from "framer-motion"

const Loading = ({ type = "employees" }) => {
  const renderEmployeesSkeleton = () => (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48 animate-pulse"></div>
        <div className="flex space-x-4">
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32 animate-pulse"></div>
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-24 animate-pulse"></div>
        </div>
      </div>

      {/* Search and filters skeleton */}
      <div className="flex space-x-4 mb-6">
        <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex-1 animate-pulse"></div>
        <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48 animate-pulse"></div>
        <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32 animate-pulse"></div>
      </div>

      {/* Employee cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
              <div className="w-32 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
              <div className="w-24 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
              <div className="w-20 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderDepartmentsSkeleton = () => (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48 animate-pulse"></div>
        <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32 animate-pulse"></div>
      </div>

      {/* Department cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-32 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                <div className="w-12 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
              </div>
              <div className="w-48 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
              <div className="space-y-2">
                <div className="w-24 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
                <div className="w-36 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
              </div>
              <div className="flex -space-x-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="animate-fade-in">
      {type === "employees" && renderEmployeesSkeleton()}
      {type === "departments" && renderDepartmentsSkeleton()}
      {type === "export" && (
        <div className="space-y-6">
          <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48 animate-pulse"></div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
            <div className="space-y-4">
              <div className="w-64 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
              <div className="w-96 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
              <div className="w-32 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Loading