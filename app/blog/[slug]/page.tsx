import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { BlogService } from "@/lib/blog-service";

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;

    try {
        const blogPost = await BlogService.getBlogBySlug(slug);

        if (!blogPost) {
            notFound();
        }

        // Helper function to get category color
        const getCategoryColor = (category: string): string => {
            const colorMap: { [key: string]: string; } = {
                "Residential Sector": "bg-blue-600",
                "Commercial Sector": "bg-green-600",
                "Warehousing Sector": "bg-purple-600",
                "Land Development": "bg-orange-600",
                "Hospitality Sector": "bg-pink-600",
                "Corporate Sector": "bg-indigo-600",
            };
            return colorMap[category] || "bg-gray-600";
        };

        return (
            <main className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Back Button */}
                    <div className="mb-8">
                        <Link href="/blog">
                            <button className="flex items-center text-green-600 hover:text-green-700 font-medium transition-colors">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Blogs
                            </button>
                        </Link>
                    </div>

                    {/* Blog Post Header */}
                    <div className="mb-8">
                        {/* Category Badge */}
                        <div className="mb-4">
                            <span className={`inline-block px-3 py-1 text-xs font-semibold text-white rounded-full ${getCategoryColor(blogPost.category)}`}>
                                {blogPost.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4 leading-tight">
                            {blogPost.title}
                        </h1>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                {new Date(blogPost.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                {blogPost.read_time} min read
                            </div>
                        </div>

                        {/* Excerpt */}
                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                            {blogPost.excerpt}
                        </p>
                    </div>

                    {/* Featured Image */}
                    {blogPost.image_url && (
                        <div className="mb-8">
                            <img
                                src={blogPost.image_url}
                                alt={blogPost.title}
                                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                            />
                        </div>
                    )}

                    {/* Blog Content */}
                    <div className="prose prose-lg max-w-none">
                        <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                            {blogPost.content}
                        </div>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <Link href="/blog">
                            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                ← Back to All Blogs
                            </button>
                        </Link>
                    </div>
                </div>
            </main>
        );
    } catch (error) {
        console.error('Error fetching blog post:', error);
        notFound();
    }
}
