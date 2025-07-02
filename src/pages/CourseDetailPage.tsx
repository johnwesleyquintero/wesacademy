import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, Users, Award, Play, Download, Globe, BookOpen, CheckCircle, MessageCircle } from 'lucide-react';

export function CourseDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock course data
  const course = {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    subtitle: 'Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps',
    instructor: {
      name: 'Sarah Johnson',
      bio: 'Senior Full-Stack Developer with 8+ years of experience',
      students: 125000,
      courses: 12,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    price: 89.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviews: 12543,
    students: 15420,
    duration: '42 hours',
    lectures: 156,
    level: 'Beginner',
    category: 'Web Development',
    language: 'English',
    lastUpdated: 'December 2024',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    preview: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    description: 'Welcome to the Complete Web Development Bootcamp, the only course you need to learn to code and become a full-stack web developer. With 150,000+ ratings and a 4.8 average, my Web Development course is one of the HIGHEST RATED courses in the history of Udemy!',
    whatYouWillLearn: [
      'Build 16 web development projects for your portfolio, ready to apply for junior developer jobs',
      'Learn the latest technologies, including Javascript, React, Node and even Web3 development',
      'After the course you will be able to build ANY website you want',
      'Build fully-fledged websites and web apps for your startup or business',
      'Work as a freelance web developer',
      'Master frontend development with React',
      'Master backend development with Node'
    ],
    curriculum: [
      {
        section: 'Front-End Web Development',
        lectures: 12,
        duration: '2h 15m',
        lessons: [
          { title: 'Introduction to HTML', duration: '12:34', preview: true },
          { title: 'HTML Elements and Tags', duration: '15:22', preview: false },
          { title: 'Forms and Input Types', duration: '18:45', preview: false }
        ]
      },
      {
        section: 'Introduction to CSS',
        lectures: 15,
        duration: '3h 45m',
        lessons: [
          { title: 'CSS Selectors', duration: '14:20', preview: true },
          { title: 'Box Model', duration: '16:30', preview: false },
          { title: 'Flexbox Layout', duration: '22:15', preview: false }
        ]
      },
      {
        section: 'Javascript Programming',
        lectures: 25,
        duration: '6h 30m',
        lessons: [
          { title: 'Variables and Data Types', duration: '18:45', preview: false },
          { title: 'Functions and Scope', duration: '24:12', preview: false },
          { title: 'DOM Manipulation', duration: '19:33', preview: false }
        ]
      }
    ],
    requirements: [
      'No programming experience needed - I\'ll teach you everything you need to know',
      'A computer with access to the internet',
      'No paid software required - I\'ll teach you how to use free text editors'
    ],
    features: [
      'Downloadable resources',
      'Full lifetime access',
      'Access on mobile and TV',
      'Certificate of completion'
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'instructor', label: 'Instructor' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-2">
                <div className="text-sm text-gray-300">
                  <span className="bg-accent-600 text-white px-2 py-1 rounded text-xs">BESTSELLER</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                  {course.title}
                </h1>
                <p className="text-xl text-gray-300">
                  {course.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-yellow-400 font-medium">{course.rating}</span>
                  <span className="text-gray-300 ml-1">({course.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Users className="w-4 h-4 mr-1" />
                  {course.students.toLocaleString()} students
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center text-gray-300">
                  <Globe className="w-4 h-4 mr-1" />
                  {course.language}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <img
                    src={course.instructor.image}
                    alt={course.instructor.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm">Created by</p>
                    <p className="font-medium text-primary-400">{course.instructor.name}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Preview Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-xl p-6 sticky top-24">
                <div className="relative mb-6">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full rounded-lg"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg hover:bg-black/50 transition-colors">
                    <Play className="w-12 h-12 text-white" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-gray-900">${course.price}</span>
                    <span className="text-xl text-gray-500 line-through">${course.originalPrice}</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                      55% OFF
                    </span>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                      Enroll Now
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                      Add to Wishlist
                    </button>
                  </div>

                  <div className="text-center text-sm text-gray-500">
                    30-Day Money-Back Guarantee
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <h4 className="font-semibold text-gray-900">This course includes:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {course.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-primary-600 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">What you'll learn</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {course.whatYouWillLearn.map((item, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Course description</h3>
                      <p className="text-gray-700 leading-relaxed">{course.description}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h3>
                      <ul className="space-y-2">
                        {course.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-900">Course content</h3>
                      <p className="text-sm text-gray-500">
                        {course.lectures} lectures • {course.duration} total length
                      </p>
                    </div>

                    <div className="space-y-4">
                      {course.curriculum.map((section, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg">
                          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900">{section.section}</h4>
                              <span className="text-sm text-gray-500">
                                {section.lectures} lectures • {section.duration}
                              </span>
                            </div>
                          </div>
                          <div className="divide-y divide-gray-200">
                            {section.lessons.map((lesson, lessonIndex) => (
                              <div key={lessonIndex} className="px-4 py-3 flex items-center justify-between">
                                <div className="flex items-center">
                                  <Play className="w-4 h-4 text-gray-400 mr-3" />
                                  <span className="text-sm text-gray-700">{lesson.title}</span>
                                  {lesson.preview && (
                                    <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                      Preview
                                    </span>
                                  )}
                                </div>
                                <span className="text-sm text-gray-500">{lesson.duration}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'instructor' && (
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={course.instructor.image}
                        alt={course.instructor.name}
                        className="w-24 h-24 rounded-full"
                      />
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900">{course.instructor.name}</h3>
                        <p className="text-gray-600 mb-4">{course.instructor.bio}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span>{course.instructor.rating} Instructor Rating</span>
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="w-4 h-4 text-gray-400 mr-1" />
                            <span>{course.reviews.toLocaleString()} Reviews</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 text-gray-400 mr-1" />
                            <span>{course.instructor.students.toLocaleString()} Students</span>
                          </div>
                          <div className="flex items-center">
                            <BookOpen className="w-4 h-4 text-gray-400 mr-1" />
                            <span>{course.instructor.courses} Courses</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900">{course.rating}</div>
                        <div className="flex items-center justify-center mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <div className="text-sm text-gray-500">Course Rating</div>
                      </div>
                      <div className="flex-1">
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center space-x-3">
                              <span className="text-sm text-gray-600 w-8">{rating}★</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-yellow-400 h-2 rounded-full"
                                  style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-500 w-12">
                                {rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '5%' : rating === 2 ? '3%' : '2%'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Mock reviews would go here */}
                      <div className="text-center text-gray-500 py-8">
                        Reviews section would display individual student reviews and ratings here.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Related Courses */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">More courses by this instructor</h3>
              <div className="space-y-4">
                {/* Mock related courses */}
                <div className="flex space-x-3">
                  <img
                    src="https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Course"
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                      Advanced React Development
                    </h4>
                    <div className="flex items-center mt-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-500 ml-1">4.9 • $109.99</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}