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
    Building,
    MapPin,
    Calendar,
    Loader2,
    Plus,
    ArrowLeft
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Property, PropertyService } from "@/lib/property-service";
import { ProtectedRoute } from "@/components/protected-route";
import { toast } from "sonner";

export default function ManagePropertiesPage() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState<{ id: number; name: string; } | null>(null);

    // Fetch properties on component mount
    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            setLoading(true);
            // Get current user's properties only
            const fetchedProperties = await PropertyService.getUserProperties();
            setProperties(fetchedProperties);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch properties');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (propertyId: number, propertyName: string) => {
        setPropertyToDelete({ id: propertyId, name: propertyName });
        setDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        if (!propertyToDelete) return;

        try {
            setDeleteLoading(propertyToDelete.id);
            await PropertyService.deleteProperty(propertyToDelete.id);

            // Remove the property from the local state
            setProperties(prev => prev.filter(p => p.id !== propertyToDelete.id));

            toast.success("Property deleted successfully");
            setDeleteDialogOpen(false);
            setPropertyToDelete(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete property';
            toast.error("Failed to delete property");
            console.error('Delete error:', errorMessage);
        } finally {
            setDeleteLoading(null);
        }
    };

    // Filter properties based on search term
    const filteredProperties = properties.filter(property =>
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Ready to Move':
                return 'bg-green-100 text-green-800';
            case 'Under Construction':
                return 'bg-yellow-100 text-yellow-800';
            case 'Launching Soon':
                return 'bg-blue-100 text-blue-800';
            case 'Pre Launch':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
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
                                Manage Properties
                            </h1>
                            <p className="text-gray-600 text-lg">
                                View, edit, and manage your property listings
                            </p>
                        </div>
                        <Link href="/admin/create-property">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                <Plus className="w-4 h-4 mr-2" />
                                Add New Property
                            </Button>
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-8">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search properties..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                    </div>

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
                                    onClick={fetchProperties}
                                    variant="outline"
                                    className="border-red-300 text-red-700 hover:bg-red-50"
                                >
                                    Try Again
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Properties List */}
                    {!loading && !error && (
                        <div className="space-y-4">
                            {filteredProperties.length === 0 ? (
                                <div className="text-center py-20">
                                    <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {searchTerm ? 'No properties found' : 'No properties yet'}
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        {searchTerm
                                            ? 'Try adjusting your search terms'
                                            : 'Get started by creating your first property listing'
                                        }
                                    </p>
                                    {!searchTerm && (
                                        <Link href="/admin/create-property">
                                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                                <Plus className="w-4 h-4 mr-2" />
                                                Create Property Listing
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-gray-600">
                                            Showing {filteredProperties.length} of {properties.length} properties
                                        </p>
                                    </div>

                                    <div className="grid gap-6">
                                        {filteredProperties.map((property) => (
                                            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                                <div className="flex flex-col lg:flex-row">
                                                    {/* Property Image */}
                                                    <div className="lg:w-1/3">
                                                        <div className="relative h-48 lg:h-full">
                                                            <Image
                                                                src={property.image_url || "/placeholder.svg"}
                                                                alt={property.name}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                            <div className="absolute top-3 left-3">
                                                                <Badge className={getStatusColor(property.status)}>
                                                                    {property.status}
                                                                </Badge>
                                                            </div>
                                                            {property.featured && (
                                                                <div className="absolute top-3 right-3">
                                                                    <Badge className="bg-orange-100 text-orange-800">
                                                                        Featured
                                                                    </Badge>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Property Details */}
                                                    <div className="lg:w-2/3 p-6">
                                                        <div className="flex flex-col h-full">
                                                            <div className="flex-1">
                                                                <div className="flex items-start justify-between mb-3">
                                                                    <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                                                                        {property.name}
                                                                    </h3>
                                                                    <div className="flex items-center space-x-2 ml-4">
                                                                        <Button
                                                                            size="sm"
                                                                            variant="outline"
                                                                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                                                            onClick={() => window.open(`/listings`, '_blank')}
                                                                        >
                                                                            <Eye className="w-4 h-4 mr-1" />
                                                                            View
                                                                        </Button>
                                                                        <Link href={`/admin/edit-property/${property.id}`}>
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
                                                                            onClick={() => handleDeleteClick(property.id, property.name)}
                                                                            disabled={deleteLoading === property.id}
                                                                            className="text-red-600 border-red-200 hover:bg-red-50"
                                                                        >
                                                                            {deleteLoading === property.id ? (
                                                                                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                                                                            ) : (
                                                                                <Trash2 className="w-4 h-4 mr-1" />
                                                                            )}
                                                                            Delete
                                                                        </Button>
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-center text-gray-600 mb-3">
                                                                    <MapPin className="w-4 h-4 mr-1" />
                                                                    <span className="text-sm">{property.location}</span>
                                                                    <span className="mx-2">•</span>
                                                                    <Building className="w-4 h-4 mr-1" />
                                                                    <span className="text-sm">{property.type}</span>
                                                                    <span className="mx-2">•</span>
                                                                    <Calendar className="w-4 h-4 mr-1" />
                                                                    <span className="text-sm">
                                                                        {new Date(property.created_at).toLocaleDateString()}
                                                                    </span>
                                                                </div>

                                                                {property.description && (
                                                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                                        {property.description}
                                                                    </p>
                                                                )}

                                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                                    <div>
                                                                        <p className="text-xs text-gray-500">Price / Sq ft</p>
                                                                        <p className="font-semibold text-gray-900">
                                                                            ₹{property.price_per_sqft.toLocaleString()}
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs text-gray-500">Min. Investment</p>
                                                                        <p className="font-semibold text-gray-900">
                                                                            ₹{property.min_investment}
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs text-gray-500">Area</p>
                                                                        <p className="font-semibold text-gray-900">
                                                                            {property.total_area_sqft ? `${property.total_area_sqft} sq ft` : 'N/A'}
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs text-gray-500">Developer</p>
                                                                        <p className="font-semibold text-gray-900">
                                                                            {property.developer || 'N/A'}
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
                                <DialogTitle>Delete Property</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete "{propertyToDelete?.name}"? This action cannot be undone.
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
