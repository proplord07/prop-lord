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
                "At PROPLORD, we represent occupiers with a singular focus on securing spaces that meet strategic, operational, and financial goals—while fostering productive landlord–tenant relationships. For tenants, we provide location analysis, market benchmarking, and negotiation strategy to achieve the best terms. For landlords engaging with us in dual-capacity advisory, we ensure terms are fair, occupancy is sustainable, and relationships are built for long-term value creation.",
            icon: Users,
        },
        {
            title: "Facility Management",
            description:
                "Facility management, when viewed from both occupiers’ and property owners’ perspectives, supports operational efficiency, asset longevity, and occupant wellbeing. PROPLORD ensures that spaces operate seamlessly for tenants—covering maintenance, safety, and cost optimisation. For landlords, our focus extends to asset preservation, regulatory compliance, and sustaining tenant satisfaction, which translates to better retention and long-term asset performance.",
            icon: Settings,
        },
        {
            title: "Property Management",
            description:
                "We manage assets in a way that protects owners’ investments while providing a positive experience for occupants. Tenants benefit from well-maintained, functional spaces; landlords benefit from preventative maintenance, cost optimisation, compliance assurance, and stable occupancy. PROPLORD balances both sides by applying technology, proactive upkeep, and transparent communication to reduce risk and enhance asset value.",
            icon: Home,
        },
        {
            title: "Built to Suit",
            description:
                "Built-to-suit solutions are about customisation and alignment. For occupiers, PROPLORD delivers spaces that fit processes, culture, and growth goals. For landlords or developers, we help match design and build specifications to market demand, ensuring higher lease uptake and asset relevance. The process—from planning to delivery—is guided by strategic oversight for both sides, aligning business needs with long-term capital value.",
            icon: Building2,
        },
        {
            title: "Lease Renewal and Rent Review",
            description:
                "Lease renewals and rent reviews are opportunities for mutual benefit when handled with expertise. PROPLORD helps occupiers secure favourable, sustainable terms while helping landlords maintain fair market value and consistent income. Our approach is transparent, data-driven, and negotiation-focused, ensuring both sides walk away satisfied and positioned for continued partnership.",
            icon: FileText,
        },
        {
            title: "Landlord Representation",
            description:
                "For landlords and developers, PROPLORD creates high-impact leasing strategies backed by market intelligence. We position assets to attract quality occupiers and negotiate terms that encourage stability and profitability. When working in a broader market ecosystem, we ensure occupiers’ requirements align with landlords’ offerings, fostering agreements that serve long-term performance for both parties.",
            icon: Handshake,
        },
        {
            title: "Lease Structuring",
            description:
                "Lease structuring impacts both the occupier’s operational efficiency and the landlord’s revenue stability. PROPLORD designs lease agreements that balance tenant flexibility with owner profitability, optimising tenant mix and enhancing building value. We provide input on terms, clauses, and asset positioning so that leases remain commercially sound for landlords while being operationally effective for tenants.",
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
                        At PROPLORD, we specialize in delivering end-to-end corporate real estate solutions that empower businesses to operate, expand, and thrive strategically. Our expert advisory team combines deep local knowledge with global perspectives, offering comprehensive workspace acquisition and disposition services tailored to your operational objectives. By leveraging detailed market analysis, occupancy trend insights, and financial modeling, we ensure every decision is driven by data and aligned with long-term business goals. Whether you are setting up a headquarters, expanding to new markets, or optimizing existing assets, PROPLORD acts as your trusted realty mastermind—navigating negotiations, identifying high-value opportunities, and securing spaces that enhance productivity, brand presence, and bottom-line performance. With us, your corporate real estate strategy becomes a competitive advantage.
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
                        <div className="w-24 h-1 bg-[#00c4b6] mx-auto rounded-full"></div>
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
                                                <div className="p-2 bg-green-100 rounded-lg group-hover/card:bg-green-100 transition-colors duration-300">
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
