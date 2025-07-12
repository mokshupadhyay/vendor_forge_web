'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, User, Building, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { cn } from '@/lib/utils';

const baseSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    phone: z.string().optional(),
    addressLine1: z.string().min(5, 'Address is required'),
    addressLine2: z.string().optional(),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    postalCode: z.string().min(5, 'Postal code is required'),
    country: z.string().min(2, 'Country is required')
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

const individualSchema = baseSchema.extend({
    buyerType: z.literal('individual')
});

const companySchema = baseSchema.extend({
    buyerType: z.literal('company'),
    entityName: z.string().min(2, 'Company name is required'),
    entityType: z.string().min(2, 'Industry is required'),
    registrationNumber: z.string().optional(),
    taxId: z.string().optional(),
    website: z.string().url().optional().or(z.literal('')),
    jobTitle: z.string().min(2, 'Job title is required'),
    department: z.string().optional()
});

const organizationSchema = baseSchema.extend({
    buyerType: z.literal('organization'),
    entityName: z.string().min(2, 'Organization name is required'),
    entityType: z.string().min(2, 'Organization type is required'),
    registrationNumber: z.string().optional(),
    taxExemptStatus: z.boolean().optional(),
    jobTitle: z.string().min(2, 'Position is required'),
    department: z.string().optional(),
    budgetAuthority: z.boolean().optional()
});

