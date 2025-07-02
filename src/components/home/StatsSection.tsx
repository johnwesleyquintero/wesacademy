import React from 'react';
import { Users, BookOpen, Award, Globe } from 'lucide-react';

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: '50K+',
      label: 'Active Students',
      description: 'Learning with us globally'
    },
    {
      icon: BookOpen,
      value: '1,200+',
      label: 'Course Available',
      description: 'Across various subjects'
    },
    {
      icon: Award,
      value: '95%',
      label: 'Success Rate',
      description: 'Course completion rate'
    },
    {
      icon: Globe,
      value: '40+',
      label: 'Countries',
      description: 'Students from worldwide'
    }
  ];

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4 group-hover:bg-primary-200 transition-colors">
                <stat.icon className="w-8 h-8 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}