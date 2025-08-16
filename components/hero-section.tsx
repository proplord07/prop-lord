"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";
import Link from "next/link";

export function HeroSection() {
    const [isVisible, setIsVisible] = useState(false);

    const words = ["CONSULTANTS", "ADVISORS", "EXPERTS", "PROFESSIONALS"];

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                    <source src="/videos/hero.mp4" type="video/mp4" />
                    {/* Fallback image if video doesn't load */}
                    {/* <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url('/modern-city-aerial.png')`,
                        }}
                    /> */}
                </video>
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/70"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                        THE ONLY REAL ESTATE
                        <br />
                        <FlipWords words={words} className="text-green-600 font-bold" />
                        <br />
                        YOU'LL EVER NEED
                    </h1>

                    <div className="mt-8">
                        <Link href="/listings">
                            <Button
                                size="lg"
                                className="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-8 py-4 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                                EXPLORE
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
