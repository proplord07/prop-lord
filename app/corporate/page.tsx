"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, Building2, Users, Settings, Home, FileText, Handshake, Briefcase } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function CorporatePage() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

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

    const services = [
        {
            title: "Tenant Representation",
            description:
                "Corporate real estate services includes tenant representation with our focus on the tenant's best interests, we help you make an informed decision that best fits your business needs. We assist through providing relevant market knowledge, lease negotiation and renewal, micro and macro location analysis and much more to help you choose the right address!",
            icon: Users,
        },
        {
            title: "Facility Management",
            description:
                "We ensure company's physical space runs like clockwork. From keeping the lights on and ensuring comfortable temperatures to managing maintenance and prioritizing employee safety. We also play a strategic role, optimizing costs through energy management and vendor negotiation. We consider regulations and contribute to a positive work environment, making employees feel valued and allowing the company to focus on its core mission.",
            icon: Settings,
        },
        {
            title: "Property Management",
            description:
                "We ensure smooth building operations with preventative maintenance, skilled maintenance for specialized systems, and potentially managing amenities and tenant relations. By outsourcing this expertise, companies save time, potentially reduce costs, and mitigate risks, allowing them to focus on their core business while they valuable real estate asset are in good hands.",
            icon: Home,
        },
        {
            title: "Built to Suit",
            description:
                "We assist you in setting up tailored commercial spaces that fit your business requirements, to ensure you are able to maximise the operational space. We assist you in expanding your new facility to meet your corporate goals.",
            icon: Building2,
        },
        {
            title: "Lease Renewal and Rent Review",
            description:
                "With the aim to ensure transparency, both parties are encouraged to review the rent/lease terms and with our expertise we ensure a smooth hustle free transaction.",
            icon: FileText,
        },
        {
            title: "Landlord Representation",
            description:
                "We closely partner with landlords and developers to maximise their asset value by creating persuasive and result-oriented leasing programs.",
            icon: Handshake,
        },
        {
            title: "Lease Structuring",
            description:
                "Strategic leasing advice for your property; we deliver tailor made solutions for your corporate needs including lease management, optimizing the tenant mix that add to your bottom line, improving the rental profile and much more.",
            icon: Briefcase,
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <img src="/corporate.jpg" alt="Corporate buildings skyline" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-montserrat animate-fade-in-up">
                            Corporate Real Estate
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed font-opensans animate-fade-in-up animation-delay-200">
                            We provide comprehensive work space acquisition and disposition services with detailed analysis of market
                            conditions through a well equipped team with deep local knowledge and expertise.
                        </p>

                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section ref={sectionRef} className="py-16 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-montserrat">
                            Corporate Real Estate Services
                        </h2>
                        <div className="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
                    </div>

                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                    >
                        {services.map((service) => {
                            const IconComponent = service.icon;
                            return (
                                <CardContainer key={service.title} className="inter-var" containerClassName="p-0 cursor-pointer">
                                    <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border hover:shadow-xl transition-all duration-300">
                                        <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-green-100 rounded-lg group-hover/card:bg-green-200 transition-colors duration-300">
                                                    <IconComponent className="w-6 h-6 text-green-600" />
                                                </div>
                                                <span className="font-montserrat">{service.title}</span>
                                            </div>
                                        </CardItem>
                                        <CardItem
                                            as="p"
                                            translateZ="60"
                                            className="text-neutral-500 text-sm dark:text-neutral-300 leading-relaxed font-opensans"
                                        >
                                            {service.description}
                                        </CardItem>
                                        <CardItem translateZ="100" className="w-full mt-6">
                                            <div className="h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500 origin-left"></div>
                                        </CardItem>
                                    </CardBody>
                                </CardContainer>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
