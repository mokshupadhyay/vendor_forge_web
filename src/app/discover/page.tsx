'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/common/Logo';
import {
    Search,
    Store,
    Heart,
    ShoppingCart,
    Filter,
    Star,
    MapPin,
    Clock,
    Bell,
    Settings,
    LogOut,
    Grid3X3,
    List,
    Compass
} from 'lucide-react';

export default function CustomerDiscovery() {
    const router = useRouter();

    const handleLogout = () => {
        // TODO: Implement actual logout logic
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Logo />

                        {/* Search Bar */}
                        <div className="flex-1 max-w-2xl mx-8">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search vendors, products, or services..."
                                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* User Actions */}
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" className="p-2">
                                <Bell className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="sm" className="p-2">
                                <Heart className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="sm" className="p-2">
                                <ShoppingCart className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="sm" className="p-2">
                                <Settings className="w-5 h-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleLogout}
                                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                                <LogOut className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Discover Excellence
                    </h1>
                    <p className="text-lg text-slate-600">
                        Find the perfect vendors and products for your needs
                    </p>
                </div>

                {/* Filter Bar */}
                <div className="mb-8">
                    <Card className="border-0 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex flex-wrap items-center gap-4">
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Filter className="w-4 h-4" />
                                    All Categories
                                </Button>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    Location
                                </Button>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Star className="w-4 h-4" />
                                    Rating
                                </Button>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Availability
                                </Button>
                                <div className="flex-1"></div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" className="p-2">
                                        <Grid3X3 className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="p-2">
                                        <List className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Empty State */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Discovery Area */}
                    <div className="lg:col-span-2">
                        <Card className="border-0 shadow-sm h-96">
                            <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center mb-6">
                                    <Compass className="w-12 h-12 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                                    Start Your Discovery Journey
                                </h3>
                                <p className="text-slate-600 mb-6 max-w-md">
                                    Explore our marketplace to find verified vendors and high-quality products tailored to your needs.
                                </p>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                                    Browse All Vendors
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Featured Categories */}
                        <Card className="border-0 shadow-sm">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg font-semibold text-slate-900">
                                    Featured Categories
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center justify-center py-8 text-slate-500">
                                    <div className="text-center">
                                        <Store className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                                        <p className="text-sm">No categories yet</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recently Viewed */}
                        <Card className="border-0 shadow-sm">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg font-semibold text-slate-900">
                                    Recently Viewed
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center justify-center py-8 text-slate-500">
                                    <div className="text-center">
                                        <Clock className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                                        <p className="text-sm">No recent activity</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Favorites */}
                        <Card className="border-0 shadow-sm">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg font-semibold text-slate-900">
                                    Your Favorites
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center justify-center py-8 text-slate-500">
                                    <div className="text-center">
                                        <Heart className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                                        <p className="text-sm">No favorites yet</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Getting Started Guide */}
                <div className="mt-12">
                    <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-teal-50">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-bold text-slate-900">
                                Getting Started
                            </CardTitle>
                            <CardDescription className="text-slate-600">
                                Make the most of your VendorForge experience
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center p-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h3 className="font-semibold text-slate-900 mb-2">1. Search & Discover</h3>
                                    <p className="text-sm text-slate-600">
                                        Use our powerful search to find exactly what you need
                                    </p>
                                </div>
                                <div className="text-center p-4">
                                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Star className="w-6 h-6 text-teal-600" />
                                    </div>
                                    <h3 className="font-semibold text-slate-900 mb-2">2. Compare & Review</h3>
                                    <p className="text-sm text-slate-600">
                                        Read reviews and compare vendors to make informed decisions
                                    </p>
                                </div>
                                <div className="text-center p-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <ShoppingCart className="w-6 h-6 text-green-600" />
                                    </div>
                                    <h3 className="font-semibold text-slate-900 mb-2">3. Purchase & Connect</h3>
                                    <p className="text-sm text-slate-600">
                                        Connect with vendors and make secure purchases
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
} 