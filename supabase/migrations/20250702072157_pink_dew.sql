/*
  # Create courses and related tables

  1. New Tables
    - `courses`
      - `id` (uuid, primary key)
      - `title` (text)
      - `subtitle` (text, nullable)
      - `description` (text, nullable)
      - `instructor_id` (uuid, foreign key to profiles)
      - `category` (text)
      - `level` (text)
      - `price` (numeric)
      - `original_price` (numeric, nullable)
      - `image_url` (text, nullable)
      - `duration` (text, nullable)
      - `language` (text, default 'English')
      - `is_published` (boolean, default false)
      - `is_bestseller` (boolean, default false)
      - `is_new` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `sections`
      - `id` (uuid, primary key)
      - `course_id` (uuid, foreign key to courses)
      - `title` (text)
      - `description` (text, nullable)
      - `order_index` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `lessons`
      - `id` (uuid, primary key)
      - `course_id` (uuid, foreign key to courses)
      - `section_id` (uuid, foreign key to sections)
      - `title` (text)
      - `description` (text, nullable)
      - `video_url` (text, nullable)
      - `duration` (text, nullable)
      - `order_index` (integer)
      - `is_preview` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `enrollments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `course_id` (uuid, foreign key to courses)
      - `enrolled_at` (timestamp)
      - `progress` (numeric, default 0)
      - `completed_at` (timestamp, nullable)
      - `last_accessed` (timestamp, nullable)

    - `course_reviews`
      - `id` (uuid, primary key)
      - `course_id` (uuid, foreign key to courses)
      - `user_id` (uuid, foreign key to profiles)
      - `rating` (integer)
      - `comment` (text, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  description text,
  instructor_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  category text NOT NULL,
  level text NOT NULL,
  price numeric(10,2) NOT NULL DEFAULT 0.00,
  original_price numeric(10,2),
  image_url text,
  duration text,
  language text DEFAULT 'English',
  is_published boolean DEFAULT false,
  is_bestseller boolean DEFAULT false,
  is_new boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sections table
CREATE TABLE IF NOT EXISTS sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  section_id uuid NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  video_url text,
  duration text,
  order_index integer NOT NULL,
  is_preview boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at timestamptz DEFAULT now(),
  progress numeric(5,2) DEFAULT 0.00,
  completed_at timestamptz,
  last_accessed timestamptz,
  UNIQUE(user_id, course_id)
);

-- Create course_reviews table
CREATE TABLE IF NOT EXISTS course_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(course_id, user_id)
);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_reviews ENABLE ROW LEVEL SECURITY;

-- Courses policies
CREATE POLICY "Anyone can view published courses"
  ON courses
  FOR SELECT
  TO public
  USING (is_published = true);

CREATE POLICY "Instructors can manage their own courses"
  ON courses
  FOR ALL
  TO authenticated
  USING (auth.uid() = instructor_id)
  WITH CHECK (auth.uid() = instructor_id);

-- Sections policies
CREATE POLICY "Anyone can view sections of published courses"
  ON sections
  FOR SELECT
  TO public
  USING (
    course_id IN (
      SELECT id FROM courses WHERE is_published = true
    )
  );

CREATE POLICY "Instructors can manage sections of their courses"
  ON sections
  FOR ALL
  TO authenticated
  USING (
    course_id IN (
      SELECT id FROM courses WHERE instructor_id = auth.uid()
    )
  )
  WITH CHECK (
    course_id IN (
      SELECT id FROM courses WHERE instructor_id = auth.uid()
    )
  );

-- Lessons policies
CREATE POLICY "Anyone can view lessons of published courses"
  ON lessons
  FOR SELECT
  TO public
  USING (
    course_id IN (
      SELECT id FROM courses WHERE is_published = true
    )
  );

CREATE POLICY "Instructors can manage lessons of their courses"
  ON lessons
  FOR ALL
  TO authenticated
  USING (
    course_id IN (
      SELECT id FROM courses WHERE instructor_id = auth.uid()
    )
  )
  WITH CHECK (
    course_id IN (
      SELECT id FROM courses WHERE instructor_id = auth.uid()
    )
  );

-- Enrollments policies
CREATE POLICY "Users can view their own enrollments"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own enrollments"
  ON enrollments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own enrollments"
  ON enrollments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Course reviews policies
CREATE POLICY "Anyone can view course reviews"
  ON course_reviews
  FOR SELECT
  TO public;

CREATE POLICY "Authenticated users can create reviews"
  ON course_reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
  ON course_reviews
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews"
  ON course_reviews
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS courses_instructor_id_idx ON courses(instructor_id);
CREATE INDEX IF NOT EXISTS courses_category_idx ON courses(category);
CREATE INDEX IF NOT EXISTS courses_is_published_idx ON courses(is_published);
CREATE INDEX IF NOT EXISTS sections_course_id_idx ON sections(course_id);
CREATE INDEX IF NOT EXISTS lessons_course_id_idx ON lessons(course_id);
CREATE INDEX IF NOT EXISTS lessons_section_id_idx ON lessons(section_id);
CREATE INDEX IF NOT EXISTS enrollments_user_id_idx ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS enrollments_course_id_idx ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS course_reviews_course_id_idx ON course_reviews(course_id);
CREATE INDEX IF NOT EXISTS course_reviews_user_id_idx ON course_reviews(user_id);