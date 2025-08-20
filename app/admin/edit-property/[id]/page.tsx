"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Property, PropertyService } from "@/lib/property-service";
import { Upload, X, Image as ImageIcon, Building, Home, Star, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ProtectedRoute } from "@/components/protected-route";
import Link from "next/link";

// Form validation schema (same as create property)
const propertyFormSchema = z.object({
    name: z.string().min(10, "Property name must be at least 10 characters").max(255, "Property name must be less than 255 characters"),
    location: z.string().min(3, "Location must be at least 3 characters").max(255, "Location must be less than 255 characters"),
    status: z.string().min(1, "Please select a status"),
    type: z.string().min(1, "Please select a property type"),
    price_per_sqft: z.string().min(1, "Please enter price per sq ft").refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, "Please enter a valid number greater than 0"),
    min_investment: z.string().min(1, "Please enter minimum investment"),
    investment_period: z.string().min(1, "Please select investment period"),
    valuation: z.string().min(1, "Please select valuation"),
    description: z.string().min(0, "Description cannot be negative").max(1000, "Description must be less than 1000 characters").optional(),
    total_area_sqft: z.string().min(1, "Please enter total area").refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, "Please enter a valid number greater than 0"),
    bedrooms: z.string().min(1, "Please enter number of bedrooms").refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, "Please enter a valid number"),
    bathrooms: z.string().min(1, "Please enter number of bathrooms").refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, "Please enter a valid number"),
    parking_spaces: z.string().min(1, "Please enter number of parking spaces").refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, "Please enter a valid number"),
    developer: z.string().min(1, "Please enter developer name").max(255, "Developer name must be less than 255 characters"),
    contact_person: z.string().min(1, "Please enter contact person name").max(255, "Contact person name must be less than 255 characters"),
    contact_phone: z.string().min(10, "Please enter a valid phone number").max(20, "Phone number must be less than 20 characters"),
    contact_email: z.string().email("Please enter a valid email address"),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

interface EditPropertyPageProps {
    params: Promise<{ id: string; }>;
}

