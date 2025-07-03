import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Users, BookOpen, Award, Zap } from 'lucide-react';

interface Course {
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

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const discount = course.originalPrice
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {course.isBestseller && (
            <div className="bg-yellow-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center">
              <Award className="w-3 h-3 mr-1" />
              BESTSELLER
            </div>
          )}
          {course.isNew && (
            <div className="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center">
              <Zap className="w-3 h-3 mr-1" />
              NEW
            </div>
          )}
          {discount > 0 && (
            <div className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
              {discount}% OFF
            </div>
          )}
        </div>

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-gray-700">
          {course.level}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-2">
          <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
            {course.category}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          <Link to={`/course/${course.id}`}>{course.title}</Link>
        </h3>

        <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>

        {/* Tags */}
        {course.tags && course.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {course.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700 ml-1">{course.rating}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Users className="w-4 h-4" />
            <span className="text-sm ml-1">{course.students.toLocaleString()}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm ml-1">{course.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">${course.price}</span>
            {course.originalPrice && (
              <span className="text-lg text-gray-500 line-through">${course.originalPrice}</span>
            )}
          </div>
          <Link
            to={`/course/${course.id}`}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
}
