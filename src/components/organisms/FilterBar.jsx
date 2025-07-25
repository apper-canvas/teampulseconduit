import { motion } from "framer-motion"
import FilterSelect from "@/components/molecules/FilterSelect"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const FilterBar = ({ 
  departments, 
  selectedDepartment, 
  onDepartmentChange, 
  selectedRole, 
  onRoleChange, 
  roles, 
  onClearFilters 
}) => {
  const departmentOptions = departments.map(dept => ({
    value: dept.name,
    label: dept.name
  }))

  const roleOptions = roles.map(role => ({
    value: role,
    label: role
  }))

  const hasActiveFilters = selectedDepartment || selectedRole

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <FilterSelect
            label="Department"
            value={selectedDepartment}
            onChange={(e) => onDepartmentChange(e.target.value)}
            options={departmentOptions}
            placeholder="All Departments"
          />
          
          <FilterSelect
            label="Role"
            value={selectedRole}
            onChange={(e) => onRoleChange(e.target.value)}
            options={roleOptions}
            placeholder="All Roles"
          />
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={onClearFilters}
            className="sm:mb-0 sm:self-end"
          >
            <ApperIcon name="X" className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>
    </motion.div>
  )
}

export default FilterBar