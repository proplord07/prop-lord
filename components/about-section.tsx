"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const aboutData = [
    {
        title: "Who we are?",
        description:
            "With a consulting and advisory approach to real estate brokerage services, Address Advisors is your one-stop solution for all real estate needs. With over 100+ years of consolidated experience, we have grown from a boutique firm to a leading property consulting organization.",
        image: "/about-us/us.jpg",
        gradient: "from-blue-600 via-purple-600 to-indigo-800",
    },
    {
        title: "Why Us?",
        description:
            "Our leadership team boasts industry expertise with a deep understanding of changing market conditions. We take pride in knowing the pulse of the industry and delivering the best spaces to add merit to your business and assets.",
        image: "/about-us/team.jpg",
        gradient: "from-emerald-600 via-teal-600 to-cyan-800",
    },
    {
        title: "What we deliver?",
        description:
            "We are a dynamic, agile, fast-growing company fueled by innovation, dedication, and expertise that spans cities and service lines. We endeavor to deliver real estate solutions that add value to your future.",
        image: "/about-us/deliver.jpg",
        gradient: "from-orange-600 via-red-600 to-pink-800",
    },
];

export function AboutSection() {

    return (
        <section id="about" className="bg-gradient-to-br from-gray-50 to-white overflow-hidden">
            <div className="max-w-4xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="space-y-16">
                    {aboutData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                                } items-center gap-8 lg:gap-16 overflow-hidden`}
                        >
                            {/* Image Section */}
                            <div className="flex-1 relative group w-full">
                                <div
                                    className="relative overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-3xl transition-shadow duration-300"
                                >
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10`}
                                    />
                                    <Image
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.title}
                                        width={600}
                                        height={500}
                                        className="w-full h-[400px] lg:h-[300px] object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                                    />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="flex-1 space-y-6 w-full overflow-hidden">
                                <motion.div
                                    className="space-y-4"
                                    whileInView={{ opacity: 1 }}
                                    initial={{ opacity: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-1 h-12 bg-gradient-to-b ${item.gradient} rounded-full`} />
                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 font-montserrat">{item.title}</h3>
                                    </div>

                                    <p className="text-sm text-gray-600 leading-relaxed font-opensans max-w-full lg:max-w-2xl">{item.description}</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
