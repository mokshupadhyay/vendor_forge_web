'use client';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Logo } from '@/components/common/Logo';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    ArrowLeft,
    Building,
    CheckCircle,
    Eye,
    EyeOff,
    FileText,
    Globe,
    Lock,
    Mail,
    MapPin,
    Phone,
    Store,
    User,
    UserPlus,
    Users
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Base schema for common fields
const baseSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    phone: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

// Individual Customer schema
const individualCustomerSchema = baseSchema;

// Company Customer schema
const companyCustomerSchema = baseSchema.extend({
    companyName: z.string().min(2, 'Company name is required'),
    companySize: z.string().optional(),
    industry: z.string().optional(),
});

// Organization Customer schema
const organizationCustomerSchema = baseSchema.extend({
    organizationName: z.string().min(2, 'Organization name is required'),
    organizationType: z.string().optional(),
    taxExempt: z.boolean().optional(),
});

// Individual Vendor schema
const individualVendorSchema = baseSchema.extend({
    businessName: z.string().min(2, 'Business name is required'),
    businessDescription: z.string().min(10, 'Please provide a brief description of your business'),
    website: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
    businessAddress: z.string().min(5, 'Business address is required'),
    businessPhone: z.string().min(10, 'Business phone is required'),
    taxId: z.string().optional(),
});

// Company Vendor schema
const companyVendorSchema = individualVendorSchema;

// Organization Vendor schema
const organizationVendorSchema = individualVendorSchema;

type IndividualCustomerFormData = z.infer<typeof individualCustomerSchema>;
type CompanyCustomerFormData = z.infer<typeof companyCustomerSchema>;
type OrganizationCustomerFormData = z.infer<typeof organizationCustomerSchema>;
type IndividualVendorFormData = z.infer<typeof individualVendorSchema>;
type CompanyVendorFormData = z.infer<typeof companyVendorSchema>;
type OrganizationVendorFormData = z.infer<typeof organizationVendorSchema>;

type AccountType = 'vendor' | 'customer' | null;
type TabType = 'individual' | 'company' | 'organization';

