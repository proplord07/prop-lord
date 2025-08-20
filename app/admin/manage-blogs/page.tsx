"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Search,
    Edit,
    Trash2,
    Eye,
    FileText,
    Calendar,
    Loader2,
    Plus,
    Clock,
    User,
    ArrowLeft
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlogService } from "@/lib/blog-service";
import { BlogPost } from "@/lib/supabase";
import { ProtectedRoute } from "@/components/protected-route";
import { toast } from "sonner";

export default function ManageBlogsPage() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState<{ id: number; title: string; } | null>(null);

    // Fetch blogs on component mount
    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            // Get all blogs (not just published ones) for management
            const fetchedBlogs = await BlogService.getAllBlogs();
            setBlogs(fetchedBlogs);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (blogId: number, blogTitle: string) => {
        setBlogToDelete({ id: blogId, title: blogTitle });
        setDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        if (!blogToDelete) return;

        try {
            setDeleteLoading(blogToDelete.id);
            await BlogService.deleteBlog(blogToDelete.id);

            // Remove the blog from the local state
            setBlogs(prev => prev.filter(b => b.id !== blogToDelete.id));

            toast.success("Blog post deleted successfully");
            setDeleteDialogOpen(false);
            setBlogToDelete(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete blog post';
            toast.error("Failed to delete blog post");
            console.error('Delete error:', errorMessage);
        } finally {
            setDeleteLoading(null);
        }
    };

    const togglePublishStatus = async (blogId: number, currentStatus: boolean, blogTitle: string) => {
        try {
            await BlogService.updateBlog({
                id: blogId,
                published: !currentStatus
            });

            // Update the blog in local state
            setBlogs(prev => prev.map(blog =>
                blog.id === blogId
                    ? { ...blog, published: !currentStatus }
                    : blog
            ));

            const action = currentStatus ? 'unpublished' : 'published';
            toast.success(`Blog post ${action} successfully`);
        } catch (err) {
            toast.error("Failed to update blog status");
            console.error('Toggle publish error:', err);
        }
    };

    // Filter blogs based on search term
    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (published: boolean) => {
        return published
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800';
    };

    const getCategoryColor = (category: string) => {
        const colors: { [key: string]: string; } = {
            'Residential Sector': 'bg-blue-100 text-blue-800',
            'Commercial Sector': 'bg-purple-100 text-purple-800',
            'Warehousing Sector': 'bg-orange-100 text-orange-800',
            'Land Development': 'bg-green-100 text-green-800',
            'Hospitality Sector': 'bg-pink-100 text-pink-800',
            'Corporate Sector': 'bg-indigo-100 text-indigo-800',
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    return (
        <ProtectedRoute>
            <main className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <Link href="/admin">
                                    <Button variant="outline" size="sm">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back to Dashboard
                                    </Button>
                                </Link>
                            </div>
                            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
                                Manage Blog Posts
                            </h1>
                            <p className="text-gray-600 text-lg">
                                View, edit, delete, and manage your blog posts
                            </p>
                        </div>
                        <Link href="/admin/create-blog">
                            <Button className="bg-green-600 hover:bg-green-700 text-white">
                                <Plus className="w-4 h-4 mr-2" />
                                Create New Blog
                            </Button>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-8">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search blog posts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
                            <p className="text-lg text-gray-600">Loading blog posts...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                                <p className="text-lg text-red-800 mb-2">Failed to load blog posts</p>
                                <p className="text-sm text-red-600 mb-4">{error}</p>
                                <Button
                                    onClick={fetchBlogs}
                                    variant="outline"
                                    className="border-red-300 text-red-700 hover:bg-red-50"
                                >
                                    Try Again
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Blogs List */}
                    {!loading && !error && (
                        <div className="space-y-4">
                            {filteredBlogs.length === 0 ? (
                                <div className="text-center py-20">
                                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {searchTerm ? 'No blog posts found' : 'No blog posts yet'}
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        {searchTerm
                                            ? 'Try adjusting your search terms'
                                            : 'Get started by creating your first blog post'
                                        }
                                    </p>
                                    {!searchTerm && (
                                        <Link href="/admin/create-blog">
                                            <Button className="bg-green-600 hover:bg-green-700 text-white">
                                                <Plus className="w-4 h-4 mr-2" />
                                                Create Blog Post
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-gray-600">
                                            Showing {filteredBlogs.length} of {blogs.length} blog posts
                                        </p>
                                    </div>

                                    <div className="grid gap-6">
                                        {filteredBlogs.map((blog) => (
                                            <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                                <div className="flex flex-col lg:flex-row">
                                                    {/* Blog Image */}
                                                    <div className="lg:w-1/3">
                                                        <div className="relative h-48 lg:h-full">
                                                            <Image
                                                                src={blog.image_url || "/placeholder.svg"}
                                                                alt={blog.title}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                            <div className="absolute top-3 left-3">
                                                                <Badge className={getStatusColor(blog.published)}>
                                                                    {blog.published ? 'Published' : 'Draft'}
                                                                </Badge>
                                                            </div>
                                                            <div className="absolute top-3 right-3">
                                                                <Badge className={getCategoryColor(blog.category)}>
                                                                    {blog.category}
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Blog Details */}
                                                    <div className="lg:w-2/3 p-6">
                                                        <div className="flex flex-col h-full">
                                                            <div className="flex-1">
                                                                <div className="flex items-start justify-between mb-3">
                                                                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                                                                        {blog.title}
                                                                    </h3>
                                                                    <div className="flex items-center space-x-2 ml-4">
                                                                        <Button
                                                                            size="sm"
                                                                            variant="outline"
                                                                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                                                            onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                                                                        >
                                                                            <Eye className="w-4 h-4 mr-1" />
                                                                            View
                                                                        </Button>
                                                                        <Link href={`/admin/edit-blog/${blog.id}`}>
                                                                            <Button
                                                                                size="sm"
                                                                                variant="outline"
                                                                                className="text-green-600 border-green-200 hover:bg-green-50"
                                                                            >
                                                                                <Edit className="w-4 h-4 mr-1" />
                                                                                Edit
                                                                            </Button>
                                                                        </Link>
                                                                        <Button
                                                                            size="sm"
                                                                            variant="outline"
                                                                            onClick={() => togglePublishStatus(blog.id, blog.published, blog.title)}
                                                                            className="text-orange-600 border-orange-200 hover:bg-orange-50"
                                                                        >
                                                                            {blog.published ? 'Unpublish' : 'Publish'}
                                                                        </Button>
                                                                        <Button
                                                                            size="sm"
                                                                            variant="outline"
                                                                            onClick={() => handleDeleteClick(blog.id, blog.title)}
                                                                            disabled={deleteLoading === blog.id}
                                                                            className="text-red-600 border-red-200 hover:bg-red-50"
                                                                        >
                                                                            {deleteLoading === blog.id ? (
                                                                                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                                                                            ) : (
                                                                                <Trash2 className="w-4 h-4 mr-1" />
                                                                            )}
                                                                            Delete
                                                                        </Button>
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-center text-gray-600 mb-3">
                                                                    <Calendar className="w-4 h-4 mr-1" />
                                                                    <span className="text-sm">
                                                                        {new Date(blog.created_at).toLocaleDateString()}
                                                                    </span>
                                                                    <span className="mx-2">•</span>
                                                                    <Clock className="w-4 h-4 mr-1" />
                                                                    <span className="text-sm">{blog.read_time} min read</span>
                                                                    <span className="mx-2">•</span>
                                                                    <User className="w-4 h-4 mr-1" />
                                                                    <span className="text-sm">Author</span>
                                                                </div>

                                                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                                    {blog.excerpt}
                                                                </p>

                                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                                    <div>
                                                                        <p className="text-xs text-gray-500">Category</p>
                                                                        <p className="font-semibold text-gray-900">
                                                                            {blog.category}
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs text-gray-500">Status</p>
                                                                        <p className="font-semibold text-gray-900">
                                                                            {blog.published ? 'Published' : 'Draft'}
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs text-gray-500">Content Length</p>
                                                                        <p className="font-semibold text-gray-900">
                                                                            {blog.content.length} characters
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* Delete Confirmation Dialog */}
                    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Blog Post</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete "{blogToDelete?.title}"? This action cannot be undone.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setDeleteDialogOpen(false)}
                                    disabled={deleteLoading !== null}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleDelete}
                                    disabled={deleteLoading !== null}
                                >
                                    {deleteLoading !== null ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Deleting...
                                        </>
                                    ) : (
                                        'Delete'
                                    )}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </main>
        </ProtectedRoute>
    );
}
