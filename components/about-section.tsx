"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const aboutData = [
    {
        title: "Our Story",
        description:
            "PROPLORD was founded 27 years ago with a vision : to be the ultimate real estate mastermind guiding clients through the complexities of property investment, ownership, and development. We believe real estate is more than transactions—it’s about building enduring relationships and crafting strategic advice that enables our clients to navigate the property landscape with confidence. Leveraging in-depth market intelligence, data-driven insights, and customised solutions, we empower buyers, investors, and businesses to make decisions that unlock long-term value. Our promise is simple: to be your most reliable partner, delivering clarity and conviction at every step of your real estate journey. At PROPLORD we  do not just guide; we mentor and strategize, transforming the complex real estate ecosystem into clear, actionable pathways. Our commitment to integrity ensures every recommendation is rooted in honesty and thorough research, building trust that lasts well beyond the deal.  Trust PROPLORD to be the guiding force behind your property ambitions, helping you achieve sustainable growth through informed, confident decisions.",
        image: "/about-us/us.jpg",
        gradient: "from-blue-600 via-purple-600 to-indigo-800",
    },
    {
        title: "Our Vision",
        description:
            "To be the most trusted and influential real estate advisory from Bangalore, renowned for delivering exceptional service, innovative solutions, and distinguished opportunities in luxury and investment properties. We aspire to shape the future of real estate by exceeding expectations, embracing technology, and building lasting relationships that transform ambitions into enduring legacies.",
        image: "/about-us/team.jpg",
        gradient: "from-emerald-600 via-teal-600 to-cyan-800",
    },
    {
        title: "Our Mission",
        description:
            "At Proplord, our mission is to redefine the real estate journey—making every experience seamless, rewarding, and individually tailored. Through expertise, integrity, and market insight, we empower clients to make informed, confident decisions that secure their prosperity and prestige. We are dedicated to guiding homebuyers, investors, and luxury seekers with transparency and care, setting new benchmarks for excellence in property advisory.",
        image: "/about-us/deliver.jpg",
        gradient: "from-orange-600 via-red-600 to-pink-800",
    },
];

export function AboutSection() {

    return (
        <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
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
