import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Award, TrendingUp, Play, Calendar, Star, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEnrollments } from '../../hooks/useEnrollments';
import { useAuth } from '../../contexts/AuthContext.hooks';

export function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { enrollments, loading, error } = useEnrollments();
  const { user } = useAuth();

  const achievements = [
    { name: 'First Course Completed', icon: Award, color: 'bg-yellow-500', earned: true },
    { name: '7 Day Streak', icon: Calendar, color: 'bg-green-500', earned: true },
    { name: 'Top Performer', icon: TrendingUp, color: 'bg-blue-500', earned: false },
    { name: 'Course Creator', icon: BookOpen, color: 'bg-purple-500', earned: false },
  ];

  // Calculate stats from enrollments
  const stats = React.useMemo(() => {
    const totalHours = enrollments.reduce((sum, enrollment) => {
      const duration = enrollment.course?.duration || '0h';
      const hours = parseFloat(duration.replace('h', '').replace(' hours', '')) || 0;
      return sum + (hours * (enrollment.progress / 100));
    }, 0);

    const completedCourses = enrollments.filter(e => e.progress >= 100).length;
    const currentStreak = 7; // This would be calculated based on last_accessed dates

    return [
      { label: 'Courses Enrolled', value: enrollments.length.toString(), icon: BookOpen, color: 'text-blue-600' },
      { label: 'Hours Learned', value: Math.round(totalHours).toString(), icon: Clock, color: 'text-green-600' },
      { label: 'Certificates Earned', value: completedCourses.toString(), icon: Award, color: 'text-yellow-600' },
      { label: 'Current Streak', value: currentStreak.toString(), icon: TrendingUp, color: 'text-purple-600' },
    ];
  }, [enrollments]);

  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ')[0];
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'Student';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {getUserDisplayName()}!</h1>
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
                  {enrollments.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h4>
                      <p className="text-gray-600 mb-6">Start your learning journey by enrolling in a course.</p>
                      <Link
                        to="/courses"
                        className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <BookOpen className="w-5 h-5 mr-2" />
                        Browse Courses
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {enrollments.slice(0, 2).map((enrollment) => (
                        <div key={enrollment.id} className="bg-gray-50 rounded-lg p-6">
                          <div className="flex items-start space-x-4">
                            <img
                              src={enrollment.course?.image_url || 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=300'}
                              alt={enrollment.course?.title || 'Course'}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                                {enrollment.course?.title || 'Unknown Course'}
                              </h4>
                              <p className="text-sm text-gray-600 mb-3">
                                by {enrollment.course?.instructor_name || 'Unknown Instructor'}
                              </p>

                              <div className="mb-3">
                                <div className="flex justify-between text-sm text-gray-600 mb-1">
                                  <span>Progress</span>
                                  <span>{enrollment.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${enrollment.progress}%` }}
                                  ></div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">
                                  {enrollment.course?.duration || 'Duration not specified'}
                                </span>
                                <Link
                                  to={`/course/${enrollment.course_id}/learn`}
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
                  )}
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

                {enrollments.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No enrolled courses</h4>
                    <p className="text-gray-600 mb-6">Start learning by enrolling in your first course.</p>
                    <Link
                      to="/courses"
                      className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <BookOpen className="w-5 h-5 mr-2" />
                      Browse Courses
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrollments.map((enrollment) => (
                      <div
                        key={enrollment.id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <img
                          src={enrollment.course?.image_url || 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=300'}
                          alt={enrollment.course?.title || 'Course'}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            {enrollment.course?.title || 'Unknown Course'}
                          </h4>
                          <p className="text-sm text-gray-600 mb-4">
                            by {enrollment.course?.instructor_name || 'Unknown Instructor'}
                          </p>

                          <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{enrollment.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-primary-600 h-2 rounded-full"
                                style={{ width: `${enrollment.progress}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              Enrolled {new Date(enrollment.enrolled_at).toLocaleDateString()}
                            </span>
                            <Link
                              to={`/course/${enrollment.course_id}/learn`}
                              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                            >
                              Continue →
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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

                {enrollments.filter(e => e.progress >= 100).length === 0 ? (
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
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {enrollments
                      .filter(e => e.progress >= 100)
                      .map((enrollment) => (
                        <div key={enrollment.id} className="bg-white border border-gray-200 rounded-lg p-6">
                          <div className="flex items-center mb-4">
                            <Award className="w-8 h-8 text-yellow-500 mr-3" />
                            <div>
                              <h4 className="font-semibold text-gray-900">Certificate of Completion</h4>
                              <p className="text-sm text-gray-600">{enrollment.course?.title}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mb-4">
                            Completed on {enrollment.completed_at ? new Date(enrollment.completed_at).toLocaleDateString() : 'Recently'}
                          </p>
                          <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
                            Download Certificate
                          </button>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}