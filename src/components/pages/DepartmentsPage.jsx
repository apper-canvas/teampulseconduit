import { useState, useEffect } from "react"
import Header from "@/components/organisms/Header"
import DepartmentCard from "@/components/organisms/DepartmentCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { employeeService } from "@/services/api/employeeService"
import { departmentService } from "@/services/api/departmentService"
import { toast } from "react-toastify"

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [departmentsData, employeesData] = await Promise.all([
        departmentService.getAll(),
        employeeService.getAll()
      ])
      setDepartments(departmentsData)
      setEmployees(employeesData)
    } catch (err) {
      setError("Failed to load department data")
      console.error("Load error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDepartmentClick = (department) => {
    const departmentEmployees = employees.filter(emp => emp.department === department.name)
    const employeeList = departmentEmployees.map(emp => `${emp.firstName} ${emp.lastName}`).join(", ")
    
    toast.info(`${department.name} has ${departmentEmployees.length} members: ${employeeList || "No employees"}`, {
      autoClose: 5000
    })
  }

  if (loading) return <Loading type="departments" />
  if (error) return <Error message={error} onRetry={loadData} />

  return (
    <div className="p-6 space-y-6">
      <Header
        title="Departments"
        actions={[
          <Button key="sync" variant="ghost" onClick={loadData}>
            <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        ]}
      />

      {departments.length === 0 ? (
        <Empty
          title="No departments found"
          description="Departments will be automatically created as you add employees to different departments."
          icon="Building2"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((department) => (
            <DepartmentCard
              key={department.Id}
              department={department}
              employees={employees}
              onClick={handleDepartmentClick}
            />
          ))}
        </div>
      )}

      {departments.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
            Department Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                {departments.length}
              </div>
              <div className="text-sm text-gray-600">Total Departments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-accent-600 to-accent-700 bg-clip-text text-transparent">
                {employees.length}
              </div>
              <div className="text-sm text-gray-600">Total Employees</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-secondary-600 to-secondary-700 bg-clip-text text-transparent">
                {employees.length > 0 ? Math.round(employees.length / departments.length) : 0}
              </div>
              <div className="text-sm text-gray-600">Avg per Department</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DepartmentsPage