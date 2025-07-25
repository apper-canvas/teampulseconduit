import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { employeeService } from "@/services/api/employeeService"
import { departmentService } from "@/services/api/departmentService"
import { format } from "date-fns"

const EmployeeModal = ({ employee, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    startDate: "",
    status: "active"
  })
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        phone: employee.phone || "",
        role: employee.role || "",
        department: employee.department || "",
        startDate: employee.startDate ? format(new Date(employee.startDate), "yyyy-MM-dd") : "",
        status: employee.status || "active"
      })
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "",
        department: "",
        startDate: format(new Date(), "yyyy-MM-dd"),
        status: "active"
      })
    }

    loadDepartments()
  }, [employee])

  const loadDepartments = async () => {
    try {
      const data = await departmentService.getAll()
      setDepartments(data)
    } catch (error) {
      console.error("Failed to load departments:", error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const employeeData = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString()
      }

      if (employee) {
        await employeeService.update(employee.Id, employeeData)
        toast.success("Employee updated successfully!")
      } else {
        await employeeService.create(employeeData)
        toast.success("Employee created successfully!")
      }

      onSave()
      onClose()
    } catch (error) {
      toast.error("Failed to save employee")
      console.error("Save error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!employee || !window.confirm("Are you sure you want to delete this employee?")) return

    setLoading(true)
    try {
      await employeeService.delete(employee.Id)
      toast.success("Employee deleted successfully!")
      onSave()
      onClose()
    } catch (error) {
      toast.error("Failed to delete employee")
      console.error("Delete error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-display font-bold">
                {employee ? "Edit Employee" : "Add New Employee"}
              </h2>
              <p className="text-primary-100 mt-1">
                {employee ? "Update employee information" : "Create a new employee record"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-primary-100 hover:text-white hover:bg-primary-600 rounded-lg transition-colors"
            >
              <ApperIcon name="X" className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="px-8 py-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              
              <Input
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              />
              
              <Select
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.Id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
              
              <Select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div>
                {employee && (
                  <Button
                    type="button"
                    variant="danger"
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
                    Delete Employee
                  </Button>
                )}
              </div>
              
              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <ApperIcon name="Save" className="w-4 h-4 mr-2" />
                  )}
                  {employee ? "Update" : "Create"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default EmployeeModal