import { useState } from 'react';
import { useEnrollments } from '../../hooks/useEnrollments';
import { useAuth } from '../../contexts/AuthContext.hooks';
import { Link } from 'react-router-dom';
import { Play, Plus, CheckCircle } from 'lucide-react';

interface EnrollmentButtonProps {
  courseId: string;
  coursePrice: number;
  className?: string;
}

export function EnrollmentButton({ courseId, coursePrice, className = '' }: EnrollmentButtonProps) {
  const { user } = useAuth();
  const { enrollInCourse, isEnrolled, getEnrollment } = useEnrollments();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enrollment = getEnrollment(courseId);
  const userIsEnrolled = isEnrolled(courseId);

  const handleEnroll = async () => {
    if (!user) {
      // Redirect to login
      return;
    }

    setIsEnrolling(true);
    setError(null);

    try {
      await enrollInCourse(courseId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to enroll in course');
    } finally {
      setIsEnrolling(false);
    }
  };

  if (!user) {
    return (
      <Link
        to="/login"
        className={`inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors ${className}`}
      >
        Sign In to Enroll
      </Link>
    );
  }

  if (userIsEnrolled) {
    return (
      <div className="space-y-3">
        <div className="flex items-center text-green-600 text-sm font-medium">
          <CheckCircle className="w-4 h-4 mr-2" />
          Enrolled
        </div>
        <Link
          to={`/course/${courseId}/learn`}
          className={`inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors ${className}`}
        >
          <Play className="w-4 h-4 mr-2" />
          Continue Learning
        </Link>
        {enrollment && enrollment.progress > 0 && (
          <div className="text-sm text-gray-600">Progress: {enrollment.progress}% complete</div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleEnroll}
        disabled={isEnrolling}
        className={`inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {isEnrolling ? (
          'Enrolling...'
        ) : (
          <>
            <Plus className="w-4 h-4 mr-2" />
            {coursePrice === 0 ? 'Enroll for Free' : `Enroll Now - $${coursePrice}`}
          </>
        )}
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}
