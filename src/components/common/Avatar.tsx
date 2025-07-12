import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
    src?: string;
    alt?: string;
    name?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    className?: string;
    variant?: 'circle' | 'square';
}

export const Avatar: React.FC<AvatarProps> = ({
    src,
    alt,
    name,
    size = 'md',
    className,
    variant = 'circle'
}) => {
    const sizeClasses = {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-lg',
        '2xl': 'h-20 w-20 text-xl'
    };

    const variantClasses = {
        circle: 'rounded-full',
        square: 'rounded-lg'
    };

    const getInitials = (name?: string): string => {
        if (!name) return '?';
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const getBackgroundColor = (name?: string): string => {
        if (!name) return 'bg-neutral-400';

        const colors = [
            'bg-red-500',
            'bg-orange-500',
            'bg-amber-500',
            'bg-yellow-500',
            'bg-lime-500',
            'bg-green-500',
            'bg-emerald-500',
            'bg-teal-500',
            'bg-cyan-500',
            'bg-sky-500',
            'bg-blue-500',
            'bg-indigo-500',
            'bg-violet-500',
            'bg-purple-500',
            'bg-fuchsia-500',
            'bg-pink-500',
            'bg-rose-500'
        ];

        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    if (src) {
        return (
            <div className={cn(
                'relative flex items-center justify-center overflow-hidden',
                sizeClasses[size],
                variantClasses[variant],
                className
            )}>
                <img
                    src={src}
                    alt={alt || name || 'Avatar'}
                    className="h-full w-full object-cover"
                />
            </div>
        );
    }

    return (
        <div className={cn(
            'relative flex items-center justify-center font-medium text-white',
            sizeClasses[size],
            variantClasses[variant],
            getBackgroundColor(name),
            className
        )}>
            {getInitials(name)}
        </div>
    );
}; 