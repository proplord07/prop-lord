"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "SERVICES", href: "#services", hasDropdown: true },
        { name: "EXPLORE LISTING", href: "/listings" },
        { name: "BLOG", href: "#blog" },
        { name: "CONTACT US", href: "#contact" },
    ];

    const servicesItems = [
        { name: "Residential Real Estate", href: "/residential" },
        { name: "Land and Industrial", href: "/land-industrial" },
        { name: "Corporate Real Estate", href: "/corporate" },
        { name: "Warehousing & Logistics", href: "/warehousing" },
        { name: "Hospitality", href: "/hospitality" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href={"/"} >
                        <div className="flex-shrink-0 flex gap-3 items-center">
                            <Image src="/logo/prop-lord.jpeg" width={36} height={36} alt="prop-lord-logo" className="rounded-md" />
                            <h1 className={`text-2xl font-serif cursor-pointer hover:text-green-600 font-bold ${isScrolled ? "text-gray-950" : "text-white"}`}>
                                PROPLORD
                            </h1>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navItems.map((item) =>
                                item.hasDropdown ? (
                                    <div
                                        key={item.name}
                                        className="relative"
                                        onMouseEnter={() => setIsServicesOpen(true)}
                                        onMouseLeave={() => setIsServicesOpen(false)}
                                    >
                                        <button
                                            className={`hover:text-green-600 tracking-widest px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${isScrolled ? "text-gray-800" : "text-white"}`}
                                        >
                                            {item.name}
                                            <ChevronDown
                                                className={`h-4 w-4 transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`}
                                            />
                                        </button>

                                        {/* Dropdown Menu */}
                                        <div
                                            className={`absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 transition-all duration-300 transform ${isServicesOpen
                                                ? "opacity-100 visible translate-y-0 scale-100"
                                                : "opacity-0 invisible -translate-y-4 scale-95"
                                                }`}
                                        >
                                            <div className="py-3">
                                                {servicesItems.map((service, index) => (
                                                    <a
                                                        key={service.name}
                                                        href={service.href}
                                                        className="block px-6 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-200 border-b border-gray-50 last:border-b-0 hover:pl-8 transform"
                                                        style={{
                                                            animationDelay: `${index * 50}ms`,
                                                            animation: isServicesOpen ? "slideInLeft 0.3s ease-out forwards" : "none",
                                                        }}
                                                    >
                                                        {service.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={`hover:text-green-600 tracking-widest px-3 py-2 text-sm font-medium transition-colors duration-200 ${isScrolled ? "text-gray-800" : "text-white"}`}
                                    >
                                        {item.name}
                                    </a>
                                ),
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={isScrolled ? "text-gray-800" : "text-white"}
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg">
                            {navItems.map((item) =>
                                item.hasDropdown ? (
                                    <div key={item.name}>
                                        <button
                                            className="text-gray-700 hover:text-green-600 px-3 py-2 text-base font-medium w-full text-left flex items-center justify-between"
                                            onClick={() => setIsServicesOpen(!isServicesOpen)}
                                        >
                                            {item.name}
                                            <ChevronDown
                                                className={`h-4 w-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
                                            />
                                        </button>
                                        {isServicesOpen && (
                                            <div className="pl-4 space-y-1">
                                                {servicesItems.map((service) => (
                                                    <a
                                                        key={service.name}
                                                        href={service.href}
                                                        className="text-gray-600 hover:text-green-600 block px-3 py-2 text-sm"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {service.name}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="text-gray-700 hover:text-green-600 block px-3 py-2 text-base font-medium"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </a>
                                ),
                            )}
                        </div>
                    </div>
                )}
            </div>
            <style jsx>{`
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </nav>
    );
}
