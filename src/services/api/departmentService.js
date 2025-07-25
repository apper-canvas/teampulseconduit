import departmentsData from "@/services/mockData/departments.json"

class DepartmentService {
  constructor() {
    this.departments = [...departmentsData]
  }

  async getAll() {
    await this.delay(250)
    return [...this.departments]
  }

  async getById(id) {
    await this.delay(200)
    const department = this.departments.find(dept => dept.Id === parseInt(id))
    if (!department) {
      throw new Error("Department not found")
    }
    return { ...department }
  }

  async create(departmentData) {
    await this.delay(400)
    const newId = Math.max(...this.departments.map(dept => dept.Id)) + 1
    const newDepartment = {
      Id: newId,
      ...departmentData,
      parentDepartmentId: departmentData.parentDepartmentId || "",
      employeeCount: 0
    }
    this.departments.push(newDepartment)
    return { ...newDepartment }
  }

  async update(id, departmentData) {
    await this.delay(400)
    const index = this.departments.findIndex(dept => dept.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Department not found")
    }
    this.departments[index] = { ...this.departments[index], ...departmentData }
    return { ...this.departments[index] }
  }

  async delete(id) {
    await this.delay(300)
    const index = this.departments.findIndex(dept => dept.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Department not found")
    }
    this.departments.splice(index, 1)
    return true
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

export const departmentService = new DepartmentService()