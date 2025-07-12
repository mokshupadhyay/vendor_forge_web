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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    Building,
    Users,
    UserPlus,
    Phone,
    MapPin,
    Globe,
    FileText,
    CheckCircle
} from 'lucide-react';

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

// Customer schema
const customerSchema = baseSchema.extend({
    customerType: z.enum(['individual', 'company', 'organization']),
    // Optional company fields
    companyName: z.string().optional(),
    companySize: z.string().optional(),
    industry: z.string().optional(),
    // Optional organization fields
    organizationName: z.string().optional(),
    organizationType: z.string().optional(),
    taxExempt: z.boolean().optional(),
});

// Vendor schema
const vendorSchema = baseSchema.extend({
    businessName: z.string().min(2, 'Business name is required'),
    businessType: z.enum(['individual', 'company', 'organization']),
    businessDescription: z.string().min(10, 'Please provide a brief description of your business'),
    website: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
    businessAddress: z.string().min(5, 'Business address is required'),
    businessPhone: z.string().min(10, 'Business phone is required'),
    taxId: z.string().optional(),
});

type CustomerFormData = z.infer<typeof customerSchema>;
type VendorFormData = z.infer<typeof vendorSchema>;
type AccountType = 'vendor' | 'customer' | null;

export default function UnifiedRegister() {
    const router = useRouter();
    const [accountType, setAccountType] = useState<AccountType>(null);
    const [customerType, setCustomerType] = useState<'individual' | 'company' | 'organization'>('individual');
    const [vendorType, setVendorType] = useState<'individual' | 'company' | 'organization'>('individual');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const customerForm = useForm<CustomerFormData>({
        resolver: zodResolver(customerSchema),
        defaultValues: {
            customerType: 'individual',
        },
    });

    const vendorForm = useForm<VendorFormData>({
        resolver: zodResolver(vendorSchema),
        defaultValues: {
            businessType: 'individual',
        },
    });

    const handleAccountTypeSelect = (type: AccountType) => {
        setAccountType(type);
        customerForm.reset();
        vendorForm.reset();
    };

    const onCustomerSubmit = async (data: CustomerFormData) => {
        setIsLoading(true);

        try {
            // TODO: Implement actual customer registration logic
            console.log('Customer registration:', data);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Redirect to customer discovery page
            router.push('/discover');
        } catch (error) {
            console.error('Customer registration failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const onVendorSubmit = async (data: VendorFormData) => {
        setIsLoading(true);

        try {
            // TODO: Implement actual vendor registration logic
            console.log('Vendor registration:', data);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Redirect to vendor dashboard
            router.push('/dashboard/vendor');
        } catch (error) {
            console.error('Vendor registration failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const currentForm = accountType === 'customer' ? customerForm : vendorForm;
    const currentErrors = currentForm.formState.errors;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
            {/* Header */}
            <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <Logo />
                        <div className="flex items-center space-x-6">
                            <span className="text-slate-600">Already have an account?</span>
                            <Link href="/login">
                                <Button variant="outline" className="border-slate-300 hover:border-slate-400">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-2xl">
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
                                /* Registration Form */
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

                                    {accountType === 'customer' ? (
                                        /* Customer Registration Form */
                                        <form onSubmit={customerForm.handleSubmit(onCustomerSubmit)} className="space-y-6">
                                            {/* Customer Type Selection */}
                                            <div className="space-y-3">
                                                <Label className="text-sm font-medium text-slate-700">
                                                    Customer Type
                                                </Label>
                                                <Select
                                                    value={customerType}
                                                    onValueChange={(value: 'individual' | 'company' | 'organization') => {
                                                        setCustomerType(value);
                                                        customerForm.setValue('customerType', value);
                                                    }}
                                                >
                                                    <SelectTrigger className="h-12">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="individual">
                                                            <div className="flex items-center space-x-2">
                                                                <User className="w-4 h-4" />
                                                                <span>Individual</span>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="company">
                                                            <div className="flex items-center space-x-2">
                                                                <Building className="w-4 h-4" />
                                                                <span>Company</span>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="organization">
                                                            <div className="flex items-center space-x-2">
                                                                <Users className="w-4 h-4" />
                                                                <span>Organization</span>
                                                            </div>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {/* Personal Information */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="firstName" className="text-sm font-medium text-slate-700">
                                                        First Name
                                                    </Label>
                                                    <Input
                                                        id="firstName"
                                                        placeholder="Enter your first name"
                                                        className={`h-12 ${currentErrors.firstName ? 'border-red-500' : 'border-slate-300'}`}
                                                        {...customerForm.register('firstName')}
                                                    />
                                                    {currentErrors.firstName && (
                                                        <p className="text-sm text-red-600">{currentErrors.firstName.message}</p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="lastName" className="text-sm font-medium text-slate-700">
                                                        Last Name
                                                    </Label>
                                                    <Input
                                                        id="lastName"
                                                        placeholder="Enter your last name"
                                                        className={`h-12 ${currentErrors.lastName ? 'border-red-500' : 'border-slate-300'}`}
                                                        {...customerForm.register('lastName')}
                                                    />
                                                    {currentErrors.lastName && (
                                                        <p className="text-sm text-red-600">{currentErrors.lastName.message}</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Company/Organization Fields */}
                                            {customerType === 'company' && (
                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="companyName" className="text-sm font-medium text-slate-700">
                                                            Company Name
                                                        </Label>
                                                        <Input
                                                            id="companyName"
                                                            placeholder="Enter your company name"
                                                            className="h-12"
                                                            {...customerForm.register('companyName')}
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label className="text-sm font-medium text-slate-700">
                                                                Company Size
                                                            </Label>
                                                            <Select onValueChange={(value) => customerForm.setValue('companySize', value)}>
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
                                                                {...customerForm.register('industry')}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {customerType === 'organization' && (
                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="organizationName" className="text-sm font-medium text-slate-700">
                                                            Organization Name
                                                        </Label>
                                                        <Input
                                                            id="organizationName"
                                                            placeholder="Enter your organization name"
                                                            className="h-12"
                                                            {...customerForm.register('organizationName')}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-sm font-medium text-slate-700">
                                                            Organization Type
                                                        </Label>
                                                        <Select onValueChange={(value) => customerForm.setValue('organizationType', value)}>
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
                                                </div>
                                            )}

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
                                                            className={`pl-10 h-12 ${currentErrors.email ? 'border-red-500' : 'border-slate-300'}`}
                                                            {...customerForm.register('email')}
                                                        />
                                                    </div>
                                                    {currentErrors.email && (
                                                        <p className="text-sm text-red-600">{currentErrors.email.message}</p>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                                                        Phone Number (Optional)
                                                    </Label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                        <Input
                                                            id="phone"
                                                            type="tel"
                                                            placeholder="Enter your phone number"
                                                            className="pl-10 h-12"
                                                            {...customerForm.register('phone')}
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
                                                            className={`pl-10 pr-10 h-12 ${currentErrors.password ? 'border-red-500' : 'border-slate-300'}`}
                                                            {...customerForm.register('password')}
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
                                                    {currentErrors.password && (
                                                        <p className="text-sm text-red-600">{currentErrors.password.message}</p>
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
                                                            className={`pl-10 pr-10 h-12 ${currentErrors.confirmPassword ? 'border-red-500' : 'border-slate-300'}`}
                                                            {...customerForm.register('confirmPassword')}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                                        >
                                                            {showConfirmPassword ? (
                                                                <EyeOff className="w-5 h-5" />
                                                            ) : (
                                                                <Eye className="w-5 h-5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                    {currentErrors.confirmPassword && (
                                                        <p className="text-sm text-red-600">{currentErrors.confirmPassword.message}</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Submit Button */}
                                            <Button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                                            >
                                                {isLoading ? (
                                                    <LoadingSpinner className="w-5 h-5 mr-2" />
                                                ) : (
                                                    <UserPlus className="w-5 h-5 mr-2" />
                                                )}
                                                {isLoading ? 'Creating Account...' : 'Create Customer Account'}
                                            </Button>
                                        </form>
                                    ) : (
                                        /* Vendor Registration Form */
                                        <form onSubmit={vendorForm.handleSubmit(onVendorSubmit)} className="space-y-6">
                                            {/* Business Type Selection */}
                                            <div className="space-y-3">
                                                <Label className="text-sm font-medium text-slate-700">
                                                    Business Type
                                                </Label>
                                                <Select
                                                    value={vendorType}
                                                    onValueChange={(value: 'individual' | 'company' | 'organization') => {
                                                        setVendorType(value);
                                                        vendorForm.setValue('businessType', value);
                                                    }}
                                                >
                                                    <SelectTrigger className="h-12">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="individual">
                                                            <div className="flex items-center space-x-2">
                                                                <User className="w-4 h-4" />
                                                                <span>Individual/Sole Proprietor</span>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="company">
                                                            <div className="flex items-center space-x-2">
                                                                <Building className="w-4 h-4" />
                                                                <span>Company/Corporation</span>
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="organization">
                                                            <div className="flex items-center space-x-2">
                                                                <Users className="w-4 h-4" />
                                                                <span>Organization/Partnership</span>
                                                            </div>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            {/* Personal Information */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="firstName" className="text-sm font-medium text-slate-700">
                                                        First Name
                                                    </Label>
                                                    <Input
                                                        id="firstName"
                                                        placeholder="Enter your first name"
                                                        className={`h-12 ${currentErrors.firstName ? 'border-red-500' : 'border-slate-300'}`}
                                                        {...vendorForm.register('firstName')}
                                                    />
                                                    {currentErrors.firstName && (
                                                        <p className="text-sm text-red-600">{currentErrors.firstName.message}</p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="lastName" className="text-sm font-medium text-slate-700">
                                                        Last Name
                                                    </Label>
                                                    <Input
                                                        id="lastName"
                                                        placeholder="Enter your last name"
                                                        className={`h-12 ${currentErrors.lastName ? 'border-red-500' : 'border-slate-300'}`}
                                                        {...vendorForm.register('lastName')}
                                                    />
                                                    {currentErrors.lastName && (
                                                        <p className="text-sm text-red-600">{currentErrors.lastName.message}</p>
                                                    )}
                                                </div>
                                            </div>

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
                                                            {...vendorForm.register('businessName')}
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
                                                            {...vendorForm.register('businessDescription')}
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
                                                            {...vendorForm.register('website')}
                                                        />
                                                    </div>
                                                    {currentErrors.website && (
                                                        <p className="text-sm text-red-600">{currentErrors.website.message}</p>
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
                                                            className={`pl-10 h-12 ${currentErrors.email ? 'border-red-500' : 'border-slate-300'}`}
                                                            {...vendorForm.register('email')}
                                                        />
                                                    </div>
                                                    {currentErrors.email && (
                                                        <p className="text-sm text-red-600">{currentErrors.email.message}</p>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                                                            Personal Phone
                                                        </Label>
                                                        <div className="relative">
                                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                            <Input
                                                                id="phone"
                                                                type="tel"
                                                                placeholder="Your phone number"
                                                                className="pl-10 h-12"
                                                                {...vendorForm.register('phone')}
                                                            />
                                                        </div>
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
                                                                {...vendorForm.register('businessPhone')}
                                                            />
                                                        </div>
                                                        {currentErrors.businessPhone && (
                                                            <p className="text-sm text-red-600">{currentErrors.businessPhone.message}</p>
                                                        )}
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
                                                            {...vendorForm.register('businessAddress')}
                                                        />
                                                    </div>
                                                    {currentErrors.businessAddress && (
                                                        <p className="text-sm text-red-600">{currentErrors.businessAddress.message}</p>
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
                                                        {...vendorForm.register('taxId')}
                                                    />
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
                                                            className={`pl-10 pr-10 h-12 ${currentErrors.password ? 'border-red-500' : 'border-slate-300'}`}
                                                            {...vendorForm.register('password')}
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
                                                    {currentErrors.password && (
                                                        <p className="text-sm text-red-600">{currentErrors.password.message}</p>
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
                                                            className={`pl-10 pr-10 h-12 ${currentErrors.confirmPassword ? 'border-red-500' : 'border-slate-300'}`}
                                                            {...vendorForm.register('confirmPassword')}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                                        >
                                                            {showConfirmPassword ? (
                                                                <EyeOff className="w-5 h-5" />
                                                            ) : (
                                                                <Eye className="w-5 h-5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                    {currentErrors.confirmPassword && (
                                                        <p className="text-sm text-red-600">{currentErrors.confirmPassword.message}</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Submit Button */}
                                            <Button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-semibold"
                                            >
                                                {isLoading ? (
                                                    <LoadingSpinner className="w-5 h-5 mr-2" />
                                                ) : (
                                                    <CheckCircle className="w-5 h-5 mr-2" />
                                                )}
                                                {isLoading ? 'Creating Account...' : 'Create Vendor Account'}
                                            </Button>
                                        </form>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
} 