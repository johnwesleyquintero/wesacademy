/*
  # Seed sample courses data

  1. Sample Data
    - Insert sample courses with different categories and levels
    - Insert sample sections and lessons for each course
    - Insert sample reviews for courses

  2. Notes
    - Uses existing profile IDs (you'll need to update instructor_id values)
    - Creates realistic course data for testing
*/

-- Insert sample courses (you'll need to replace instructor_id with actual profile IDs)
INSERT INTO courses (
  title,
  subtitle,
  description,
  instructor_id,
  category,
  level,
  price,
  original_price,
  image_url,
  duration,
  language,
  is_published,
  is_bestseller,
  is_new
) VALUES
(
  'Python for Everybody: Complete Beginner to Advanced',
  'Master Python programming from basics to advanced concepts',
  'Learn Python programming from scratch with hands-on projects. Perfect for data science, web development, and AI. This comprehensive course covers everything from basic syntax to advanced topics like object-oriented programming, web scraping, and data analysis.',
  (SELECT id FROM profiles LIMIT 1), -- Replace with actual instructor ID
  'Technology & Data',
  'Beginner',
  89.99,
  199.99,
  'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=500',
  '52 hours',
  'English',
  true,
  true,
  false
),
(
  'Complete Web Development Bootcamp (Full-Stack)',
  'Become a full-stack developer with HTML, CSS, JavaScript, React, Node.js',
  'The only course you need to become a full-stack web developer. Learn HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, and more. Build 15+ projects and deploy them to the web.',
  (SELECT id FROM profiles LIMIT 1), -- Replace with actual instructor ID
  'Technology & Data',
  'Beginner',
  124.99,
  299.99,
  'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=500',
  '65 hours',
  'English',
  true,
  true,
  false
),
(
  'Data Science & Machine Learning Fundamentals',
  'Learn data analysis, visualization, and machine learning with Python',
  'Master data science and machine learning with Python. Learn pandas, numpy, matplotlib, scikit-learn, and more. Work on real-world projects and build a portfolio.',
  (SELECT id FROM profiles LIMIT 1), -- Replace with actual instructor ID
  'Technology & Data',
  'Intermediate',
  149.99,
  349.99,
  'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=500',
  '48 hours',
  'English',
  true,
  true,
  false
),
(
  'Digital Marketing Fundamentals: SEO, SEM & Social Media',
  'Master digital marketing strategies that drive real business results',
  'Learn the complete digital marketing strategy from SEO and Google Ads to social media marketing and email campaigns. Get certified and boost your career.',
  (SELECT id FROM profiles LIMIT 1), -- Replace with actual instructor ID
  'Business & Marketing',
  'Beginner',
  79.99,
  179.99,
  'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=500',
  '35 hours',
  'English',
  true,
  true,
  false
),
(
  'UI/UX Design Masterclass: Figma to Prototype',
  'Design beautiful, user-friendly interfaces and create interactive prototypes',
  'Learn UI/UX design from scratch using Figma. Master design principles, user research, wireframing, prototyping, and user testing. Build a professional portfolio.',
  (SELECT id FROM profiles LIMIT 1), -- Replace with actual instructor ID
  'Creative & Design',
  'Beginner',
  94.99,
  219.99,
  'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500',
  '42 hours',
  'English',
  true,
  true,
  false
);

-- Insert sample sections for the first course (Python)
DO $$
DECLARE
    course_id_python uuid;
BEGIN
    SELECT id INTO course_id_python FROM courses WHERE title = 'Python for Everybody: Complete Beginner to Advanced';
    
    INSERT INTO sections (course_id, title, description, order_index) VALUES
    (course_id_python, 'Getting Started with Python', 'Introduction to Python programming and setting up your development environment', 1),
    (course_id_python, 'Python Fundamentals', 'Learn variables, data types, operators, and control structures', 2),
    (course_id_python, 'Functions and Modules', 'Master functions, modules, and code organization', 3),
    (course_id_python, 'Object-Oriented Programming', 'Learn classes, objects, inheritance, and polymorphism', 4),
    (course_id_python, 'Working with Data', 'File handling, APIs, and data manipulation', 5);
END $$;

-- Insert sample lessons for Python course sections
DO $$
DECLARE
    section_id_getting_started uuid;
    section_id_fundamentals uuid;
    course_id_python uuid;
BEGIN
    SELECT id INTO course_id_python FROM courses WHERE title = 'Python for Everybody: Complete Beginner to Advanced';
    SELECT id INTO section_id_getting_started FROM sections WHERE course_id = course_id_python AND title = 'Getting Started with Python';
    SELECT id INTO section_id_fundamentals FROM sections WHERE course_id = course_id_python AND title = 'Python Fundamentals';
    
    -- Lessons for Getting Started section
    INSERT INTO lessons (course_id, section_id, title, description, duration, order_index, is_preview) VALUES
    (course_id_python, section_id_getting_started, 'Course Introduction', 'Welcome to the course and what you will learn', '5:23', 1, true),
    (course_id_python, section_id_getting_started, 'Installing Python', 'How to install Python on Windows, Mac, and Linux', '8:45', 2, true),
    (course_id_python, section_id_getting_started, 'Setting Up Your IDE', 'Configure your development environment', '12:34', 3, false),
    (course_id_python, section_id_getting_started, 'Your First Python Program', 'Write and run your first Python script', '15:22', 4, false);
    
    -- Lessons for Fundamentals section
    INSERT INTO lessons (course_id, section_id, title, description, duration, order_index, is_preview) VALUES
    (course_id_python, section_id_fundamentals, 'Variables and Data Types', 'Learn about different data types in Python', '18:45', 1, false),
    (course_id_python, section_id_fundamentals, 'Operators and Expressions', 'Mathematical and logical operations', '14:30', 2, false),
    (course_id_python, section_id_fundamentals, 'Control Structures', 'If statements, loops, and conditional logic', '22:15', 3, false),
    (course_id_python, section_id_fundamentals, 'Lists and Dictionaries', 'Working with Python data structures', '19:33', 4, false);
END $$;

-- Insert sample reviews
DO $$
DECLARE
    course_id_python uuid;
    course_id_web uuid;
    user_id_sample uuid;
BEGIN
    SELECT id INTO course_id_python FROM courses WHERE title = 'Python for Everybody: Complete Beginner to Advanced';
    SELECT id INTO course_id_web FROM courses WHERE title = 'Complete Web Development Bootcamp (Full-Stack)';
    SELECT id INTO user_id_sample FROM profiles LIMIT 1;
    
    INSERT INTO course_reviews (course_id, user_id, rating, comment) VALUES
    (course_id_python, user_id_sample, 5, 'Excellent course! Very comprehensive and well-structured. The instructor explains everything clearly.'),
    (course_id_web, user_id_sample, 4, 'Great course for beginners. Covers a lot of ground and the projects are very practical.');
END $$;