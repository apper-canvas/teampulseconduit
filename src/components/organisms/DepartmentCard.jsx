import { motion } from "framer-motion"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const DepartmentCard = ({ department, employees, onClick }) => {
  const departmentEmployees = employees.filter(emp => emp.department === department.name)
  const headEmployee = departmentEmployees.find(emp => emp.Id === department.headId)
  
  return (
    <Card onClick={() => onClick(department)} className="p-6 group">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-lg flex items-center justify-center">
              <ApperIcon name="Building2" className="w-6 h-6 text-secondary-600" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-gray-900 text-lg">
                {department.name}
              </h3>
              {headEmployee && (
                <p className="text-sm text-gray-600">
                  Head: {headEmployee.firstName} {headEmployee.lastName}
                </p>
              )}
            </div>
          </div>
          <Badge variant="secondary">
            {departmentEmployees.length} {departmentEmployees.length === 1 ? "member" : "members"}
          </Badge>
        </div>

        {/* Description */}
        {department.description && (
          <p className="text-sm text-gray-600 leading-relaxed">
            {department.description}
          </p>
        )}

        {/* Team Members Preview */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Team Members</h4>
          
          {departmentEmployees.length > 0 ? (
            <>
              {/* Avatar Stack */}
              <div className="flex -space-x-2">
                {departmentEmployees.slice(0, 5).map((employee) => (
                  <div
                    key={employee.Id}
                    className="w-8 h-8 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full border-2 border-white flex items-center justify-center"
                    title={`${employee.firstName} ${employee.lastName}`}
                  >
                    {employee.photoUrl ? (
                      <img 
                        src={employee.photoUrl} 
                        alt={`${employee.firstName} ${employee.lastName}`}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-medium text-primary-600">
                        {employee.firstName[0]}{employee.lastName[0]}
                      </span>
                    )}
                  </div>
                ))}
                {departmentEmployees.length > 5 && (
                  <div className="w-8 h-8 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">
                      +{departmentEmployees.length - 5}
                    </span>
                  </div>
                )}
              </div>

              {/* Member List */}
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {departmentEmployees.slice(0, 6).map((employee) => (
                  <div key={employee.Id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">
                      {employee.firstName} {employee.lastName}
                    </span>
                    <span className="text-gray-500">{employee.role}</span>
                  </div>
                ))}
                {departmentEmployees.length > 6 && (
                  <div className="text-xs text-gray-500 italic">
                    and {departmentEmployees.length - 6} more...
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-500 italic">
              No team members assigned
            </div>
          )}
        </div>

        {/* View Details Button */}
        <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg text-sm font-medium hover:from-secondary-600 hover:to-secondary-700 transition-all duration-200"
          >
            View Department Details
          </motion.button>
        </div>
      </div>
    </Card>
  )
}

export default DepartmentCard