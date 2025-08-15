"use client";

import { useEffect, useRef, useState } from "react";

const blogPosts = [
    {
        title: "THE REASONS THE PRICE OF RESIDENTIAL REAL ESTATE IS RISING",
        excerpt:
            "Understanding the key factors driving the surge in residential property prices across major Indian cities and what it means for buyers and investors.",
        category: "Residential Sector",
        image: "/services/service2.jpg",
        date: "15 Dec 2024",
        categoryColor: "bg-blue-600",
        readTime: "5 min read",
    },
    {
        title: "COMMERCIAL REAL ESTATE TRENDS IN POST-PANDEMIC ERA",
        excerpt:
            "Analyzing the transformation of commercial real estate markets and emerging opportunities in the new business landscape.",
        category: "Commercial Sector",
        image: "/services/service1.jpg",
        date: "12 Feb 2025",
        categoryColor: "bg-green-600",
        readTime: "7 min read",
    },
    {
        title: "WAREHOUSING BOOM: THE LOGISTICS REVOLUTION IN INDIA",
        excerpt:
            "Exploring the unprecedented growth in warehousing demand and its impact on industrial real estate investments.",
        category: "Warehousing Sector",
        image: "/services/service5.jpg",
        date: "10 Mar 2025",
        categoryColor: "bg-purple-600",
        readTime: "6 min read",
    },
];

export function BlogSection() {
    const [visibleCards, setVisibleCards] = useState<number[]>([]);
    const sectionRef = useRef<HTMLElement>(null);

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
    }, []);

    return (
        <section
            id="blog"
            ref={sectionRef}
            className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden"
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
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                    </h2>
                    <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto font-sans">
                        Stay updated with the latest trends and insights in the real estate industry
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => {
                        const isVisible = visibleCards.includes(index);

                        return (
                            <div
                                key={index}
                                data-index={index}
                                className={`transition-all duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"}`}
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 hover:scale-[1.02] cursor-pointer">
                                    {/* Image Container with Overlay Effects */}
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={post.image || "/placeholder.svg"}
                                            alt={post.title}
                                            className="w-full h-56 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4 transform transition-all duration-300 group-hover:scale-110">
                                            <span
                                                className={`${post.categoryColor} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg `}
                                            >
                                                {post.category}
                                            </span>
                                        </div>

                                        {/* Read Time Badge */}
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            {post.readTime}
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
                                            {post.date}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-green-600 transition-colors duration-300">
                                            {post.title}
                                        </h3>

                                        {/* Excerpt */}
                                        <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed font-sans">{post.excerpt}</p>

                                        {/* Read More Button */}
                                        <div className="flex justify-between items-center">
                                            <button className="group/btn relative bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform rounded-lg overflow-hidden">
                                                <span className="relative z-10">READ MORE</span>
                                                {/* Button Shine Effect */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500"></div>
                                            </button>

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
