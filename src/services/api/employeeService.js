import { toast } from 'react-toastify'

class EmployeeService {
  constructor() {
    const { ApperClient } = window.ApperSDK
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    this.tableName = 'employee_c'
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "first_name_c" } },
          { field: { Name: "last_name_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "photo_url_c" } },
          { field: { Name: "role_c" } },
          { field: { Name: "department_c" } },
          { field: { Name: "start_date_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "manager_id_c" } },
          { field: { Name: "onboarding_progress_c" } }
        ],
        orderBy: [
          {
            fieldName: "Id",
            sorttype: "DESC"
          }
        ]
      }

      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching employees:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return []
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "first_name_c" } },
          { field: { Name: "last_name_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "photo_url_c" } },
          { field: { Name: "role_c" } },
          { field: { Name: "department_c" } },
          { field: { Name: "start_date_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "manager_id_c" } },
          { field: { Name: "onboarding_progress_c" } }
        ]
      }

      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching employee with ID ${id}:`, error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return null
    }
  }

  async create(employeeData) {
    try {
      const defaultOnboardingSteps = [
        { id: 1, title: 'Complete Personal Information', description: 'Fill out all required personal details and emergency contacts', completed: false },
        { id: 2, title: 'Review Company Handbook', description: 'Read and acknowledge the employee handbook and policies', completed: false },
        { id: 3, title: 'Set Up IT Equipment', description: 'Configure laptop, email, and access to necessary systems', completed: false },
        { id: 4, title: 'Complete HR Paperwork', description: 'Submit tax forms, benefits enrollment, and other required documents', completed: false },
        { id: 5, title: 'Attend Orientation Session', description: 'Participate in company orientation and meet team members', completed: false },
        { id: 6, title: 'Complete Security Training', description: 'Finish required security awareness and compliance training', completed: false },
        { id: 7, title: 'Manager Check-in', description: 'Schedule and complete initial check-in with direct manager', completed: false }
      ]

      const params = {
        records: [{
          Name: `${employeeData.first_name_c} ${employeeData.last_name_c}`,
          first_name_c: employeeData.first_name_c,
          last_name_c: employeeData.last_name_c,
          email_c: employeeData.email_c,
          phone_c: employeeData.phone_c,
          photo_url_c: employeeData.photo_url_c || "",
          role_c: employeeData.role_c,
          department_c: employeeData.department_c,
          start_date_c: employeeData.start_date_c,
          status_c: employeeData.status_c,
          manager_id_c: employeeData.manager_id_c ? parseInt(employeeData.manager_id_c) : null,
          onboarding_progress_c: JSON.stringify(employeeData.onboarding_progress_c || defaultOnboardingSteps)
        }]
      }

      const response = await this.apperClient.createRecord(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success)
        const failedRecords = response.results.filter(result => !result.success)
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create employee ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) toast.error(record.message)
          })
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating employee:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return null
    }
  }

  async update(id, employeeData) {
    try {
      const params = {
        records: [{
          Id: parseInt(id),
          Name: employeeData.first_name_c && employeeData.last_name_c ? `${employeeData.first_name_c} ${employeeData.last_name_c}` : undefined,
          first_name_c: employeeData.first_name_c,
          last_name_c: employeeData.last_name_c,
          email_c: employeeData.email_c,
          phone_c: employeeData.phone_c,
          photo_url_c: employeeData.photo_url_c,
          role_c: employeeData.role_c,
          department_c: employeeData.department_c,
          start_date_c: employeeData.start_date_c,
          status_c: employeeData.status_c,
          manager_id_c: employeeData.manager_id_c ? parseInt(employeeData.manager_id_c) : null,
          onboarding_progress_c: employeeData.onboarding_progress_c ? JSON.stringify(employeeData.onboarding_progress_c) : undefined
        }]
      }

      const response = await this.apperClient.updateRecord(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update employee ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) toast.error(record.message)
          })
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating employee:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return null
    }
  }

  async updateOnboardingProgress(id, onboardingProgress) {
    try {
      const params = {
        records: [{
          Id: parseInt(id),
          onboarding_progress_c: JSON.stringify(onboardingProgress)
        }]
      }

      const response = await this.apperClient.updateRecord(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update onboarding progress ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) toast.error(record.message)
          })
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating onboarding progress:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return null
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      }

      const response = await this.apperClient.deleteRecord(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return false
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success)
        const failedDeletions = response.results.filter(result => !result.success)
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete employee ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`)
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message)
          })
        }
        
        return successfulDeletions.length > 0
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting employee:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return false
    }
  }
}

export const employeeService = new EmployeeService()