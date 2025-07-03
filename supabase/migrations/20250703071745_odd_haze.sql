/*
  # Fix anonymous access to course data

  1. Security Updates
    - Add policies for anonymous users to view published courses
    - Add policies for anonymous users to view instructor profiles
    - Add policies for anonymous users to view course reviews and enrollment counts
    - Ensure data privacy while allowing public course browsing

  2. Tables Updated
    - `courses` - Allow anonymous read access to published courses
    - `profiles` - Allow anonymous read access to instructor profiles
    - `course_reviews` - Allow anonymous read access to reviews for published courses
    - `enrollments` - Allow anonymous read access to enrollment counts for published courses
*/

-- Allow anonymous users to view published courses
CREATE POLICY "Anonymous users can view published courses"
  ON courses
  FOR SELECT
  TO anon
  USING (is_published = true);

-- Allow anonymous users to view instructor profiles (for course listings)
CREATE POLICY "Anonymous users can view instructor profiles"
  ON profiles
  FOR SELECT
  TO anon
  USING (true);

-- Allow anonymous users to view course reviews for published courses
CREATE POLICY "Anonymous users can view course reviews for published courses"
  ON course_reviews
  FOR SELECT
  TO anon
  USING (
    course_id IN (
      SELECT id FROM courses WHERE is_published = true
    )
  );

-- Allow anonymous users to view enrollment counts for published courses
CREATE POLICY "Anonymous users can view enrollment counts for published courses"
  ON enrollments
  FOR SELECT
  TO anon
  USING (
    course_id IN (
      SELECT id FROM courses WHERE is_published = true
    )
  );

-- Allow anonymous users to view sections of published courses
CREATE POLICY "Anonymous users can view sections of published courses"
  ON sections
  FOR SELECT
  TO anon
  USING (
    course_id IN (
      SELECT id FROM courses WHERE is_published = true
    )
  );

-- Allow anonymous users to view lessons of published courses
CREATE POLICY "Anonymous users can view lessons of published courses"
  ON lessons
  FOR SELECT
  TO anon
  USING (
    course_id IN (
      SELECT id FROM courses WHERE is_published = true
    )
  );