const registerSchema = z.discriminatedUnion('buyerType', [
    individualSchema,
    companySchema,
    organizationSchema
]);

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
    onSubmit: (data: RegisterFormData) => Promise<void>;
    isLoading?: boolean;
    className?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
    onSubmit,
    isLoading = false,
    className
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [buyerType, setBuyerType] = useState<'individual' | 'company' | 'organization'>('individual');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            buyerType: 'individual'
        }
    });

    const handleBuyerTypeChange = (type: 'individual' | 'company' | 'organization') => {
        setBuyerType(type);
        setValue('buyerType', type);
    };

    const handleFormSubmit = async (data: RegisterFormData) => {
        try {
            await onSubmit(data);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    const isFormLoading = isLoading || isSubmitting;

    return (
        <Card className={cn('w-full max-w-2xl', className)}>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">
                    Create your account
                </CardTitle>
                <CardDescription className="text-center">
                    Join VendorForge and start connecting with trusted vendors
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    {/* Buyer Type Selection */}
                    <div className="space-y-3">
                        <Label className="text-base font-medium">I am registering as:</Label>
                        <Tabs value={buyerType} onValueChange={handleBuyerTypeChange} className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="individual" className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Individual
                                </TabsTrigger>
                                <TabsTrigger value="company" className="flex items-center gap-2">
                                    <Building className="h-4 w-4" />
                                    Company
                                </TabsTrigger>
                                <TabsTrigger value="organization" className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    Organization
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="individual" className="mt-4">
                                <div className="text-sm text-muted-foreground">
                                    Perfect for personal purchases and individual needs
                                </div>
                            </TabsContent>

                            <TabsContent value="company" className="mt-4">
                                <div className="text-sm text-muted-foreground">
                                    For businesses looking to streamline procurement processes
                                </div>
                            </TabsContent>

                            <TabsContent value="organization" className="mt-4">
                                <div className="text-sm text-muted-foreground">
                                    For non-profits, government agencies, and institutions
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Personal Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    placeholder="John"
                                    {...register('firstName')}
                                    disabled={isFormLoading}
                                />
                                {errors.firstName && (
                                    <p className="text-sm text-red-600">{errors.firstName.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    placeholder="Doe"
                                    {...register('lastName')}
                                    disabled={isFormLoading}
                                />
                                {errors.lastName && (
                                    <p className="text-sm text-red-600">{errors.lastName.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    className="pl-10"
                                    {...register('email')}
                                    disabled={isFormLoading}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone (Optional)</Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                {...register('phone')}
                                disabled={isFormLoading}
                            />
                            {errors.phone && (
                                <p className="text-sm text-red-600">{errors.phone.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Create a strong password"
                                        className="pl-10 pr-10"
                                        {...register('password')}
                                        disabled={isFormLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                                        disabled={isFormLoading}
                                    >
                                        {showPassword ? <EyeOff /> : <Eye />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-600">{errors.password.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Confirm your password"
                                        className="pl-10 pr-10"
                                        {...register('confirmPassword')}
                                        disabled={isFormLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                                        disabled={isFormLoading}
                                    >
                                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Entity Information (Company/Organization) */}
                    {(buyerType === 'company' || buyerType === 'organization') && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">
                                {buyerType === 'company' ? 'Company' : 'Organization'} Information
                            </h3>

                            <div className="space-y-2">
                                <Label htmlFor="entityName">
                                    {buyerType === 'company' ? 'Company Name' : 'Organization Name'}
                                </Label>
                                <Input
                                    id="entityName"
                                    placeholder={buyerType === 'company' ? 'Acme Corp' : 'Red Cross Foundation'}
                                    {...register('entityName')}
                                    disabled={isFormLoading}
                                />
                                {errors.entityName && (
                                    <p className="text-sm text-red-600">{errors.entityName.message}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="entityType">
                                        {buyerType === 'company' ? 'Industry' : 'Organization Type'}
                                    </Label>
                                    <Input
                                        id="entityType"
                                        placeholder={buyerType === 'company' ? 'Technology' : 'Non-profit'}
                                        {...register('entityType')}
                                        disabled={isFormLoading}
                                    />
                                    {errors.entityType && (
                                        <p className="text-sm text-red-600">{errors.entityType.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="jobTitle">
                                        {buyerType === 'company' ? 'Job Title' : 'Position'}
                                    </Label>
                                    <Input
                                        id="jobTitle"
                                        placeholder={buyerType === 'company' ? 'Procurement Manager' : 'Program Director'}
                                        {...register('jobTitle')}
                                        disabled={isFormLoading}
                                    />
                                    {errors.jobTitle && (
                                        <p className="text-sm text-red-600">{errors.jobTitle.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="registrationNumber">Registration Number (Optional)</Label>
                                    <Input
                                        id="registrationNumber"
                                        placeholder="REG123456"
                                        {...register('registrationNumber')}
                                        disabled={isFormLoading}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="department">Department (Optional)</Label>
                                    <Input
                                        id="department"
                                        placeholder="Procurement"
                                        {...register('department')}
                                        disabled={isFormLoading}
                                    />
                                </div>
                            </div>

                            {buyerType === 'company' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="taxId">Tax ID (Optional)</Label>
                                        <Input
                                            id="taxId"
                                            placeholder="TAX123456"
                                            {...register('taxId')}
                                            disabled={isFormLoading}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="website">Website (Optional)</Label>
                                        <Input
                                            id="website"
                                            type="url"
                                            placeholder="https://company.com"
                                            {...register('website')}
                                            disabled={isFormLoading}
                                        />
                                        {errors.website && (
                                            <p className="text-sm text-red-600">{errors.website.message}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Address Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Address Information</h3>

                        <div className="space-y-2">
                            <Label htmlFor="addressLine1">Address Line 1</Label>
                            <Input
                                id="addressLine1"
                                placeholder="123 Main Street"
                                {...register('addressLine1')}
                                disabled={isFormLoading}
                            />
                            {errors.addressLine1 && (
                                <p className="text-sm text-red-600">{errors.addressLine1.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
                            <Input
                                id="addressLine2"
                                placeholder="Apartment, suite, etc."
                                {...register('addressLine2')}
                                disabled={isFormLoading}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    placeholder="New York"
                                    {...register('city')}
                                    disabled={isFormLoading}
                                />
                                {errors.city && (
                                    <p className="text-sm text-red-600">{errors.city.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
                                <Input
                                    id="state"
                                    placeholder="NY"
                                    {...register('state')}
                                    disabled={isFormLoading}
                                />
                                {errors.state && (
                                    <p className="text-sm text-red-600">{errors.state.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="postalCode">Postal Code</Label>
                                <Input
                                    id="postalCode"
                                    placeholder="10001"
                                    {...register('postalCode')}
                                    disabled={isFormLoading}
                                />
                                {errors.postalCode && (
                                    <p className="text-sm text-red-600">{errors.postalCode.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input
                                id="country"
                                placeholder="United States"
                                {...register('country')}
                                disabled={isFormLoading}
                            />
                            {errors.country && (
                                <p className="text-sm text-red-600">{errors.country.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full vf-gradient-primary"
                        disabled={isFormLoading}
                    >
                        {isFormLoading ? (
                            <>
                                <LoadingSpinner size="sm" variant="neutral" className="mr-2" />
                                Creating account...
                            </>
                        ) : (
                            'Create account'
                        )}
                    </Button>
                </form>

                {/* Footer Links */}
                <div className="mt-4 text-center text-sm">
                    <span className="text-muted-foreground">Already have an account? </span>
                    <a href="/login" className="text-primary hover:underline">
                        Sign in
                    </a>
                </div>
            </CardContent>
        </Card>
    );
}; 