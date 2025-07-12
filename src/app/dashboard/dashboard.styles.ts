// Dashboard component styles configuration
export const dashboardStyles = {
  // Layout styles
  container: "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100",

  // Header styles
  header: {
    container: "bg-white shadow-lg border-b border-slate-200",
    content: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    inner: "flex justify-between items-center h-16",
    actions: "flex items-center space-x-4",
  },

  // Main content styles
  main: {
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
    welcome: {
      container: "mb-8",
      title: "text-3xl font-bold text-slate-900 mb-2",
      subtitle: "text-slate-600",
    },
  },

  // Stats cards grid
  statsGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",

  // Stats card styles
  statsCard: {
    header: "flex flex-row items-center justify-between space-y-0 pb-2",
    title: "text-sm font-medium",
    icon: "h-4 w-4 text-muted-foreground",
    value: "text-2xl font-bold",
    change: "text-xs text-muted-foreground",
  },

  // Content grid
  contentGrid: "grid grid-cols-1 lg:grid-cols-2 gap-6",

  // Recent orders styles
  recentOrders: {
    container: "space-y-4",
    item: {
      container: "flex items-center justify-between",
      left: "flex-1",
      title: "font-medium",
      vendor: "text-sm text-muted-foreground",
      right: "text-right",
      amount: "font-medium",
    },
  },

  // Favorite vendors styles
  favoriteVendors: {
    container: "space-y-4",
    item: {
      container: "flex items-center space-x-3",
      content: "flex-1",
      name: "font-medium",
      category: "text-sm text-muted-foreground",
      rating: {
        container: "text-right",
        inner: "flex items-center space-x-1",
        star: "text-yellow-500",
        value: "text-sm",
      },
    },
  },

  // Quick actions styles
  quickActions: {
    container: "mt-8",
    grid: "grid grid-cols-1 md:grid-cols-3 gap-4",
    button: "h-20 flex flex-col items-center justify-center space-y-2",
  },

  // Loading states
  loading: {
    container: "flex items-center justify-center min-h-screen",
    spinner: "h-8 w-8",
  },

  // Error states
  error: {
    container: "flex items-center justify-center min-h-screen",
    message: "text-red-600 text-center",
  },

  // Button variants
  buttons: {
    ghost: "variant-ghost size-sm",
    primary: "h-20 flex flex-col items-center justify-center space-y-2",
    outline:
      "variant-outline h-20 flex flex-col items-center justify-center space-y-2",
  },

  // Icon sizes
  icons: {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  },

  // Avatar sizes
  avatar: {
    sm: "size-sm",
  },

  // Animation classes
  animations: {
    fadeIn: "vf-animate-fade-in",
    slideUp: "vf-animate-slide-up",
    scaleIn: "vf-animate-scale-in",
  },

  // Responsive breakpoints for dynamic styling
  breakpoints: {
    sm: "sm:",
    md: "md:",
    lg: "lg:",
    xl: "xl:",
  },
} as const;

// Helper function to combine styles
export const combineStyles = (...styles: (string | undefined)[]): string => {
  return styles.filter(Boolean).join(" ");
};

// Utility function to apply responsive styles
export const responsive = (
  base: string,
  breakpoints: Record<string, string> = {}
): string => {
  const responsiveClasses = Object.entries(breakpoints)
    .map(([breakpoint, classes]) => `${breakpoint}:${classes}`)
    .join(" ");

  return combineStyles(base, responsiveClasses);
};

// Theme-aware styles
export const themeStyles = {
  light: {
    background: "bg-white",
    text: "text-gray-900",
    textMuted: "text-gray-600",
    border: "border-gray-200",
  },
  dark: {
    background: "dark:bg-gray-900",
    text: "dark:text-white",
    textMuted: "dark:text-gray-300",
    border: "dark:border-gray-700",
  },
} as const;
