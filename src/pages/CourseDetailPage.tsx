import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Star,
  Clock,
  Users,
  Play,
  Globe,
  CheckCircle,
  MessageCircle,
  BookOpen,
} from 'lucide-react';
import type { Course } from '../hooks/useCourses';
import { useCourses } from '../hooks/useCourses';
import { EnrollmentButton } from '../components/courses/EnrollmentButton';

export function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getCourseById } = useCourses();

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) {
        setError('Course ID is missing.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const fetchedCourse = await getCourseById(id);
        setCourse(fetchedCourse);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load course details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, getCourseById]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-700 rounded w-1/2 mb-6"></div>
              <div className="flex space-x-4">
                <div className="h-4 bg-gray-700 rounded w-24"></div>
                <div className="h-4 bg-gray-700 rounded w-32"></div>
                <div className="h-4 bg-gray-700 rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Course not found.</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'instructor', label: 'Instructor' },
    { id: 'reviews', label: 'Reviews' },
  ];

  // Mock data for features that aren't in the database yet
  const whatYouWillLearn = [
    'Master the fundamentals and advanced concepts',
    'Build real-world projects from scratch',
    'Learn industry best practices and standards',
    'Get hands-on experience with practical exercises',
    'Understand how to apply concepts in professional settings',
    'Develop problem-solving and critical thinking skills'
  ];

  const requirements = [
    'Basic computer literacy and internet access',
    'No prior experience required - we start from the basics',
    'Willingness to learn and practice regularly',
    'Access to a computer or laptop for hands-on exercises'
  ];

  const features = [
    'Full lifetime access',
    'Access on mobile and TV',
    'Certificate of completion',
    'Direct instructor support',
    'Downloadable resources',
    '30-day money-back guarantee'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-2">
                {course.is_bestseller && (
                  <div className="text-sm text-gray-300">
                    <span className="bg-accent-600 text-white px-2 py-1 rounded text-xs">
                      BESTSELLER
                    </span>
                  </div>
                )}
                <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{course.title}</h1>
                {course.subtitle && (
                  <p className="text-xl text-gray-300">{course.subtitle}</p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-yellow-400 font-medium">
                    {course.rating?.toFixed(1) || 'New'}
                  </span>
                  <span className="text-gray-300 ml-1">
                    ({course.review_count?.toLocaleString() || 0} reviews)
                  </span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Users className="w-4 h-4 mr-1" />
                  {course.student_count?.toLocaleString() || 0} students
                </div>
                {course.duration && (
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                )}
                <div className="flex items-center text-gray-300">
                  <Globe className="w-4 h-4 mr-1" />
                  {course.language}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <img
                    src={course.instructor_avatar || 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=150'}
                    alt={course.instructor_name || 'Unknown Instructor'}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm">Created by</p>
                    <p className="font-medium text-primary-400">
                      {course.instructor_name || 'Unknown Instructor'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Preview Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-xl p-6 sticky top-24">
                <div className="relative mb-6">
                  <img
                    src={course.image_url || 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800'}
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
                    {course.original_price && (
                      <span className="text-xl text-gray-500 line-through">
                        ${course.original_price}
                      </span>
                    )}
                    {course.original_price && course.price < course.original_price && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                        {Math.round(
                          ((course.original_price - course.price) / course.original_price) * 100
                        )}
                        % OFF
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    <EnrollmentButton 
                      courseId={course.id} 
                      coursePrice={course.price}
                      className="w-full"
                    />
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
                      {features.map((feature, index) => (
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
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        What you'll learn
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {whatYouWillLearn.map((item, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Course description
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{course.description}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h3>
                      <ul className="space-y-2">
                        {requirements.map((requirement, index) => (
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
                        {course.sections?.length || 0} sections • {course.duration || '0h 0m'} total length
                      </p>
                    </div>

                    <div className="space-y-4">
                      {course.sections && course.sections.length > 0 ? (
                        course.sections.map((section, index) => (
                          <div key={section.id} className="border border-gray-200 rounded-lg">
                            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-gray-900">{section.title}</h4>
                                <span className="text-sm text-gray-500">
                                  {section.lessons?.length || 0} lessons
                                </span>
                              </div>
                            </div>
                            <div className="divide-y divide-gray-200">
                              {section.lessons?.map((lesson, lessonIndex) => (
                                <div
                                  key={lesson.id}
                                  className="px-4 py-3 flex items-center justify-between"
                                >
                                  <div className="flex items-center">
                                    <Play className="w-4 h-4 text-gray-400 mr-3" />
                                    <span className="text-sm text-gray-700">{lesson.title}</span>
                                    {lesson.is_preview && (
                                      <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                        Preview
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-sm text-gray-500">{lesson.duration || '0:00'}</span>
                                </div>
                              )) || (
                                <div className="px-4 py-3 text-sm text-gray-500">
                                  No lessons available
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600">No curriculum available.</p>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'instructor' && (
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={course.instructor_avatar || 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=150'}
                        alt={course.instructor_name || 'Unknown Instructor'}
                        className="w-24 h-24 rounded-full"
                      />
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900">
                          {course.instructor_name || 'Unknown Instructor'}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Expert instructor with years of industry experience
                        </p>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span>{course.rating?.toFixed(1) || 'New'} Instructor Rating</span>
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="w-4 h-4 text-gray-400 mr-1" />
                            <span>{course.review_count?.toLocaleString() || 0} Reviews</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 text-gray-400 mr-1" />
                            <span>{course.student_count?.toLocaleString() || 0} Students</span>
                          </div>
                          <div className="flex items-center">
                            <BookOpen className="w-4 h-4 text-gray-400 mr-1" />
                            <span>Multiple Courses</span>
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
                        <div className="text-4xl font-bold text-gray-900">
                          {course.rating?.toFixed(1) || 'New'}
                        </div>
                        <div className="flex items-center justify-center mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`w-5 h-5 ${
                                course.rating && star <= course.rating 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`} 
                            />
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
                                  style={{
                                    width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%`,
                                  }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-500 w-12">
                                {rating === 5
                                  ? '70%'
                                  : rating === 4
                                    ? '20%'
                                    : rating === 3
                                      ? '5%'
                                      : rating === 2
                                        ? '3%'
                                        : '2%'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {course.course_reviews && course.course_reviews.length > 0 ? (
                        course.course_reviews.map((review, index) => (
                          <div key={index} className="border-b border-gray-200 pb-6">
                            <div className="flex items-start space-x-4">
                              <img
                                src={review.profiles?.avatar_url || 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=100'}
                                alt={review.profiles?.full_name || 'Student'}
                                className="w-10 h-10 rounded-full"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h4 className="font-medium text-gray-900">
                                    {review.profiles?.full_name || 'Anonymous Student'}
                                  </h4>
                                  <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star 
                                        key={star} 
                                        className={`w-4 h-4 ${
                                          star <= review.rating 
                                            ? 'text-yellow-400 fill-current' 
                                            : 'text-gray-300'
                                        }`} 
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-500">
                                    {new Date(review.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                                {review.comment && (
                                  <p className="text-gray-700">{review.comment}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center text-gray-500 py-8">
                          No reviews yet. Be the first to review this course!
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Related Courses */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                More courses by this instructor
              </h3>
              <div className="space-y-4">
                <div className="text-center text-gray-500 py-8">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p>More courses coming soon!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}