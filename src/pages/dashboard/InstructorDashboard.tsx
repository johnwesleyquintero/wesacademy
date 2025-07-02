import React, { useState } from 'react';
import { Plus, BookOpen, Users, DollarSign, TrendingUp, BarChart3, Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const courses = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      status: 'Published',
      students: 15420,
      revenue: 137780,
      rating: 4.8,
      reviews: 12543,
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '2',
      title: 'Advanced React Development',
      status: 'Published',
      students: 7830,
      revenue: 86130,
      rating: 4.9,
      reviews: 5432,
      image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '3',
      title: 'JavaScript Fundamentals',
      status: 'Draft',
      students: 0,
      revenue: 0,
      rating: 0,
      reviews: 0,
      image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const stats = [
    { label: 'Total Students', value: '23,250', icon: Users, color: 'text-blue-600', change: '+12%' },
    { label: 'Total Revenue', value: '$223,910', icon: DollarSign, color: 'text-green-600', change: '+8%' },
    { label: 'Active Courses', value: '2', icon: BookOpen, color: 'text-purple-600', change: '0%' },
    { label: 'Avg. Rating', value: '4.85', icon: TrendingUp, color: 'text-yellow-600', change: '+0.1' }
  ];

  const recentActivity = [
    { type: 'enrollment', message: 'New student enrolled in Web Development Bootcamp', time: '2 hours ago' },
    { type: 'review', message: 'New 5-star review on React Development course', time: '4 hours ago' },
    { type: 'question', message: 'Student asked a question in JavaScript module', time: '6 hours ago' },
    { type: 'completion', message: '15 students completed Web Development Bootcamp', time: '1 day ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your courses and track your success</p>
          </div>
          <Link
            to="/instructor/create-course"
            className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Course
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-gray-500'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'courses', 'analytics', 'students'].map((tab) => (
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
                {/* Recent Activity */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Performing Courses */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Top Performing Courses</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses.filter(course => course.status === 'Published').map((course) => (
                      <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Students:</span>
                              <span className="ml-1 font-medium">{course.students.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Revenue:</span>
                              <span className="ml-1 font-medium">${course.revenue.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Rating:</span>
                              <span className="ml-1 font-medium">{course.rating} ⭐</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Reviews:</span>
                              <span className="ml-1 font-medium">{course.reviews.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
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
                    to="/instructor/create-course"
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    New Course
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {courses.map((course) => (
                        <tr key={course.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={course.image}
                                alt={course.title}
                                className="w-10 h-10 rounded object-cover mr-4"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{course.title}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              course.status === 'Published' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {course.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {course.students.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${course.revenue.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {course.rating > 0 ? `${course.rating} ⭐` : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-primary-600 hover:text-primary-900">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Analytics & Insights</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-gray-900">Revenue Trend</h4>
                      <BarChart3 className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="h-64 flex items-center justify-center text-gray-500">
                      Revenue chart would be displayed here
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-gray-900">Student Engagement</h4>
                      <TrendingUp className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="h-64 flex items-center justify-center text-gray-500">
                      Engagement metrics would be displayed here
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'students' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Student Management</h3>
                
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Student management features coming soon</h4>
                  <p className="text-gray-600">
                    View student progress, answer questions, and manage course discussions.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}