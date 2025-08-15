// "use client";
// import { ThreeDMarquee } from "@/components/ui/3d-marquee";

// export function BusinessPartnersSection() {
//     const images = [
//         "/partners/godrej.webp",
//         "/partners/birla.jpg",
//         "/partners/prest.webp",
//         "/partners/sobha.jpg",
//         "/partners/godrej.webp",
//         "/partners/birla.jpg",
//         "/partners/prest.webp",
//         "/partners/sobha.jpg",
//         "/partners/godrej.webp",
//         "/partners/birla.jpg",
//         "/partners/prest.webp",
//         "/partners/sobha.jpg",
//         "/partners/godrej.webp",
//         "/partners/birla.jpg",
//         "/partners/prest.webp",
//         "/partners/sobha.jpg",
//         "/partners/godrej.webp",
//         "/partners/birla.jpg",
//         "/partners/prest.webp",
//         "/partners/sobha.jpg",
//         "/partners/godrej.webp",
//         "/partners/birla.jpg",
//         "/partners/prest.webp",
//         "/partners/sobha.jpg",
//         "/partners/godrej.webp",
//         "/partners/birla.jpg",
//         "/partners/prest.webp",
//         "/partners/sobha.jpg",
//         "/partners/godrej.webp",
//         "/partners/birla.jpg",
//         "/partners/prest.webp",
//         "/partners/sobha.jpg",
//         "/partners/godrej.webp",
//         "/partners/birla.jpg",
//         "/partners/prest.webp",
//         "/partners/sobha.jpg",
//         "/partners/godrej.webp",
//         "/partners/birla.jpg",
//         "/partners/prest.webp",
//         "/partners/sobha.jpg",


//     ];
//     return (
//         <div className="mx-auto my-10 max-w-7xl rounded-3xl bg-gray-950/0 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800">
//             <ThreeDMarquee images={images} className="" />
//         </div>
//     );
// }

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
];

export function BusinessPartnersSection() {
    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-montserrat">Our Partners</h2>
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
                                        className="h-36 w-36 rounded-md object-contain"
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

