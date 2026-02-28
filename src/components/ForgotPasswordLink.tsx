"use client";

import { Info } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPasswordLink() {
    return (
        <button
            type="button"
            onClick={(e) => {
                e.preventDefault();
                toast("Portfolio Demo", {
                    description: "Password recovery is disabled for this demonstration.",
                    icon: <Info className="h-5 w-5 text-gold-400" />
                });
            }}
            className="text-xs text-gold-400 hover:text-gold-300 transition-colors"
        >
            Forgot password?
        </button>
    );
}
