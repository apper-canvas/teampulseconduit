import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { employeeService } from "@/services/api/employeeService";
import ApperIcon from "@/components/ApperIcon";
import Header from "@/components/organisms/Header";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";

const ExportPage = () => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await employeeService.getAll()
      
      // Transform data to match UI expectations
      const transformedEmployees = data.map(emp => ({
        ...emp,
        firstName: emp.first_name_c || '',
        lastName: emp.last_name_c || '',
        email: emp.email_c || '',
        phone: emp.phone_c || '',
        photoUrl: emp.photo_url_c || '',
        role: emp.role_c || '',
        department: emp.department_c || '',
        startDate: emp.start_date_c || '',
        status: emp.status_c || 'active'
      }))
      
      setEmployees(transformedEmployees)
    } catch (err) {
      setError("Failed to load employee data")
      console.error("Load error:", err)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    if (employees.length === 0) {
      toast.warning("No employee data to export")
      return
    }

    setExporting(true)

    try {
      // CSV headers
      const headers = [
        "ID",
        "First Name",
        "Last Name",
        "Email",
        "Phone",
        "Role",
        "Department",
        "Start Date",
        "Status"
      ]

      // Convert employees to CSV rows
const csvRows = employees.map(employee => [
        employee.Id,
        employee.firstName || employee.first_name_c,
        employee.lastName || employee.last_name_c,
        employee.email || employee.email_c,
        employee.phone || employee.phone_c,
        employee.role || employee.role_c,
        employee.department || employee.department_c,
        format(new Date(employee.startDate || employee.start_date_c), "yyyy-MM-dd"),
        employee.status || employee.status_c
      ])

      // Combine headers and rows
      const csvContent = [headers, ...csvRows]
        .map(row => row.map(field => `"${field}"`).join(","))
        .join("\n")

      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      
      link.setAttribute("href", url)
      link.setAttribute("download", `employees_${format(new Date(), "yyyy-MM-dd")}.csv`)
      link.style.visibility = "hidden"
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast.success("Employee data exported successfully!")
    } catch (err) {
      toast.error("Failed to export employee data")
      console.error("Export error:", err)
    } finally {
      setExporting(false)
    }
  }

  if (loading) return <Loading type="export" />
  if (error) return <Error message={error} onRetry={loadData} />

  return (
    <div className="p-6 space-y-6">
      <Header
        title="Export Data"
        actions={[
          <Button key="refresh" variant="ghost" onClick={loadData}>
            <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Options */}
        <Card className="p-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-100 to-accent-200 rounded-lg flex items-center justify-center">
                <ApperIcon name="Download" className="w-6 h-6 text-accent-600" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold text-gray-900">
                  Employee Data Export
                </h3>
                <p className="text-gray-600">Download complete employee information as CSV</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Export includes:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center space-x-2">
                    <ApperIcon name="Check" className="w-4 h-4 text-green-500" />
                    <span>Personal information (name, email, phone)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ApperIcon name="Check" className="w-4 h-4 text-green-500" />
                    <span>Job details (role, department)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ApperIcon name="Check" className="w-4 h-4 text-green-500" />
                    <span>Employment dates and status</span>
                  </li>
<li className="flex items-center space-x-2">
                    <ApperIcon name="Check" className="w-4 h-4 text-green-500" />
                    <span>Complete data export</span>
                  </li>
                </ul>
              </div>

              <Button
                onClick={exportToCSV}
                disabled={exporting || employees.length === 0}
                className="w-full"
                size="lg"
              >
                {exporting ? (
                  <ApperIcon name="Loader2" className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <ApperIcon name="Download" className="w-5 h-5 mr-2" />
                )}
                {exporting ? "Exporting..." : "Export Employee Data"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Data Summary */}
        <Card className="p-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                <ApperIcon name="BarChart3" className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold text-gray-900">
                  Data Summary
                </h3>
                <p className="text-gray-600">Overview of exportable data</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                  {employees.length}
                </div>
                <div className="text-sm text-primary-600 font-medium">Total Employees</div>
              </div>

<div className="bg-gradient-to-r from-accent-50 to-accent-100 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-accent-600 to-accent-700 bg-clip-text text-transparent">
                  {employees.filter(emp => (emp.status || emp.status_c) === "active").length}
                </div>
                <div className="text-sm text-accent-600 font-medium">Active Employees</div>
              </div>

              <div className="bg-gradient-to-r from-secondary-50 to-secondary-100 rounded-lg p-4 text-center">
<div className="text-2xl font-bold bg-gradient-to-r from-secondary-600 to-secondary-700 bg-clip-text text-transparent">
                  {[...new Set(employees.map(emp => emp.department || emp.department_c))].length}
                </div>
                <div className="text-sm text-secondary-600 font-medium">Departments</div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">
                  {[...new Set(employees.map(emp => emp.role || emp.role_c))].length}
                </div>
                <div className="text-sm text-gray-600 font-medium">Unique Roles</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Last updated:</h4>
              <p className="text-sm text-gray-600">
                {format(new Date(), "MMMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      {employees.length > 0 && (
        <Card className="p-8">
          <h3 className="text-lg font-display font-semibold text-gray-900 mb-6">
            Recent Additions
          </h3>
          <div className="space-y-4">
            {employees
              .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
              .slice(0, 5)
              .map((employee) => (
                <div key={employee.Id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
<div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
                      {(employee.photoUrl || employee.photo_url_c) ? (
                        <img 
                          src={employee.photoUrl || employee.photo_url_c} 
                          alt={`${employee.firstName || employee.first_name_c} ${employee.lastName || employee.last_name_c}`}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <ApperIcon name="User" className="w-5 h-5 text-primary-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {employee.firstName || employee.first_name_c} {employee.lastName || employee.last_name_c}
                      </div>
                      <div className="text-sm text-gray-500">
                        {employee.role || employee.role_c} • {employee.department || employee.department_c}
</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Started {format(new Date(employee.startDate || employee.start_date_c), "MMM d, yyyy")}
                  </div>
                </div>
              ))}
          </div>
        </Card>
      )}
    </div>
  )
}

export default ExportPage