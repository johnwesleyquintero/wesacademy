/*
  # Sample Data Migration for WesAcademy

  1. Sample Data
    - Creates sample instructor profiles
    - Inserts popular courses with proper instructor relationships
    - Adds course sections and lessons
    - Includes sample reviews

  2. Security
    - All data respects existing RLS policies
    - Uses proper foreign key relationships
*/

-- First, create sample instructor profiles
-- Note: These will be linked to actual auth.users when real users sign up
INSERT INTO profiles (
  id,
  username,
  full_name,
  tier,
  created_at,
  updated_at
) VALUES
(
  gen_random_uuid(),
  'sarah_johnson',
  'Sarah Johnson',
  'Enterprise',
  now(),
  now()
),
(
  gen_random_uuid(),
  'michael_chen',
  'Dr. Michael Chen',
  'Enterprise',
  now(),
  now()
),
(
  gen_random_uuid(),
  'emma_wilson',
  'Emma Wilson',
  'Enterprise',
  now(),
  now()
),
(
  gen_random_uuid(),
  'james_rodriguez',
  'James Rodriguez',
  'Enterprise',
  now(),
  now()
),
(
  gen_random_uuid(),
  'alex_turner',
  'Alex Turner',
  'Enterprise',
  now(),
  now()
);

-- Insert sample courses with proper instructor relationships
DO $$
DECLARE
    instructor_sarah uuid;
    instructor_michael uuid;
    instructor_emma uuid;
    instructor_james uuid;
    instructor_alex uuid;
BEGIN
    -- Get instructor IDs
    SELECT id INTO instructor_sarah FROM profiles WHERE username = 'sarah_johnson';
    SELECT id INTO instructor_michael FROM profiles WHERE username = 'michael_chen';
    SELECT id INTO instructor_emma FROM profiles WHERE username = 'emma_wilson';
    SELECT id INTO instructor_james FROM profiles WHERE username = 'james_rodriguez';
    SELECT id INTO instructor_alex FROM profiles WHERE username = 'alex_turner';
    
    -- Insert courses
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
      instructor_alex,
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
      instructor_sarah,
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
      instructor_michael,
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
      instructor_james,
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
      instructor_emma,
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
    ),
    (
      'AWS Certified Cloud Practitioner',
      'Master cloud computing fundamentals with Amazon Web Services',
      'Prepare for the AWS Cloud Practitioner certification. Learn cloud concepts, AWS services, security, pricing, and support. Includes practice exams and hands-on labs.',
      instructor_sarah,
      'Technology & Data',
      'Beginner',
      109.99,
      249.99,
      'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=500',
      '28 hours',
      'English',
      true,
      false,
      true
    ),
    (
      'Cybersecurity for Beginners',
      'Learn to protect systems, networks, and data from digital attacks',
      'Comprehensive introduction to cybersecurity. Learn about threats, vulnerabilities, risk management, and security tools. Perfect for career changers and IT professionals.',
      instructor_michael,
      'Technology & Data',
      'Beginner',
      119.99,
      279.99,
      'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=500',
      '38 hours',
      'English',
      true,
      false,
      true
    ),
    (
      'Project Management Professional (PMP) Prep',
      'Master Agile, Scrum, and traditional project management methodologies',
      'Complete PMP certification preparation course. Learn project management frameworks, Agile methodologies, risk management, and leadership skills.',
      instructor_james,
      'Business & Marketing',
      'Intermediate',
      134.99,
      299.99,
      'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=500',
      '45 hours',
      'English',
      true,
      false,
      false
    );
END $$;

-- Insert sample sections for the Python course
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

-- Insert sample sections for the Web Development course
DO $$
DECLARE
    course_id_web uuid;
