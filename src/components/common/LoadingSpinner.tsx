import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'primary' | 'secondary' | 'neutral';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    className,
    size = 'md',
    variant = 'primary'
}) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-10 w-10'
    };

    const colorClasses = {
        primary: 'text-primary-600',
        secondary: 'text-secondary-600',
        neutral: 'text-neutral-600'
    };

    return (
        <div className={cn('flex items-center justify-center', className)}>
            <svg
                className={cn(
                    'animate-spin',
                    sizeClasses[size],
                    colorClasses[variant]
                )}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        </div>
    );
}; 