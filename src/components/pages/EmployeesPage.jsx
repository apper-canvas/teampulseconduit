import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { employeeService } from "@/services/api/employeeService";
import { departmentService } from "@/services/api/departmentService";
import ApperIcon from "@/components/ApperIcon";
import Header from "@/components/organisms/Header";
import EmployeeCard from "@/components/organisms/EmployeeCard";
import EmployeeList from "@/components/organisms/EmployeeList";
import FilterBar from "@/components/organisms/FilterBar";
import EmployeeModal from "@/components/organisms/EmployeeModal";
import Button from "@/components/atoms/Button";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import OnboardingChecklist from "@/components/organisms/OnboardingChecklist";
const EmployeesPage = () => {
  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [view, setView] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
const [selectedRole, setSelectedRole] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    filterEmployees()
  }, [employees, searchQuery, selectedDepartment, selectedRole])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [employeesData, departmentsData] = await Promise.all([
        employeeService.getAll(),
        departmentService.getAll()
      ])
      setEmployees(employeesData)
      setDepartments(departmentsData)
    } catch (err) {
      setError("Failed to load employee data")
      console.error("Load error:", err)
    } finally {
      setLoading(false)
    }
  }

  const filterEmployees = () => {
    let filtered = employees

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(employee =>
        employee.firstName.toLowerCase().includes(query) ||
        employee.lastName.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.role.toLowerCase().includes(query)
      )
    }

    if (selectedDepartment) {
      filtered = filtered.filter(employee => employee.department === selectedDepartment)
    }

    if (selectedRole) {
      filtered = filtered.filter(employee => employee.role === selectedRole)
    }

    setFilteredEmployees(filtered)
  }

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee)
    setShowModal(true)
  }

  const handleAddEmployee = () => {
    setSelectedEmployee(null)
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
    setSelectedEmployee(null)
  }
const handleModalSave = () => {
    loadData()
  }

  const handleOnboardingUpdate = async (onboardingProgress) => {
    if (!selectedEmployee) return
    
    try {
      await employeeService.updateOnboardingProgress(selectedEmployee.Id, onboardingProgress)
      // Update the selected employee with new progress
      setSelectedEmployee(prev => ({
        ...prev,
        onboardingProgress
      }))
      await loadData()
    } catch (error) {
      console.error('Failed to update onboarding progress:', error)
      throw error // Re-throw for component error handling
    }
  }

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`
  }

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedDepartment("")
    setSelectedRole("")
  }

  const getAllRoles = () => {
    const roles = [...new Set(employees.map(emp => emp.role))]
    return roles.sort()
  }

  if (loading) return <Loading type="employees" />
  if (error) return <Error message={error} onRetry={loadData} />

  return (
    <div className="p-6 space-y-6">
      <Header
        title="All Employees"
        onSearch={setSearchQuery}
        view={view}
        onViewChange={setView}
        showViewToggle={true}
        showSearch={true}
        actions={[
          <Button key="add" onClick={handleAddEmployee}>
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        ]}
      />

      <FilterBar
        departments={departments}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        roles={getAllRoles()}
        onClearFilters={handleClearFilters}
      />

      {filteredEmployees.length === 0 ? (
        <Empty
          title="No employees found"
          description={searchQuery || selectedDepartment || selectedRole
            ? "Try adjusting your search or filter criteria."
            : "Get started by adding your first employee to the system."
          }
          icon="Users"
          action={
            <Button onClick={handleAddEmployee}>
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          }
        />
      ) : (
        <>
          {view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEmployees.map((employee) => (
                <EmployeeCard
                  key={employee.Id}
                  employee={employee}
                  onClick={handleEmployeeClick}
                  onEmail={handleEmail}
                  onCall={handleCall}
                />
              ))}
            </div>
          ) : (
            <EmployeeList
              employees={filteredEmployees}
              onEmployeeClick={handleEmployeeClick}
              onEmail={handleEmail}
              onCall={handleCall}
            />
          )}
        </>
      )}
<EmployeeModal
        employee={selectedEmployee}
        isOpen={showModal}
        onClose={handleModalClose}
        onSave={handleModalSave}
        onShowOnboarding={() => setShowOnboarding(true)}
      />

      {/* Onboarding Modal */}
      {showOnboarding && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Onboarding Progress
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedEmployee.firstName} {selectedEmployee.lastName}
                  </p>
                </div>
                <button
                  onClick={() => setShowOnboarding(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <OnboardingChecklist
                employee={selectedEmployee}
                onProgressUpdate={handleOnboardingUpdate}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmployeesPage