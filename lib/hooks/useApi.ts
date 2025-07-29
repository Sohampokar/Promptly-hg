'use client'

import { useState, useCallback } from 'react'
import { useAuth } from './useAuth'

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  headers?: Record<string, string>
}

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export function useApi() {
  const { token, logout } = useAuth()
  const [loading, setLoading] = useState(false)

  const apiCall = useCallback(async <T = any>(
    endpoint: string,
    options: ApiOptions = {}
  ): Promise<ApiResponse<T>> => {
    setLoading(true)

    try {
      const { method = 'GET', body, headers = {} } = options

      const config: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        credentials: 'include'
      }

      // Add auth token if available
      if (token) {
        config.headers = {
          ...config.headers,
          'Authorization': `Bearer ${token}`
        }
      }

      // Add body for non-GET requests
      if (body && method !== 'GET') {
        config.body = JSON.stringify(body)
      }

      const response = await fetch(endpoint, config)
      const data = await response.json()

      // Handle authentication errors
      if (response.status === 401) {
        logout()
        return {
          success: false,
          error: 'Authentication required'
        }
      }

      return data
    } catch (error) {
      console.error('API call error:', error)
      return {
        success: false,
        error: 'Network error'
      }
    } finally {
      setLoading(false)
    }
  }, [token, logout])

  return {
    apiCall,
    loading
  }
}

// Specific API hooks
export function useCourses() {
  const { apiCall, loading } = useApi()

  const getCourses = useCallback((filters?: any) => {
    const params = new URLSearchParams(filters).toString()
    return apiCall(`/api/courses${params ? `?${params}` : ''}`)
  }, [apiCall])

  const getCourse = useCallback((courseId: string) => {
    return apiCall(`/api/courses/${courseId}`)
  }, [apiCall])

  const enrollInCourse = useCallback((courseId: string) => {
    return apiCall(`/api/courses/${courseId}/enroll`, { method: 'POST' })
  }, [apiCall])

  return {
    getCourses,
    getCourse,
    enrollInCourse,
    loading
  }
}

export function useProgress() {
  const { apiCall, loading } = useApi()

  const getProgress = useCallback((courseId?: string) => {
    const params = courseId ? `?courseId=${courseId}` : ''
    return apiCall(`/api/progress${params}`)
  }, [apiCall])

  const updateProgress = useCallback((data: any) => {
    return apiCall('/api/progress', {
      method: 'POST',
      body: data
    })
  }, [apiCall])

  return {
    getProgress,
    updateProgress,
    loading
  }
}

export function useProfile() {
  const { apiCall, loading } = useApi()

  const getProfile = useCallback(() => {
    return apiCall('/api/user/profile')
  }, [apiCall])

  const updateProfile = useCallback((data: any) => {
    return apiCall('/api/user/profile', {
      method: 'PUT',
      body: data
    })
  }, [apiCall])

  const getUserCourses = useCallback(() => {
    return apiCall('/api/user/courses')
  }, [apiCall])

  return {
    getProfile,
    updateProfile,
    getUserCourses,
    loading
  }
}