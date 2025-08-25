"use client";

import { useEffect, useRef, useState } from "react";
import { Rocket, RefreshCw, Home, TrendingUp, FileCheck, Target, Users, Code } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";


export default function ResidentialPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const sectionRef2 = useRef<HTMLElement>(null);

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

    const mainServices = [
        {
            title: "New Launch Sales",
            description:
                "At PROPLORD, we bridge buyers, investors, and developers during the project launch phase to create opportunities that are strategically timed and value-driven. For home seekers and investors, we identify projects with strong fundamentals—assessing location, pricing, builder credibility, and long-term appreciation potential. For developers, we connect with qualified prospects and structure negotiations that ensure transparent, win–win outcomes. Our role spans due diligence, market comparison, and risk mitigation, ensuring every early-stage purchase is both secure and strategically advantageous.",
            icon: Rocket,
        },
        {
            title: "Resale Properties",
            description:
                "The secondary market offers unique buying and selling opportunities, each requiring a refined approach. At PROPLORD, we combine deep local market insight with objective analysis to guide both purchasers and sellers of villas, apartments, and plots toward optimal results. Buyers gain access to curated resale opportunities that meet lifestyle and investment priorities, while sellers benefit from accurate valuation, positioning, and targeted outreach. Our aim is to match quality assets with informed decision-makers, ensuring transparency and fairness in every resale transaction.",
            icon: RefreshCw,
        },
        {
            title: "Property Management",
            description:
                "Managing property from a distance requires trust, precision, and consistent oversight. PROPLORD offers specialised property management for NRIs and owners with limited on-ground presence—ensuring assets in Bangalore are maintained, tenanted, and yielding maximum potential. Services include rent collection, maintenance coordination, compliance management, and strategic upgrades to enhance asset value. For owners, we provide transparent reporting and proactive asset care; for tenants, we ensure responsive service and a well-maintained living environment. Our approach protects value today and preserves potential for tomorrow.",
            icon: Home,
        },
        {
            title: "Investment Sales",
            description:
                "Real estate investment demands insight into both market cycles and long-term trends. PROPLORD advises private investors, institutions, and high-net-worth individuals on acquisitions, dispositions, and portfolio strategies across residential segments. We assess risk, returns, and timing, providing structured advice rooted in capital market expertise. Sellers benefit from targeted positioning to attract serious investors; buyers receive rigorous due diligence and accurate forecasting. Our goal is to ensure each investment decision—whether entry or exit—is grounded in strategy, backed by data, and aligned with growth objectives.",
            icon: TrendingUp,
        },
    ];

    const mandateServices = [
        {
            title: "Sales Mandate",
            description:
                "Our sale mandate service streamlines residential property transactions, ensuring maximum value through expert negotiation, legal compliance, and efficient deal closure.",
            icon: FileCheck,
        },
        {
            title: "Marketing Mandate",
            description:
                "Our marketing mandate leverages innovative digital marketing strategies to promote residential properties, targeting the right audience to enhance visibility and drive sales.",
            icon: Target,
        },
        {
            title: "Channel Partner Engagement",
            description:
                "Our channel partner engagement builds strong networks with trusted partners, ensuring seamless collaboration to boost residential property sales effectively.",
            icon: Users,
        },
        {
            title: "Backend Management",
            description:
                "Our backend management ensures smooth operations, handling Documentation, CRM, Compliance, and Coordination for residential real estate mandates with precision.",
            icon: Code,
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/residental.jpg"
                        alt="Modern residential building"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-montserrat animate-fade-in-up">
                            Residential Real Estate
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed font-opensans animate-fade-in-up animation-delay-200">
                        At PROPLORD, we combine unrivaled knowledge of local and city-wide residential markets with a deeply personalized approach to help you make the smartest choice for your home. We understand that every individual’s needs, aspirations, and investment goals are unique, which is why our advisory goes beyond traditional services—merging data-driven market research, insightful analysis, and visionary guidance to navigate the complexities of the residential property landscape. Whether you are a first-time buyer, a seasoned investor, or searching for your dream home, we act as your trusted realty mastermind, delivering clarity, confidence, and strategies tailored exclusively to you. We don’t just help you find a property—we help you secure a home that enriches your lifestyle and stands as a solid investment for the future, all built on the foundations of transparency, trust, and long-term value creation.
                        </p>

                    </div>
                </div>


            </section>

            {/* Main Services Section */}
            <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-montserrat">
                            Residential Real Estate
                        </h2>
                        <div className="w-24 h-1 bg-[#00c4b6] mx-auto rounded-full"></div>
                    </div>

                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                    >
                        {mainServices.map((service) => {
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

            {/* Property Mandates Section */}
            <section ref={sectionRef2} className=" bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-montserrat">Property Mandates</h2>
                        <div className="w-24 h-1 bg-[#00c4b6] mx-auto rounded-full mb-6"></div>
                        <p className="text-gray-600 max-w-4xl mx-auto mb-4 font-opensans">
                            With our expertise and ability we help developers, builders and individuals sell their housing units to
                            potential investors and end-users in the primary market.
                        </p>
                        <p className="text-gray-600 max-w-4xl mx-auto font-opensans">
                            PropLord specializes in residential real estate mandates, offering expert services in sale,
                            marketing, channel partner engagement, and backend management. With a client-centric approach, we ensure
                            seamless transactions, strategic marketing, and efficient operations, delivering tailored solutions to
                            maximize property value and achieve optimal results in Bangalore, Hyderabad & Chennai's dynamic market.
                        </p>
                    </div>

                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 transition-all duration-1000 ${isVisible2 ? "animate-fade-in-up" : "opacity-0"}`}
                    >
                        {mandateServices.map((service) => {
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
