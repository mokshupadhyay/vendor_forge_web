import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'default' | 'white' | 'gradient';
    showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
    className,
    size = 'md',
    variant = 'default',
    showText = true
}) => {
    const sizeClasses = {
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-10 w-10',
        xl: 'h-12 w-12'
    };

    const textSizeClasses = {
        sm: 'text-lg',
        md: 'text-xl',
        lg: 'text-2xl',
        xl: 'text-3xl'
    };

    const iconColorClasses = {
        default: 'text-primary-600',
        white: 'text-white',
        gradient: 'vf-text-gradient'
    };

    const textColorClasses = {
        default: 'text-neutral-900',
        white: 'text-white',
        gradient: 'vf-text-gradient'
    };

    return (
        <Link href="/" className={cn('flex items-center space-x-2 hover:opacity-80 transition-opacity', className)}>
            {/* Logo Icon */}
            <div className={cn(
                'relative flex items-center justify-center rounded-lg',
                sizeClasses[size],
                variant === 'gradient' ? 'vf-gradient-primary' : ''
            )}>
                <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    className={cn(
                        'h-full w-full',
                        variant === 'gradient' ? 'text-white' : iconColorClasses[variant]
                    )}
                >
                    {/* VendorForge Icon - Clear V + F design */}
                    {/* Letter V */}
                    <path
                        d="M4 6h3.5l4 12 4-12H19l-6 18h-2L4 6z"
                        fill="currentColor"
                        fillOpacity="0.9"
                    />
                    {/* Letter F */}
                    <path
                        d="M21 6h8v3h-5v3h4v3h-4v7h-3V6z"
                        fill="currentColor"
                        fillOpacity="0.9"
                    />
                    {/* Connection element */}
                    <path
                        d="M16 14h6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.7"
                    />
                </svg>
            </div>

            {/* Logo Text */}
            {showText && (
                <div className="flex flex-col">
                    <span className={cn(
                        'font-bold leading-none tracking-tight',
                        textSizeClasses[size],
                        textColorClasses[variant]
                    )}>
                        VendorForge
                    </span>
                    {size === 'lg' || size === 'xl' ? (
                        <span className={cn(
                            'text-xs font-medium opacity-70',
                            variant === 'white' ? 'text-white' : 'text-neutral-600'
                        )}>
                            Marketplace Platform
                        </span>
                    ) : null}
                </div>
            )}
        </Link>
    );
}; 