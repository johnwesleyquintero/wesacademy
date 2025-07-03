export interface Category {
  name: string;
  icon:
    | 'code'
    | 'database'
    | 'palette'
    | 'briefcase'
    | 'megaphone'
    | 'camera'
    | 'user'
    | 'dollar-sign'
    | 'heart';
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
