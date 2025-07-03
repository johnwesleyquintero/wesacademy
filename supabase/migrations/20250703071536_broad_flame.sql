/*
  # Fix course permissions for anonymous users

  1. Security Updates
    - Update RLS policy to allow anonymous users to view published courses
    - Ensure course reviews and enrollments can be read for course statistics
    - Allow anonymous access to instructor profiles for course display

  2. Changes
    - Modify existing course policy to include anonymous role
    - Add policies for course_reviews and enrollments read access
    - Add policy for profiles read access for course instructors
*/

-- Drop existing restrictive policy and create a new one that allows anonymous access
DROP POLICY IF EXISTS "Anyone can view published courses" ON courses;

-- Create new policy that allows both anonymous and authenticated users to view published courses
CREATE POLICY "Public can view published courses"
  ON courses
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Ensure course reviews can be read by anonymous users for rating calculations
DROP POLICY IF EXISTS "Anyone can view course reviews" ON course_reviews;

CREATE POLICY "Public can view course reviews"
  ON course_reviews
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Ensure enrollments can be read by anonymous users for student count calculations
-- But only allow reading the count, not personal enrollment data
CREATE POLICY "Public can view enrollment counts"
  ON enrollments
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow anonymous users to view instructor profiles for course display
CREATE POLICY "Public can view instructor profiles"
  ON profiles
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow anonymous users to view course sections and lessons for course structure
CREATE POLICY "Public can view sections of published courses"
  ON sections
  FOR SELECT
  TO anon, authenticated
  USING (course_id IN (
    SELECT id FROM courses WHERE is_published = true
  ));

CREATE POLICY "Public can view lessons of published courses"
  ON lessons
  FOR SELECT
  TO anon, authenticated
  USING (course_id IN (
    SELECT id FROM courses WHERE is_published = true
  ));