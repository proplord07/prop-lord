import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";

export function Footer() {
    const services = [
        "Corporate Real Estate",
        "Residential Real Estate",
        "Warehousing & Logistics",
        "Land & Industrial",
        "Hospitality",
        "Retail Real Estate",
    ];

    const quickLinks = ["About Us", "Careers", "Blog", "Contact Us", "Privacy Policy", "Terms of Service"];

    const locations = [
        "Office Space in Bangalore",
        "Office Space in Hyderabad",
        "Office Space in Pune",
        "Warehousing in Chennai",
        "Warehousing in Mumbai",
        "Premium Homes",
    ];

    return (
        <footer className="relative bg-[#c1fffb] text-gray-800 overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-2 group">
                                <div className="relative">
                                    <Image src="/logo/prop-lord.jpeg" width={36} height={36} alt="prop-lord-logo" className="rounded-md" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold bg-black bg-clip-text text-transparent">
                                    PROPLORD
                                </h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                Your trusted partner in finding the perfect property. Premium real estate consulting services across
                                India with unmatched expertise and personalized approach.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 group p-2 rounded-lg transition-all duration-300">
                                    <MapPin className="h-4 w-4 text-green-600 transition-colors duration-300" />
                                    <span className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors duration-300">
                                        Bangalore, India
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3 group p-2 rounded-lg transition-all duration-300 cursor-pointer">
                                    <Phone className="h-4 w-4  text-green-600 transition-colors duration-300" />
                                    <span className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors duration-300">
                                        +91 7019402240
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3 group p-2 rounded-lg transition-all duration-300 cursor-pointer">
                                    <Mail className="h-4 w-4 text-green-600 transition-colors duration-300" />
                                    <span className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors duration-300">
                                        info@proplord.com
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Services */}
                        <div className="mt-2 flex flex-col gap-6">
                            <h4 className="text-lg font-semibold relative text-gray-800 ml-5">
                                Services
                            </h4>
                            <ul className="flex flex-col gap-4">
                                {services.map((service) => (
                                    <li key={service} className="group/item">
                                        <a
                                            href="#"
                                            className="flex items-center text-gray-600 hover:text-gray-800 transition-all duration-300 hover:translate-x-2"
                                        >
                                            <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover/item:opacity-100 transition-all duration-300 text-red-500" />
                                            <span className="group-hover/item:bg-gradient-to-r text-sm group-hover/item:from-green-600 group-hover/item:to-red-500 group-hover/item:bg-clip-text group-hover/item:text-transparent transition-all duration-300">
                                                {service}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div className="flex flex-col gap-6 mt-2">
                            <h4 className="text-lg font-semibold text-gray-800 ml-5">Company</h4>
                            <ul className="flex flex-col gap-4 text-sm">
                                {quickLinks.map((link) => (
                                    <li key={link} className="group/item">
                                        <a
                                            href="#"
                                            className="flex items-center text-gray-600 hover:text-gray-800 transition-all duration-300 hover:translate-x-2"
                                        >
                                            <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover/item:opacity-100 transition-all duration-300 text-red-500" />
                                            <span className="group-hover/item:bg-gradient-to-r group-hover/item:from-green-600 group-hover/item:to-red-500 group-hover/item:bg-clip-text group-hover/item:text-transparent transition-all duration-300">
                                                {link}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Locations */}
                        <div className="flex flex-col gap-6 mt-2">
                            <h4 className="text-lg font-semibold text-gray-800 ml-5">Popular Searches</h4>
                            <ul className="flex flex-col gap-4 text-sm">
                                {locations.map((location) => (
                                    <li key={location} className="group/item">
                                        <a
                                            href="#"
                                            className="flex items-center text-gray-600 hover:text-gray-800 transition-all duration-300 hover:translate-x-2"
                                        >
                                            <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover/item:opacity-100 transition-all duration-300 text-red-500" />
                                            <span className="group-hover/item:bg-gradient-to-r group-hover/item:from-green-600 group-hover/item:to-red-500 group-hover/item:bg-clip-text group-hover/item:text-transparent transition-all duration-300">
                                                {location}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-green-200 py-8">
                    <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
                        <p className="text-gray-500 text-sm">© 2024 Prop Lord. All rights reserved.</p>

                        <div className="flex flex-wrap justify-center lg:justify-end space-x-6">
                            <a href="#" className="text-gray-500 hover:text-green-600 transition-colors duration-200 text-sm">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-500 hover:text-green-600 transition-colors duration-200 text-sm">
                                Terms of Service
                            </a>
                            <a href="#" className="text-gray-500 hover:text-green-600 transition-colors duration-200 text-sm">
                                Cookie Policy
                            </a>
                            <a href="#" className="text-gray-500 hover:text-green-600 transition-colors duration-200 text-sm">
                                Sitemap
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
