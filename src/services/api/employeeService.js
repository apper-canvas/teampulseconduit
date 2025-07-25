import employeesData from "@/services/mockData/employees.json"

class EmployeeService {
  constructor() {
    this.employees = [...employeesData]
  }

  async getAll() {
    await this.delay(300)
    return [...this.employees]
  }

  async getById(id) {
    await this.delay(200)
    const employee = this.employees.find(emp => emp.Id === parseInt(id))
    if (!employee) {
      throw new Error("Employee not found")
    }
    return { ...employee }
  }

async create(employeeData) {
    await this.delay(400)
    const newId = Math.max(...this.employees.map(emp => emp.Id)) + 1
    const defaultOnboardingSteps = [
      { id: 1, title: 'Complete Personal Information', description: 'Fill out all required personal details and emergency contacts', completed: false },
      { id: 2, title: 'Review Company Handbook', description: 'Read and acknowledge the employee handbook and policies', completed: false },
      { id: 3, title: 'Set Up IT Equipment', description: 'Configure laptop, email, and access to necessary systems', completed: false },
      { id: 4, title: 'Complete HR Paperwork', description: 'Submit tax forms, benefits enrollment, and other required documents', completed: false },
      { id: 5, title: 'Attend Orientation Session', description: 'Participate in company orientation and meet team members', completed: false },
      { id: 6, title: 'Complete Security Training', description: 'Finish required security awareness and compliance training', completed: false },
      { id: 7, title: 'Manager Check-in', description: 'Schedule and complete initial check-in with direct manager', completed: false }
    ]
    const newEmployee = {
      Id: newId,
      ...employeeData,
      managerId: employeeData.managerId || "",
      onboardingProgress: employeeData.onboardingProgress || defaultOnboardingSteps
    }
    this.employees.push(newEmployee)
    return { ...newEmployee }
  }

async update(id, employeeData) {
    await this.delay(400)
    const index = this.employees.findIndex(emp => emp.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Employee not found")
    }
    this.employees[index] = { ...this.employees[index], ...employeeData }
    return { ...this.employees[index] }
  }

  async updateOnboardingProgress(id, onboardingProgress) {
    await this.delay(300)
    const index = this.employees.findIndex(emp => emp.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Employee not found")
    }
    this.employees[index] = { 
      ...this.employees[index], 
      onboardingProgress 
    }
    return { ...this.employees[index] }
  }

  async delete(id) {
    await this.delay(300)
    const index = this.employees.findIndex(emp => emp.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Employee not found")
    }
    this.employees.splice(index, 1)
    return true
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const employeeService = new EmployeeService()