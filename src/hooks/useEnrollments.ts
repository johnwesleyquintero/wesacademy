import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export interface Enrollment {
  id: string
  user_id: string
  course_id: string
  enrolled_at: string
  progress: number
  completed_at: string | null
  last_accessed: string | null
  course?: {
    id: string
    title: string
    image_url: string | null
    instructor_name?: string
    duration: string | null
  }
}

export function useEnrollments() {
  const { user } = useAuth()
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      fetchEnrollments()
    } else {
      setEnrollments([])
      setLoading(false)
    }
  }, [user])

  const fetchEnrollments = async () => {
    if (!user) return

    try {
      setLoading(true)
      
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses(
            id,
            title,
            image_url,
            duration,
            profiles!courses_instructor_id_fkey(full_name)
          )
        `)
        .eq('user_id', user.id)
        .order('enrolled_at', { ascending: false })

      if (error) throw error

      const processedEnrollments = data?.map(enrollment => ({
        ...enrollment,
        course: enrollment.courses ? {
          ...enrollment.courses,
          instructor_name: enrollment.courses.profiles?.full_name || 'Unknown Instructor',
        } : undefined,
      })) || []

      setEnrollments(processedEnrollments)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch enrollments')
    } finally {
      setLoading(false)
    }
  }

  const enrollInCourse = async (courseId: string) => {
    if (!user) throw new Error('User must be logged in to enroll')

    try {
      // Check if already enrolled
      const { data: existingEnrollment } = await supabase
        .from('enrollments')
        .select('id')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .single()

      if (existingEnrollment) {
        throw new Error('Already enrolled in this course')
      }

      const { error } = await supabase
        .from('enrollments')
        .insert({
          user_id: user.id,
          course_id: courseId,
          progress: 0,
        })

      if (error) throw error

      // Refresh enrollments
      await fetchEnrollments()
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to enroll in course')
    }
  }

  const updateProgress = async (enrollmentId: string, progress: number) => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .update({
          progress,
          last_accessed: new Date().toISOString(),
          ...(progress >= 100 && { completed_at: new Date().toISOString() }),
        })
        .eq('id', enrollmentId)

      if (error) throw error

      // Refresh enrollments
      await fetchEnrollments()
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update progress')
    }
  }

  const isEnrolled = (courseId: string) => {
    return enrollments.some(enrollment => enrollment.course_id === courseId)
  }

  const getEnrollment = (courseId: string) => {
    return enrollments.find(enrollment => enrollment.course_id === courseId)
  }

  return {
    enrollments,
    loading,
    error,
    enrollInCourse,
    updateProgress,
    isEnrolled,
    getEnrollment,
    fetchEnrollments,
  }
}