import React, { useState } from 'react';
import { ArrowLeft, Upload, Plus, X, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CreateCoursePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: '',
    level: '',
    language: 'English',
    price: '',
    thumbnail: null,
    curriculum: [
      {
        sectionTitle: '',
        lessons: [{ title: '', duration: '', videoFile: null }],
      },
    ],
  });

  const steps = [
    { id: 1, title: 'Course Details', description: 'Basic information about your course' },
    { id: 2, title: 'Curriculum', description: 'Structure your course content' },
    { id: 3, title: 'Pricing', description: 'Set your course price and publish' },
  ];

  const categories = [
    'Web Development',
    'Data Science',
    'Design',
    'Business',
    'Marketing',
    'Photography',
    'Programming',
    'Mobile Development',
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  const handleInputChange = (field: string, value: any) => {
    setCourseData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addSection = () => {
    setCourseData((prev) => ({
      ...prev,
      curriculum: [
        ...prev.curriculum,
        {
          sectionTitle: '',
          lessons: [{ title: '', duration: '', videoFile: null }],
        },
      ],
    }));
  };

  const addLesson = (sectionIndex: number) => {
    setCourseData((prev) => ({
      ...prev,
      curriculum: prev.curriculum.map((section, index) =>
        index === sectionIndex
          ? {
              ...section,
              lessons: [...section.lessons, { title: '', duration: '', videoFile: null }],
            }
          : section
      ),
    }));
  };

  const removeSection = (sectionIndex: number) => {
    setCourseData((prev) => ({
      ...prev,
      curriculum: prev.curriculum.filter((_, index) => index !== sectionIndex),
    }));
  };

  const removeLesson = (sectionIndex: number, lessonIndex: number) => {
    setCourseData((prev) => ({
      ...prev,
      curriculum: prev.curriculum.map((section, index) =>
        index === sectionIndex
          ? {
              ...section,
              lessons: section.lessons.filter((_, lIndex) => lIndex !== lessonIndex),
            }
          : section
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle final submission
      console.log('Course data:', courseData);
      alert('Course created successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/dashboard/instructor"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
          <p className="text-gray-600 mt-2">Share your knowledge with students worldwide</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <nav aria-label="Progress">
            <ol className="flex items-center">
              {steps.map((step, index) => (
                <li
                  key={step.id}
                  className={`relative ${index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}
                >
                  <div className="flex items-center">
                    <div
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center ${
                        currentStep >= step.id
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step.id}
                    </div>
                    {index !== steps.length - 1 && (
                      <div
                        className={`absolute top-4 left-8 w-full h-0.5 ${
                          currentStep > step.id ? 'bg-primary-600' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                  <div className="ml-4">
                    <p
                      className={`text-sm font-medium ${
                        currentStep >= step.id ? 'text-primary-600' : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Course Details */}
            {currentStep === 1 && (
              <div className="p-8 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Course Details</h2>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Title
                    </label>
                    <input
                      type="text"
                      required
                      value={courseData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="e.g., Complete Web Development Bootcamp"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Subtitle
                    </label>
                    <input
                      type="text"
                      value={courseData.subtitle}
                      onChange={(e) => handleInputChange('subtitle', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Brief description of what students will learn"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Description
                    </label>
                    <textarea
                      rows={6}
                      value={courseData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Detailed description of your course content, objectives, and requirements"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        required
                        value={courseData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                      <select
                        required
                        value={courseData.level}
                        onChange={(e) => handleInputChange('level', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Select level</option>
                        {levels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Thumbnail
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG up to 10MB (Recommended: 1280x720)
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleInputChange('thumbnail', e.target.files?.[0] || null)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Curriculum */}
            {currentStep === 2 && (
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-gray-900">Course Curriculum</h2>
                  <button
                    type="button"
                    onClick={addSection}
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Section
                  </button>
                </div>

                <div className="space-y-6">
                  {courseData.curriculum.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1 mr-4">
                          <input
                            type="text"
                            placeholder="Section title (e.g., Introduction to HTML)"
                            value={section.sectionTitle}
                            onChange={(e) => {
                              const newCurriculum = [...courseData.curriculum];
                              newCurriculum[sectionIndex].sectionTitle = e.target.value;
                              handleInputChange('curriculum', newCurriculum);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-medium"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSection(sectionIndex)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lessonIndex}
                            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                              <input
                                type="text"
                                placeholder="Lesson title"
                                value={lesson.title}
                                onChange={(e) => {
                                  const newCurriculum = [...courseData.curriculum];
                                  newCurriculum[sectionIndex].lessons[lessonIndex].title =
                                    e.target.value;
                                  handleInputChange('curriculum', newCurriculum);
                                }}
                                className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              />
                              <input
                                type="text"
                                placeholder="Duration (e.g., 12:34)"
                                value={lesson.duration}
                                onChange={(e) => {
                                  const newCurriculum = [...courseData.curriculum];
                                  newCurriculum[sectionIndex].lessons[lessonIndex].duration =
                                    e.target.value;
                                  handleInputChange('curriculum', newCurriculum);
                                }}
                                className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeLesson(sectionIndex, lessonIndex)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() => addLesson(sectionIndex)}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          + Add Lesson
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Pricing */}
            {currentStep === 3 && (
              <div className="p-8 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Pricing & Publish</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Price (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={courseData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="0.00"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Set to $0.00 to make this a free course
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Ready to Publish?</h3>
                    <p className="text-blue-800 mb-4">
                      Your course will be reviewed before going live. This typically takes 1-2
                      business days.
                    </p>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Students can enroll and start learning immediately</li>
                      <li>• You'll receive notifications for new enrollments</li>
                      <li>• Course analytics will be available in your dashboard</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
              )}

              <div className="ml-auto flex space-x-4">
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  Save Draft
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  {currentStep === 3 ? 'Publish Course' : 'Next'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
