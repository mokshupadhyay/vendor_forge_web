'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Logo } from '@/components/common/Logo';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import {
    User,
    Store,
    ArrowLeft,
    Mail,
    Lock,
    Eye,
    EyeOff,
    CheckCircle
} from 'lucide-react';

// Form validation schema
const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

type AccountType = 'vendor' | 'customer' | null;

export default function UnifiedLogin() {
    const router = useRouter();
    const [accountType, setAccountType] = useState<AccountType>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const handleAccountTypeSelect = (type: AccountType) => {
        console.log('Login account type selected:', type);
        setAccountType(type);
        reset();
    };

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);

        try {
            // TODO: Implement actual authentication logic
            console.log('Login attempt:', { ...data, accountType });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Redirect based on account type
            if (accountType === 'vendor') {
                router.push('/dashboard/vendor');
            } else {
                router.push('/discover');
            }
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDemoLogin = async (type: 'vendor' | 'customer') => {
        setIsLoading(true);

        try {
            // TODO: Implement actual demo login logic
            console.log('Demo login:', type);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 800));

            // Redirect based on account type
            if (type === 'vendor') {
                router.push('/dashboard/vendor');
            } else {
                router.push('/discover');
            }
        } catch (error) {
            console.error('Demo login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
            {/* Header */}
            <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <Logo />
                        <div className="flex items-center space-x-6">
                            <span className="text-slate-600">Don't have an account?</span>
                            <Link href="/register">
                                <Button variant="outline" className="border-slate-300 hover:border-slate-400">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-lg">
                    <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
                        <CardHeader className="space-y-8 pb-8">
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-slate-900 mb-3">
                                    Welcome Back
                                </h1>
                                <p className="text-lg text-slate-600">
                                    Sign in to your VendorForge account
                                </p>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-8">
                            {!accountType ? (
                                /* Account Type Selection */
                                <div className="space-y-8">
                                    <div className="text-center">
                                        <h2 className="text-xl font-semibold text-slate-900 mb-3">
                                            Select Account Type
                                        </h2>
                                        <p className="text-slate-600">
                                            Choose how you want to access VendorForge
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6">
                                        <button
                                            onClick={() => handleAccountTypeSelect('customer')}
                                            className="group relative p-8 border-2 border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 text-left"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                                    <User className="w-7 h-7 text-blue-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                                        Customer Login
                                                    </h3>
                                                    <p className="text-slate-600">
                                                        Discover and purchase from verified vendors
                                                    </p>
                                                </div>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => handleAccountTypeSelect('vendor')}
                                            className="group relative p-8 border-2 border-slate-200 rounded-xl hover:border-teal-300 hover:bg-teal-50/50 transition-all duration-200 text-left"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                                                    <Store className="w-7 h-7 text-teal-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                                        Vendor Login
                                                    </h3>
                                                    <p className="text-slate-600">
                                                        Manage your products and grow your business
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    </div>

                                    {/* Demo Login Section */}
                                    <div className="pt-8 border-t border-slate-200">
                                        <div className="text-center mb-6">
                                            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                                Try Demo Accounts
                                            </h3>
                                            <p className="text-slate-600">
                                                Explore VendorForge with pre-configured demo accounts
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <Button
                                                onClick={() => handleDemoLogin('customer')}
                                                disabled={isLoading}
                                                variant="outline"
                                                className="h-14 border-blue-200 hover:border-blue-300 hover:bg-blue-50"
                                            >
                                                {isLoading ? (
                                                    <LoadingSpinner className="w-4 h-4 mr-2" />
                                                ) : (
                                                    <User className="w-4 h-4 mr-2" />
                                                )}
                                                Demo Customer
                                            </Button>
                                            <Button
                                                onClick={() => handleDemoLogin('vendor')}
                                                disabled={isLoading}
                                                variant="outline"
                                                className="h-14 border-teal-200 hover:border-teal-300 hover:bg-teal-50"
                                            >
                                                {isLoading ? (
                                                    <LoadingSpinner className="w-4 h-4 mr-2" />
                                                ) : (
                                                    <Store className="w-4 h-4 mr-2" />
                                                )}
                                                Demo Vendor
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* Login Form */
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between">
                                        <Button
                                            variant="ghost"
                                            onClick={() => setAccountType(null)}
                                            className="p-2 hover:bg-slate-100 rounded-lg"
                                        >
                                            <ArrowLeft className="w-5 h-5" />
                                        </Button>
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${accountType === 'vendor' ? 'bg-teal-100' : 'bg-blue-100'
                                                }`}>
                                                {accountType === 'vendor' ? (
                                                    <Store className="w-5 h-5 text-teal-600" />
                                                ) : (
                                                    <User className="w-5 h-5 text-blue-600" />
                                                )}
                                            </div>
                                            <div>
                                                <h2 className="text-lg font-semibold text-slate-900">
                                                    {accountType === 'vendor' ? 'Vendor Login' : 'Customer Login'}
                                                </h2>
                                                <p className="text-sm text-slate-600">
                                                    {accountType === 'vendor' ? 'Access your business dashboard' : 'Start discovering amazing vendors'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                                                Email Address
                                            </Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    className={`pl-10 h-12 ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
                                                    {...register('email')}
                                                />
                                            </div>
                                            {errors.email && (
                                                <p className="text-sm text-red-600">{errors.email.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                                                Password
                                            </Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                <Input
                                                    id="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="Enter your password"
                                                    className={`pl-10 pr-10 h-12 ${errors.password ? 'border-red-500' : 'border-slate-300'}`}
                                                    {...register('password')}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="w-5 h-5" />
                                                    ) : (
                                                        <Eye className="w-5 h-5" />
                                                    )}
                                                </button>
                                            </div>
                                            {errors.password && (
                                                <p className="text-sm text-red-600">{errors.password.message}</p>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-slate-600">Remember me</span>
                                            </label>
                                            <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                                                Forgot password?
                                            </Link>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className={`w-full h-12 text-white font-semibold ${accountType === 'vendor'
                                                ? 'bg-teal-600 hover:bg-teal-700'
                                                : 'bg-blue-600 hover:bg-blue-700'
                                                }`}
                                        >
                                            {isLoading ? (
                                                <LoadingSpinner className="w-5 h-5 mr-2" />
                                            ) : (
                                                <CheckCircle className="w-5 h-5 mr-2" />
                                            )}
                                            {isLoading ? 'Signing In...' : 'Sign In'}
                                        </Button>
                                    </form>

                                    {/* Demo Credentials */}
                                    <div className="pt-6 border-t border-slate-200">
                                        <div className="text-center mb-4">
                                            <h3 className="text-sm font-semibold text-slate-900 mb-2">
                                                Demo Credentials
                                            </h3>
                                            <p className="text-xs text-slate-600">
                                                Use these credentials to test the platform
                                            </p>
                                        </div>

                                        <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium text-slate-700">
                                                    {accountType === 'vendor' ? 'Vendor' : 'Customer'} Demo:
                                                </span>
                                                <Button
                                                    onClick={() => handleDemoLogin(accountType)}
                                                    disabled={isLoading}
                                                    size="sm"
                                                    variant="outline"
                                                    className="h-8"
                                                >
                                                    Use Demo
                                                </Button>
                                            </div>
                                            <div className="text-xs text-slate-600 space-y-1">
                                                <div>Email: {accountType}@example.com</div>
                                                <div>Password: {accountType}123</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
} 