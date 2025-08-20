import { BlogSection } from "@/components/blog-section";

export default function BlogPage() {
    return (
        <main className="min-h-screen">
            <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30 animate-pulse"></div>
                    <div
                        className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-100 to-blue-100 rounded-full opacity-30 animate-pulse"
                        style={{ animationDelay: "2s" }}
                    ></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
                    <BlogSection />
                </div>
            </div>
        </main>
    );
}
