"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Building2, Home, Factory, Hotel, ShoppingBag, Warehouse, Truck } from "lucide-react";
import ColourfulText from "./ui/colourful-text";
import Link from "next/link";

const serviceImages = [
    {
        src: "services/service1.jpg",
        alt: "Corporate real estate building",
        title: "Corporate Real Estate",
        subtitle: "Premium office spaces and corporate headquarters",
        icon: Building2,
        link: "/corporate",
    },
    {
        src: "services/service2.jpg",
        alt: "Residential property",
        title: "Residential Real Estate",
        subtitle: "Luxury homes and residential communities",
        icon: Home,
        link: "/residential",
    },
    {
        src: "services/service3.jpg",
        alt: "Land and industrial property",
        title: "Land and Industrial",
        subtitle: "Industrial plots and manufacturing facilities",
        icon: Factory,
        link: "/land-industrial",
    },
    {
        src: "services/service5.jpg",
        alt: "Warehousing facility",
        title: "WAREHOUSING",
        subtitle: "Modern storage and distribution centers",
        icon: Warehouse,
        link: "/warehousing",
    },
    {
        src: "services/service4.jpg",
        alt: "Hospitality property",
        title: "Hospitality",
        subtitle: "Hotels, resorts and hospitality ventures",
        icon: Hotel,
        link: "/hospitality",
    },
];

const words = `Prop Lord is a  leading Indian real estate consultants who focus on a client-driven approach. An “Address” today has come a long way from being a mere necessity to an identity; to a resource that enhances efficiency; to an environment that optimizes ergonomics. Experience real estate services that are focused and driven to create value for its clients. At Address Advisors we deliver spaces that surpass the client’s requirements by leveraging our unrivaled market intelligence, data- driven research, proven processes and personalised approach to help you throughout the built life cycle.`;

export function ServicesSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 },
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const scrollToIndex = (index: number) => {
        if (carouselRef.current) {
            const cardWidth = 320; // Card width + gap
            carouselRef.current.scrollTo({
                left: index * cardWidth,
                behavior: "smooth",
            });
            setCurrentIndex(index);
        }
    };

    const nextSlide = () => {
        const newIndex = currentIndex >= serviceImages.length - 1 ? 0 : currentIndex + 1;
        scrollToIndex(newIndex);
    };

    const prevSlide = () => {
        const newIndex = currentIndex <= 0 ? serviceImages.length - 1 : currentIndex - 1;
        scrollToIndex(newIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <section id="services" ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight font-montserrat">
                        Real Estate <span className="text-[#00c4b6]">Services</span>  in India Like Never  <span className="text-[#00c4b6]">Before</span>
                    </h2>
                    <p className="text-sm md:text-sm text-gray-600 max-w-4xl mx-auto leading-relaxed font-opensans">
                        {words}
                    </p>
                </div>

                <div
                    className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                >
                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl rounded-full p-3 transition-all duration-300 hover:scale-110 group"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-[#00c4b6] transition-colors" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl rounded-full p-3 transition-all duration-300 hover:scale-110 group"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-[#00c4b6] transition-colors" />
                    </button>

                    <div
                        ref={carouselRef}
                        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {serviceImages.map((image, index) => {
                            const IconComponent = image.icon;
                            return (
                                <Link href={image.link}>
                                    <div
                                        key={index}
                                        className="flex-shrink-0 w-80 group cursor-pointer"
                                    >
                                        <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-white">
                                            <div className="relative h-[450px] overflow-hidden">
                                                <img
                                                    src={image.src || "/placeholder.svg"}
                                                    alt={image.alt}
                                                    className="w-full h-full object-cover filter transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                                                />

                                                <div className="absolute inset-0 bg-gradient-to-b from-red-500/0 via-green-600/80 to-pink-700 transform md:translate-y-full md:group-hover:translate-y-0 translate-y-0 transition-transform duration-700 ease-out"></div>

                                                <div className="absolute inset-0 flex flex-col items-center justify-center md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-all duration-500 delay-200 p-6 text-center">
                                                    <div className="flex items-center justify-center mb-4 transform md:translate-y-4 md:group-hover:translate-y-0 translate-y-0 transition-transform duration-500 delay-300">
                                                        <IconComponent className="w-6 h-6 text-white mr-3" />
                                                        <h3 className="text-2xl font-bold text-white font-montserrat">{image.title}</h3>
                                                    </div>
                                                    <p className="text-white/90 mb-4 font-opensans transform md:translate-y-4 md:group-hover:translate-y-0 translate-y-0 transition-transform duration-500 delay-400">
                                                        {image.subtitle}
                                                    </p>
                                                    <div className="flex items-center text-white font-semibold transform md:translate-y-4 md:group-hover:translate-y-0 translate-y-0 transition-transform duration-500 delay-500">
                                                        <span className="mr-2">Explore</span>
                                                        <ChevronRight className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex justify-center mt-8 space-x-2">
                        {serviceImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8" : "bg-gray-300 hover:bg-gray-400"
                                    }`}
                                style={index === currentIndex ? { backgroundColor: '#00c4b6' } : {}}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
