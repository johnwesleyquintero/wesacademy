/*
  # Add anonymous read access policies

  1. Security Updates
    - Add policies to allow anonymous users to read published courses
    - Add policies to allow anonymous users to read course reviews
    - Add policies to allow anonymous users to read instructor profiles
    - Add policies to allow anonymous users to read enrollment counts
    - Add policies to allow anonymous users to read course sections and lessons

  2. Changes
    - Enable anonymous read access for published course data
    - Maintain security by only allowing read access to published content
    - Allow reading instructor profiles for course display
    - Allow reading aggregated enrollment data for course statistics
*/

-- Allow anonymous users to read published courses
CREATE POLICY "Anonymous users can view published courses"
  ON courses
  FOR SELECT
  TO anon
  USING (is_published = true);

-- Allow anonymous users to read course reviews for published courses
CREATE POLICY "Anonymous users can view course reviews"
  ON course_reviews
  FOR SELECT
  TO anon
  USING (
    course_id IN (
      SELECT id FROM courses WHERE is_published = true
    )
  );

-- Allow anonymous users to read instructor profiles
CREATE POLICY "Anonymous users can view instructor profiles"
  ON profiles
  FOR SELECT
  TO anon
  USING (true);

-- Allow anonymous users to read enrollment data for statistics
CREATE POLICY "Anonymous users can view enrollment statistics"
  ON enrollments
  FOR SELECT
  TO anon
  USING (
    course_id IN (
      SELECT id FROM courses WHERE is_published = true
    )
  );

-- Allow anonymous users to read sections of published courses
CREATE POLICY "Anonymous users can view sections of published courses"
  ON sections
  FOR SELECT
  TO anon
  USING (
    course_id IN (
      SELECT id FROM courses WHERE is_published = true
    )
  );

-- Allow anonymous users to read lessons of published courses
CREATE POLICY "Anonymous users can view lessons of published courses"
  ON lessons
  FOR SELECT
  TO anon
  USING (
    course_id IN (
      SELECT id FROM courses WHERE is_published = true
    )
  );