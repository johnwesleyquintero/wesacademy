import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, TrendingUp, Star } from 'lucide-react';
import { CourseCard } from '../components/courses/CourseCard';
import { CourseFilters } from '../components/courses/CourseFilters';
import { useCourses } from '../hooks/useCourses';
import type { Course } from '../hooks/useCourses';

export function CoursesPage() {
  const { courses, loading, error, searchCourses } = useCourses();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Get unique categories from courses
  const categories = React.useMemo(() => {
    const uniqueCategories = [...new Set(courses.map((course) => course.category))];
    return uniqueCategories;
  }, [courses]);

  // Filter courses based on search and category
  useEffect(() => {
    const filterCourses = async () => {
      if (searchTerm.trim()) {
        setIsSearching(true);
        try {
          const searchResults = await searchCourses(searchTerm, {
            category: selectedCategory !== 'all' ? selectedCategory : undefined,
          });
          setFilteredCourses(searchResults);
        } catch (err) {
          console.error('Search error:', err);
          setFilteredCourses([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        // Filter by category only
        const filtered =
          selectedCategory === 'all'
            ? courses
            : courses.filter((course) => course.category === selectedCategory);
        setFilteredCourses(filtered);
      }
    };

    filterCourses();
  }, [searchTerm, selectedCategory, courses, searchCourses]);

  const trendingCourses = React.useMemo(() => {
    return courses.filter((course) => course.is_new || course.is_bestseller).slice(0, 3);
  }, [courses]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">Error loading courses: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Try Again
            </button>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Courses</h1>
          <p className="text-gray-600">
            Discover our complete collection of expert-led courses covering the most in-demand
            skills
          </p>
        </div>

        {/* Quick Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              All Courses
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category === 'Technology & Data' && <TrendingUp className="w-4 h-4 inline mr-2" />}
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Trending Banner */}
        {selectedCategory === 'all' && trendingCourses.length > 0 && (
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 text-red-600 mr-2" />
                  <span className="text-red-800 font-semibold">Trending Now</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Most Popular Courses This Month
                </h3>
                <p className="text-gray-600">Join thousands learning these in-demand skills</p>
              </div>
              <div className="hidden md:flex space-x-4">
                {trendingCourses.slice(0, 3).map((course) => (
                  <div key={course.id} className="text-center">
                    <img
                      src={
                        course.image_url ||
                        'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=100'
                      }
                      alt={course.title}
                      className="w-16 h-16 rounded-lg object-cover mb-2"
                    />
                    <p className="text-xs text-gray-600 max-w-16 truncate">{course.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses, instructors, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </button>

              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'} transition-colors`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-50'} transition-colors`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <CourseFilters />
            </div>
          )}

          {/* Course Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {isSearching ? (
                  'Searching...'
                ) : (
                  <>
                    Showing {filteredCourses.length} of {courses.length} courses
                    {selectedCategory !== 'all' && (
                      <span className="ml-2 text-primary-600 font-medium">
                        in {selectedCategory}
                      </span>
                    )}
                  </>
                )}
              </p>
              <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option>Most Popular</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Highest Rated</option>
                <option>Most Students</option>
              </select>
            </div>

            {/* Bestseller Badge Info */}
            {filteredCourses.some((course) => course.is_bestseller) && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="text-yellow-800 font-medium">
                    Bestseller courses are the highest-rated and most popular courses among students
                  </span>
                </div>
              </div>
            )}

            {isSearching ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
                  >
                    <div className="w-full h-48 bg-gray-200"></div>
                    <div className="p-6 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
                }`}
              >
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}

            {!isSearching && filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Load More */}
            {!isSearching && filteredCourses.length > 0 && filteredCourses.length >= 12 && (
              <div className="text-center mt-12">
                <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  Load More Courses
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
