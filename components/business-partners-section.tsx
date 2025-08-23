"use client";

import Image from "next/image";

const partners = [
    {
        name: "Sobha",
        logo: "/partners/sobha-reality.png",
    },
    {
        name: "Tata Housing",
        logo: "/partners/gorej.png",
    },
    {
        name: "Brigade",
        logo: "/partners/pgroup.png",
    },
    {
        name: "Godrej Properties",
        logo: "/partners/bestates.jpg",
    },
    {
        name: "Godrej Properties",
        logo: "/partners/one.png",
    },
    {
        name: "Godrej Properties",
        logo: "/partners/two.png",
    },

    {
        name: "Godrej Properties",
        logo: "/partners/three.png",
    },

    {
        name: "Godrej Properties",
        logo: "/partners/four.png",
    },

    {
        name: "Godrej Properties",
        logo: "/partners/five.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/six.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/seven.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/eight.png",
    },

    {
        name: "Godrej Properties",
        logo: "/partners/9.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/10.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/11.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/12.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/13.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/14.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/15.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/16.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/17.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/18.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/19.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/20.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/21.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/22.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/23.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/24.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/25.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/26.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/27.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/28.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/29.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/30.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/31.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/32.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/33.png",
    },


    {
        name: "Godrej Properties",
        logo: "/partners/34.png",
    },




];

export function BusinessPartnersSection() {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                        Our <span style={{ color: '#00c4b6' }}>Partners</span>
                    </h2>
                </div>

                <div className="relative">
                    <div className="flex animate-marquee">
                        {Array.from({ length: 6 }, (_, setIndex) =>
                            partners.map((partner, index) => (
                                <div key={`${setIndex}-${index}`} className="mx-8 flex-shrink-0">
                                    <Image
                                        src={partner.logo || "/placeholder.svg"}
                                        alt={partner.name}
                                        width={150}
                                        height={150}
                                        className="h-40 w-40 rounded-md object-contain"
                                    />
                                </div>
                            )),
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

