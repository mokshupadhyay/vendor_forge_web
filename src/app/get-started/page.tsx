'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/common/Logo';
import {
    Store,
    ShoppingCart,
    ArrowRight,
    Check,
    Sparkles,
    Shield,
    TrendingUp,
    Users,
    Globe,
    Award
} from 'lucide-react';

export default function GetStartedPage() {
    const router = useRouter();

    const handleUserTypeSelection = (userType: 'vendor' | 'customer') => {
        // Store user type selection in localStorage for the registration flow
        localStorage.setItem('selectedUserType', userType);

        // Navigate to appropriate registration page
        if (userType === 'vendor') {
            router.push('/register/vendor');
        } else {
            router.push('/register/customer');
        }
    };

    const handleLoginRedirect = (userType: 'vendor' | 'customer') => {
        // Store user type for login context
        localStorage.setItem('selectedUserType', userType);

        // Navigate to appropriate login page
        if (userType === 'vendor') {
            router.push('/login/vendor');
        } else {
            router.push('/login/customer');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Header */}
            <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <Logo size="md" />
                        <div className="flex items-center space-x-6">
                            <div className="hidden md:flex items-center space-x-2">
                                <Shield className="w-4 h-4 text-accent-600" />
                                <span className="text-sm text-slate-600">Secure & Trusted Platform</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-slate-600">
                                <span>Already have an account?</span>
                                <span className="text-accent-600 font-medium">Choose your account type below</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center mb-6">
                        <div className="flex items-center space-x-2 bg-gradient-to-r from-accent-100 to-accent-200 px-6 py-3 rounded-full border border-accent-300">
                            <Sparkles className="w-5 h-5 text-accent-700" />
                            <span className="text-sm font-semibold text-accent-800">Defining Excellence in Commerce</span>
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                        Welcome to{' '}
                        <span className="vf-text-gradient">VendorForge</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
                        The premier marketplace platform where excellence meets opportunity.
                        Connect with trusted partners, grow your business, and achieve greatness together.
                    </p>

                    {/* Demo Credentials Info */}
                    <div className="bg-slate-100 rounded-xl p-6 max-w-2xl mx-auto mb-12">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Demo Credentials</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-white rounded-lg p-4 border border-slate-200">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Store className="w-4 h-4 text-primary-600" />
                                    <span className="font-medium text-slate-700">Vendor Account</span>
                                </div>
                                <p className="text-slate-600">Email: vendor@example.com</p>
                                <p className="text-slate-600">Password: vendor123</p>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-slate-200">
                                <div className="flex items-center space-x-2 mb-2">
                                    <ShoppingCart className="w-4 h-4 text-secondary-600" />
                                    <span className="font-medium text-slate-700">Customer Account</span>
                                </div>
                                <p className="text-slate-600">Email: customer@example.com</p>
                                <p className="text-slate-600">Password: customer123</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Type Selection */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
                    {/* Vendor Card */}
                    <Card className="relative overflow-hidden border-2 border-slate-200 hover:border-primary-300 transition-all duration-300 hover:shadow-lg group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <TrendingUp className="w-5 h-5 text-primary-600" />
                        </div>
                        <CardHeader className="relative z-10 pb-8 pt-8">
                            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                                <Store className="w-8 h-8 text-primary-700" />
                            </div>
                            <CardTitle className="text-2xl font-bold text-center text-slate-900 mb-3">
                                I am a Vendor
                            </CardTitle>
                            <CardDescription className="text-center text-slate-600 text-base leading-relaxed">
                                Build your business empire. Sell products and services to customers worldwide with our powerful tools.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="relative z-10 space-y-6 pb-8">
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Check className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-700">Unlimited product & service listings</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Check className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-700">Advanced inventory & order management</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Check className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-700">Comprehensive analytics & insights</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Check className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-700">Global marketplace reach</span>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4">
                                <Button
                                    onClick={() => handleUserTypeSelection('vendor')}
                                    className="w-full vf-btn-primary text-base font-semibold py-3"
                                    size="lg"
                                >
                                    Start Selling Today
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => handleLoginRedirect('vendor')}
                                    className="w-full border-2 border-primary-300 text-primary-700 hover:bg-primary-50 py-2.5 font-medium"
                                >
                                    Sign in as Vendor
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Customer Card */}
                    <Card className="relative overflow-hidden border-2 border-slate-200 hover:border-secondary-300 transition-all duration-300 hover:shadow-lg group">
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary-50 to-secondary-100 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Sparkles className="w-5 h-5 text-secondary-600" />
                        </div>
                        <CardHeader className="relative z-10 pb-8 pt-8">
                            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-xl mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                                <ShoppingCart className="w-8 h-8 text-secondary-700" />
                            </div>
                            <CardTitle className="text-2xl font-bold text-center text-slate-900 mb-3">
                                I am a Customer
                            </CardTitle>
                            <CardDescription className="text-center text-slate-600 text-base leading-relaxed">
                                Discover excellence. Find and purchase from trusted vendors with confidence and ease.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="relative z-10 space-y-6 pb-8">
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Check className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-700">Browse thousands of verified vendors</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Check className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-700">Compare prices, reviews & ratings</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Check className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-700">Secure payments & guaranteed delivery</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <Check className="w-5 h-5 text-accent-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-700">Individual, company & organization accounts</span>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4">
                                <Button
                                    onClick={() => handleUserTypeSelection('customer')}
                                    className="w-full vf-btn-secondary text-base font-semibold py-3"
                                    size="lg"
                                >
                                    Start Shopping Now
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => handleLoginRedirect('customer')}
                                    className="w-full border-2 border-secondary-300 text-secondary-700 hover:bg-secondary-50 py-2.5 font-medium"
                                >
                                    Sign in as Customer
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Excellence Indicators */}
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <Award className="w-8 h-8 text-accent-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Defining Excellence in Commerce</h2>
                        <p className="text-slate-600">Join a community of successful businesses achieving greatness together</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center space-y-3">
                            <div className="flex items-center justify-center mb-2">
                                <Users className="w-6 h-6 text-primary-600" />
                            </div>
                            <div className="text-3xl font-bold vf-text-gradient">10,000+</div>
                            <div className="text-slate-600 font-medium">Active Vendors</div>
                            <div className="text-sm text-slate-500">Growing daily</div>
                        </div>
                        <div className="text-center space-y-3">
                            <div className="flex items-center justify-center mb-2">
                                <Globe className="w-6 h-6 text-secondary-600" />
                            </div>
                            <div className="text-3xl font-bold vf-text-gradient">50,000+</div>
                            <div className="text-slate-600 font-medium">Happy Customers</div>
                            <div className="text-sm text-slate-500">Across 50+ countries</div>
                        </div>
                        <div className="text-center space-y-3">
                            <div className="flex items-center justify-center mb-2">
                                <TrendingUp className="w-6 h-6 text-accent-600" />
                            </div>
                            <div className="text-3xl font-bold vf-text-gradient">$1M+</div>
                            <div className="text-slate-600 font-medium">Transactions Processed</div>
                            <div className="text-sm text-slate-500">Secure & reliable</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
} 