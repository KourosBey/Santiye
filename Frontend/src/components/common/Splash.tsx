import React from 'react';
import { Loader2 } from 'lucide-react';

interface SplashProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

const Splash = ({ 
  message = 'Yükleniyor...', 
  size = 'md',
  fullScreen = false 
}: SplashProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50'
    : 'flex items-center justify-center p-6';

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-4">
        <Loader2 
          className={`${sizeClasses[size]} animate-spin text-blue-600 dark:text-blue-400`}
        />
        {message && (
          <p className={`${textSizeClasses[size]} text-gray-600 dark:text-gray-400 font-medium`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Splash;