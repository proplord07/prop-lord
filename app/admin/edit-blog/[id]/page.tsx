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
import { BlogService } from "@/lib/blog-service";
import { BlogPost } from "@/lib/supabase";
import { Upload, X, Image as ImageIcon, FileText, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ProtectedRoute } from "@/components/protected-route";
import Link from "next/link";

// Form validation schema (same as create blog)
const blogFormSchema = z.object({
    title: z.string().min(10, "Title must be at least 10 characters").max(200, "Title must be less than 200 characters"),
    excerpt: z.string().min(20, "Excerpt must be at least 20 characters").max(500, "Excerpt must be less than 500 characters"),
    content: z.string().min(100, "Content must be at least 100 characters"),
    category: z.string().min(1, "Please select a category"),
    readTime: z.string().min(1, "Please enter estimated read time").refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, "Please enter a valid number greater than 0"),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

interface EditBlogPageProps {
    params: Promise<{ id: string; }>;
}

export default function EditBlogPage({ params }: EditBlogPageProps) {
    const router = useRouter();
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
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

    // Unwrap params and load blog data
    useEffect(() => {
        const loadBlog = async () => {
            try {
                const resolvedParams = await params;
                const blogId = parseInt(resolvedParams.id);

                if (isNaN(blogId)) {
                    toast.error("Invalid blog ID");
                    router.push("/admin/manage-blogs");
                    return;
                }

                const blogData = await BlogService.getBlogById(blogId);

                if (!blogData) {
                    toast.error("Blog post not found");
                    router.push("/admin/manage-blogs");
                    return;
                }

                setBlog(blogData);
                setCurrentImageUrl(blogData.image_url);

                // Populate form with existing data
                form.reset({
                    title: blogData.title,
                    excerpt: blogData.excerpt,
                    content: blogData.content,
                    category: blogData.category,
                    readTime: blogData.read_time.toString(),
                });
            } catch (error) {
                console.error("Error loading blog:", error);
                toast.error("Failed to load blog post");
                router.push("/admin/manage-blogs");
            } finally {
                setLoading(false);
            }
        };

        loadBlog();
    }, [params, form, router]);

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
        if (!blog) return;

        setIsSubmitting(true);
        setUploadProgress(0);

        const loadingToast = toast.loading("Updating blog post...");

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
                imageUrl = await BlogService.uploadImage(selectedImage, selectedImage.name);
                setUploadProgress(100);
            }

            // Update blog post
            toast.info("Updating blog post...", {
                id: loadingToast,
            });

            const blogData = {
                id: blog.id,
                title: data.title,
                excerpt: data.excerpt,
                content: data.content,
                category: data.category,
                image_url: imageUrl || undefined,
                read_time: parseInt(data.readTime) || 5,
                slug: BlogService.generateSlug(data.title),
            };

            await BlogService.updateBlog(blogData);

            toast.success("Blog post updated successfully!", {
                id: loadingToast,
                duration: 5000,
            });

            router.push("/admin/manage-blogs");

        } catch (error) {
            console.error("Error updating blog post:", error);
            toast.error("Failed to update blog post", {
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
                            <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
                            <p className="text-lg text-gray-600">Loading blog post...</p>
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
                        <Link href="/admin/manage-blogs">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Manage Blogs
                            </Button>
                        </Link>
                    </div>

                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 relative">
                            Edit Blog Post
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                        </h1>
                        <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto font-sans">
                            Update your blog post information and content
                        </p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/* Basic Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-green-600" />
                                        Blog Post Details
                                    </CardTitle>
                                    <CardDescription>
                                        Update the essential information about your blog post
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="category"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Category *</FormLabel>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
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
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

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
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

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
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            {/* Blog Image */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <ImageIcon className="w-5 h-5 text-purple-600" />
                                        Featured Image
                                    </CardTitle>
                                    <CardDescription>
                                        Update the featured image for your blog post
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
                                                        alt="Current blog image"
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
                                                    id="blog-image"
                                                />
                                                <label
                                                    htmlFor="blog-image"
                                                    className="cursor-pointer flex flex-col items-center space-y-2"
                                                >
                                                    <Upload className="w-12 h-12 text-gray-400" />
                                                    <div>
                                                        <span className="text-sm font-medium text-green-600 hover:text-green-500">
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
                                                        alt="Blog preview"
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
                                                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                                            style={{ width: `${uploadProgress}%` }}
                                                        ></div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Blog Content */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-blue-600" />
                                        Blog Content
                                    </CardTitle>
                                    <CardDescription>
                                        Update the main content of your blog post
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
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
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            {/* Submit Buttons */}
                            <div className="flex justify-center space-x-4">
                                <Link href="/admin/manage-blogs">
                                    <Button variant="outline" disabled={isSubmitting}>
                                        Cancel
                                    </Button>
                                </Link>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-8 py-3 text-lg bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                >
                                    {isSubmitting ? "Updating Blog Post..." : "Update Blog Post"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </main>
        </ProtectedRoute>
    );
}
