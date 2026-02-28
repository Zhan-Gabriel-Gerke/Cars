"use client";

import { useActionState, useEffect } from "react";
import { createCar, updateCar } from "@/actions/car";
import type { CarActionState } from "@/actions/car";
import type { Car } from "@prisma/client";

interface CarFormProps {
    car?: Car | null;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function CarForm({ car, onSuccess, onCancel }: CarFormProps) {
    const isEditing = !!car;

    // Bind the updateCar action if editing, otherwise createCar
    const action = isEditing ? updateCar.bind(null, car.id) : createCar;

    const [state, formAction, isPending] = useActionState<CarActionState, FormData>(
        action,
        { error: "", fieldErrors: {} }
    );

    useEffect(() => {
        if (state?.success && onSuccess) {
            onSuccess();
        }
    }, [state?.success, onSuccess]);

    return (
        <form action={formAction} className="space-y-6">
            {state?.error && (
                <div className="rounded-md bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400">
                    {state.error}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-dark-200 mb-1">Name *</label>
                    <input
                        name="name"
                        defaultValue={car?.name || ""}
                        disabled={isPending}
                        className="w-full rounded-md border border-white/10 bg-dark-950/60 px-4 py-2 text-white placeholder:text-dark-500 outline-none transition-all focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 disabled:opacity-50"
                        placeholder="Lamborghini Aventador"
                    />
                    {state?.fieldErrors?.name && (
                        <p className="mt-1 text-xs text-red-400">{state.fieldErrors.name[0]}</p>
                    )}
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-dark-200 mb-1">Category *</label>
                    <select
                        name="category"
                        defaultValue={car?.category || "SPORTS"}
                        disabled={isPending}
                        className="w-full rounded-md border border-white/10 bg-dark-950/60 px-4 py-2 text-white outline-none transition-all focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 disabled:opacity-50"
                    >
                        <option value="SPORTS">SPORTS</option>
                        <option value="ULTRA LUXURY">ULTRA LUXURY</option>
                        <option value="HYPERCAR">HYPERCAR</option>
                        <option value="SUV">SUV</option>
                        <option value="EXECUTIVE">EXECUTIVE</option>
                    </select>
                    {state?.fieldErrors?.category && (
                        <p className="mt-1 text-xs text-red-400">{state.fieldErrors.category[0]}</p>
                    )}
                </div>

                {/* Price Per Day */}
                <div>
                    <label className="block text-sm font-medium text-dark-200 mb-1">Price Per Day ($) *</label>
                    <input
                        name="pricePerDay"
                        type="number"
                        min="0"
                        defaultValue={car?.pricePerDay || ""}
                        disabled={isPending}
                        className="w-full rounded-md border border-white/10 bg-dark-950/60 px-4 py-2 text-white placeholder:text-dark-500 outline-none transition-all focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 disabled:opacity-50"
                        placeholder="2800"
                    />
                    {state?.fieldErrors?.pricePerDay && (
                        <p className="mt-1 text-xs text-red-400">{state.fieldErrors.pricePerDay[0]}</p>
                    )}
                </div>

                {/* Seats */}
                <div>
                    <label className="block text-sm font-medium text-dark-200 mb-1">Seats *</label>
                    <input
                        name="seats"
                        type="number"
                        min="1"
                        max="20"
                        defaultValue={car?.seats || 2}
                        disabled={isPending}
                        className="w-full rounded-md border border-white/10 bg-dark-950/60 px-4 py-2 text-white placeholder:text-dark-500 outline-none transition-all focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 disabled:opacity-50"
                    />
                    {state?.fieldErrors?.seats && (
                        <p className="mt-1 text-xs text-red-400">{state.fieldErrors.seats[0]}</p>
                    )}
                </div>

                {/* Top Speed */}
                <div>
                    <label className="block text-sm font-medium text-dark-200 mb-1">Top Speed (km/h) *</label>
                    <input
                        name="topSpeed"
                        type="number"
                        defaultValue={car?.topSpeed || 300}
                        disabled={isPending}
                        className="w-full rounded-md border border-white/10 bg-dark-950/60 px-4 py-2 text-white placeholder:text-dark-500 outline-none transition-all focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 disabled:opacity-50"
                    />
                    {state?.fieldErrors?.topSpeed && (
                        <p className="mt-1 text-xs text-red-400">{state.fieldErrors.topSpeed[0]}</p>
                    )}
                </div>

                {/* Engine */}
                <div>
                    <label className="block text-sm font-medium text-dark-200 mb-1">Engine *</label>
                    <input
                        name="engine"
                        defaultValue={car?.engine || "V8"}
                        disabled={isPending}
                        className="w-full rounded-md border border-white/10 bg-dark-950/60 px-4 py-2 text-white placeholder:text-dark-500 outline-none transition-all focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 disabled:opacity-50"
                    />
                    {state?.fieldErrors?.engine && (
                        <p className="mt-1 text-xs text-red-400">{state.fieldErrors.engine[0]}</p>
                    )}
                </div>

                {/* Transmission */}
                <div>
                    <label className="block text-sm font-medium text-dark-200 mb-1">Transmission *</label>
                    <input
                        name="transmission"
                        defaultValue={car?.transmission || "Auto"}
                        disabled={isPending}
                        className="w-full rounded-md border border-white/10 bg-dark-950/60 px-4 py-2 text-white placeholder:text-dark-500 outline-none transition-all focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 disabled:opacity-50"
                    />
                    {state?.fieldErrors?.transmission && (
                        <p className="mt-1 text-xs text-red-400">{state.fieldErrors.transmission[0]}</p>
                    )}
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-dark-200 mb-1">Upload Image</label>
                    <input
                        name="imageFile"
                        type="file"
                        accept="image/*"
                        disabled={isPending}
                        className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-dark-800 file:text-gold-400 hover:file:bg-dark-700 cursor-pointer disabled:opacity-50 text-sm"
                    />
                </div>

                {/* Legacy Image URL */}
                <div>
                    <label className="block text-sm font-medium text-dark-200 mb-1">Or paste Image URL</label>
                    <input
                        name="imageUrl"
                        defaultValue={car?.imageUrl || ""}
                        disabled={isPending}
                        className="w-full rounded-md border border-white/10 bg-dark-950/60 px-4 py-2 text-white placeholder:text-dark-500 outline-none transition-all focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 disabled:opacity-50"
                        placeholder="https://example.com/car.jpg"
                    />
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isPending}
                        className="px-4 py-2 rounded-md text-sm font-medium text-dark-300 hover:text-white transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    disabled={isPending}
                    className="px-4 py-2 rounded-md bg-gold-400 text-dark-950 text-sm font-semibold uppercase tracking-wider transition-all hover:bg-gold-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isPending ? (
                        <>
                            <div className="w-4 h-4 border-2 border-dark-950/30 border-t-dark-950 rounded-full animate-spin" />
                            Saving...
                        </>
                    ) : (
                        isEditing ? "Update Car" : "Create Car"
                    )}
                </button>
            </div>
        </form>
    );
}
