import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          tier: 'Free' | 'Enterprise';
          organization_id: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          tier?: 'Free' | 'Enterprise';
          organization_id?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          tier?: 'Free' | 'Enterprise';
          organization_id?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      courses: {
        Row: {
          id: string;
          title: string;
          subtitle: string | null;
          description: string | null;
          instructor_id: string;
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
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          subtitle?: string | null;
          description?: string | null;
          instructor_id: string;
          category: string;
          level: string;
          price: number;
          original_price?: number | null;
          image_url?: string | null;
          duration?: string | null;
          language?: string;
          is_published?: boolean;
          is_bestseller?: boolean;
          is_new?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          subtitle?: string | null;
          description?: string | null;
          instructor_id?: string;
          category?: string;
          level?: string;
          price?: number;
          original_price?: number | null;
          image_url?: string | null;
          duration?: string | null;
          language?: string;
          is_published?: boolean;
          is_bestseller?: boolean;
          is_new?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      enrollments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          enrolled_at: string;
          progress: number;
          completed_at: string | null;
          last_accessed: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          enrolled_at?: string;
          progress?: number;
          completed_at?: string | null;
          last_accessed?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          course_id?: string;
          enrolled_at?: string;
          progress?: number;
          completed_at?: string | null;
          last_accessed?: string | null;
        };
      };
      lessons: {
        Row: {
          id: string;
          course_id: string;
          section_id: string;
          title: string;
          description: string | null;
          video_url: string | null;
          duration: string | null;
          order_index: number;
          is_preview: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          section_id: string;
          title: string;
          description?: string | null;
          video_url?: string | null;
          duration?: string | null;
          order_index: number;
          is_preview?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          course_id?: string;
          section_id?: string;
          title?: string;
          description?: string | null;
          video_url?: string | null;
          duration?: string | null;
          order_index?: number;
          is_preview?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      sections: {
        Row: {
          id: string;
          course_id: string;
          title: string;
          description: string | null;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          title: string;
          description?: string | null;
          order_index: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          course_id?: string;
          title?: string;
          description?: string | null;
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      course_reviews: {
        Row: {
          id: string;
          course_id: string;
          user_id: string;
          rating: number;
          comment: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          user_id: string;
          rating: number;
          comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          course_id?: string;
          user_id?: string;
          rating?: number;
          comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
