"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SlidersHorizontal, Search, MapPin, Clock, Building, Check, Diamond, Loader2 } from "lucide-react";
import Image from "next/image";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Property, PropertyService } from "@/lib/property-service";

export default function ListingsPage() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [investmentPeriodFilter, setInvestmentPeriodFilter] = useState("");
    const [valuationFilter, setValuationFilter] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const itemsPerPage = 12;

    // Fetch properties from API
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                const fetchedProperties = await PropertyService.getProperties();
                setProperties(fetchedProperties);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch properties');
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    // Get filter options from properties
    const locations = [...new Set(properties.map((p) => p.location))];
    const types = [...new Set(properties.map((p) => p.type))];
    const statuses = [...new Set(properties.map((p) => p.status))];
    const investmentPeriods = [...new Set(properties.map((p) => p.investment_period))];
    const valuations = [...new Set(properties.map((p) => p.valuation))];

    const filteredProperties = properties.filter((property) => {
        return (
            property.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (locationFilter === "" || locationFilter === "all" || property.location === locationFilter) &&
            (typeFilter === "" || typeFilter === "all" || property.type === typeFilter) &&
            (statusFilter === "" || statusFilter === "all" || property.status === statusFilter) &&
            (investmentPeriodFilter === "" ||
                investmentPeriodFilter === "all" ||
                property.investment_period === investmentPeriodFilter) &&
            (valuationFilter === "" || valuationFilter === "all" || property.valuation === valuationFilter)
        );
    });

    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

    // Paginate properties
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

    const handleFilterChange = (filterType: string, value: string) => {
        setCurrentPage(1);
        const actualValue = value === "all" ? "" : value;

        switch (filterType) {
            case "location":
                setLocationFilter(actualValue);
                break;
            case "type":
                setTypeFilter(actualValue);
                break;
            case "status":
                setStatusFilter(actualValue);
                break;
            case "investmentPeriod":
                setInvestmentPeriodFilter(actualValue);
                break;
            case "valuation":
                setValuationFilter(actualValue);
                break;
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="pt-20 pb-8 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">Property Listings</h1>
                            <p className="text-gray-600 text-lg">Discover your perfect property from our curated collection</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search properties..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="pl-10 w-64 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                                />
                            </div>
                            <Button
                                variant={showFilters ? "default" : "outline"}
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${showFilters
                                    ? "bg-green-600 hover:bg-green-700 text-white shadow-md"
                                    : "border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                                    }`}
                            >
                                <SlidersHorizontal className="h-4 w-4" />
                                Filters
                                {(locationFilter || typeFilter || statusFilter || investmentPeriodFilter || valuationFilter) && (
                                    <Badge className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                        {
                                            [locationFilter, typeFilter, statusFilter, investmentPeriodFilter, valuationFilter].filter(
                                                Boolean,
                                            ).length
                                        }
                                    </Badge>
                                )}
                            </Button>
                        </div>
                    </div>

                    {showFilters && (
                        <div className="mt-6 p-6 rounded-lg border bg-gray-50">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Filter Properties</h3>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setLocationFilter("");
                                        setTypeFilter("");
                                        setStatusFilter("");
                                        setInvestmentPeriodFilter("");
                                        setValuationFilter("");
                                        setSearchTerm("");
                                        setCurrentPage(1);
                                    }}
                                    className="text-gray-600 hover:text-gray-900 text-xs bg-white rounded-lg px-3 py-1.5 border cursor-pointer"
                                >
                                    Clear All
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                                <div className="flex flex-col gap-3">
                                    <label className="text-sm font-medium text-gray-700">Location</label>
                                    <Select
                                        value={locationFilter || "all"}
                                        onValueChange={(value) => handleFilterChange("location", value)}
                                    >
                                        <SelectTrigger className="bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500 w-full">
                                            <SelectValue placeholder="All Locations" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-lg shadow-lg">
                                            <SelectItem value="all" className="hover:bg-gray-50">
                                                All Locations
                                            </SelectItem>
                                            {locations.map((location) => (
                                                <SelectItem key={location} value={location} className="hover:bg-gray-50">
                                                    {location}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <label className="text-sm font-medium text-gray-700">Status</label>
                                    <Select value={statusFilter || "all"} onValueChange={(value) => handleFilterChange("status", value)}>
                                        <SelectTrigger className="bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500 w-full">
                                            <SelectValue placeholder="All Status" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-lg shadow-lg">
                                            <SelectItem value="all" className="hover:bg-gray-50">
                                                All Status
                                            </SelectItem>
                                            {statuses.map((status) => (
                                                <SelectItem key={status} value={status} className="hover:bg-gray-50">
                                                    {status}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <label className="text-sm font-medium text-gray-700">Property Type</label>
                                    <Select value={typeFilter || "all"} onValueChange={(value) => handleFilterChange("type", value)}>
                                        <SelectTrigger className="bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500 w-full">
                                            <SelectValue placeholder="All Types" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-lg shadow-lg">
                                            <SelectItem value="all" className="hover:bg-gray-50">
                                                All Types
                                            </SelectItem>
                                            {types.map((type) => (
                                                <SelectItem key={type} value={type} className="hover:bg-gray-50">
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <label className="text-sm font-medium text-gray-700">Investment Period</label>
                                    <Select
                                        value={investmentPeriodFilter || "all"}
                                        onValueChange={(value) => handleFilterChange("investmentPeriod", value)}
                                    >
                                        <SelectTrigger className="bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500 w-full">
                                            <SelectValue placeholder="All Periods" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-lg shadow-lg">
                                            <SelectItem value="all" className="hover:bg-gray-50">
                                                All Periods
                                            </SelectItem>
                                            {investmentPeriods.map((period) => (
                                                <SelectItem key={period} value={period} className="hover:bg-gray-50">
                                                    {period}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <label className="text-sm font-medium text-gray-700">Valuation</label>
                                    <Select
                                        value={valuationFilter || "all"}
                                        onValueChange={(value) => handleFilterChange("valuation", value)}
                                    >
                                        <SelectTrigger className="bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500 w-full">
                                            <SelectValue placeholder="All Valuations" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-lg shadow-lg">
                                            <SelectItem value="all" className="hover:bg-gray-50">
                                                All Valuations
                                            </SelectItem>
                                            {valuations.map((valuation) => (
                                                <SelectItem key={valuation} value={valuation} className="hover:bg-gray-50">
                                                    {valuation}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {(locationFilter || typeFilter || statusFilter || investmentPeriodFilter || valuationFilter) && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <p className="text-sm font-medium text-gray-700 mb-2">Active Filters:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {locationFilter && (
                                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                                                Location: {locationFilter}
                                                <button
                                                    onClick={() => handleFilterChange("location", "all")}
                                                    className="ml-1 hover:text-blue-900"
                                                >
                                                    ×
                                                </button>
                                            </Badge>
                                        )}
                                        {statusFilter && (
                                            <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                                                Status: {statusFilter}
                                                <button
                                                    onClick={() => handleFilterChange("status", "all")}
                                                    className="ml-1 hover:text-green-900"
                                                >
                                                    ×
                                                </button>
                                            </Badge>
                                        )}
                                        {typeFilter && (
                                            <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                                                Type: {typeFilter}
                                                <button
                                                    onClick={() => handleFilterChange("type", "all")}
                                                    className="ml-1 hover:text-purple-900"
                                                >
                                                    ×
                                                </button>
                                            </Badge>
                                        )}
                                        {investmentPeriodFilter && (
                                            <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                                                Period: {investmentPeriodFilter}
                                                <button
                                                    onClick={() => handleFilterChange("investmentPeriod", "all")}
                                                    className="ml-1 hover:text-orange-900"
                                                >
                                                    ×
                                                </button>
                                            </Badge>
                                        )}
                                        {valuationFilter && (
                                            <Badge variant="secondary" className="bg-pink-100 text-pink-800 hover:bg-pink-200">
                                                Valuation: {valuationFilter}
                                                <button
                                                    onClick={() => handleFilterChange("valuation", "all")}
                                                    className="ml-1 hover:text-pink-900"
                                                >
                                                    ×
                                                </button>
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                        <p className="text-lg text-gray-600">Loading properties...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                            <p className="text-lg text-red-800 mb-2">Failed to load properties</p>
                            <p className="text-sm text-red-600 mb-4">{error}</p>
                            <Button
                                onClick={() => window.location.reload()}
                                variant="outline"
                                className="border-red-300 text-red-700 hover:bg-red-50"
                            >
                                Try Again
                            </Button>
                        </div>
                    </div>
                )}

                {/* Content */}
                {!loading && !error && (
                    <>
                        <div className="flex items-center justify-between mb-8">
                            <p className="text-gray-600">
                                Showing {paginatedProperties.length} of {filteredProperties.length} properties
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                            {paginatedProperties.map((property) => (
                                <Card
                                    key={property.id}
                                    className="group overflow-hidden bg-white border border-gray-200 hover:shadow-xl hover:border-gray-300 hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer p-0"
                                >
                                    <div className="relative overflow-hidden">
                                        <Image
                                            src={property.image_url || "/placeholder.svg"}
                                            alt={property.name}
                                            width={400}
                                            height={180}
                                            className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                                        />

                                        {property.rera && (
                                            <Badge className="absolute top-2 left-2 bg-white text-green-600 hover:bg-green-500 hover:text-white text-xs font-medium transition-all duration-200">
                                                <Check className="h-3 w-3 mr-1" />
                                                RERA
                                            </Badge>
                                        )}
                                    </div>

                                    <CardContent className="pb-4">
                                        <h3 className="font-semibold text-sm text-gray-900 mb-3 line-clamp-1 group-hover:text-[#00c4b6] transition-colors duration-200">
                                            {property.name}
                                        </h3>

                                        <div className="flex items-center justify-between text-xs text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-200">
                                            <div className="flex items-center">
                                                <MapPin className="h-3 w-3 mr-1 text-gray-400 group-hover:text-[#00c4b6] transition-colors duration-200" />
                                                <span className="truncate">{property.location}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="h-3 w-3 mr-1 text-gray-400 group-hover:text-[#00c4b6] transition-colors duration-200" />
                                                <span className="text-xs">{property.status}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Building className="h-3 w-3 mr-1 text-gray-400 group-hover:text-[#00c4b6] transition-colors duration-200" />
                                                <span className="text-xs">{property.type}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            <div className="group-hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                                                <p className="text-xs text-gray-500">Price / Sq ft</p>
                                                <p className="font-semibold text-gray-900">₹{property.price_per_sqft.toLocaleString()}</p>
                                            </div>
                                            <div className="group-hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                                                <p className="text-xs text-gray-500">Min. Investment</p>
                                                <p className="font-semibold text-gray-900">₹{property.min_investment}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            <div className="group-hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                                                <p className="text-xs text-gray-500">Investment Period</p>
                                                <p className="text-sm font-medium text-gray-700">{property.investment_period}</p>
                                            </div>
                                            <div className="group-hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                                                <p className="text-xs text-gray-500">Returns</p>
                                                <p className="text-sm font-medium text-gray-700">{property.xirr}</p>
                                            </div>
                                        </div>

                                        <Badge
                                            variant="secondary"
                                            className={`w-full justify-center py-1 text-xs font-medium transition-all duration-200 group-hover:scale-105 ${property.valuation === "Fairly Valued"
                                                ? "bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200"
                                                : property.valuation === "Overvalued"
                                                    ? "bg-red-100 text-red-800 group-hover:bg-red-200"
                                                    : "bg-green-100 text-green-800 group-hover:bg-green-200"
                                                }`}
                                        >
                                            {property.valuation}
                                            <span className="ml-2">
                                                {property.valuation === "Overvalued" &&
                                                    "🤙"
                                                }
                                                {property.valuation === "Fairly Valued" &&
                                                    "👌"
                                                }
                                                {property.valuation === "Undervalued" &&
                                                    "🔥"
                                                }
                                            </span>
                                        </Badge>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="flex items-center justify-center mt-16">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (currentPage > 1) setCurrentPage(currentPage - 1);
                                            }}
                                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>

                                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                        let pageNumber;
                                        if (totalPages <= 5) {
                                            pageNumber = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNumber = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNumber = totalPages - 4 + i;
                                        } else {
                                            pageNumber = currentPage - 2 + i;
                                        }

                                        return (
                                            <PaginationItem key={pageNumber}>
                                                <PaginationLink
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setCurrentPage(pageNumber);
                                                    }}
                                                    isActive={currentPage === pageNumber}
                                                >
                                                    {pageNumber}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    })}

                                    {totalPages > 5 && currentPage < totalPages - 2 && (
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    )}

                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                                            }}
                                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
