"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, LogOut, Building, FileText, ArrowLeft } from "lucide-react";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/lib/auth-context";

export default function AdminDashboard() {
    const { user, signOut } = useAuth();

    const handleLogout = async () => {
        await signOut();
    };

    return (
        <ProtectedRoute>
            <main className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center mb-12">
                        <div className="flex justify-between items-center mb-6">
                            <Link href="/">
                                <Button variant="outline" size="sm">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Home
                                </Button>
                            </Link>
                            <div className="flex items-center space-x-4">
                                {/* <span className="text-sm text-gray-600">
                                    Welcome, {user?.email}
                                </span> */}
                                <Button
                                    onClick={handleLogout}
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center space-x-2 text-red-600 border-red-300 hover:bg-red-50"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </Button>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 relative">
                            Admin Dashboard
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Manage your property listings and content
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {/* Create Blog Post */}
                        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white">
                            <CardHeader className="text-center pb-4">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Plus className="w-8 h-8 text-green-600" />
                                </div>
                                <CardTitle className="text-2xl font-bold text-gray-900">Create Blog Post</CardTitle>
                                <CardDescription className="text-gray-600">
                                    Write and publish new blog content
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                                <Link href="/admin/create-blog">
                                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg">
                                        <Plus className="w-5 h-5 mr-2" />
                                        Create New Post
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Create Property Listing */}
                        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white">
                            <CardHeader className="text-center pb-4">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Building className="w-8 h-8 text-blue-600" />
                                </div>
                                <CardTitle className="text-2xl font-bold text-gray-900">Create Property Listing</CardTitle>
                                <CardDescription className="text-gray-600">
                                    Add new properties to your portfolio
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                                <Link href="/admin/create-property">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg">
                                        <Building className="w-5 h-5 mr-2" />
                                        Add New Property
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Manage Properties */}
                        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white">
                            <CardHeader className="text-center pb-4">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Building className="w-8 h-8 text-purple-600" />
                                </div>
                                <CardTitle className="text-2xl font-bold text-gray-900">Manage Properties</CardTitle>
                                <CardDescription className="text-gray-600">
                                    Edit, delete, and manage existing properties
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                                <Link href="/admin/manage-properties">
                                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg">
                                        <Building className="w-5 h-5 mr-2" />
                                        Manage Properties
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Manage Blogs */}
                        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-0 bg-white">
                            <CardHeader className="text-center pb-4">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FileText className="w-8 h-8 text-green-600" />
                                </div>
                                <CardTitle className="text-2xl font-bold text-gray-900">Manage Blogs</CardTitle>
                                <CardDescription className="text-gray-600">
                                    Edit, delete, and manage existing blog posts
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                                <Link href="/admin/manage-blogs">
                                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg">
                                        <FileText className="w-5 h-5 mr-2" />
                                        Manage Blogs
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </ProtectedRoute>
    );
}
