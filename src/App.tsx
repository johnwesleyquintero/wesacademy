import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { StudentDashboard } from './pages/dashboard/StudentDashboard';
import { InstructorDashboard } from './pages/dashboard/InstructorDashboard';
import { CoursePlayer } from './pages/CoursePlayer';
import { CreateCoursePage } from './pages/instructor/CreateCoursePage';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/course/:id" element={<CourseDetailPage />} />
            <Route 
              path="/login" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <LoginPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <SignUpPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/student" 
              element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/instructor" 
              element={
                <ProtectedRoute>
                  <InstructorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/course/:id/learn" 
              element={
                <ProtectedRoute>
                  <CoursePlayer />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/instructor/create-course" 
              element={
                <ProtectedRoute>
                  <CreateCoursePage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;