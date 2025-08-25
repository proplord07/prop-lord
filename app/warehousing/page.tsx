"use client";

import { useEffect, useRef, useState } from "react";
import { Warehouse, FileText, Users, Handshake, Briefcase } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export default function WarehousingPage() {
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
            title: "Built to Suit Warehouse",
            description:
                "At PROPLORD, we see built-to-suit warehouses as strategic assets designed for operational precision and long-term value. For occupiers, we ensure facilities are tailored to workflow, storage requirements, and expansion plans, maximising both functionality and efficiency. For landlords and developers, we advise on specifications that align with tenant needs while protecting long-term asset performance. From concept to delivery, we guide location selection, layout optimisation, and compliance, ensuring the final space serves current requirements and future growth opportunities.",
            icon: Warehouse,
        },
        {
            title: "Lease Renewal and Rent Review",
            description:
                "Renewal and rent review processes work best when they balance the interests of both landlord and occupier. PROPLORD applies data-driven benchmarking, market analysis, and transparent negotiation to arrive at terms that are commercially fair and sustainable. We help occupiers secure competitive arrangements that support operational stability, and enable landlords to maintain occupancy levels, protect asset value, and ensure income consistency.",
            icon: FileText,
        },
        {
            title: "Tenant Representation",
            description:
                "Our tenant representation in warehousing focuses on operational fit, cost efficiency, and strategic location advantage. For occupiers, PROPLORD provides market insights, micro and macro location analysis, and negotiation expertise to secure ideal spaces on optimal terms. While acting primarily for tenants, we also ensure the process fosters constructive landlord–tenant relationships, enabling smoother transactions and stronger long-term alignments.",
            icon: Users,
        },
        {
            title: "Landlord Representation",
            description:
                "For landlords and developers in the warehousing and industrial sector, PROPLORD creates leasing programs designed to maximise asset value and attract quality tenants. Our process includes market positioning, tenant targeting, and lease term optimisation. By aligning tenant needs with ownership objectives, we drive sustainable occupancy, consistent returns, and a positive reputation in the logistics and industrial market.",
            icon: Handshake,
        },
        {
            title: "Lease Structuring",
            description:
                "An effective warehouse lease must balance operational flexibility for tenants with financial security for landlords. PROPLORD designs lease strategies that account for rental profile improvement, tenant mix suitability, occupancy stability, and long-term asset performance. We advise on customised terms, risk allocation, and strategic clauses so that agreements remain beneficial and resilient for both parties throughout the lease lifecycle.",
            icon: Briefcase,
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="warehouse.jpg"
                        alt="Modern warehouse facility"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-montserrat animate-fade-in-up">
                            Warehousing & Logistics
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed font-opensans animate-fade-in-up animation-delay-200">
                        At PROPLORD, we understand that in today’s fast-paced economy, warehousing, industrial, and logistics capabilities are the backbone of business growth. Leveraging our extensive network of strategically located warehouses and industrial facilities across the country, we deliver supply chain solutions that empower companies to expand swiftly, efficiently, and strategically. Our advisory approach focuses on giving you flexibility, scalability, and location intelligence—critical competitive advantages that ensure your operations meet market demands with speed and precision. From identifying optimal sites to negotiating the best terms and optimizing long-term operational efficiency, PROPLORD acts as your trusted realty mastermind—helping you build logistics frameworks that not only support your current business needs but also position you for sustainable growth in the future.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-montserrat">
                            Our Warehousing and Logistics Services
                        </h2>
                        <div className="w-24 h-1 bg-[#00c4b6] mx-auto rounded-full"></div>
                    </div>

                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                    >
                        {services.map((service) => {
                            const IconComponent = service.icon;
                            return (
                                <CardContainer key={service.title} className="inter-var" containerClassName="p-0">
                                    <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border hover:shadow-xl transition-all duration-300">
                                        <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-green-100 rounded-lg group-hover/card:bg-green-200 transition-colors duration-300">
                                                    <IconComponent className="w-6 h-6 text-[#00c4b6]" />
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
                                        <CardItem translateZ="50" className="w-full mt-6">
                                            <div className="h-1 bg-gradient-to-r from-[#51fcf0] to-[#00c4b6] rounded-full transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500 origin-left"></div>
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
