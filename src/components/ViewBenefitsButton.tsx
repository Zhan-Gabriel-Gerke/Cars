"use client";

import { Info, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function ViewBenefitsButton() {
    return (
        <button
            type="button"
            onClick={(e) => {
                e.preventDefault();
                toast("Portfolio Demo", {
                    description: "Elite Tier benefits page is not implemented in this demo.",
                    icon: <Info className="h-5 w-5 text-gold-400" />
                });
            }}
            className="mt-6 w-full text-left text-sm text-dark-300 hover:text-white transition-colors flex items-center gap-2 group cursor-pointer"
        >
            View Benefits
            <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-gold-400" />
        </button>
    );
}
