import React, { useState } from 'react';
import { BookOpen, Clock, Award, TrendingUp, Play, Calendar, Star, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const enrolledCourses = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      instructor: 'Sarah Johnson',
      progress: 65,
      totalLessons: 156,
      completedLessons: 101,
      image:
        'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300',
      lastAccessed: '2 hours ago',
      nextLesson: 'JavaScript DOM Manipulation',
    },
    {
      id: '2',
      title: 'UI/UX Design Mastery',
      instructor: 'Emma Wilson',
      progress: 32,
      totalLessons: 84,
      completedLessons: 27,
      image:
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300',
      lastAccessed: '1 day ago',
      nextLesson: 'Color Theory Fundamentals',
    },
    {
      id: '3',
      title: 'Python Programming Fundamentals',
      instructor: 'Alex Turner',
      progress: 88,
      totalLessons: 92,
      completedLessons: 81,
      image:
        'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=300',
      lastAccessed: '3 days ago',
      nextLesson: 'Object-Oriented Programming',
    },
  ];

  const achievements = [
    { name: 'First Course Completed', icon: Award, color: 'bg-yellow-500', earned: true },
    { name: '7 Day Streak', icon: Calendar, color: 'bg-green-500', earned: true },
    { name: 'Top Performer', icon: TrendingUp, color: 'bg-blue-500', earned: false },
    { name: 'Course Creator', icon: BookOpen, color: 'bg-purple-500', earned: false },
  ];

  const stats = [
    { label: 'Courses Enrolled', value: '3', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Hours Learned', value: '42', icon: Clock, color: 'text-green-600' },
    { label: 'Certificates Earned', value: '1', icon: Award, color: 'text-yellow-600' },
    { label: 'Current Streak', value: '7', icon: TrendingUp, color: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600 mt-2">Continue your learning journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'courses', 'achievements', 'certificates'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Continue Learning */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Continue Learning</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {enrolledCourses.slice(0, 2).map((course) => (
                      <div key={course.id} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-start space-x-4">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 mb-1">
                              {course.title}
                            </h4>
                            <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>

                            <div className="mb-3">
                              <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Progress</span>
                                <span>{course.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">
                                {course.completedLessons}/{course.totalLessons} lessons
                              </span>
                              <Link
                                to={`/course/${course.id}/learn`}
                                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                              >
                                <Play className="w-4 h-4 mr-2" />
                                Continue
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Achievements */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Achievements</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-2 ${
                          achievement.earned
                            ? 'border-green-200 bg-green-50'
                            : 'border-gray-200 bg-gray-50 opacity-60'
                        }`}
                      >
                        <div
                          className={`w-10 h-10 ${achievement.color} rounded-lg flex items-center justify-center mb-3`}
                        >
                          <achievement.icon className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-sm font-medium text-gray-900">{achievement.name}</h4>
                        {achievement.earned && (
                          <span className="text-xs text-green-600 font-medium">Earned!</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">My Courses</h3>
                  <Link
                    to="/courses"
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                  >
                    Browse More Courses
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h4>
                        <p className="text-sm text-gray-600 mb-4">by {course.instructor}</p>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary-600 h-2 rounded-full"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Last accessed {course.lastAccessed}
                          </span>
                          <Link
                            to={`/course/${course.id}/learn`}
                            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                          >
                            Continue →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Achievements & Badges</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-lg border-2 ${
                        achievement.earned
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 bg-gray-50 opacity-60'
                      }`}
                    >
                      <div
                        className={`w-16 h-16 ${achievement.color} rounded-xl flex items-center justify-center mb-4`}
                      >
                        <achievement.icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {achievement.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {achievement.earned
                          ? 'Congratulations! You earned this achievement.'
                          : 'Keep learning to unlock this achievement.'}
                      </p>
                      {achievement.earned && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Award className="w-3 h-3 mr-1" />
                          Earned
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'certificates' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Certificates</h3>

                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    Complete your first course to earn a certificate
                  </h4>
                  <p className="text-gray-600 mb-6">
                    Certificates are awarded when you complete all lessons and pass the final
                    assessment.
                  </p>
                  <Link
                    to="/courses"
                    className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Browse Courses
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
