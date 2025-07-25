import { motion } from "framer-motion"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import StatusIndicator from "@/components/molecules/StatusIndicator"
import ApperIcon from "@/components/ApperIcon"
import { format } from "date-fns"

const EmployeeCard = ({ employee, onClick, onEmail, onCall }) => {
  const handleQuickAction = (e, action) => {
    e.stopPropagation()
    action()
  }

  return (
    <Card onClick={() => onClick(employee)} className="p-6 group">
      <div className="flex flex-col items-center space-y-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
            {employee.photoUrl ? (
              <img 
                src={employee.photoUrl} 
                alt={`${employee.firstName} ${employee.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <ApperIcon name="User" className="w-8 h-8 text-primary-600" />
            )}
          </div>
          <div className="absolute -bottom-1 -right-1">
            <StatusIndicator status={employee.status} size="md" />
          </div>
        </div>

        {/* Employee Info */}
        <div className="text-center space-y-2">
          <h3 className="font-display font-semibold text-gray-900 text-lg">
            {employee.firstName} {employee.lastName}
          </h3>
          <p className="text-sm text-gray-600">{employee.role}</p>
          <Badge variant="primary">{employee.department}</Badge>
        </div>

        {/* Contact Info */}
        <div className="w-full space-y-1 text-center">
          <p className="text-xs text-gray-500">{employee.email}</p>
          <p className="text-xs text-gray-500">{employee.phone}</p>
          <p className="text-xs text-gray-500">
            Started {format(new Date(employee.startDate), "MMM yyyy")}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => handleQuickAction(e, () => onEmail(employee.email))}
            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
            title="Send Email"
          >
            <ApperIcon name="Mail" className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => handleQuickAction(e, () => onCall(employee.phone))}
            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
            title="Call"
          >
            <ApperIcon name="Phone" className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => handleQuickAction(e, () => onClick(employee))}
            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            title="Edit"
          >
            <ApperIcon name="Edit" className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </Card>
  )
}

export default EmployeeCard