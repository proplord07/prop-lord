"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
    {
        quote:
            "Working with Prop Lord has been an exceptional experience. Their team demonstrated unparalleled professionalism and market expertise throughout our property acquisition process. They understood our requirements perfectly and delivered results that exceeded our expectations.",
        name: "Vivek Choudhary",
        designation: "CEO, TechVision Solutions",
    },
    {
        quote:
            "The attention to detail and commitment to client satisfaction sets Prop Lord apart in the real estate industry. Their innovative approach and deep market knowledge helped us secure the perfect commercial space for our expanding business.",
        name: "Priya Sharma",
        designation: "Founder, InnovateTech",
    },
    {
        quote:
            "Prop Lord's comprehensive real estate solutions and expert guidance made our property investment journey smooth and profitable. Their team's dedication and transparency throughout the process was truly remarkable.",
        name: "Rajesh Kumar",
        designation: "Director, Global Enterprises",
    },
    {
        quote:
            "The strategic insights and market analysis provided by Prop Lord helped us make informed decisions that significantly boosted our real estate portfolio. Their commitment to excellence is unmatched in the industry.",
        name: "Anita Desai",
        designation: "Investment Manager, Capital Growth",
    },
    {
        quote:
            "From initial consultation to final handover, Prop Lord's team maintained the highest standards of service. Their expertise in commercial real estate and attention to client needs made our expansion seamless.",
        name: "Suresh Patel",
        designation: "Managing Director, Urban Spaces",
    },
];

export function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-scroll functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsAutoPlaying(false);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsAutoPlaying(false);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
    };

    return (
        <section
            id="testimonials"
            className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden"
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-32 h-32 bg-[#00c4b6] rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#00c4b6] rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-500 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-4">
                        Client Testimonials
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#00ffff] to-[#00c4b6] mx-auto rounded-full"></div>
                </div>

                {/* Main testimonial container */}
                <div className="relative">
                    {/* Navigation arrows */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl rounded-full p-3 transition-all duration-300 hover:scale-110 group"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-[#00c4b6] transition-colors" />
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl rounded-full p-3 transition-all duration-300 hover:scale-110 group"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-[#00c4b6] transition-colors" />
                    </button>

                    {/* Testimonial cards container */}
                    <div className="overflow-hidden mx-12">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="w-full flex-shrink-0 px-4">
                                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl transition-all duration-500 p-8 md:p-12 border border-gray-100 hover:border-green-200 group">
                                        {/* Quote icon */}
                                        <div className="flex justify-center mb-6">
                                            <div className="bg-gradient-to-r from-[#00ffff] to-[#00c4b6] rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                                                <Quote className="w-8 h-8 text-white" />
                                            </div>
                                        </div>

                                        {/* Quote text */}
                                        <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 text-center italic font-medium">
                                            "{testimonial.quote}"
                                        </blockquote>

                                        {/* Author info */}
                                        <div className="text-center">
                                            <h4 className="text-xl font-bold text-gray-900 mb-1">{testimonial.name}</h4>
                                            <p className="text-[#00c4b6] font-medium">{testimonial.designation}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots indicator */}
                    <div className="flex justify-center mt-8 space-x-3">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-[#00c4b6] scale-125" : "bg-gray-300 hover:bg-gray-400"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Progress bar */}
                <div className="mt-8 max-w-md mx-auto">
                    <div className="bg-gray-200 rounded-full h-1 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-[#00ffff] to-[#00c4b6] h-full rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
