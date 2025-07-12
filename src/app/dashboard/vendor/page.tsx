'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/common/Logo';
import {
    Store,
    Package,
    ShoppingCart,
    Users,
    DollarSign,
    Eye,
    Plus,
    Settings,
    BarChart3,
    Bell,
    LogOut,
    FileText,
    Inbox
} from 'lucide-react';

export default function VendorDashboard() {
    const router = useRouter();

    const handleLogout = () => {
        // TODO: Implement actual logout logic
        router.push('/login');
    };

    // Empty state - no data
    const vendorStats = [
        {
            title: "Total Revenue",
            value: "$0.00",
            change: "Start selling to see revenue",
            icon: DollarSign,
            color: "text-green-600"
        },
        {
            title: "Active Products",
            value: "0",
            change: "Add your first product",
            icon: Package,
            color: "text-blue-600"
        },
        {
            title: "Orders",
            value: "0",
            change: "No orders yet",
            icon: ShoppingCart,
            color: "text-purple-600"
        },
        {
            title: "Customers",
            value: "0",
            change: "Build your customer base",
            icon: Users,
            color: "text-orange-600"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <header className="bg-white shadow-lg border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <Logo size="md" />
                            <div className="flex items-center space-x-2">
                                <Store className="w-5 h-5 text-primary-700" />
                                <span className="text-lg font-semibold text-slate-900">Vendor Portal</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm">
                                <Bell className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Settings className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" onClick={handleLogout}>
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
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
                        Welcome to VendorForge!
                    </h1>
                    <p className="text-slate-600">
                        Start your journey by adding your first product and building your vendor profile.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {vendorStats.map((stat, index) => (
                        <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-slate-600">
                                    {stat.title}
                                </CardTitle>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                                <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-primary-700 hover:bg-primary-800">
                            <Plus className="w-6 h-6" />
                            <span>Add Product</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 border-secondary-300 text-secondary-700 hover:bg-secondary-50">
                            <Eye className="w-6 h-6" />
                            <span>View Orders</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 border-accent-300 text-accent-700 hover:bg-accent-50">
                            <BarChart3 className="w-6 h-6" />
                            <span>Analytics</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 border-slate-300 text-slate-700 hover:bg-slate-50">
                            <Settings className="w-6 h-6" />
                            <span>Settings</span>
                        </Button>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Orders - Empty State */}
                    <Card className="border-0 shadow-md">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-slate-900">Recent Orders</CardTitle>
                            <CardDescription>Latest orders from your customers</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Inbox className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-medium text-slate-900 mb-2">No orders yet</h3>
                                <p className="text-slate-500 mb-4">
                                    Once customers start placing orders, they&apos;ll appear here.
                                </p>
                                <Button variant="outline" className="text-slate-600 hover:text-slate-900">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Your First Product
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Top Products - Empty State */}
                    <Card className="border-0 shadow-md">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-slate-900">Top Products</CardTitle>
                            <CardDescription>Your best-selling products this month</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Package className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-medium text-slate-900 mb-2">No products listed</h3>
                                <p className="text-slate-500 mb-4">
                                    Add products to your catalog to start selling.
                                </p>
                                <Button variant="outline" className="text-slate-600 hover:text-slate-900">
                                    <Plus className="w-4 h-4 mr-2" />
                                    List Your First Product
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Getting Started Section */}
                <div className="mt-8">
                    <Card className="border-0 shadow-md bg-gradient-to-r from-primary-50 to-secondary-50">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                                <FileText className="w-5 h-5 mr-2 text-primary-700" />
                                Getting Started
                            </CardTitle>
                            <CardDescription>Complete these steps to set up your vendor account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm font-semibold text-primary-700">1</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-900">Complete Profile</h4>
                                        <p className="text-sm text-slate-600">Add your business information and contact details</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm font-semibold text-secondary-700">2</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-900">Add Products</h4>
                                        <p className="text-sm text-slate-600">Upload your product catalog with photos and descriptions</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm font-semibold text-accent-700">3</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-900">Start Selling</h4>
                                        <p className="text-sm text-slate-600">Receive orders and manage your business</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
} 