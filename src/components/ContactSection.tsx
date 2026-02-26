"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
    {
        icon: Phone,
        label: "Call Us",
        value: "+1 (888) 555-ELITE",
        href: "tel:+18885553548",
    },
    {
        icon: Mail,
        label: "Email Us",
        value: "concierge@elitecars.com",
        href: "mailto:concierge@elitecars.com",
    },
    {
        icon: MapPin,
        label: "Visit Us",
        value: "Beverly Hills, CA 90210",
        href: "#",
    },
];

export default function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        toast.success("Message sent! Our concierge team will respond within 24 hours.", {
            style: { background: "#1a1a1a", color: "#fff", border: "1px solid rgba(212,175,55,0.3)" },
        });
        reset();
    };

    return (
        <section id="contact" className="relative py-28 bg-dark-950">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-gold-400/5 blur-3xl" />
                <div className="absolute bottom-1/4 -left-32 w-80 h-80 rounded-full bg-gold-400/3 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <p className="text-xs font-semibold tracking-[0.3em] text-gold-400 uppercase mb-4">
                        Get in Touch
                    </p>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                        Start Your{" "}
                        <span className="font-serif italic text-gold-400">Journey</span>
                    </h2>
                    <p className="mt-5 text-dark-300 text-base sm:text-lg leading-relaxed">
                        Our concierge team is ready to craft your perfect driving experience.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        {contactInfo.map((info) => (
                            <a
                                key={info.label}
                                href={info.href}
                                className="group flex items-start gap-4 rounded-lg border border-white/5 bg-dark-900/50 p-5 transition-all duration-300 hover:border-gold-400/20 hover:bg-dark-900/80"
                            >
                                <div className="rounded-md bg-gold-400/10 p-3">
                                    <info.icon className="h-5 w-5 text-gold-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-dark-400 mb-0.5">{info.label}</p>
                                    <p className="text-white font-medium group-hover:text-gold-400 transition-colors">
                                        {info.value}
                                    </p>
                                </div>
                            </a>
                        ))}

                        <div className="rounded-lg border border-white/5 bg-dark-900/50 p-5">
                            <p className="text-sm text-dark-400 mb-1">Business Hours</p>
                            <p className="text-white font-medium">Mon – Sat: 8AM – 10PM</p>
                            <p className="text-dark-300 text-sm">Sunday: 10AM – 6PM</p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-3"
                    >
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="rounded-xl border border-white/5 bg-dark-900/40 backdrop-blur-sm p-8 space-y-5"
                        >
                            <div className="grid sm:grid-cols-2 gap-5">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm text-dark-300 mb-1.5">
                                        Full Name
                                    </label>
                                    <input
                                        {...register("name")}
                                        placeholder="John Doe"
                                        className="w-full rounded-md border border-white/10 bg-dark-950/60 px-4 py-3 text-sm text-white placeholder:text-dark-500 outline-none transition-all duration-300 focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20"
                                    />
                                    {errors.name && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-1 text-xs text-red-400"
                                        >
                                            {errors.name.message}
                                        </motion.p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm text-dark-300 mb-1.5">
                                        Email Address
                                    </label>
                                    <input
                                        {...register("email")}
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full rounded-md border border-white/10 bg-dark-950/60 px-4 py-3 text-sm text-white placeholder:text-dark-500 outline-none transition-all duration-300 focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20"
                                    />
                                    {errors.email && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-1 text-xs text-red-400"
                                        >
                                            {errors.email.message}
                                        </motion.p>
                                    )}
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm text-dark-300 mb-1.5">
                                    Phone Number{" "}
                                    <span className="text-dark-500">(optional)</span>
                                </label>
                                <input
                                    {...register("phone")}
                                    type="tel"
                                    placeholder="+1 (555) 000-0000"
                                    className="w-full rounded-md border border-white/10 bg-dark-950/60 px-4 py-3 text-sm text-white placeholder:text-dark-500 outline-none transition-all duration-300 focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm text-dark-300 mb-1.5">
                                    Your Message
                                </label>
                                <textarea
                                    {...register("message")}
                                    rows={4}
                                    placeholder="Tell us about your dream driving experience..."
                                    className="w-full rounded-md border border-white/10 bg-dark-950/60 px-4 py-3 text-sm text-white placeholder:text-dark-500 outline-none transition-all duration-300 focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 resize-none"
                                />
                                {errors.message && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-1 text-xs text-red-400"
                                    >
                                        {errors.message.message}
                                    </motion.p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center gap-2 rounded-sm bg-gold-400 px-8 py-3.5 text-sm font-semibold text-dark-950 uppercase tracking-wider transition-all duration-300 hover:bg-gold-300 hover:shadow-lg hover:shadow-gold-400/25 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg
                                            className="h-4 w-4 animate-spin"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                className="opacity-25"
                                            />
                                            <path
                                                d="M4 12a8 8 0 018-8"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                className="opacity-75"
                                            />
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
