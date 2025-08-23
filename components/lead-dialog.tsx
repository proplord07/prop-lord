"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LeadsService, Lead } from "@/lib/leads-service";
import { Property } from "@/lib/property-service";

interface LeadDialogProps {
    isOpen: boolean;
    onClose: () => void;
    property: Property;
}

export function LeadDialog({ isOpen, onClose, property }: LeadDialogProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.phone.trim()) {
            toast.error("Name and phone number are required");
            return;
        }

        // Basic phone number validation
        const phoneRegex = /^[0-9+\-\s()]{10,}$/;
        if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
            toast.error("Please enter a valid phone number");
            return;
        }

        // Basic email validation if provided
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        setIsSubmitting(true);

        try {
            const leadData: Omit<Lead, 'id' | 'created_at'> = {
                name: formData.name.trim(),
                phone: formData.phone.trim(),
                email: formData.email.trim() || undefined,
                property_id: property.id,
                property_name: property.name,
            };

            await LeadsService.createLead(leadData);

            toast.success("Thank you! We'll get back to you soon.");

            // Close dialog and redirect to thank you page
            onClose();
            router.push('/thank-you');

        } catch (error) {
            console.error('Error creating lead:', error);
            toast.error("Failed to submit your request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            setFormData({ name: "", phone: "", email: "" });
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="w-[calc(100vw-2rem)] max-w-md sm:w-full">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-900">
                        Interested in this property?
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                        Please provide your details and we'll get back to you with more information about{" "}
                        <span className="font-medium text-gray-900">{property.name}</span>
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Full Name *
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                            className="w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                            Phone Number *
                        </Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            required
                            className="w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email Address <span className="text-gray-500">(Optional)</span>
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email address"
                            className="w-full"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isSubmitting}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-[#00c4b6] hover:bg-[#00b3a6] text-white"
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
