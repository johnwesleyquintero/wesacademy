export interface Course {
  id: string;
  title: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  rating: number;
  students: number;
  image: string;
  duration: string;
  level: string;
  category: string;
  description?: string;
  tags?: string[];
  isBestseller?: boolean;
  isNew?: boolean;
}

export interface Category {
  name: string;
  icon: string;
  courses: number;
  color: string;
  description: string;
}

export const categories: Category[] = [
  {
    name: 'Technology & Data',
    icon: 'code',
    courses: 450,
    color: 'bg-blue-500',
    description: 'Programming, AI, Data Science, Cloud Computing',
  },
  {
    name: 'Business & Marketing',
    icon: 'briefcase',
    courses: 380,
    color: 'bg-green-500',
    description: 'Digital Marketing, Leadership, Project Management',
  },
  {
    name: 'Creative & Design',
    icon: 'palette',
    courses: 320,
    color: 'bg-purple-500',
    description: 'UI/UX Design, Video Editing, Photography',
  },
  {
    name: 'Personal Development',
    icon: 'user',
    courses: 280,
    color: 'bg-orange-500',
    description: 'Productivity, Communication, Health & Wellness',
  },
  {
    name: 'Finance & Investing',
    icon: 'dollar-sign',
    courses: 150,
    color: 'bg-emerald-500',
    description: 'Personal Finance, Stock Market, Cryptocurrency',
  },
  {
    name: 'Health & Fitness',
    icon: 'heart',
    courses: 200,
    color: 'bg-red-500',
    description: 'Nutrition, Workout Plans, Mental Health',
  },
];

