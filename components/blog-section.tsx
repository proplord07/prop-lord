"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/supabase";

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

export function BlogSection() {
    const [visibleCards, setVisibleCards] = useState<number[]>([]);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const sectionRef = useRef<HTMLElement>(null);

    // Fetch blogs from API - only 3 most recent
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/blogs?limit=3');
                if (response.ok) {
                    const result = await response.json();
                    if (result.success) {
                        setBlogPosts(result.data);
                    } else {
                        setError(result.error || 'Failed to fetch blogs');
                        setBlogPosts([]);
                    }
                } else {
                    setError('Failed to fetch blogs');
                    setBlogPosts([]);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setError('Failed to fetch blogs');
                setBlogPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const cardIndex = Number.parseInt(entry.target.getAttribute("data-index") || "0");
                        setVisibleCards((prev) => [...prev, cardIndex]);
                    }
                });
            },
            { threshold: 0.1 },
        );

        const cards = sectionRef.current?.querySelectorAll("[data-index]");
        cards?.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, [blogPosts]);

    return (
        <section
            id="blog"
            ref={sectionRef}
            className="py-10 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden"
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30 animate-pulse"></div>
                <div
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-100 to-blue-100 rounded-full opacity-30 animate-pulse"
                    style={{ animationDelay: "2s" }}
                ></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 relative">
                        Our Latest Blogs
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#00c4b6] to-[#00c4b6] rounded-full"></div>
                    </h2>
                    <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto font-sans">
                        Stay updated with the latest trends and insights in the real estate industry
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-flex items-center space-x-2">
                            <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-gray-600 text-lg">Loading blogs...</span>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="text-center py-12">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                            <div className="text-red-600 text-lg font-medium mb-2">⚠️ Error Loading Blogs</div>
                            <p className="text-red-700 text-sm mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {/* Blog Posts Grid */}
                {!loading && !error && blogPosts.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogPosts.map((post, index) => {
                                const isVisible = visibleCards.includes(index);

                                return (
                                    <div
                                        key={post.id}
                                        data-index={index}
                                        className={`transition-all duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"}`}
                                        style={{ animationDelay: `${index * 150}ms` }}
                                    >
                                        <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 hover:scale-[1.02] cursor-pointer">
                                            {/* Image Container with Overlay Effects */}
                                            <div className="relative overflow-hidden">
                                                <img
                                                    src={post.image_url || "/placeholder.svg"}
                                                    alt={post.title}
                                                    className="w-full h-56 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                                                />

                                                {/* Gradient Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                                {/* Category Badge */}
                                                <div className="absolute top-4 left-4 transform transition-all duration-300 group-hover:scale-110">
                                                    <span
                                                        className={`${getCategoryColor(post.category)} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg `}
                                                    >
                                                        {post.category}
                                                    </span>
                                                </div>

                                                {/* Read Time Badge */}
                                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                    {post.read_time} min read
                                                </div>

                                                {/* Hover Shine Effect */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                                            </div>

                                            {/* Content Container */}
                                            <div className="p-6 relative">
                                                {/* Date */}
                                                <div className="flex items-center text-sm text-gray-500 mb-3 font-medium">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                    {new Date(post.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-[#00c4b6] transition-colors duration-300">
                                                    {post.title}
                                                </h3>

                                                {/* Excerpt */}
                                                <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed font-sans">{post.excerpt}</p>

                                                {/* Read More Button */}
                                                <div className="flex justify-between items-center">
                                                    <Link href={`/blog/${post.slug}`}>
                                                        <button className="group/btn relative bg-[#00c4b6] hover:bg-[#108d84] text-white px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform rounded-lg overflow-hidden">
                                                            <span className="relative z-10">READ MORE</span>
                                                            {/* Button Shine Effect */}
                                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500"></div>
                                                        </button>
                                                    </Link>

                                                    {/* Arrow Icon */}
                                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-green-100 group-hover:scale-110 transition-all duration-300">
                                                        <svg
                                                            className="w-4 h-4 text-gray-600 group-hover:text-green-600 transform group-hover:translate-x-0.5 transition-all duration-300"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                {/* Bottom Border Animation */}
                                                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-green-500 to-green-600 group-hover:w-full transition-all duration-500 ease-out"></div>
                                            </div>

                                            {/* Card Glow Effect */}
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* View All Blogs Button */}
                        <div className="text-center mt-12">
                            <Link href="/blog">
                                <button className="group relative bg-white hover:bg-[#00c4b6] text-[#00c4b6] hover:text-white border-2 border-[#00c4b6] px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform rounded-lg overflow-hidden">
                                    <span className="relative z-10">View All Blogs</span>
                                    {/* Button Shine Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                                </button>
                            </Link>
                        </div>
                    </>
                )}

                {/* No Blogs State */}
                {!loading && !error && blogPosts.length === 0 && (
                    <div className="text-center py-12">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                            <div className="text-gray-500 text-lg font-medium mb-2">📝 No Blogs Found</div>
                            <p className="text-gray-600 text-sm mb-4">We haven't published any blog posts yet. Check back soon!</p>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                }
            `}</style>
        </section>
    );
}
