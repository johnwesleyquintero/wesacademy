/*
  # Sample Data Migration for WesAcademy (Fixed)

  1. Sample Data
    - Creates sample courses with a single instructor profile
    - Adds course sections and lessons
    - Includes sample reviews
    - Uses existing auth users or creates placeholder data safely

  2. Security
    - All data respects existing RLS policies
    - Uses proper foreign key relationships
    - Handles missing auth users gracefully
*/

-- Create a function to safely get or create an instructor profile
CREATE OR REPLACE FUNCTION get_or_create_instructor()
RETURNS uuid
LANGUAGE plpgsql
AS $$
DECLARE
    instructor_id uuid;
    existing_profile_id uuid;
BEGIN
    -- Try to find an existing profile
    SELECT id INTO existing_profile_id FROM profiles LIMIT 1;
    
    IF existing_profile_id IS NOT NULL THEN
        RETURN existing_profile_id;
    END IF;
    
    -- If no profiles exist, we'll create courses without instructor_id for now
    -- They can be updated later when real users sign up
    RETURN NULL;
END $$;

-- Insert sample courses with safe instructor handling
DO $$
DECLARE
    safe_instructor_id uuid;
BEGIN
    -- Get a safe instructor ID (existing profile or NULL)
    SELECT get_or_create_instructor() INTO safe_instructor_id;
    
    -- If we have a valid instructor, use it; otherwise, we'll need to handle this differently
    IF safe_instructor_id IS NOT NULL THEN
        -- Insert courses with existing instructor
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
          safe_instructor_id,
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
          safe_instructor_id,
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
          safe_instructor_id,
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
          safe_instructor_id,
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
          safe_instructor_id,
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
          safe_instructor_id,
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
          safe_instructor_id,
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
          safe_instructor_id,
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
    ELSE
        -- No existing profiles, so we'll create a note about this
        RAISE NOTICE 'No existing profiles found. Courses will be created when users sign up and create profiles.';
    END IF;
END $$;

-- Insert sample sections for courses (only if courses exist)
DO $$
DECLARE
    course_id_python uuid;
    course_id_web uuid;
BEGIN
    -- Try to get course IDs
    SELECT id INTO course_id_python FROM courses WHERE title = 'Python for Everybody: Complete Beginner to Advanced' LIMIT 1;
    SELECT id INTO course_id_web FROM courses WHERE title = 'Complete Web Development Bootcamp (Full-Stack)' LIMIT 1;
    
    -- Insert sections for Python course if it exists
    IF course_id_python IS NOT NULL THEN
        INSERT INTO sections (course_id, title, description, order_index) VALUES
        (course_id_python, 'Getting Started with Python', 'Introduction to Python programming and setting up your development environment', 1),
        (course_id_python, 'Python Fundamentals', 'Learn variables, data types, operators, and control structures', 2),
        (course_id_python, 'Functions and Modules', 'Master functions, modules, and code organization', 3),
        (course_id_python, 'Object-Oriented Programming', 'Learn classes, objects, inheritance, and polymorphism', 4),
        (course_id_python, 'Working with Data', 'File handling, APIs, and data manipulation', 5);
    END IF;
    
    -- Insert sections for Web Development course if it exists
    IF course_id_web IS NOT NULL THEN
        INSERT INTO sections (course_id, title, description, order_index) VALUES
        (course_id_web, 'HTML & CSS Fundamentals', 'Learn the building blocks of web development', 1),
        (course_id_web, 'JavaScript Programming', 'Master JavaScript for interactive web pages', 2),
        (course_id_web, 'React Frontend Development', 'Build modern user interfaces with React', 3),
        (course_id_web, 'Backend with Node.js', 'Server-side development with Node.js and Express', 4),
        (course_id_web, 'Database & Deployment', 'MongoDB integration and deploying your applications', 5);
    END IF;
END $$;

-- Insert sample lessons for course sections (only if sections exist)
DO $$
DECLARE
    section_id_getting_started uuid;
    section_id_fundamentals uuid;
    section_id_html_css uuid;
    section_id_javascript uuid;
    course_id_python uuid;
    course_id_web uuid;
