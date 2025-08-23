"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Send } from "lucide-react";
import Image from "next/image";

export default function WhatsAppFloat() {
    const [isOpen, setIsOpen] = useState(false);

    const handleStartChat = () => {
        // WhatsApp API URL - you can customize the phone number and message
        const phoneNumber = "+917019402240";
        const message = "Hi! I'm interested in your property services. Can you help me?";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');
        setIsOpen(false);
    };

    const togglePopover = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Floating WhatsApp Icon */}
            <div className="fixed bottom-6 right-6 z-50 md:block hidden">
                <button
                    onClick={togglePopover}
                    className="w-16 h-16 bg-green-500 cursor-pointer hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 animate-float"
                >
                    {isOpen ? (
                        <X className="w-8 h-8 text-white group-hover:rotate-90 transition-transform duration-300" />
                    ) : (
                        <svg
                            className="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                        </svg>
                    )}
                </button>

                {/* Chat Popover - Positioned above the icon */}
                {isOpen && (
                    <div className="absolute bottom-24 right-0 w-80 animate-fade-in-up">
                        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                            {/* Header - Green WhatsApp Style */}
                            <div className="bg-green-500 p-4 flex items-center justify-between relative">
                                {/* WhatsApp Background Pattern */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="w-full h-full bg-[url('/whatsapp.jpeg')] bg-cover bg-center"></div>
                                </div>

                                <div className="flex items-center gap-3 relative z-10">
                                    {/* Profile Picture */}
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                                            <span className="text-blue-600 font-bold text-lg">A</span>
                                        </div>
                                        <div className="absolute -bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                                    </div>

                                    {/* Name and Role */}
                                    <div className="text-white">
                                        <h3 className="font-semibold text-lg">Apoorv Bhat</h3>
                                        <p className="text-sm opacity-90">Real Estate Consultant</p>
                                    </div>
                                </div>

                                {/* Close Button */}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white hover:text-gray-200 transition-colors relative z-10"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Message Area - WhatsApp Chat Style */}
                            <div className="relative overflow-hidden min-h-[200px]">
                                {/* WhatsApp Background Image */}
                                <div className="absolute inset-0 opacity-20">
                                    <Image
                                        src="/whatsapp.jpeg"
                                        alt="WhatsApp Background"
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Chat Content */}
                                <div className="relative z-10 p-4">
                                    {/* Message Bubble - Left Side (Agent) */}
                                    <div className="flex justify-start mb-4">
                                        <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 max-w-[80%] shadow-sm border border-gray-100">
                                            <p className="text-gray-800 text-sm leading-relaxed">
                                                👋 Hey! I'm Apoorv, your real estate consultant. How can I help you find your dream property today?
                                            </p>
                                        </div>
                                    </div>

                                    {/* Message Bubble - Left Side (Agent) */}
                                    <div className="flex justify-start mb-4">
                                        <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 max-w-[80%] shadow-sm border border-gray-100">
                                            <p className="text-gray-800 text-sm leading-relaxed">
                                                I'll respond within 5 minutes to assist you with:
                                            </p>
                                            <ul className="text-gray-700 text-xs mt-2 space-y-1">
                                                <li>• Property search & recommendations</li>
                                                <li>• Investment opportunities</li>
                                                <li>• Market insights & pricing</li>
                                                <li>• Viewing arrangements</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Time Stamp */}
                                    <div className="flex justify-start mb-6">
                                        <span className="text-xs text-gray-500 bg-white/80 px-2 py-1 rounded-full">
                                            2 minutes ago
                                        </span>
                                    </div>

                                    {/* Start Chat Button */}
                                    <div className="flex justify-center">
                                        <Button
                                            onClick={handleStartChat}
                                            className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full font-medium flex items-center justify-center gap-3 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                                        >
                                            <Send className="w-4 h-4" />
                                            START CHAT ON WHATSAPP
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile WhatsApp Icon - Bottom Center */}
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 md:hidden block">
                <button
                    onClick={togglePopover}
                    className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 animate-float"
                >
                    {isOpen ? (
                        <X className="w-8 h-8 text-white group-hover:rotate-90 transition-transform duration-300" />
                    ) : (
                        <svg
                            className="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                        </svg>
                    )}
                </button>

                {/* Chat Popover - Positioned above the icon for mobile */}
                {isOpen && (
                    <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-80 animate-fade-in-up">
                        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                            {/* Header - Green WhatsApp Style */}
                            <div className="bg-green-500 p-4 flex items-center justify-between relative">
                                {/* WhatsApp Background Pattern */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="w-full h-full bg-[url('/whatsapp.jpeg')] bg-cover bg-center"></div>
                                </div>

                                <div className="flex items-center gap-3 relative z-10">
                                    {/* Profile Picture */}
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                                            <span className="text-blue-600 font-bold text-lg">A</span>
                                        </div>
                                        <div className="absolute lg:-bottom-1 lg:-left-1 left-[30px] w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                                    </div>

                                    {/* Name and Role */}
                                    <div className="text-white">
                                        <h3 className="font-semibold text-lg">Apoorv Bhat</h3>
                                        <p className="text-sm opacity-90">Real Estate Consultant</p>
                                    </div>
                                </div>

                                {/* Close Button */}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white hover:text-gray-200 transition-colors relative z-10"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Message Area - WhatsApp Chat Style */}
                            <div className="relative overflow-hidden min-h-[200px]">
                                {/* WhatsApp Background Image */}
                                <div className="absolute inset-0 opacity-20">
                                    <Image
                                        src="/whatsapp.jpeg"
                                        alt="WhatsApp Background"
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Chat Content */}
                                <div className="relative z-10 p-4">
                                    {/* Message Bubble - Left Side (Agent) */}
                                    <div className="flex justify-start mb-4">
                                        <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 max-w-[80%] shadow-sm border border-gray-100">
                                            <p className="text-gray-800 text-sm leading-relaxed">
                                                👋 Hey! I'm Apoorv, your real estate consultant. How can I help you find your dream property today?
                                            </p>
                                        </div>
                                    </div>

                                    {/* Message Bubble - Left Side (Agent) */}
                                    <div className="flex justify-start mb-4">
                                        <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 max-w-[80%] shadow-sm border border-gray-100">
                                            <p className="text-gray-800 text-sm leading-relaxed">
                                                I'll respond within 5 minutes to assist you with:
                                            </p>
                                            <ul className="text-gray-700 text-xs mt-2 space-y-1">
                                                <li>• Property search & recommendations</li>
                                                <li>• Investment opportunities</li>
                                                <li>• Market insights & pricing</li>
                                                <li>• Viewing arrangements</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Time Stamp */}
                                    <div className="flex justify-start mb-6">
                                        <span className="text-xs text-gray-500 bg-white/80 px-2 py-1 rounded-full">
                                            2 minutes ago
                                        </span>
                                    </div>

                                    {/* Start Chat Button */}
                                    <div className="flex justify-center">
                                        <Button
                                            onClick={handleStartChat}
                                            className="bg-green-500 cursor-pointer hover:bg-green-600 text-white py-3 px-6 rounded-full font-medium flex items-center justify-center gap-3 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                                        >
                                            <Send className="w-4 h-4" />
                                            START CHAT ON WHATSAPP
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
} 