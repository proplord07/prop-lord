"use client";

import type React from "react";
import { useState } from "react";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

export function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const loadingStates = [
        { text: "Processing your information..." },
        { text: "Submitting your request..." },
        { text: "Redirecting to thank you page..." },
    ];

    const validateName = (name: string) => {
        if (!name.trim()) return "Name is required";
        if (name.trim().length < 2) return "Name must be at least 2 characters";
        return "";
    };

    const validateEmail = (email: string) => {
        if (!email.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return "Please enter a valid email address";
        return "";
    };

    const validatePhone = (phone: string) => {
        if (!phone.trim()) return "Phone number is required";
        const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
        const cleanPhone = phone.replace(/\D/g, "");
        if (cleanPhone.length < 10) return "Phone number must be at least 10 digits";
        if (!phoneRegex.test(cleanPhone)) return "Please enter a valid phone number";
        return "";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let error = "";

        switch (name) {
            case "name":
                error = validateName(value);
                break;
            case "email":
                error = validateEmail(value);
                break;
            case "phone":
                error = validatePhone(value);
                break;
        }

        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate all fields
        const nameError = validateName(formData.name);
        const emailError = validateEmail(formData.email);
        const phoneError = validatePhone(formData.phone);

        setErrors({
            name: nameError,
            email: emailError,
            phone: phoneError,
        });

        // Only proceed if no errors
        if (!nameError && !emailError && !phoneError) {
            setLoading(true);

            setTimeout(() => {
                // Redirect to thank you page
                window.location.href = "/thank-you";
            }, 3000);
        }
    };

    const getCompletedFields = () => {
        let count = 0;
        if (formData.name) count++;
        if (formData.email) count++;
        if (formData.phone) count++;
        return count;
    };

    return (
        <section id="contact" className="py-12 ">
            <MultiStepLoader loadingStates={loadingStates} loading={loading} duration={1000} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Looking for a Property?</h2>
                    <p className="text-base text-gray-600 max-w-xl mx-auto">
                        Fill out the form below and our team will get back to you within 24 hours to help you find your perfect property.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    {/* Progress indicator */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-medium text-gray-600">Step {getCompletedFields()} of 3</span>
                            <span className="text-xs text-gray-500">{Math.round((getCompletedFields() / 3) * 100)}% Complete</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                                className="h-1.5 rounded-full transition-all duration-500 ease-out"
                                style={{
                                    width: `${(getCompletedFields() / 3) * 100}%`,
                                    backgroundColor: '#00c4b6'
                                }}
                            />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                                        }`}
                                    style={!errors.name ? { '--tw-ring-color': '#00c4b6' } as React.CSSProperties : {}}
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                                        }`}
                                    style={!errors.email ? { '--tw-ring-color': '#00c4b6' } as React.CSSProperties : {}}
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>
                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${errors.phone ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                                        }`}
                                    style={!errors.phone ? { '--tw-ring-color': '#00c4b6' } as React.CSSProperties : {}}
                                />
                                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                            </div>
                        </div>

                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                disabled={loading || !formData.name || !formData.email || !formData.phone}
                                className="px-8 py-3 bg-[#00c4b6] hover:bg-[#00c4b6] text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Processing..." : "Submit Request"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
