"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Building, Star } from "lucide-react";
import { Property, PropertyService } from "@/lib/property-service";
import Link from "next/link";
import Image from "next/image";

export function SuggestedProperties() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const sectionRef = document.getElementById('suggested-properties');
        if (sectionRef) {
            observer.observe(sectionRef);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                // Fetch only 6 featured properties
                const data = await PropertyService.getProperties({
                    published: true,
                    limit: 6
                });
                setProperties(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch properties');
                console.error('Error fetching properties:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const totalPages = Math.ceil(properties.length / 3);
    const startIndex = currentPage * 3;
    const endIndex = startIndex + 3;
    const currentProperties = properties.slice(startIndex, endIndex);

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    if (loading) {
        return (
            <section id="suggested-properties" className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Suggested Investment <span style={{ color: '#00c4b6' }}>Opportunities</span>
                        </h2>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-16 h-16 border-4 border-gray-300 border-t-[#00c4b6] rounded-full animate-spin"></div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="suggested-properties" className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Suggested Investment <span style={{ color: '#00c4b6' }}>Opportunities</span>
                        </h2>
                    </div>
                    <div className="text-center">
                        <p className="text-red-600 mb-4">Failed to load properties</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-[#00c4b6] text-white rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (properties.length === 0) {
        return (
            <section id="suggested-properties" className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Suggested Investment <span style={{ color: '#00c4b6' }}>Opportunities</span>
                        </h2>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-600">No investment opportunities available at the moment.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="suggested-properties" className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                    <div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Suggested Investment <span style={{ color: '#00c4b6' }}>Opportunities</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl">
                            Discover premium real estate investment opportunities with attractive returns
                        </p>
                    </div>
                    <div className="mt-6 sm:mt-0">
                        <Link
                            href="/listings"
                            className="inline-flex items-center text-lg font-semibold hover:opacity-80 transition-opacity"
                            style={{ color: '#00c4b6' }}
                        >
                            Explore all Properties
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </Link>
                    </div>
                </div>

                {/* Properties Grid */}
                <div className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {currentProperties.map((property) => (
                            <div key={property.id} className="group">
                                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden border border-gray-100">
                                    {/* Property Image */}
                                    <div className="relative h-48 overflow-hidden">
                                        {property.image_url ? (
                                            <Image
                                                src={property.image_url}
                                                alt={property.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                                <Building className="w-16 h-16 text-gray-400" />
                                            </div>
                                        )}
                                        {/* Status Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800">
                                                {property.status}
                                            </span>
                                        </div>
                                        {/* Featured Badge */}
                                        {property.featured && (
                                            <div className="absolute top-4 right-4">
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1" style={{ backgroundColor: '#00c4b6' }}>
                                                    <Star className="w-3 h-3" />
                                                    Featured
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Property Details */}
                                    <div className="p-4">
                                        {/* Developer Logo/Name */}
                                        <div className="mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00c4b6', opacity: 0.5 }}>
                                                    <Building className="w-5 h-5 text-black"

                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900">{property.developer || 'Prop Lord'}</p>
                                                    <p className="text-xs text-gray-500">DEVELOPER</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Property Name */}
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#00c4b6] transition-colors duration-300">
                                            {property.name}
                                        </h3>

                                        {/* Location */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            <p className="text-sm text-gray-600">{property.location}</p>
                                        </div>

                                        {/* Investment Details */}
                                        <div className="flex items-center justify-between p-4 rounded-lg">
                                            <div className="text-center">
                                                <p className="text-xs text-gray-600 mb-1">Investment Amount</p>
                                                <p className="text-lg font-bold">
                                                    ₹{property.min_investment}
                                                </p>
                                            </div>
                                            <div className="w-px h-12 bg-gray-300"></div>
                                            <div className="text-center">
                                                <p className="text-xs text-gray-600 mb-1">Investment Period</p>
                                                <p className="text-lg font-bold" >
                                                    {property.investment_period}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Property Type & Area */}
                                        <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
                                            <span>{property.type}</span>
                                            {property.total_area_sqft && (
                                                <span>{property.total_area_sqft.toLocaleString()} sq ft</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between">
                        {/* Pagination Dots */}
                        <div className="flex space-x-2">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToPage(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentPage
                                        ? 'w-8'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                    style={index === currentPage ? { backgroundColor: '#00c4b6' } : {}}
                                    aria-label={`Go to page ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        <div className="flex space-x-3">
                            <button
                                onClick={prevPage}
                                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-100"
                                aria-label="Previous page"
                            >
                                <ChevronLeft className="w-6 h-6 text-gray-700 hover:text-[#00c4b6] transition-colors" />
                            </button>
                            <button
                                onClick={nextPage}
                                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-100"
                                aria-label="Next page"
                            >
                                <ChevronRight className="w-6 h-6 text-gray-700 hover:text-[#00c4b6] transition-colors" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
