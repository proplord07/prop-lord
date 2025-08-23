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
                "Our team connects with builders to provide you with home buying options or investing options during the project launch period of the project. Assisting you in negotiations to help you mitigate any risks.",
            icon: Rocket,
        },
        {
            title: "Resale Properties",
            description:
                "Deep understanding of the local market along with our financial expertise allows us to cater to the demands and needs of individuals and corporates looking to buy properties in the secondary or re sale market.",
            icon: RefreshCw,
        },
        {
            title: "Property Management",
            description:
                "Are you an NRI (Non-Resident Indian) or an individual seeking to maximize the potential of your real estate investments in Bangalore? Look no further! Our dedicated property management services in Bangalore are tailored to meet your specific needs, ensuring that your properties are expertly managed, even if you're miles away.",
            icon: Home,
        },
        {
            title: "Investment Sales",
            description:
                "We provide investors with an in-depth understanding of the complex real estate market and offer comprehensive capital market services including acquisition/disposition and advisory across all residential product segments.",
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
                            We provide comprehensive residential real estate solutions with detailed analysis of market conditions
                            through a well equipped team with deep local knowledge and expertise.
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