export default function EditPropertyPage({ params }: EditPropertyPageProps) {
    const router = useRouter();
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const form = useForm<PropertyFormValues>({
        resolver: zodResolver(propertyFormSchema),
        defaultValues: {
            name: "",
            location: "",
            status: "",
            type: "",
            price_per_sqft: "",
            min_investment: "",
            investment_period: "",
            valuation: "",
            description: "",
            total_area_sqft: "",
            bedrooms: "",
            bathrooms: "",
            parking_spaces: "",
            developer: "",
            contact_person: "",
            contact_phone: "",
            contact_email: "",
        },
    });

    // Unwrap params and load property data
    useEffect(() => {
        const loadProperty = async () => {
            try {
                const resolvedParams = await params;
                const propertyId = parseInt(resolvedParams.id);

                if (isNaN(propertyId)) {
                    toast.error("Invalid property ID");
                    router.push("/admin/manage-properties");
                    return;
                }

                const propertyData = await PropertyService.getPropertyById(propertyId);

                if (!propertyData) {
                    toast.error("Property not found");
                    router.push("/admin/manage-properties");
                    return;
                }

                setProperty(propertyData);
                setCurrentImageUrl(propertyData.image_url);

                // Populate form with existing data
                form.reset({
                    name: propertyData.name,
                    location: propertyData.location,
                    status: propertyData.status,
                    type: propertyData.type,
                    price_per_sqft: propertyData.price_per_sqft.toString(),
                    min_investment: propertyData.min_investment,
                    investment_period: propertyData.investment_period,
                    valuation: propertyData.valuation,
                    description: propertyData.description || "",
                    total_area_sqft: propertyData.total_area_sqft?.toString() || "",
                    bedrooms: propertyData.bedrooms?.toString() || "",
                    bathrooms: propertyData.bathrooms?.toString() || "",
                    parking_spaces: propertyData.parking_spaces?.toString() || "",
                    developer: propertyData.developer || "",
                    contact_person: propertyData.contact_person || "",
                    contact_phone: propertyData.contact_phone || "",
                    contact_email: propertyData.contact_email || "",
                });
            } catch (error) {
                console.error("Error loading property:", error);
                toast.error("Failed to load property");
                router.push("/admin/manage-properties");
            } finally {
                setLoading(false);
            }
        };

        loadProperty();
    }, [params, form, router]);

    const statuses = [
        "Under Construction",
        "Ready to Move",
        "Launching Soon",
        "Pre Launch",
        "Under Planning",
    ];

    const types = [
        "Apartment",
        "Villa",
        "House",
        "Plot",
        "Commercial",
        "Office Space",
        "Shop",
        "Warehouse",
        "Land",
    ];

    const investmentPeriods = [
        "1 Year",
        "2 Years",
        "3 Years",
        "4 Years",
        "5 Years",
        "6+ Years",
    ];

    const valuations = [
        "Undervalued",
        "Fairly Valued",
        "Overvalued",
        "Premium",
    ];

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                toast.error("Invalid file type");
                return;
            }

            // Validate file size (10MB limit)
            const maxSize = 10 * 1024 * 1024;
            if (file.size > maxSize) {
                toast.error("File too large");
                return;
            }

            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
                toast.success("Image selected successfully");
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
        setPreviewImage(null);
        setUploadProgress(0);
        toast.info("Image removed");
    };

    const onSubmit = async (data: PropertyFormValues) => {
        if (!property) return;

        setIsSubmitting(true);
        setUploadProgress(0);

        const loadingToast = toast.loading("Updating property listing...");

        try {
            let imageUrl = currentImageUrl;

            // Upload new image if selected
            if (selectedImage) {
                const progressInterval = setInterval(() => {
                    setUploadProgress(prev => {
                        if (prev >= 90) {
                            clearInterval(progressInterval);
                            return 90;
                        }
                        return prev + 10;
                    });
                }, 200);

                toast.info("Uploading new image...", {
                    id: loadingToast,
                });
                imageUrl = await PropertyService.uploadImage(selectedImage, selectedImage.name);
                setUploadProgress(100);
            }

            // Update property
            toast.info("Updating property listing...", {
                id: loadingToast,
            });

            const propertyData = {
                ...data,
                price_per_sqft: parseInt(data.price_per_sqft),
                total_area_sqft: parseInt(data.total_area_sqft),
                bedrooms: parseInt(data.bedrooms),
                bathrooms: parseInt(data.bathrooms),
                parking_spaces: parseInt(data.parking_spaces),
                image_url: imageUrl || undefined,
            };

            await PropertyService.updateProperty(property.id, propertyData);

            toast.success("Property updated successfully!", {
                id: loadingToast,
                duration: 5000,
            });

            router.push("/admin/manage-properties");

        } catch (error) {
            console.error("Error updating property:", error);
            toast.error("Failed to update property", {
                id: loadingToast,
                duration: 8000,
            });
        } finally {
            setIsSubmitting(false);
            setUploadProgress(0);
        }
    };

    if (loading) {
        return (
            <ProtectedRoute>
                <main className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                            <p className="text-lg text-gray-600">Loading property...</p>
                        </div>
                    </div>
                </main>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <main className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/admin">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Dashboard
                            </Button>
                        </Link>
                        <Link href="/admin/manage-properties">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Manage Properties
                            </Button>
                        </Link>
                    </div>

                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 relative">
                            Edit Property Listing
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                        </h1>
                        <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto font-sans">
                            Update your property information and details
                        </p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/* Basic Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Building className="w-5 h-5 text-blue-600" />
                                        Basic Information
                                    </CardTitle>
                                    <CardDescription>
                                        Essential details about the property
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Property Name *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter property name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="location"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Location *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter location" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Status *</FormLabel>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select status" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {statuses.map((status) => (
                                                                <SelectItem key={status} value={status}>
                                                                    {status}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="type"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Property Type *</FormLabel>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select property type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {types.map((type) => (
                                                                <SelectItem key={type} value={type}>
                                                                    {type}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="price_per_sqft"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Price per Sq Ft *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter price per sq ft" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="min_investment"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Minimum Investment *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g., 30.4 L" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="investment_period"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Investment Period *</FormLabel>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select period" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {investmentPeriods.map((period) => (
                                                                <SelectItem key={period} value={period}>
                                                                    {period}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="valuation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Valuation *</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select valuation" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {valuations.map((valuation) => (
                                                            <SelectItem key={valuation} value={valuation}>
                                                                {valuation}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            {/* Property Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Home className="w-5 h-5 text-green-600" />
                                        Property Details
                                    </CardTitle>
                                    <CardDescription>
                                        Specific details about the property features
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="total_area_sqft"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Total Area (Sq Ft) *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter total area" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="bedrooms"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Bedrooms *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter number of bedrooms" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="bathrooms"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Bathrooms *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter number of bathrooms" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="parking_spaces"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Parking Spaces *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter number of parking spaces" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description (Optional)</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Describe the property, its features, amenities, and investment potential... (Optional)"
                                                        className="min-h-[120px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            {/* Developer & Contact Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Star className="w-5 h-5 text-yellow-600" />
                                        Developer & Contact Information
                                    </CardTitle>
                                    <CardDescription>
                                        Information about the developer and contact details
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="developer"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Developer *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter developer name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="contact_person"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Contact Person *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter contact person name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="contact_phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Contact Phone *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter contact phone number" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="contact_email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Contact Email *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter contact email" type="email" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Property Image */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <ImageIcon className="w-5 h-5 text-purple-600" />
                                        Property Image
                                    </CardTitle>
                                    <CardDescription>
                                        Upload a new image or keep the current one
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {/* Current Image */}
                                        {currentImageUrl && !previewImage && (
                                            <div className="space-y-2">
                                                <p className="text-sm font-medium text-gray-700">Current Image:</p>
                                                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                                                    <img
                                                        src={currentImageUrl}
                                                        alt="Current property image"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Image Upload */}
                                        {!selectedImage ? (
                                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                    id="property-image"
                                                />
                                                <label
                                                    htmlFor="property-image"
                                                    className="cursor-pointer flex flex-col items-center space-y-2"
                                                >
                                                    <Upload className="w-12 h-12 text-gray-400" />
                                                    <div>
                                                        <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                                            Click to upload new image
                                                        </span>
                                                        <span className="text-sm text-gray-500"> or drag and drop</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500">PNG, JPG, GIF, WebP up to 10MB</p>
                                                </label>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <p className="text-sm font-medium text-gray-700">New Image Preview:</p>
                                                <div className="relative">
                                                    <img
                                                        src={previewImage!}
                                                        alt="Property preview"
                                                        className="w-full h-64 object-cover rounded-lg"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={removeImage}
                                                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                {uploadProgress > 0 && (
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                            style={{ width: `${uploadProgress}%` }}
                                                        ></div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Submit Buttons */}
                            <div className="flex justify-center space-x-4">
                                <Link href="/admin/manage-properties">
                                    <Button variant="outline" disabled={isSubmitting}>
                                        Cancel
                                    </Button>
                                </Link>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                >
                                    {isSubmitting ? "Updating Property..." : "Update Property Listing"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </main>
        </ProtectedRoute>
    );
}
