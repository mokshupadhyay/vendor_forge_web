'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/common/Avatar';
import { StatusBadge } from '@/components/common/StatusBadge';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Logo } from '@/components/common/Logo';
import {
    Users,
    ShoppingCart,
    BarChart3,
    Settings,
    LogOut,
    Plus,
    Search,
    Bell
} from 'lucide-react';

// Import separated logic and styles
import { useDashboardController } from './dashboard.controller';
import { dashboardStyles, combineStyles } from './dashboard.styles';

export default function DashboardPage() {
    const {
        dashboardData,
        isLoading,
        error,
        handleLogout,
        handleCreateOrder,
        handleFindVendors,
        handleViewReports,
        formatCurrency
    } = useDashboardController();

    // Loading state
    if (isLoading) {
        return (
            <div className={dashboardStyles.loading.container}>
                <LoadingSpinner size="lg" className={dashboardStyles.loading.spinner} />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className={dashboardStyles.error.container}>
                <div className={dashboardStyles.error.message}>
                    {error}
                </div>
            </div>
        );
    }

    // No data state
    if (!dashboardData) {
        return (
            <div className={dashboardStyles.error.container}>
                <div className={dashboardStyles.error.message}>
                    No dashboard data available
                </div>
            </div>
        );
    }

    return (
        <div className={dashboardStyles.container}>
            {/* Header */}
            <header className={dashboardStyles.header.container}>
                <div className={dashboardStyles.header.content}>
                    <div className={dashboardStyles.header.inner}>
                        <div className="flex items-center">
                            <Logo size="md" />
                        </div>

                        <div className={dashboardStyles.header.actions}>
                            <Button variant="ghost" size="sm">
                                <Search className={dashboardStyles.icons.sm} />
                            </Button>
                            <Button variant="ghost" size="sm">
                                <Bell className={dashboardStyles.icons.sm} />
                            </Button>
                            <Avatar name={dashboardData.user.name} size="sm" />
                            <Button variant="ghost" size="sm" onClick={handleLogout}>
                                <LogOut className={dashboardStyles.icons.sm} />
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className={dashboardStyles.main.container}>
                {/* Welcome Section */}
                <div className={dashboardStyles.main.welcome.container}>
                    <h1 className={dashboardStyles.main.welcome.title}>
                        Welcome back, {dashboardData.user.name.split(' ')[0]}!
                    </h1>
                    <p className={dashboardStyles.main.welcome.subtitle}>
                        Here&apos;s what&apos;s happening with your procurement activities.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className={dashboardStyles.statsGrid}>
                    <Card>
                        <CardHeader className={dashboardStyles.statsCard.header}>
                            <CardTitle className={dashboardStyles.statsCard.title}>Total Orders</CardTitle>
                            <ShoppingCart className={dashboardStyles.statsCard.icon} />
                        </CardHeader>
                        <CardContent>
                            <div className={dashboardStyles.statsCard.value}>
                                {dashboardData.stats.totalOrders}
                            </div>
                            <p className={dashboardStyles.statsCard.change}>+12% from last month</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className={dashboardStyles.statsCard.header}>
                            <CardTitle className={dashboardStyles.statsCard.title}>Active Vendors</CardTitle>
                            <Users className={dashboardStyles.statsCard.icon} />
                        </CardHeader>
                        <CardContent>
                            <div className={dashboardStyles.statsCard.value}>
                                {dashboardData.stats.activeVendors}
                            </div>
                            <p className={dashboardStyles.statsCard.change}>+2 new this month</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className={dashboardStyles.statsCard.header}>
                            <CardTitle className={dashboardStyles.statsCard.title}>Total Spent</CardTitle>
                            <BarChart3 className={dashboardStyles.statsCard.icon} />
                        </CardHeader>
                        <CardContent>
                            <div className={dashboardStyles.statsCard.value}>
                                {formatCurrency(dashboardData.stats.totalSpent)}
                            </div>
                            <p className={dashboardStyles.statsCard.change}>+8% from last month</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className={dashboardStyles.statsCard.header}>
                            <CardTitle className={dashboardStyles.statsCard.title}>Pending Orders</CardTitle>
                            <Settings className={dashboardStyles.statsCard.icon} />
                        </CardHeader>
                        <CardContent>
                            <div className={dashboardStyles.statsCard.value}>
                                {dashboardData.stats.pendingOrders}
                            </div>
                            <p className={dashboardStyles.statsCard.change}>Awaiting approval</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Orders and Favorite Vendors */}
                <div className={dashboardStyles.contentGrid}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Orders</CardTitle>
                            <CardDescription>Your latest procurement activities</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className={dashboardStyles.recentOrders.container}>
                                {dashboardData.recentOrders.map((order) => (
                                    <div key={order.id} className={dashboardStyles.recentOrders.item.container}>
                                        <div className={dashboardStyles.recentOrders.item.left}>
                                            <p className={dashboardStyles.recentOrders.item.title}>{order.title}</p>
                                            <p className={dashboardStyles.recentOrders.item.vendor}>{order.vendor}</p>
                                        </div>
                                        <div className={dashboardStyles.recentOrders.item.right}>
                                            <p className={dashboardStyles.recentOrders.item.amount}>
                                                {formatCurrency(order.amount)}
                                            </p>
                                            <StatusBadge status={order.status} size="sm" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Favorite Vendors</CardTitle>
                            <CardDescription>Your most trusted partners</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className={dashboardStyles.favoriteVendors.container}>
                                {dashboardData.favoriteVendors.map((vendor) => (
                                    <div key={vendor.id} className={dashboardStyles.favoriteVendors.item.container}>
                                        <Avatar name={vendor.name} size="sm" />
                                        <div className={dashboardStyles.favoriteVendors.item.content}>
                                            <p className={dashboardStyles.favoriteVendors.item.name}>{vendor.name}</p>
                                            <p className={dashboardStyles.favoriteVendors.item.category}>{vendor.category}</p>
                                        </div>
                                        <div className={dashboardStyles.favoriteVendors.item.rating.container}>
                                            <div className={dashboardStyles.favoriteVendors.item.rating.inner}>
                                                <span className={dashboardStyles.favoriteVendors.item.rating.star}>★</span>
                                                <span className={dashboardStyles.favoriteVendors.item.rating.value}>
                                                    {vendor.rating}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className={dashboardStyles.quickActions.container}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Common tasks to get you started</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className={dashboardStyles.quickActions.grid}>
                                <Button
                                    className={combineStyles(
                                        dashboardStyles.quickActions.button,
                                        "bg-primary-600 hover:bg-primary-700 text-white"
                                    )}
                                    onClick={handleCreateOrder}
                                >
                                    <Plus className={dashboardStyles.icons.md} />
                                    <span>Create New Order</span>
                                </Button>

                                <Button
                                    variant="outline"
                                    className={dashboardStyles.quickActions.button}
                                    onClick={handleFindVendors}
                                >
                                    <Search className={dashboardStyles.icons.md} />
                                    <span>Find Vendors</span>
                                </Button>

                                <Button
                                    variant="outline"
                                    className={dashboardStyles.quickActions.button}
                                    onClick={handleViewReports}
                                >
                                    <BarChart3 className={dashboardStyles.icons.md} />
                                    <span>View Reports</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
} 