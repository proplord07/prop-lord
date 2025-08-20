"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, MapPin, Settings, Award, HeadphonesIcon, Factory, Navigation, Cog } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function LandIndustrialPage() {
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

    const landServices = [
        {
            title: "Expert Guidance on Land Acquisition",
            description:
                "We Address Advisors, we specialize in helping organizations navigate the complex world of land acquisition. Our team of experienced professionals possesses in-depth knowledge of local real estate markets, allowing us to identify prime properties that align with your project goals. We provide comprehensive support throughout the entire process, from initial site scouting to final negotiations.",
            icon: MapPin,
        },
        {
            title: "Tailored Solutions",
            description:
                "We understand that every project is unique. That's why we offer customized solutions tailored to your specific requirements. Whether you're seeking a large-scale commercial development site or a smaller-scale residential project, our team will work closely with you to identify the ideal land parcel. We take into account factors such as location, zoning regulations, and potential development constraints to ensure that your investment is a sound one.",
            icon: Settings,
        },
        {
            title: "Proven Track Record",
            description:
                "With a long history of successful land acquisition projects, Address Advisors has established a reputation for excellence in the industry. Our team has a proven track record of delivering exceptional results for our clients, from securing prime development sites to negotiating favorable terms. We are committed to providing the highest level of service and exceeding your expectations.",
            icon: Award,
        },
        {
            title: "Comprehensive Support",
            description:
                "We offer a comprehensive range of services to support your land acquisition journey. Our team can assist with market analysis, due diligence, project feasibility studies, and more. We provide expert guidance and support at every stage of the process, ensuring that your project stays on track and meets your objectives.",
            icon: HeadphonesIcon,
        },
    ];

    const industrialServices = [
        {
            title: "Tailored Industrial Space Solutions",
            description:
                "We understand that every manufacturing business has unique requirements. Our team works closely with you to identify the ideal industrial space that meets your specific needs, considering factors such as size, location, amenities, and infrastructure. Whether you're looking to set up a new manufacturing facility or expand your existing operations, we have the expertise to find the perfect fit.",
            icon: Factory,
        },
        {
            title: "Strategic Location Analysis",
            description:
                "We recognize the importance of location in industrial real estate. Our team conducts thorough market research to identify strategic locations that offer the best combination of accessibility, infrastructure, and cost-effectiveness. We consider factors such as proximity to transportation hubs, suppliers, and customers to ensure that your manufacturing operations are optimized.",
            icon: Navigation,
        },
        {
            title: "Industry-Specific Expertise",
            description:
                "Our team has a deep understanding of the unique requirements of various industries, from manufacturing to logistics and warehousing. We leverage this knowledge to provide tailored solutions that address your specific needs and challenges. Whether you're in the automotive, pharmaceutical, or technology sector, we have the expertise to help you find the ideal industrial space for your business.",
            icon: Cog,
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/land.jpg" alt="Industrial land development" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-montserrat animate-fade-in-up">
                            Land & Industrial
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed font-opensans animate-fade-in-up animation-delay-200">
                            We provide comprehensive land acquisition and industrial space solutions with detailed analysis of market
                            conditions through a well equipped team with deep local knowledge and expertise.
                        </p>
                    </div>
                </div>
            </section>

            {/* Land Acquisition Services Section */}
            <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-montserrat">
                            Land Acquisition Services
                        </h2>
                        <div className="w-24 h-1 bg-[#00c4b6] mx-auto rounded-full"></div>
                    </div>

                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                    >
                        {landServices.map((service, index) => {
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

            {/* Industrial Space Solutions Section */}
            <section ref={sectionRef2} className="pb-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-montserrat">
                            Industrial Space Solutions
                        </h2>
                        <div className="w-24 h-1 bg-[#00c4b6] mx-auto rounded-full"></div>
                    </div>

                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${isVisible2 ? "animate-fade-in-up" : "opacity-0"}`}
                    >
                        {industrialServices.map((service) => {
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
