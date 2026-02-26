"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

export default function NewsletterForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        reset();

        toast.success("Welcome to the Elite circle!", {
            description: `We'll send exclusive offers to ${data.email}`,
            icon: <CheckCircle2 className="h-5 w-5 text-gold-400" />,
        });
    };

    return (
        <div className="space-y-3">
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
                <div className="relative flex-1">
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="Your Email Address"
                        className={cn(
                            "w-full rounded-lg border bg-dark-800/50 px-4 py-3 text-sm text-white placeholder:text-dark-400 outline-none backdrop-blur-sm transition-all duration-300",
                            errors.email
                                ? "border-red-500/60 focus:border-red-500 focus:shadow-sm focus:shadow-red-500/10"
                                : "border-white/10 focus:border-gold-400/50 focus:shadow-sm focus:shadow-gold-400/10"
                        )}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 rounded-lg bg-gold-400 px-6 py-3 text-sm font-semibold text-dark-950 uppercase tracking-wider transition-all duration-300 hover:bg-gold-300 hover:shadow-lg hover:shadow-gold-400/20 disabled:opacity-70 disabled:cursor-not-allowed shrink-0"
                >
                    {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <>
                            Join
                            <ArrowRight className="h-4 w-4" />
                        </>
                    )}
                </button>
            </form>

            {/* Error Message */}
            <AnimatePresence>
                {errors.email && (
                    <motion.p
                        initial={{ opacity: 0, y: -8, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -8, height: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="text-xs text-red-400 pl-1"
                    >
                        {errors.email.message}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}
