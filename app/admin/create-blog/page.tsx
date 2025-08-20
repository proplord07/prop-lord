"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BlogService } from "@/lib/blog-service";
import { Upload, X, Image as ImageIcon, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { ProtectedRoute } from "@/components/protected-route";
import Link from "next/link";

// Form validation schema
const blogFormSchema = z.object({
    title: z.string().min(10, "Title must be at least 10 characters").max(200, "Title must be less than 200 characters"),
    excerpt: z.string().min(20, "Excerpt must be at least 20 characters").max(500, "Excerpt must be less than 500 characters"),
    content: z.string().min(100, "Content must be at least 100 characters"),
    category: z.string().min(1, "Please select a category"),
    readTime: z.string().min(1, "Please enter estimated read time").refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, "Please enter a valid number greater than 0"),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

export default function CreateBlogPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);


    const form = useForm<BlogFormValues>({
        resolver: zodResolver(blogFormSchema),
        defaultValues: {
            title: "",
            excerpt: "",
            content: "",
            category: "",
            readTime: "",
        },
    });

    const categories = [
        "Residential Sector",
        "Commercial Sector",
        "Warehousing Sector",
        "Land Development",
        "Hospitality Sector",
        "Corporate Sector",
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

    const onSubmit = async (data: BlogFormValues) => {
        if (!selectedImage) {
            toast.error("Please select an image");
            return;
        }

        setIsSubmitting(true);
        setUploadProgress(0);

        // Show loading toast
        const loadingToast = toast.loading("Creating blog post...");

        try {
            // Simulate upload progress
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 200);

            // Upload image first
            toast.info("Uploading image...", {
                id: loadingToast,
            });
            const imageUrl = await BlogService.uploadImage(selectedImage, selectedImage.name);
            setUploadProgress(100);

            // Create blog post
            toast.info("Creating blog post...", {
                id: loadingToast,
            });
            const blogData = {
                title: data.title,
                excerpt: data.excerpt,
                content: data.content,
                category: data.category,
                image_url: imageUrl,
                read_time: parseInt(data.readTime) || 5,
                slug: BlogService.generateSlug(data.title),
                published: true, // Automatically publish new blogs
            };

            const newBlog = await BlogService.createBlog(blogData);

            // Reset form
            form.reset();
            removeImage();

            // Show success toast
            toast.success(`Blog post created successfully!`, {
                id: loadingToast,
                duration: 5000,
            });

        } catch (error) {
            console.error("Error creating blog post:", error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

            // Show error toast
            toast.error("Failed to create blog post", {
                id: loadingToast,
                duration: 8000,
            });
        } finally {
            setIsSubmitting(false);
            setUploadProgress(0);
        }
    };

    return (
        <ProtectedRoute>
            <main className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/admin">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Dashboard
                            </Button>
                        </Link>
                    </div>
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 relative">
                            Create New Blog Post
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                        </h1>
                        <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto font-sans">
                            Share your insights and expertise with the real estate community
                        </p>
                    </div>

                    <Card className="shadow-xl">
                        <CardHeader>
                            <CardTitle>Blog Post Details</CardTitle>
                            <CardDescription>
                                Fill in the details below to create your new blog post. All fields marked with * are required.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            {/* Form Validation Summary */}
                            {Object.keys(form.formState.errors).length > 0 && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <h4 className="text-sm font-medium text-red-800 mb-2">Please fix the following errors:</h4>
                                    <ul className="text-sm text-red-700 space-y-1">
                                        {Object.entries(form.formState.errors).map(([field, error]) => (
                                            <li key={field} className="flex items-center">
                                                <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                                                <span className="capitalize">{field}:</span> {error?.message}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Title */}
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Blog Title *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter the blog title..."
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Choose a compelling title that captures your readers' attention
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Excerpt */}
                                    <FormField
                                        control={form.control}
                                        name="excerpt"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Excerpt *</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Write a brief summary of the blog post..."
                                                        rows={3}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    A short summary that appears in blog previews and search results
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Category */}
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category *</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a category" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {categories.map((category) => (
                                                            <SelectItem key={category} value={category}>
                                                                {category}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    Choose the most appropriate category for your blog post
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Read Time */}
                                    <FormField
                                        control={form.control}
                                        name="readTime"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Estimated Read Time *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="e.g., 5 min read"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Help readers understand how long it will take to read your post
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Image Upload */}
                                    <div className="space-y-3">
                                        <Label htmlFor="image">Featured Image *</Label>
                                        <div className="space-y-4">
                                            {previewImage ? (
                                                <div className="relative">
                                                    <img
                                                        src={previewImage}
                                                        alt="Preview"
                                                        className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={removeImage}
                                                        className="absolute top-2 right-2"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div
                                                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                                                    onClick={() => document.getElementById('image')?.click()}
                                                >
                                                    <div className="space-y-4">
                                                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                        <div className="space-y-2">
                                                            <p className="text-green-600 hover:text-green-500 font-medium">
                                                                <Upload className="inline h-4 w-4 mr-2" />
                                                                Click to upload an image
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                PNG, JPG, GIF, WebP up to 10MB
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {!previewImage && (
                                                <>
                                                    <Input
                                                        id="image"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        className="hidden"
                                                    />
                                                    <Label
                                                        htmlFor="image"
                                                        className="cursor-pointer text-green-600 hover:text-green-500 font-medium"
                                                    >
                                                        <Upload className="inline h-4 w-4 mr-2" />
                                                        Upload an image
                                                    </Label>
                                                </>
                                            )}

                                            {/* Upload Progress */}
                                            {uploadProgress > 0 && uploadProgress < 100 && (
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-sm text-gray-600">
                                                        <span>Uploading...</span>
                                                        <span>{uploadProgress}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                                            style={{ width: `${uploadProgress}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Blog Content *</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Textarea
                                                            placeholder="Write your blog content here... You can use markdown formatting."
                                                            rows={15}
                                                            className="font-mono text-sm pr-20"
                                                            {...field}
                                                        />
                                                        <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white px-2 py-1 rounded">
                                                            {field.value?.length || 0} characters
                                                        </div>
                                                    </div>
                                                </FormControl>
                                                <FormDescription>
                                                    Write your full blog content. You can use markdown formatting for better structure.
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Submit Button */}
                                    <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                                        <div className="text-sm text-green-600 font-medium">
                                            <p>💡 Tip: New blog posts are automatically published when created</p>
                                        </div>
                                        <div className="flex justify-end">
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                        Creating...
                                                    </>
                                                ) : (
                                                    "Create Blog Post"
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </ProtectedRoute>
    );
}