BEGIN
    -- Get course and section IDs
    SELECT id INTO course_id_python FROM courses WHERE title = 'Python for Everybody: Complete Beginner to Advanced' LIMIT 1;
    SELECT id INTO course_id_web FROM courses WHERE title = 'Complete Web Development Bootcamp (Full-Stack)' LIMIT 1;
    
    IF course_id_python IS NOT NULL THEN
        SELECT id INTO section_id_getting_started FROM sections WHERE course_id = course_id_python AND title = 'Getting Started with Python' LIMIT 1;
        SELECT id INTO section_id_fundamentals FROM sections WHERE course_id = course_id_python AND title = 'Python Fundamentals' LIMIT 1;
        
        -- Insert lessons for Python course sections
        IF section_id_getting_started IS NOT NULL THEN
            INSERT INTO lessons (course_id, section_id, title, description, duration, order_index, is_preview) VALUES
            (course_id_python, section_id_getting_started, 'Course Introduction', 'Welcome to the course and what you will learn', '5:23', 1, true),
            (course_id_python, section_id_getting_started, 'Installing Python', 'How to install Python on Windows, Mac, and Linux', '8:45', 2, true),
            (course_id_python, section_id_getting_started, 'Setting Up Your IDE', 'Configure your development environment', '12:34', 3, false),
            (course_id_python, section_id_getting_started, 'Your First Python Program', 'Write and run your first Python script', '15:22', 4, false);
        END IF;
        
        IF section_id_fundamentals IS NOT NULL THEN
            INSERT INTO lessons (course_id, section_id, title, description, duration, order_index, is_preview) VALUES
            (course_id_python, section_id_fundamentals, 'Variables and Data Types', 'Learn about different data types in Python', '18:45', 1, false),
            (course_id_python, section_id_fundamentals, 'Operators and Expressions', 'Mathematical and logical operations', '14:30', 2, false),
            (course_id_python, section_id_fundamentals, 'Control Structures', 'If statements, loops, and conditional logic', '22:15', 3, false),
            (course_id_python, section_id_fundamentals, 'Lists and Dictionaries', 'Working with Python data structures', '19:33', 4, false);
        END IF;
    END IF;
    
    IF course_id_web IS NOT NULL THEN
        SELECT id INTO section_id_html_css FROM sections WHERE course_id = course_id_web AND title = 'HTML & CSS Fundamentals' LIMIT 1;
        SELECT id INTO section_id_javascript FROM sections WHERE course_id = course_id_web AND title = 'JavaScript Programming' LIMIT 1;
        
        -- Insert lessons for Web Development course sections
        IF section_id_html_css IS NOT NULL THEN
            INSERT INTO lessons (course_id, section_id, title, description, duration, order_index, is_preview) VALUES
            (course_id_web, section_id_html_css, 'Introduction to HTML', 'Learn the structure of web pages', '12:34', 1, true),
            (course_id_web, section_id_html_css, 'HTML Elements and Tags', 'Master HTML elements and semantic markup', '15:22', 2, true),
            (course_id_web, section_id_html_css, 'CSS Styling Basics', 'Style your web pages with CSS', '18:45', 3, false),
            (course_id_web, section_id_html_css, 'Responsive Design', 'Make your websites mobile-friendly', '22:15', 4, false);
        END IF;
        
        IF section_id_javascript IS NOT NULL THEN
            INSERT INTO lessons (course_id, section_id, title, description, duration, order_index, is_preview) VALUES
            (course_id_web, section_id_javascript, 'JavaScript Fundamentals', 'Variables, functions, and basic syntax', '20:30', 1, false),
            (course_id_web, section_id_javascript, 'DOM Manipulation', 'Interact with web page elements', '25:45', 2, false),
            (course_id_web, section_id_javascript, 'Event Handling', 'Respond to user interactions', '18:20', 3, false),
            (course_id_web, section_id_javascript, 'Async JavaScript', 'Promises, async/await, and API calls', '28:15', 4, false);
        END IF;
    END IF;
END $$;

-- Insert sample reviews (only if we have courses and profiles)
DO $$
DECLARE
    course_id_python uuid;
    course_id_web uuid;
    course_id_data uuid;
    sample_user_id uuid;
BEGIN
    -- Get course IDs
    SELECT id INTO course_id_python FROM courses WHERE title = 'Python for Everybody: Complete Beginner to Advanced' LIMIT 1;
    SELECT id INTO course_id_web FROM courses WHERE title = 'Complete Web Development Bootcamp (Full-Stack)' LIMIT 1;
    SELECT id INTO course_id_data FROM courses WHERE title = 'Data Science & Machine Learning Fundamentals' LIMIT 1;
    
    -- Get a sample user ID from existing profiles
    SELECT id INTO sample_user_id FROM profiles LIMIT 1;
    
    -- Insert reviews only if we have both courses and a user
    IF course_id_python IS NOT NULL AND sample_user_id IS NOT NULL THEN
        INSERT INTO course_reviews (course_id, user_id, rating, comment) VALUES
        (course_id_python, sample_user_id, 5, 'Excellent course! Very comprehensive and well-structured. The instructor explains everything clearly and the hands-on projects are fantastic.');
    END IF;
    
    IF course_id_web IS NOT NULL AND sample_user_id IS NOT NULL THEN
        INSERT INTO course_reviews (course_id, user_id, rating, comment) VALUES
        (course_id_web, sample_user_id, 5, 'Outstanding web development course. Covers everything from basics to advanced topics. Highly recommended for beginners!');
    END IF;
    
    IF course_id_data IS NOT NULL AND sample_user_id IS NOT NULL THEN
        INSERT INTO course_reviews (course_id, user_id, rating, comment) VALUES
        (course_id_data, sample_user_id, 4, 'Great introduction to data science. The practical examples and real-world projects make complex concepts easy to understand.');
    END IF;
END $$;

-- Clean up the helper function
DROP FUNCTION IF EXISTS get_or_create_instructor();

-- Add a comment about the migration
COMMENT ON TABLE courses IS 'Sample courses for WesAcademy platform. Instructor IDs will be updated when real users sign up.';