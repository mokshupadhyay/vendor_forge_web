import React from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
    status: string;
    variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
    status,
    variant = 'neutral',
    size = 'md',
    className
}) => {
    const sizeClasses = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-2 text-base'
    };

    const variantClasses = {
        success: 'bg-green-100 text-green-800 border-green-200',
        warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        error: 'bg-red-100 text-red-800 border-red-200',
        info: 'bg-blue-100 text-blue-800 border-blue-200',
        neutral: 'bg-gray-100 text-gray-800 border-gray-200'
    };

    const getStatusVariant = (status: string): 'success' | 'warning' | 'error' | 'info' | 'neutral' => {
        const statusLower = status.toLowerCase();

        if (['active', 'verified', 'completed', 'delivered', 'approved'].includes(statusLower)) {
            return 'success';
        }
        if (['pending', 'in_progress', 'processing', 'review'].includes(statusLower)) {
            return 'warning';
        }
        if (['inactive', 'rejected', 'cancelled', 'failed', 'suspended'].includes(statusLower)) {
            return 'error';
        }
        if (['draft', 'new', 'unverified'].includes(statusLower)) {
            return 'info';
        }
        return 'neutral';
    };

    const finalVariant = variant === 'neutral' ? getStatusVariant(status) : variant;

    return (
        <span className={cn(
            'inline-flex items-center rounded-full border font-medium',
            sizeClasses[size],
            variantClasses[finalVariant],
            className
        )}>
            {status}
        </span>
    );
}; 