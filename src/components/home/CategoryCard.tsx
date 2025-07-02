import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Database, Palette, Briefcase, Megaphone, Camera } from 'lucide-react';

const iconMap = {
  code: Code,
  database: Database,
  palette: Palette,
  briefcase: Briefcase,
  megaphone: Megaphone,
  camera: Camera,
};

interface Category {
  name: string;
  icon: keyof typeof iconMap;
  courses: number;
  color: string;
}

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const IconComponent = iconMap[category.icon];

  return (
    <Link
      to={`/courses?category=${category.name.toLowerCase().replace(' ', '-')}`}
      className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 text-center"
    >
      <div className={`w-16 h-16 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <IconComponent className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
        {category.name}
      </h3>
      <p className="text-sm text-gray-600">
        {category.courses} courses
      </p>
    </Link>
  );
}