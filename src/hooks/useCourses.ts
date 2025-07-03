import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface CourseReview {
  id: string;
  rating: number;
  comment: string | null;
  profile_id: string;
  course_id: string;
  profiles?: {
    full_name: string;
    avatar_url: string | null;
  };
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  instructor_id: string;
  instructor_name?: string;
  instructor_avatar?: string | null; // Added for instructor image
  category: string;
  level: string;
  price: number;
  original_price: number | null;
  image_url: string | null;
  duration: string | null;
  language: string;
  is_published: boolean;
  is_bestseller: boolean;
  is_new: boolean;
  rating?: number;
  student_count?: number;
  review_count?: number; // Added for review count
  created_at: string;
  updated_at: string;
  course_reviews?: CourseReview[];
  // Properties for CourseDetailPage mock data structure
  reviews?: number;
  students?: number;
  image?: string;
  originalPrice?: number;
  whatYouWillLearn?: string[];
  curriculum?: CourseSection[];
  requirements?: string[];
  features?: string[];
  lectures?: number;
  instructor?: {
    name: string;
    bio: string;
    students: number;
    courses: number;
    rating: number;
    image: string;
  };
  tags?: string[]; // Added tags property
}

export interface CourseSection {
  id: string;
  title: string;
  lectures: number;
  duration: string;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  preview: boolean;
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);

      // Fetch courses with instructor information and stats
      const { data, error } = await supabase
        .from('courses')
        .select(
          `
          *,
          profiles!courses_instructor_id_fkey(full_name),
          course_reviews(rating),
          enrollments(id)
        `
        )
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Process the data to include calculated fields
      const processedCourses =
        data?.map((course) => ({
          ...course,
          instructor_name: course.profiles?.full_name || 'Unknown Instructor',
          rating:
            course.course_reviews?.length > 0
              ? course.course_reviews.reduce(
                  (sum: number, review: CourseReview) => sum + review.rating,
                  0
                ) / course.course_reviews.length
              : 0,
          student_count: course.enrollments?.length || 0,
        })) || [];

      setCourses(processedCourses);
    } catch (err: unknown) {
      console.error('Error fetching courses:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getCourseById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(
          `
          *,
          profiles!courses_instructor_id_fkey(full_name, avatar_url),
          sections(
            *,
            lessons(*)
          ),
          course_reviews(
            *,
            profiles(full_name, avatar_url)
          ),
          enrollments(id)
        `
        )
        .eq('id', id)
        .single();

      if (error) throw error;

      return {
        ...data,
        instructor_name: data.profiles?.full_name || 'Unknown Instructor',
        instructor_avatar: data.profiles?.avatar_url,
        rating:
          data.course_reviews?.length > 0
            ? data.course_reviews.reduce(
                (sum: number, review: CourseReview) => sum + review.rating,
                0
              ) / data.course_reviews.length
            : 0,
        student_count: data.enrollments?.length || 0,
        review_count: data.course_reviews?.length || 0,
      };
    } catch (err: unknown) {
      console.error('Error fetching course by ID:', err);
      throw new Error(err instanceof Error ? err.message : 'Failed to fetch course');
    }
  };

  const searchCourses = async (
    query: string,
    filters?: {
      category?: string;
      level?: string;
      priceRange?: [number, number];
      rating?: number;
    }
  ) => {
    try {
      let queryBuilder = supabase
        .from('courses')
        .select(
          `
          *,
          profiles!courses_instructor_id_fkey(full_name),
          course_reviews(rating),
          enrollments(id)
        `
        )
        .eq('is_published', true);

      if (query) {
        queryBuilder = queryBuilder.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
      }

      if (filters?.category) {
        queryBuilder = queryBuilder.eq('category', filters.category);
      }

      if (filters?.level) {
        queryBuilder = queryBuilder.eq('level', filters.level);
      }

      if (filters?.priceRange) {
        queryBuilder = queryBuilder
          .gte('price', filters.priceRange[0])
          .lte('price', filters.priceRange[1]);
      }

      const { data, error } = await queryBuilder.order('created_at', { ascending: false });

      if (error) throw error;

      const processedCourses =
        data?.map((course) => ({
          ...course,
          instructor_name: course.profiles?.full_name || 'Unknown Instructor',
          rating:
            course.course_reviews?.length > 0
              ? course.course_reviews.reduce(
                  (sum: number, review: { rating: number }) => sum + review.rating,
                  0
                ) / course.course_reviews.length
              : 0,
          student_count: course.enrollments?.length || 0,
        })) || [];

      // Filter by rating if specified
      if (filters?.rating !== undefined) {
        const minRating = filters.rating;
        return processedCourses.filter(
          (course) => course.rating !== undefined && course.rating >= minRating
        );
      }

      return processedCourses;
    } catch (err: unknown) {
      console.error('Error searching courses:', err);
      throw new Error(err instanceof Error ? err.message : 'Failed to fetch course');
    }
  };

  return {
    courses,
    loading,
    error,
    fetchCourses,
    getCourseById,
    searchCourses,
  };
}