export default function UnifiedRegister() {
    const [apiError, setApiError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
    const router = useRouter();
    const [accountType, setAccountType] = useState<AccountType>(null);
    const [activeTab, setActiveTab] = useState<TabType>('individual');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Initialize forms for each tab type
    const individualCustomerForm = useForm<IndividualCustomerFormData>({
        resolver: zodResolver(individualCustomerSchema),
    });

    const companyCustomerForm = useForm<CompanyCustomerFormData>({
        resolver: zodResolver(companyCustomerSchema),
    });

    const organizationCustomerForm = useForm<OrganizationCustomerFormData>({
        resolver: zodResolver(organizationCustomerSchema),
    });

    const individualVendorForm = useForm<IndividualVendorFormData>({
        resolver: zodResolver(individualVendorSchema),
    });

    const companyVendorForm = useForm<CompanyVendorFormData>({
        resolver: zodResolver(companyVendorSchema),
    });

    const organizationVendorForm = useForm<OrganizationVendorFormData>({
        resolver: zodResolver(organizationVendorSchema),
    });

    // Get current form based on account type and active tab
    const getCurrentForm = () => {
        if (accountType === 'customer') {
            switch (activeTab) {
                case 'individual': return individualCustomerForm;
                case 'company': return companyCustomerForm;
                case 'organization': return organizationCustomerForm;
            }
        } else if (accountType === 'vendor') {
            switch (activeTab) {
                case 'individual': return individualVendorForm;
                case 'company': return companyVendorForm;
                case 'organization': return organizationVendorForm;
            }
        }
        return individualCustomerForm;
    };

    const handleAccountTypeSelect = (type: AccountType) => {
        setAccountType(type);
        setActiveTab('individual');
        // Reset all forms
        individualCustomerForm.reset();
        companyCustomerForm.reset();
        organizationCustomerForm.reset();
        individualVendorForm.reset();
        companyVendorForm.reset();
        organizationVendorForm.reset();
    };

    // Helper function to make API calls
    const apiCall = async <T,>(endpoint: string, data: Record<string, unknown>) => {
        if (endpoint === 'auth/register') {
            return {
                success: true,
                data: {
                    id: 'mock-user-id',
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    accountType: data.accountType,
                    token: 'mock-jwt-token'
                }
            };
        }
        // Real API implementation would go here
        return { success: true, data: {} };
    };

    // Helper function to handle API errors
    const handleApiError = (error: any, form: any) => {
        if (error?.details) {
            setFieldErrors(error.details);
            Object.entries(error.details).forEach(([field, messages]) => {
                form.setError(field as any, {
                    type: 'server',
                    message: Array.isArray(messages) ? messages[0] : messages,
                });
            });
        } else {
            setApiError(error?.message || 'An error occurred during registration');
        }
    };

    // Generic submit handler
    const handleSubmit = async (data: any) => {
        setIsLoading(true);
        setApiError(null);
        setFieldErrors({});

        try {
            let profileData: any = {};

            if (accountType === 'customer') {
                profileData.customerType = activeTab;
                if (activeTab === 'company') {
                    profileData.companyName = data.companyName;
                    profileData.companySize = data.companySize;
                    profileData.industry = data.industry;
                } else if (activeTab === 'organization') {
                    profileData.organizationName = data.organizationName;
                    profileData.organizationType = data.organizationType;
                    profileData.taxExempt = data.taxExempt || false;
                }
            } else if (accountType === 'vendor') {
                profileData = {
                    businessName: data.businessName,
                    businessType: activeTab,
                    businessDescription: data.businessDescription,
                    businessAddress: data.businessAddress,
                    businessPhone: data.businessPhone,
                    website: data.website || null,
                    taxId: data.taxId || null,
                    verificationStatus: 'pending',
                };
            }

            const registrationPayload = {
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone || null,
                accountType,
                profile: profileData,
            };

            const response = await apiCall('auth/register', registrationPayload);

            if (!response.success) {
                handleApiError(response.error, getCurrentForm());
                return;
            }

            // Handle successful registration
            if (response.data?.token) {
                localStorage.setItem('auth-token', response.data.token);
                localStorage.setItem('user', JSON.stringify({
                    id: response.data.id,
                    email: response.data.email,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    accountType: response.data.accountType,
                }));
            }

            await new Promise(resolve => setTimeout(resolve, 1500));

            // Redirect based on account type
            if (accountType === 'customer') {
                router.push('/discover');
            } else {
                router.push('/dashboard/vendor');
            }

        } catch (error) {
            console.error('Registration error:', error);
            setApiError('Registration failed. Please check your information and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const currentForm = getCurrentForm();
    const currentErrors = currentForm.formState.errors;

    // Common form fields component
    const CommonFields = ({ form, errors, isVendor = false }: { form: any, errors: any, isVendor?: boolean }) => (
        <>
            {/* Personal Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-slate-700">
                        First Name
                    </Label>
                    <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        className={`h-12 ${errors.firstName ? 'border-red-500' : 'border-slate-300'}`}
                        {...form.register('firstName')}
                    />
                    {errors.firstName && (
                        <p className="text-sm text-red-600">{errors.firstName.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-slate-700">
                        Last Name
                    </Label>
                    <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        className={`h-12 ${errors.lastName ? 'border-red-500' : 'border-slate-300'}`}
                        {...form.register('lastName')}
                    />
                    {errors.lastName && (
                        <p className="text-sm text-red-600">{errors.lastName.message}</p>
                    )}
                </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
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
                            {...form.register('email')}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-sm text-red-600">{errors.email.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                        Phone Number {isVendor ? '' : '(Optional)'}
                    </Label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            className="pl-10 h-12"
                            {...form.register('phone')}
                        />
                    </div>
                </div>
            </div>

            {/* Password Fields */}
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                        Password
                    </Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create a strong password"
                            className={`pl-10 pr-10 h-12 ${errors.password ? 'border-red-500' : 'border-slate-300'}`}
                            {...form.register('password')}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-sm text-red-600">{errors.password.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                        Confirm Password
                    </Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm your password"
                            className={`pl-10 pr-10 h-12 ${errors.confirmPassword ? 'border-red-500' : 'border-slate-300'}`}
                            {...form.register('confirmPassword')}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
                    )}
                </div>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 ">
            {/* Header */}
            <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-17">
                        <Logo />
                        <div className="flex items-center space-x-4">
                            <span className="text-slate-600">Already have an account?</span>
                            <Button asChild>
                                <Link href="/login">Sign In</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-3xl">
                    <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
                        <CardHeader className="space-y-8 pb-8">
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-slate-900 mb-3">
                                    Join VendorForge
                                </h1>
                                <p className="text-lg text-slate-600">
                                    Create your account and start your journey
                                </p>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-8">
                            {!accountType ? (
                                /* Account Type Selection */
                                <div className="space-y-8">
                                    <div className="text-center">
                                        <h2 className="text-xl font-semibold text-slate-900 mb-3">
                                            Choose Your Account Type
                                        </h2>
                                        <p className="text-slate-600">
                                            Select the type of account that best fits your needs
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
                                                        Customer Account
                                                    </h3>
                                                    <p className="text-slate-600">
                                                        Perfect for individuals, companies, or organizations looking to purchase from vendors
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
                                                        Vendor Account
                                                    </h3>
                                                    <p className="text-slate-600">
                                                        Ideal for businesses and individuals who want to sell products or services
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* Registration Form with Tabs */
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
                                                    {accountType === 'vendor' ? 'Vendor Registration' : 'Customer Registration'}
                                                </h2>
                                                <p className="text-sm text-slate-600">
                                                    {accountType === 'vendor' ? 'Set up your business profile' : 'Create your customer account'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {apiError && (
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                            <p className="text-sm text-red-600">{apiError}</p>
                                        </div>
                                    )}

                                    <Tabs value={activeTab} onValueChange={(value: TabType) => setActiveTab(value)}>
                                        <TabsList className="grid w-full grid-cols-3 mb-4">
                                            <TabsTrigger value="individual" className="flex items-center gap-2">
                                                <User className="w-4 h-4" />
                                                Individual
                                            </TabsTrigger>
                                            <TabsTrigger value="company" className="flex items-center gap-2">
                                                <Building className="w-4 h-4" />
                                                Company
                                            </TabsTrigger>
                                            <TabsTrigger value="organization" className="flex items-center gap-2">
                                                <Users className="w-4 h-4" />
                                                Organization
                                            </TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="individual" className="space-y-6">
                                            <form onSubmit={currentForm.handleSubmit(handleSubmit)} className="space-y-6">
                                                <CommonFields
                                                    form={accountType === 'customer' ? individualCustomerForm : individualVendorForm}
                                                    errors={currentErrors}
                                                    isVendor={accountType === 'vendor'}
                                                />

                                                {accountType === 'vendor' && (
                                                    <>
                                                        {/* Business Information */}
                                                        <div className="space-y-4">
                                                            <div className="space-y-2">
                                                                <Label htmlFor="businessName" className="text-sm font-medium text-slate-700">
                                                                    Business Name
                                                                </Label>
                                                                <div className="relative">
                                                                    <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                                    <Input
                                                                        id="businessName"
                                                                        placeholder="Enter your business name"
                                                                        className={`pl-10 h-12 ${currentErrors.businessName ? 'border-red-500' : 'border-slate-300'}`}
                                                                        {...currentForm.register('businessName')}
                                                                    />
                                                                </div>
                                                                {currentErrors.businessName && (
                                                                    <p className="text-sm text-red-600">{currentErrors.businessName.message}</p>
                                                                )}
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label htmlFor="businessDescription" className="text-sm font-medium text-slate-700">
                                                                    Business Description
                                                                </Label>
                                                                <div className="relative">
                                                                    <FileText className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                                                                    <textarea
                                                                        id="businessDescription"
                                                                        placeholder="Describe your business and what you offer"
                                                                        className={`pl-10 w-full min-h-[100px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${currentErrors.businessDescription ? 'border-red-500' : 'border-slate-300'}`}
                                                                        {...currentForm.register('businessDescription')}
                                                                    />
                                                                </div>
                                                                {currentErrors.businessDescription && (
                                                                    <p className="text-sm text-red-600">{currentErrors.businessDescription.message}</p>
                                                                )}
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label htmlFor="website" className="text-sm font-medium text-slate-700">
                                                                    Website (Optional)
                                                                </Label>
                                                                <div className="relative">
                                                                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                                    <Input
                                                                        id="website"
                                                                        type="url"
                                                                        placeholder="https://your-website.com"
                                                                        className="pl-10 h-12"
                                                                        {...currentForm.register('website')}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label htmlFor="businessAddress" className="text-sm font-medium text-slate-700">
                                                                    Business Address
                                                                </Label>
                                                                <div className="relative">
                                                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                                    <Input
                                                                        id="businessAddress"
                                                                        placeholder="Enter your business address"
                                                                        className={`pl-10 h-12 ${currentErrors.businessAddress ? 'border-red-500' : 'border-slate-300'}`}
                                                                        {...currentForm.register('businessAddress')}
                                                                    />
                                                                </div>
                                                                {currentErrors.businessAddress && (
                                                                    <p className="text-sm text-red-600">{currentErrors.businessAddress.message}</p>
                                                                )}
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label htmlFor="businessPhone" className="text-sm font-medium text-slate-700">
                                                                    Business Phone
                                                                </Label>
                                                                <div className="relative">
                                                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                                    <Input
                                                                        id="businessPhone"
                                                                        type="tel"
                                                                        placeholder="Business phone number"
                                                                        className={`pl-10 h-12 ${currentErrors.businessPhone ? 'border-red-500' : 'border-slate-300'}`}
                                                                        {...currentForm.register('businessPhone')}
                                                                    />
                                                                </div>
                                                                {currentErrors.businessPhone && (
                                                                    <p className="text-sm text-red-600">{currentErrors.businessPhone.message}</p>
                                                                )}
                                                            </div>

                                                            <div className="space-y-2">
                                                                <Label htmlFor="taxId" className="text-sm font-medium text-slate-700">
                                                                    Tax ID (Optional)
                                                                </Label>
                                                                <Input
                                                                    id="taxId"
                                                                    placeholder="Enter your tax ID or EIN"
                                                                    className="h-12"
                                                                    {...currentForm.register('taxId')}
                                                                />
                                                            </div>
                                                        </div>
                                                    </>
                                                )}

                                                <Button
                                                    type="submit"
                                                    disabled={isLoading}
                                                    className={`w-full h-12 text-white font-semibold ${accountType === 'vendor' ? 'bg-teal-600 hover:bg-teal-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                                                >
                                                    {isLoading ? (
                                                        <LoadingSpinner className="w-5 h-5 mr-2" />
                                                    ) : accountType === 'vendor' ? (
                                                        <CheckCircle className="w-5 h-5 mr-2" />
                                                    ) : (
                                                        <UserPlus className="w-5 h-5 mr-2" />
                                                    )}
                                                    {isLoading ? 'Creating Account...' : `Create ${accountType === 'vendor' ? 'Vendor' : 'Customer'} Account`}
                                                </Button>
                                            </form>
                                        </TabsContent>

                                        <TabsContent value="company" className="space-y-6">
                                            <form onSubmit={currentForm.handleSubmit(handleSubmit)} className="space-y-6">
                                                <CommonFields
                                                    form={accountType === 'customer' ? companyCustomerForm : companyVendorForm}
                                                    errors={currentErrors}
                                                    isVendor={accountType === 'vendor'}
                                                />

                                                {accountType === 'customer' ? (
                                                    /* Company Customer Fields */
                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="companyName" className="text-sm font-medium text-slate-700">
                                                                Company Name
                                                            </Label>
                                                            <div className="relative">
                                                                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                                <Input
                                                                    id="companyName"
                                                                    placeholder="Enter your company name"
                                                                    className={`pl-10 h-12 ${currentErrors.companyName ? 'border-red-500' : 'border-slate-300'}`}
                                                                    {...currentForm.register('companyName')}
                                                                />
                                                            </div>
                                                            {currentErrors.companyName && (
                                                                <p className="text-sm text-red-600">{currentErrors.companyName.message}</p>
                                                            )}
                                                        </div>

                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            <div className="space-y-2">
                                                                <Label className="text-sm font-medium text-slate-700">
                                                                    Company Size
                                                                </Label>
                                                                <Select onValueChange={(value) => currentForm.setValue('companySize', value)}>
                                                                    <SelectTrigger className="h-12">
                                                                        <SelectValue placeholder="Select company size" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="startup">Startup (1-10 employees)</SelectItem>
                                                                        <SelectItem value="small">Small (11-50 employees)</SelectItem>
                                                                        <SelectItem value="medium">Medium (51-200 employees)</SelectItem>
                                                                        <SelectItem value="large">Large (201-1000 employees)</SelectItem>
                                                                        <SelectItem value="enterprise">Enterprise (1000+ employees)</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="industry" className="text-sm font-medium text-slate-700">
                                                                    Industry
                                                                </Label>
                                                                <Input
                                                                    id="industry"
                                                                    placeholder="e.g., Technology, Healthcare"
                                                                    className="h-12"
                                                                    {...currentForm.register('industry')}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    /* Company Vendor Fields */
                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="businessName" className="text-sm font-medium text-slate-700">
                                                                Business Name
                                                            </Label>
                                                            <div className="relative">
                                                                <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                                <Input
                                                                    id="businessName"
                                                                    placeholder="Enter your business name"
                                                                    className={`pl-10 h-12 ${currentErrors.businessName ? 'border-red-500' : 'border-slate-300'}`}
                                                                    {...currentForm.register('businessName')}
                                                                />
                                                            </div>
                                                            {currentErrors.businessName && (
                                                                <p className="text-sm text-red-600">{currentErrors.businessName.message}</p>
                                                            )}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label htmlFor="businessDescription" className="text-sm font-medium text-slate-700">
                                                                Business Description
                                                            </Label>
                                                            <div className="relative">
                                                                <FileText className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                                                                <textarea
                                                                    id="businessDescription"
                                                                    placeholder="Describe your business and what you offer"
                                                                    className={`pl-10 w-full min-h-[100px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${currentErrors.businessDescription ? 'border-red-500' : 'border-slate-300'}`}
                                                                    {...currentForm.register('businessDescription')}
                                                                />
                                                            </div>
                                                            {currentErrors.businessDescription && (
                                                                <p className="text-sm text-red-600">{currentErrors.businessDescription.message}</p>
                                                            )}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label htmlFor="website" className="text-sm font-medium text-slate-700">
                                                                Website (Optional)
                                                            </Label>
                                                            <div className="relative">
                                                                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                                <Input
                                                                    id="website"
                                                                    type="url"
                                                                    placeholder="https://your-website.com"
                                                                    className="pl-10 h-12"
                                                                    {...currentForm.register('website')}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label htmlFor="businessAddress" className="text-sm font-medium text-slate-700">
                                                                Business Address
                                                            </Label>
                                                            <div className="relative">
                                                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                                <Input
                                                                    id="businessAddress"
                                                                    placeholder="Enter your business address"
                                                                    className={`pl-10 h-12 ${currentErrors.businessAddress ? 'border-red-500' : 'border-slate-300'}`}
                                                                    {...currentForm.register('businessAddress')}
                                                                />
                                                            </div>
                                                            {currentErrors.businessAddress && (
                                                                <p className="text-sm text-red-600">{currentErrors.businessAddress.message}</p>
                                                            )}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label htmlFor="businessPhone" className="text-sm font-medium text-slate-700">
                                                                Business Phone
                                                            </Label>
                                                            <div className="relative">
                                                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                                <Input
                                                                    id="businessPhone"
                                                                    type="tel"
                                                                    placeholder="Business phone number"
                                                                    className={`pl-10 h-12 ${currentErrors.businessPhone ? 'border-red-500' : 'border-slate-300'}`}
                                                                    {...currentForm.register('businessPhone')}
                                                                />
                                                            </div>
                                                            {currentErrors.businessPhone && (
                                                                <p className="text-sm text-red-600">{currentErrors.businessPhone.message}</p>
                                                            )}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label htmlFor="taxId" className="text-sm font-medium text-slate-700">
                                                                Tax ID (Optional)
                                                            </Label>
                                                            <Input
                                                                id="taxId"
                                                                placeholder="Enter your tax ID or EIN"
                                                                className="h-12"
                                                                {...currentForm.register('taxId')}
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                <Button
                                                    type="submit"
                                                    disabled={isLoading}
                                                    className={`w-full h-12 text-white font-semibold ${accountType === 'vendor' ? 'bg-teal-600 hover:bg-teal-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                                                >
                                                    {isLoading ? (
                                                        <LoadingSpinner className="w-5 h-5 mr-2" />
                                                    ) : accountType === 'vendor' ? (
                                                        <CheckCircle className="w-5 h-5 mr-2" />
                                                    ) : (
                                                        <UserPlus className="w-5 h-5 mr-2" />
                                                    )}
                                                    {isLoading ? 'Creating Account...' : `Create ${accountType === 'vendor' ? 'Vendor' : 'Customer'} Account`}
                                                </Button>
                                            </form>
                                        </TabsContent>

                                        <TabsContent value="organization" className="space-y-6">
                                            <form onSubmit={currentForm.handleSubmit(handleSubmit)} className="space-y-6">
                                                <CommonFields
                                                    form={accountType === 'customer' ? organizationCustomerForm : organizationVendorForm}
                                                    errors={currentErrors}
                                                    isVendor={accountType === 'vendor'}
                                                />

                                                {accountType === 'customer' ? (
                                                    /* Organization Customer Fields */
                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="organizationName" className="text-sm font-medium text-slate-700">
                                                                Organization Name
                                                            </Label>
                                                            <div className="relative">
                                                                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                                <Input
                                                                    id="organizationName"
                                                                    placeholder="Enter your organization name"
                                                                    className={`pl-10 h-12 ${currentErrors.organizationName ? 'border-red-500' : 'border-slate-300'}`}
                                                                    {...currentForm.register('organizationName')}
                                                                />
                                                            </div>
                                                            {currentErrors.organizationName && (
                                                                <p className="text-sm text-red-600">{currentErrors.organizationName.message}</p>
                                                            )}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label className="text-sm font-medium text-slate-700">
                                                                Organization Type
                                                            </Label>
                                                            <Select onValueChange={(value) => currentForm.setValue('organizationType', value)}>
                                                                <SelectTrigger className="h-12">
                                                                    <SelectValue placeholder="Select organization type" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="nonprofit">Non-profit</SelectItem>
                                                                    <SelectItem value="government">Government</SelectItem>
                                                                    <SelectItem value="educational">Educational</SelectItem>
                                                                    <SelectItem value="healthcare">Healthcare</SelectItem>
                                                                    <SelectItem value="other">Other</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        <div className="flex items-center space-x-2">
                                                            <input
                                                                type="checkbox"
                                                                id="taxExempt"
                                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                                                {...currentForm.register('taxExempt')}
                                                            />
                                                            <Label htmlFor="taxExempt" className="text-sm font-medium text-slate-700">
                                                                Tax Exempt Organization
                                                            </Label>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    /* Organization Vendor Fields */
                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="businessName" className="text-sm font-medium text-slate-700">
                                                                Business Name
                                                            </Label>
                                                            <div className="relative">
                                                                <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                                <Input
                                                                    id="businessName"
                                                                    placeholder="Enter your business name"
                                                                    className={`pl-10 h-12 ${currentErrors.businessName ? 'border-red-500' : 'border-slate-300'}`}
                                                                    {...currentForm.register('businessName')}
                                                                />
                                                            </div>
                                                            {currentErrors.businessName && (
                                                                <p className="text-sm text-red-600">{currentErrors.businessName.message}</p>
                                                            )}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label htmlFor="businessDescription" className="text-sm font-medium text-slate-700">
                                                                Business Description
                                                            </Label>
                                                            <div className="relative">
                                                                <FileText className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                                                                <textarea
                                                                    id="businessDescription"
                                                                    placeholder="Describe your business and what you offer"
                                                                    className={`pl-10 w-full min-h-[100px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${currentErrors.businessDescription ? 'border-red-500' : 'border-slate-300'}`}
                                                                    {...currentForm.register('businessDescription')}
                                                                />
                                                            </div>
                                                            {currentErrors.businessDescription && (
                                                                <p className="text-sm text-red-600">{currentErrors.businessDescription.message}</p>
                                                            )}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label htmlFor="website" className="text-sm font-medium text-slate-700">
                                                                Website (Optional)
                                                            </Label>
                                                            <div className="relative">
                                                                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                                <Input
                                                                    id="website"
                                                                    type="url"
                                                                    placeholder="https://your-website.com"
                                                                    className="pl-10 h-12"
                                                                    {...currentForm.register('website')}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label htmlFor="businessAddress" className="text-sm font-medium text-slate-700">
                                                                Business Address
                                                            </Label>
                                                            <div className="relative">
                                                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                                <Input
                                                                    id="businessAddress"
                                                                    placeholder="Enter your business address"
                                                                    className={`pl-10 h-12 ${currentErrors.businessAddress ? 'border-red-500' : 'border-slate-300'}`}
                                                                    {...currentForm.register('businessAddress')}
                                                                />
                                                            </div>
                                                            {currentErrors.businessAddress && (
                                                                <p className="text-sm text-red-600">{currentErrors.businessAddress.message}</p>
                                                            )}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label htmlFor="businessPhone" className="text-sm font-medium text-slate-700">
                                                                Business Phone
                                                            </Label>
                                                            <div className="relative">
                                                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                                <Input
                                                                    id="businessPhone"
                                                                    type="tel"
                                                                    placeholder="Business phone number"
                                                                    className={`pl-10 h-12 ${currentErrors.businessPhone ? 'border-red-500' : 'border-slate-300'}`}
                                                                    {...currentForm.register('businessPhone')}
                                                                />
                                                            </div>
                                                            {currentErrors.businessPhone && (
                                                                <p className="text-sm text-red-600">{currentErrors.businessPhone.message}</p>
                                                            )}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label htmlFor="taxId" className="text-sm font-medium text-slate-700">
                                                                Tax ID (Optional)
                                                            </Label>
                                                            <Input
                                                                id="taxId"
                                                                placeholder="Enter your tax ID or EIN"
                                                                className="h-12"
                                                                {...currentForm.register('taxId')}
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                <Button
                                                    type="submit"
                                                    disabled={isLoading}
                                                    className={`w-full h-12 text-white font-semibold ${accountType === 'vendor' ? 'bg-teal-600 hover:bg-teal-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                                                >
                                                    {isLoading ? (
                                                        <LoadingSpinner className="w-5 h-5 mr-2" />
                                                    ) : accountType === 'vendor' ? (
                                                        <CheckCircle className="w-5 h-5 mr-2" />
                                                    ) : (
                                                        <UserPlus className="w-5 h-5 mr-2" />
                                                    )}
                                                    {isLoading ? 'Creating Account...' : `Create ${accountType === 'vendor' ? 'Vendor' : 'Customer'} Account`}
                                                </Button>
                                            </form>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );