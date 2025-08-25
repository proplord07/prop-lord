"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { Building2, Search, Phone, Mail, User, MessageSquare } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function HospitalityPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const sectionRef2 = useRef<HTMLElement>(null);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target === sectionRef.current) {
                            setIsVisible(true);
                        } else if (entry.target === sectionRef2.current) {
                            setIsVisible2(true);
                        }
                    }
                });
            },
            { threshold: 0.1 },
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        if (sectionRef2.current) observer.observe(sectionRef2.current);

        return () => observer.disconnect();
    }, []);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[+]?[\d\s\-$$$$]{10,}$/.test(formData.phone.replace(/\s/g, ""))) {
            newErrors.phone = "Please enter a valid phone number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate form processing
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Create WhatsApp message
        const message = `Hello! I'm interested in your hospitality services.

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
${formData.message ? `Message: ${formData.message}` : ""}

Please get in touch with me. Thank you!`;

        const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");

        // Reset form
        setFormData({ name: "", email: "", phone: "", message: "" });
        setIsSubmitting(false);
    };

    const services = [
        {
            title: "Acquisition & Disposition for FUNDS & HNI's",
            description:
                "At PROPLORD, we approach hospitality assets as both lifestyle-driven destinations and strategic investments. For funds, HNIs, and institutional investors, we identify and evaluate hotel and resort opportunities based on brand positioning, market potential, operational performance, and projected returns. For owners and sellers, we structure dispositions to attract qualified buyers, optimise pricing, and ensure smooth transitions. Our process includes comprehensive market analysis, asset valuation, and transaction management — reducing risk while maximising long-term value. Whether acquiring a landmark property or divesting an underperforming asset, PROPLORD ensures every deal is driven by rigorous insight and absolute transparency.",
            icon: Building2,
        },
        {
            title: "Operator Search",
            description:
                "Securing the right hospitality operator is pivotal to asset performance. At PROPLORD, we connect property owners, developers, and investors with hotel operators whose operational vision aligns with brand aspirations and market positioning. We assess operator capabilities, portfolio strengths, and financial stability to ensure the right fit for both new developments and existing hotels. Our advisory encompasses lease structuring, management contracts, franchise and license agreements, as well as negotiations that protect owner interests while enabling operator success. The result — hospitality assets run with operational excellence, delivering guest satisfaction, brand equity, and sustainable returns.",
            icon: Search,
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/hospitality.jpg"
                        alt="Luxury hospitality resort"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 animate-fade-in-up">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-sans">HOSPITALITY</h1>
                        <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed font-sans animate-fade-in-up animation-delay-200">
                        At PROPLORD, we understand that hospitality is driven by both strategic vision and exceptional service. With exclusive access to prime properties and deep knowledge of Bangalore’s most sought-after locales, our hospitality advisory team expertly navigates the sector’s unique dynamics. We provide comprehensive strategic guidance to hoteliers, investors, and entrepreneurs—helping them identify lucrative opportunities, optimize operations, and unlock new avenues for growth. Whether you aim to acquire, expand, reposition, or diversify your hospitality portfolio, PROPLORD combines market intelligence, innovative insight, and negotiation expertise to ensure every venture is future-ready and profitable. As your trusted realty mastermind, we turn hospitality ambitions into thriving, enduring assets that deliver memorable guest experiences and long-term value.
                        </p>
                        <div className="animate-bounce mt-8">
                            <div className="w-6 h-6 border-2 border-white rounded-full mx-auto opacity-75"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section ref={sectionRef} className="py-20 bg-gradient-to-br from-red-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-sans">
                            Our Hospitality Real Estate Services
                        </h2>
                        <div className="w-24 h-1 bg-[#00c4b6] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                        <div className={`space-y-8 transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
                            {services.map((service) => {
                                const IconComponent = service.icon;
                                return (
                                    <CardContainer key={service.title} className="inter-var" containerClassName="p-0">
                                        <CardBody className="bg-white relative group/card hover:shadow-2xl hover:shadow-green-500/[0.1] border-gray-200 w-full h-auto rounded-xl p-8 border hover:border-green-200 transition-all duration-300">
                                            <CardItem translateZ="50" className="text-xl font-bold text-gray-800 mb-4">
                                                <div className="flex items-start gap-4">
                                                    <div className="p-3 bg-green-100 rounded-lg group-hover/card:bg-green-200 transition-colors duration-300 flex-shrink-0">
                                                        <IconComponent className="w-6 h-6 text-[#00c4b6]" />
                                                    </div>
                                                    <div>
                                                        <div className="w-6 h-1 bg-green-600 mb-3 rounded-full"></div>
                                                        <span className="font-sans leading-tight">{service.title}</span>
                                                    </div>
                                                </div>
                                            </CardItem>
                                            <CardItem
                                                as="p"
                                                translateZ="60"
                                                className="text-gray-600 text-sm leading-relaxed font-sans ml-16"
                                            >
                                                {service.description}
                                            </CardItem>
                                            <CardItem translateZ="50" className="w-full mt-6">
                                                <div className="h-1 bg-gradient-to-r from-[#51fcf0] to-[#00c4b6] rounded-full transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500 origin-left ml-16"></div>
                                            </CardItem>
                                        </CardBody>
                                    </CardContainer>
                                );
                            })}
                        </div>

                        {/* Contact Form */}
                        <div
                            className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up animation-delay-300" : "opacity-0"}`}
                        >
                            <CardContainer className="inter-var" containerClassName="p-0">
                                <CardBody className="bg-gradient-to-br from-green-50 to-white relative group/card hover:shadow-2xl hover:shadow-green-500/[0.1] border-green-200  h-auto rounded-xl p-8 border transition-all duration-300 w-[400px]">
                                    <CardItem translateZ="50" className="text-2xl font-bold text-gray-800 mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-green-100 rounded-lg group-hover/card:bg-green-200 transition-colors duration-300">
                                                <MessageSquare className="w-6 h-6 text-[#00c4b6]" />
                                            </div>
                                            <span className="font-sans">Get In Touch</span>
                                        </div>
                                    </CardItem>

                                    <form onSubmit={handleSubmit} className="space-y-6 w-full">
                                        <CardItem translateZ="60" className="w-full">
                                            <div className="space-y-2">
                                                <label className="text-xs font-medium text-gray-700 flex items-center gap-2">
                                                    <User className="w-4 h-4 text-[#00c4b6]" />
                                                    NAME
                                                </label>
                                                <Input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                                    className={`transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.name ? "border-red-500" : "border-gray-300"} w-full placeholder:text-xs`}
                                                    placeholder="Enter your full name"
                                                />
                                                {errors.name && <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.name}</p>}
                                            </div>
                                        </CardItem>

                                        <CardItem translateZ="60" className="w-full">
                                            <div className="space-y-2">
                                                <label className="text-xs font-medium text-gray-700 flex items-center gap-2">
                                                    <Mail className="w-4 h-4 text-[#00c4b6]" />
                                                    EMAIL
                                                </label>
                                                <Input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                                    className={`transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.email ? "border-red-500" : "border-gray-300"} placeholder:text-xs`}
                                                    placeholder="Enter your email address"
                                                />
                                                {errors.email && <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.email}</p>}
                                            </div>
                                        </CardItem>

                                        <CardItem translateZ="60" className="w-full">
                                            <div className="space-y-2">
                                                <label className="text-xs font-medium text-gray-700 flex items-center gap-2">
                                                    <Phone className="w-4 h-4 text-[#00c4b6]" />
                                                    PHONE NO
                                                </label>
                                                <Input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                                    className={`transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.phone ? "border-red-500" : "border-gray-300"} placeholder:text-xs`}
                                                    placeholder="Enter your phone number"
                                                />
                                                {errors.phone && <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.phone}</p>}
                                            </div>
                                        </CardItem>

                                        <CardItem translateZ="60" className="w-full">
                                            <div className="space-y-2">
                                                <label className="text-xs font-medium text-gray-700">HOW CAN WE HELP YOU? (Optional)</label>
                                                <Textarea
                                                    value={formData.message}
                                                    onChange={(e) => handleInputChange("message", e.target.value)}
                                                    className="transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 border-gray-300 min-h-[100px] placeholder:text-xs"
                                                    placeholder="Tell us about your hospitality needs..."
                                                />
                                            </div>
                                        </CardItem>

                                        <CardItem translateZ="80">
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-[#00c4b6] hover:bg-[#00c4b6] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                            >
                                                {isSubmitting ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        Submitting...
                                                    </div>
                                                ) : (
                                                    "SUBMIT"
                                                )}
                                            </Button>
                                        </CardItem>
                                    </form>
                                </CardBody>
                            </CardContainer>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