BEGIN
    SELECT id INTO course_id_web FROM courses WHERE title = 'Complete Web Development Bootcamp (Full-Stack)';
    
    INSERT INTO sections (course_id, title, description, order_index) VALUES
    (course_id_web, 'HTML & CSS Fundamentals', 'Learn the building blocks of web development', 1),
    (course_id_web, 'JavaScript Programming', 'Master JavaScript for interactive web pages', 2),
    (course_id_web, 'React Frontend Development', 'Build modern user interfaces with React', 3),
    (course_id_web, 'Backend with Node.js', 'Server-side development with Node.js and Express', 4),
    (course_id_web, 'Database & Deployment', 'MongoDB integration and deploying your applications', 5);
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

-- Insert sample lessons for Web Development course
DO $$
DECLARE
    section_id_html_css uuid;
    section_id_javascript uuid;
    course_id_web uuid;
BEGIN
    SELECT id INTO course_id_web FROM courses WHERE title = 'Complete Web Development Bootcamp (Full-Stack)';
    SELECT id INTO section_id_html_css FROM sections WHERE course_id = course_id_web AND title = 'HTML & CSS Fundamentals';
    SELECT id INTO section_id_javascript FROM sections WHERE course_id = course_id_web AND title = 'JavaScript Programming';
    
    -- Lessons for HTML & CSS section
    INSERT INTO lessons (course_id, section_id, title, description, duration, order_index, is_preview) VALUES
    (course_id_web, section_id_html_css, 'Introduction to HTML', 'Learn the structure of web pages', '12:34', 1, true),
    (course_id_web, section_id_html_css, 'HTML Elements and Tags', 'Master HTML elements and semantic markup', '15:22', 2, true),
    (course_id_web, section_id_html_css, 'CSS Styling Basics', 'Style your web pages with CSS', '18:45', 3, false),
    (course_id_web, section_id_html_css, 'Responsive Design', 'Make your websites mobile-friendly', '22:15', 4, false);
    
    -- Lessons for JavaScript section
    INSERT INTO lessons (course_id, section_id, title, description, duration, order_index, is_preview) VALUES
    (course_id_web, section_id_javascript, 'JavaScript Fundamentals', 'Variables, functions, and basic syntax', '20:30', 1, false),
    (course_id_web, section_id_javascript, 'DOM Manipulation', 'Interact with web page elements', '25:45', 2, false),
    (course_id_web, section_id_javascript, 'Event Handling', 'Respond to user interactions', '18:20', 3, false),
    (course_id_web, section_id_javascript, 'Async JavaScript', 'Promises, async/await, and API calls', '28:15', 4, false);
END $$;

-- Insert sample reviews (only if we have actual user profiles)
DO $$
DECLARE
    course_id_python uuid;
    course_id_web uuid;
    course_id_data uuid;
    instructor_sarah uuid;
    instructor_alex uuid;
BEGIN
    SELECT id INTO course_id_python FROM courses WHERE title = 'Python for Everybody: Complete Beginner to Advanced';
    SELECT id INTO course_id_web FROM courses WHERE title = 'Complete Web Development Bootcamp (Full-Stack)';
    SELECT id INTO course_id_data FROM courses WHERE title = 'Data Science & Machine Learning Fundamentals';
    SELECT id INTO instructor_sarah FROM profiles WHERE username = 'sarah_johnson';
    SELECT id INTO instructor_alex FROM profiles WHERE username = 'alex_turner';
    
    -- Sample reviews from instructors (they can review each other's courses)
    INSERT INTO course_reviews (course_id, user_id, rating, comment) VALUES
    (course_id_python, instructor_sarah, 5, 'Excellent course! Very comprehensive and well-structured. Alex explains everything clearly and the hands-on projects are fantastic.'),
    (course_id_web, instructor_alex, 5, 'Outstanding web development course. Sarah covers everything from basics to advanced topics. Highly recommended for beginners!'),
    (course_id_data, instructor_sarah, 4, 'Great introduction to data science. The practical examples and real-world projects make complex concepts easy to understand.');
END $$;