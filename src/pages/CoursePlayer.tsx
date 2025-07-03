import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize,
  BookOpen,
  Download,
  MessageCircle,
  CheckCircle,
} from 'lucide-react';

export function CoursePlayer() {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [completedLessons, setCompletedLessons] = useState(new Set(['1', '2']));

  const course = {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    instructor: 'Sarah Johnson',
    currentLesson: {
      id: '3',
      title: 'Introduction to HTML',
      duration: '12:34',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    },
    curriculum: [
      {
        section: 'Getting Started',
        lessons: [
          { id: '1', title: 'Course Introduction', duration: '5:23', completed: true },
          { id: '2', title: 'Development Environment Setup', duration: '8:45', completed: true },
          {
            id: '3',
            title: 'Introduction to HTML',
            duration: '12:34',
            completed: false,
            current: true,
          },
          { id: '4', title: 'HTML Elements and Tags', duration: '15:22', completed: false },
        ],
      },
      {
        section: 'HTML Fundamentals',
        lessons: [
          { id: '5', title: 'Document Structure', duration: '10:15', completed: false },
          { id: '6', title: 'Forms and Input Types', duration: '18:45', completed: false },
          { id: '7', title: 'Semantic HTML', duration: '14:30', completed: false },
        ],
      },
      {
        section: 'CSS Styling',
        lessons: [
          { id: '8', title: 'CSS Selectors', duration: '16:20', completed: false },
          { id: '9', title: 'Box Model', duration: '13:55', completed: false },
          { id: '10', title: 'Flexbox Layout', duration: '22:15', completed: false },
        ],
      },
    ],
    resources: [
      { name: 'HTML Cheat Sheet', type: 'PDF', size: '2.3 MB' },
      { name: 'CSS Reference Guide', type: 'PDF', size: '1.8 MB' },
      { name: 'Project Source Code', type: 'ZIP', size: '5.2 MB' },
    ],
    notes: [
      { id: '1', timestamp: '2:15', content: 'Remember to always use semantic HTML elements' },
      { id: '2', timestamp: '8:30', content: 'DOCTYPE declaration is important for HTML5' },
    ],
  };

  const handleLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) => new Set([...prev, lessonId]));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Main Video Player */}
      <div className="flex-1 flex flex-col">
        {/* Video Player */}
        <div className="relative bg-black aspect-video">
          <video
            className="w-full h-full"
            poster="https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1200"
            controls
          >
            <source src={course.currentLesson.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Custom Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <div className="flex items-center space-x-2">
                  <SkipBack className="w-5 h-5 cursor-pointer hover:text-primary-400" />
                  <SkipForward className="w-5 h-5 cursor-pointer hover:text-primary-400" />
                </div>
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-5 h-5" />
                  <div className="w-20 h-1 bg-gray-600 rounded-full">
                    <div className="w-3/4 h-full bg-white rounded-full"></div>
                  </div>
                </div>
                <span className="text-sm">2:15 / {course.currentLesson.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Maximize className="w-5 h-5 cursor-pointer hover:text-primary-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Info */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {course.currentLesson.title}
              </h1>
              <p className="text-gray-600">
                {course.title} • {course.instructor}
              </p>
            </div>
            <button
              onClick={() => handleLessonComplete(course.currentLesson.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                completedLessons.has(course.currentLesson.id)
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              {completedLessons.has(course.currentLesson.id) ? (
                <>
                  <CheckCircle className="w-5 h-5 inline mr-2" />
                  Completed
                </>
              ) : (
                'Mark as Complete'
              )}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white">
          <nav className="flex space-x-8 px-6">
            {['overview', 'resources', 'notes', 'discussions'].map((tab) => (
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

        {/* Tab Content */}
        <div className="bg-white flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Overview</h3>
                <p className="text-gray-700 leading-relaxed">
                  In this lesson, you'll learn the fundamentals of HTML (HyperText Markup Language),
                  the building block of all web pages. We'll cover the basic structure of HTML
                  documents, common elements, and best practices for writing semantic HTML.
                </p>
              </div>

              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-3">What you'll learn:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      HTML document structure and DOCTYPE declaration
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Common HTML elements and their purposes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">
                      Semantic HTML and accessibility considerations
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Building your first HTML page</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Lesson Resources</h3>
              <div className="space-y-3">
                {course.resources.map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                        <BookOpen className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{resource.name}</h4>
                        <p className="text-sm text-gray-500">
                          {resource.type} • {resource.size}
                        </p>
                      </div>
                    </div>
                    <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">My Notes</h3>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  Add Note
                </button>
              </div>

              <div className="space-y-4">
                {course.notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-yellow-800">{note.timestamp}</span>
                      <button className="text-yellow-600 hover:text-yellow-800">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-700">{note.content}</p>
                  </div>
                ))}
              </div>

              {course.notes.length === 0 && (
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    No notes yet. Add your first note while watching the video!
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'discussions' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Discussions & Q&A</h3>

              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Join the Discussion</h4>
                <p className="text-gray-500 mb-6">
                  Ask questions, share insights, and connect with fellow students.
                </p>
                <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  Start a Discussion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar - Course Curriculum */}
      <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Course Content</h2>
          <p className="text-sm text-gray-600">
            {course.curriculum.reduce((total, section) => total + section.lessons.length, 0)}{' '}
            lessons
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {course.curriculum.map((section, sectionIndex) => (
            <div key={sectionIndex} className="border-b border-gray-200">
              <div className="p-4 bg-gray-50">
                <h3 className="font-medium text-gray-900">{section.section}</h3>
                <p className="text-sm text-gray-500 mt-1">{section.lessons.length} lessons</p>
              </div>

              <div className="divide-y divide-gray-100">
                {section.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      lesson.current ? 'bg-primary-50 border-r-4 border-primary-600' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            lesson.completed
                              ? 'bg-green-500 text-white'
                              : lesson.current
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-200'
                          }`}
                        >
                          {lesson.completed ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : lesson.current ? (
                            <Play className="w-3 h-3" />
                          ) : (
                            <span className="text-xs font-medium">{lesson.id}</span>
                          )}
                        </div>
                        <div>
                          <h4
                            className={`text-sm font-medium ${
                              lesson.current ? 'text-primary-900' : 'text-gray-900'
                            }`}
                          >
                            {lesson.title}
                          </h4>
                          <p className="text-xs text-gray-500">{lesson.duration}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
