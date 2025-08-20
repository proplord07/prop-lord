"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ThankYouPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <main className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    {/* Back to Home button */}
                    <div className="flex justify-center mb-8">
                        <Link href="/">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Home
                            </Button>
                        </Link>
                    </div>

                    {/* Success Icon */}
                    <div className={`mb-8 transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
                        <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#00c4b6' }}>
                            <CheckCircle className="w-16 h-16 text-black" />
                        </div>
                    </div>

                    {/* Thank You Message */}
                    <div className={`mb-12 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                            Thank You for <span style={{ color: '#00c4b6' }}>Contacting Us!</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            We've received your inquiry and our team will get back to you within 24 hours.
                            We're excited to help you find your perfect property!
                        </p>
                    </div>

                    {/* What Happens Next */}
                    <div className={`mb-12 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next?</h2>
                        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                            <div className="text-center p-6 bg-white rounded-lg shadow-md">
                                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00c4b6' }}>
                                    <span className="text-2xl font-bold" >1</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Review Your Request</h3>
                                <p className="text-sm text-gray-600">Our experts will review your requirements and preferences</p>
                            </div>
                            <div className="text-center p-6 bg-white rounded-lg shadow-md">
                                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00c4b6' }}>
                                    <span className="text-2xl font-bold" >2</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Personalized Response</h3>
                                <p className="text-sm text-gray-600">We'll contact you with tailored property recommendations</p>
                            </div>
                            <div className="text-center p-6 bg-white rounded-lg shadow-md">
                                <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00c4b6' }}>
                                    <span className="text-2xl font-bold" >3</span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">Property Viewing</h3>
                                <p className="text-sm text-gray-600">Schedule visits to properties that match your criteria</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className={`mb-12 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Need Immediate Assistance?</h2>
                        <p className="text-gray-600 mb-4">
                            If you need urgent help, feel free to reach out to us directly:
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">📧</span>
                                <span className="text-sm text-gray-900">info@proplord.com</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">📞</span>
                                <span className="text-sm text-gray-900">+91 7019402240</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-900 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                        <Link href="/">
                            <Button className="px-8 py-3 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#00c4b6' }}>
                                <Home className="w-4 h-4 mr-2" />
                                Back to Homepage
                            </Button>
                        </Link>
                        <Link href="/listings">
                            <Button variant="outline" className="px-8 py-3 font-medium rounded-lg transition-all duration-300 hover:scale-105 border-gray-300 hover:border-gray-400">
                                Browse Properties
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