export const featuredCourses: Course[] = [
  {
    id: '1',
    title: 'Python for Everybody: Complete Beginner to Advanced',
    instructor: 'Dr. Sarah Chen',
    price: 89.99,
    originalPrice: 199.99,
    rating: 4.9,
    students: 45230,
    image:
      'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=500',
    duration: '52 hours',
    level: 'Beginner',
    category: 'Technology & Data',
    description:
      'Master Python programming from basics to advanced concepts. Perfect for data science, web development, and AI.',
    tags: ['Python', 'Programming', 'Data Science', 'AI'],
    isBestseller: true,
  },
  {
    id: '2',
    title: 'Complete Web Development Bootcamp (Full-Stack)',
    instructor: 'Alex Rodriguez',
    price: 124.99,
    originalPrice: 299.99,
    rating: 4.8,
    students: 38750,
    image:
      'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=500',
    duration: '65 hours',
    level: 'Beginner',
    category: 'Technology & Data',
    description:
      'Become a full-stack developer with HTML, CSS, JavaScript, React, Node.js, and databases.',
    tags: ['Web Development', 'React', 'Node.js', 'JavaScript'],
    isBestseller: true,
  },
  {
    id: '3',
    title: 'Data Science & Machine Learning Fundamentals',
    instructor: 'Dr. Michael Zhang',
    price: 149.99,
    originalPrice: 349.99,
    rating: 4.9,
    students: 28940,
    image:
      'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=500',
    duration: '48 hours',
    level: 'Intermediate',
    category: 'Technology & Data',
    description:
      'Learn data analysis, visualization, and machine learning with Python and real-world projects.',
    tags: ['Data Science', 'Machine Learning', 'Python', 'Analytics'],
    isBestseller: true,
  },
  {
    id: '4',
    title: 'Digital Marketing Fundamentals: SEO, SEM & Social Media',
    instructor: 'Emma Thompson',
    price: 79.99,
    originalPrice: 179.99,
    rating: 4.7,
    students: 32150,
    image:
      'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=500',
    duration: '35 hours',
    level: 'Beginner',
    category: 'Business & Marketing',
    description: 'Master digital marketing strategies that drive real business results.',
    tags: ['Digital Marketing', 'SEO', 'Social Media', 'Analytics'],
    isBestseller: true,
  },
  {
    id: '5',
    title: 'UI/UX Design Masterclass: Figma to Prototype',
    instructor: 'Jessica Park',
    price: 94.99,
    originalPrice: 219.99,
    rating: 4.8,
    students: 24680,
    image:
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500',
    duration: '42 hours',
    level: 'Beginner',
    category: 'Creative & Design',
    description: 'Design beautiful, user-friendly interfaces and create interactive prototypes.',
    tags: ['UI/UX', 'Figma', 'Design', 'Prototyping'],
    isBestseller: true,
  },
  {
    id: '6',
    title: 'AI & Prompt Engineering: ChatGPT to Advanced AI Tools',
    instructor: 'Dr. James Wilson',
    price: 109.99,
    originalPrice: 249.99,
    rating: 4.9,
    students: 19850,
    image:
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=500',
    duration: '28 hours',
    level: 'Beginner',
    category: 'Technology & Data',
    description: 'Master AI tools and prompt engineering to boost productivity and creativity.',
    tags: ['AI', 'ChatGPT', 'Prompt Engineering', 'Automation'],
    isNew: true,
    isBestseller: true,
  },
  {
    id: '7',
    title: 'AWS Cloud Practitioner Certification Complete Course',
    instructor: 'Robert Kumar',
    price: 119.99,
    originalPrice: 279.99,
    rating: 4.8,
    students: 22340,
    image:
      'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=500',
    duration: '38 hours',
    level: 'Beginner',
    category: 'Technology & Data',
    description: 'Get AWS certified and launch your cloud computing career.',
    tags: ['AWS', 'Cloud Computing', 'Certification', 'DevOps'],
  },
  {
    id: '8',
    title: 'Cybersecurity for Beginners: Protect & Defend',
    instructor: 'Maria Santos',
    price: 99.99,
    originalPrice: 229.99,
    rating: 4.7,
    students: 18750,
    image:
      'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=500',
    duration: '32 hours',
    level: 'Beginner',
    category: 'Technology & Data',
    description: 'Learn to protect systems and data from cyber threats.',
    tags: ['Cybersecurity', 'Network Security', 'Ethical Hacking', 'Privacy'],
  },
  {
    id: '9',
    title: 'Project Management: Agile, Scrum & PMP Prep',
    instructor: 'David Chen',
    price: 89.99,
    originalPrice: 199.99,
    rating: 4.6,
    students: 26430,
    image:
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=500',
    duration: '45 hours',
    level: 'Intermediate',
    category: 'Business & Marketing',
    description: 'Master project management methodologies and prepare for PMP certification.',
    tags: ['Project Management', 'Agile', 'Scrum', 'PMP'],
  },
  {
    id: '10',
    title: 'Microsoft Excel: Beginner to Advanced Data Analysis',
    instructor: 'Linda Johnson',
    price: 69.99,
    originalPrice: 149.99,
    rating: 4.8,
    students: 41250,
    image:
      'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=500',
    duration: '25 hours',
    level: 'Beginner',
    category: 'Business & Marketing',
    description: 'Master Excel from basics to advanced data analysis and visualization.',
    tags: ['Excel', 'Data Analysis', 'Spreadsheets', 'Business Intelligence'],
  },
  {
    id: '11',
    title: 'Leadership & Management Skills for Modern Leaders',
    instructor: 'Dr. Patricia Williams',
    price: 84.99,
    originalPrice: 189.99,
    rating: 4.7,
    students: 19680,
    image:
      'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=500',
    duration: '30 hours',
    level: 'Intermediate',
    category: 'Business & Marketing',
    description:
      'Develop essential leadership skills for team management and organizational success.',
    tags: ['Leadership', 'Management', 'Team Building', 'Communication'],
  },
  {
    id: '12',
    title: 'Personal Finance & Investing for Beginners',
    instructor: 'Mark Thompson',
    price: 74.99,
    originalPrice: 169.99,
    rating: 4.8,
    students: 33420,
    image:
      'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=500',
    duration: '22 hours',
    level: 'Beginner',
    category: 'Finance & Investing',
    description: 'Build wealth through smart budgeting, saving, and investing strategies.',
    tags: ['Personal Finance', 'Investing', 'Budgeting', 'Wealth Building'],
  },
  {
    id: '13',
    title: 'Complete Entrepreneurship & Startup Guide',
    instructor: 'Sarah Martinez',
    price: 129.99,
    originalPrice: 299.99,
    rating: 4.6,
    students: 15840,
    image:
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=500',
    duration: '55 hours',
    level: 'Intermediate',
    category: 'Business & Marketing',
    description: 'Launch and grow your startup from idea to successful business.',
    tags: ['Entrepreneurship', 'Startup', 'Business Plan', 'Funding'],
  },
  {
    id: '14',
    title: 'Graphic Design Masterclass: Canva & Adobe Creative Suite',
    instructor: 'Carlos Rivera',
    price: 89.99,
    originalPrice: 209.99,
    rating: 4.7,
    students: 28750,
    image:
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500',
    duration: '38 hours',
    level: 'Beginner',
    category: 'Creative & Design',
    description: 'Create stunning graphics for social media, marketing, and branding.',
    tags: ['Graphic Design', 'Canva', 'Adobe', 'Branding'],
  },
  {
    id: '15',
    title: 'Video Editing Mastery: Premiere Pro & DaVinci Resolve',
    instructor: 'Tyler Brooks',
    price: 99.99,
    originalPrice: 239.99,
    rating: 4.8,
    students: 21340,
    image:
      'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=500',
    duration: '42 hours',
    level: 'Beginner',
    category: 'Creative & Design',
    description: 'Edit professional videos for YouTube, social media, and film.',
    tags: ['Video Editing', 'Premiere Pro', 'DaVinci Resolve', 'YouTube'],
  },
  {
    id: '16',
    title: 'Photography Masterclass: DSLR & Smartphone',
    instructor: 'Rachel Green',
    price: 79.99,
    originalPrice: 179.99,
    rating: 4.7,
    students: 24680,
    image:
      'https://images.pexels.com/photos/606541/pexels-photo-606541.jpeg?auto=compress&cs=tinysrgb&w=500',
    duration: '28 hours',
    level: 'Beginner',
    category: 'Creative & Design',
    description: 'Master photography fundamentals and advanced techniques.',
    tags: ['Photography', 'DSLR', 'Composition', 'Lighting'],
  },
  {
    id: '17',
    title: 'Content Creation & Copywriting That Converts',
    instructor: 'Amanda Foster',
    price: 84.99,
    originalPrice: 194.99,
    rating: 4.8,
    students: 19250,
    image:
      'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=500',
    duration: '32 hours',
    level: 'Beginner',
    category: 'Business & Marketing',
    description: 'Write compelling content that engages audiences and drives sales.',
    tags: ['Copywriting', 'Content Marketing', 'Social Media', 'Sales'],
  },
  {
    id: '18',
    title: 'Productivity & Time Management Masterclass',
    instructor: 'Dr. Kevin Lee',
    price: 64.99,
    originalPrice: 139.99,
    rating: 4.7,
    students: 36840,
    image:
      'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=500',
    duration: '18 hours',
    level: 'Beginner',
    category: 'Personal Development',
    description:
      'Boost productivity and achieve your goals with proven time management techniques.',
    tags: ['Productivity', 'Time Management', 'Goal Setting', 'Habits'],
  },
  {
    id: '19',
    title: 'Public Speaking & Confident Communication',
    instructor: 'Jennifer Adams',
    price: 74.99,
    originalPrice: 164.99,
    rating: 4.8,
    students: 22150,
    image:
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=500',
    duration: '24 hours',
    level: 'Beginner',
    category: 'Personal Development',
    description: 'Overcome fear and become a confident, persuasive speaker.',
    tags: ['Public Speaking', 'Communication', 'Confidence', 'Presentation'],
  },
  {
    id: '20',
    title: 'Health, Nutrition & Fitness Fundamentals',
    instructor: 'Dr. Michelle Carter',
    price: 69.99,
    originalPrice: 154.99,
    rating: 4.6,
    students: 28430,
    image:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500',
    duration: '26 hours',
    level: 'Beginner',
    category: 'Health & Fitness',
    description: 'Build healthy habits with science-based nutrition and fitness strategies.',
    tags: ['Health', 'Nutrition', 'Fitness', 'Wellness'],
  },
];

export const trendingCourses = featuredCourses
  .filter((course) => course.isNew || course.isBestseller)
  .slice(0, 8);

export const learningPaths = [
  {
    id: 'web-developer',
    title: 'Become a Web Developer',
    description: 'Complete learning path from beginner to full-stack developer',
    courses: ['2', '1', '5'],
    duration: '159 hours',
    level: 'Beginner to Advanced',
    students: 15420,
  },
  {
    id: 'data-scientist',
    title: 'Data Science Career Path',
    description: 'Master data analysis, machine learning, and AI',
    courses: ['1', '3', '6'],
    duration: '128 hours',
    level: 'Beginner to Advanced',
    students: 12340,
  },
  {
    id: 'digital-marketer',
    title: 'Digital Marketing Expert',
    description: 'Complete digital marketing and content creation skills',
    courses: ['4', '17', '14'],
    duration: '105 hours',
    level: 'Beginner to Intermediate',
    students: 18750,
  },
  {
    id: 'entrepreneur',
    title: 'Startup Founder Path',
    description: 'Build and launch your own successful business',
    courses: ['13', '11', '12'],
    duration: '107 hours',
    level: 'Intermediate',
    students: 8920,
  },
];
