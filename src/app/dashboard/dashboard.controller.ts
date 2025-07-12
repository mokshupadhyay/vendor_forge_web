import { useState, useEffect } from "react";

// Types for dashboard data
export interface DashboardStats {
  totalOrders: number;
  activeVendors: number;
  totalSpent: number;
  pendingOrders: number;
}

export interface RecentOrder {
  id: string;
  title: string;
  vendor: string;
  amount: number;
  status: string;
}

export interface FavoriteVendor {
  id: string;
  name: string;
  category: string;
  rating: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentOrders: RecentOrder[];
  favoriteVendors: FavoriteVendor[];
  user: {
    name: string;
    email: string;
  };
}

// Custom hook for dashboard logic
export const useDashboardController = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate API call to fetch dashboard data
  const fetchDashboardData = async (): Promise<DashboardData> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      stats: {
        totalOrders: 24,
        activeVendors: 8,
        totalSpent: 12450,
        pendingOrders: 3,
      },
      recentOrders: [
        {
          id: "1",
          title: "Office Supplies",
          vendor: "ABC Office Solutions",
          amount: 450.0,
          status: "delivered",
        },
        {
          id: "2",
          title: "IT Equipment",
          vendor: "TechPro Systems",
          amount: 2350.0,
          status: "pending",
        },
        {
          id: "3",
          title: "Cleaning Services",
          vendor: "CleanCorp",
          amount: 800.0,
          status: "in_progress",
        },
      ],
      favoriteVendors: [
        {
          id: "1",
          name: "ABC Office Solutions",
          category: "Office Supplies",
          rating: 4.8,
        },
        {
          id: "2",
          name: "TechPro Systems",
          category: "IT Equipment",
          rating: 4.9,
        },
        {
          id: "3",
          name: "CleanCorp",
          category: "Cleaning Services",
          rating: 4.7,
        },
      ],
      user: {
        name: "John Doe",
        email: "john@example.com",
      },
    };
  };

  // Load dashboard data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDashboardData();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        setError("Failed to load dashboard data");
        console.error("Dashboard data fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle logout
  const handleLogout = () => {
    // TODO: Implement actual logout logic
    // Clear session, redirect, etc.
    window.location.href = "/login";
  };

  // Handle quick actions
  const handleCreateOrder = () => {
    // TODO: Navigate to create order page
    console.log("Navigate to create order");
  };

  const handleFindVendors = () => {
    // TODO: Navigate to vendor search page
    console.log("Navigate to vendor search");
  };

  const handleViewReports = () => {
    // TODO: Navigate to reports page
    console.log("Navigate to reports");
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Format percentage
  const formatPercentage = (value: number): string => {
    return `+${value}%`;
  };

  return {
    // Data
    dashboardData,
    isLoading,
    error,

    // Actions
    handleLogout,
    handleCreateOrder,
    handleFindVendors,
    handleViewReports,

    // Utilities
    formatCurrency,
    formatPercentage,

    // Refresh data
    refreshData: () => {
      const loadData = async () => {
        try {
          setIsLoading(true);
          const data = await fetchDashboardData();
          setDashboardData(data);
          setError(null);
        } catch (err) {
          setError("Failed to load dashboard data");
        } finally {
          setIsLoading(false);
        }
      };
      loadData();
    },
  };
};
