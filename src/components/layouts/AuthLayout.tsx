import React from 'react';
import { Logo } from '@/components/common/Logo';
import { cn } from '@/lib/utils';

interface AuthLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
    children,
    className
}) => {
    return (
        <div className={cn(
            'min-h-screen flex items-center justify-center p-4',
            'vf-gradient-hero',
            className
        )}>
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16" />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left Side - Branding */}
                    <div className="hidden lg:block text-white">
                        <div className="space-y-6">
                            <Logo
                                size="xl"
                                variant="white"
                                className="mb-8"
                            />

                            <div className="space-y-4">
                                <h1 className="text-4xl font-bold leading-tight">
                                    Connect with trusted vendors worldwide
                                </h1>
                                <p className="text-xl text-white/90 leading-relaxed">
                                    VendorForge simplifies procurement for individuals, companies, and organizations.
                                    Discover, compare, and purchase from verified vendors in one platform.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 mt-8">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-white/90">Verified vendor network</span>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-white/90">Streamlined procurement</span>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-white/90">Secure transactions</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="flex items-center justify-center">
                        <div className="w-full max-w-md lg:max-w-2xl">
                            {/* Mobile Logo */}
                            <div className="lg:hidden text-center mb-8">
                                <Logo
                                    size="lg"
                                    variant="white"
                                />
                            </div>

                            {/* Form Container */}
                            <div className="vf-animate-fade-in">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            </div>
        </div>
    );
}; 