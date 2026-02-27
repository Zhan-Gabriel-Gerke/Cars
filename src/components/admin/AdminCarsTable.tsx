"use client";

import { useTransition, useState } from "react";
import Image from "next/image";
import { Edit2, Trash2, Plus, X } from "lucide-react";
import type { Car } from "@prisma/client";
import { deleteCar } from "@/actions/car";
import { CarForm } from "./CarForm";

interface AdminCarsTableProps {
    cars: Car[];
}

export function AdminCarsTable({ cars }: AdminCarsTableProps) {
    const [isPending, startTransition] = useTransition();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCar, setEditingCar] = useState<Car | null>(null);

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this car? This action cannot be undone.")) {
            startTransition(async () => {
                const result = await deleteCar(id);
                if (result?.error) {
                    alert(result.error);
                }
            });
        }
    };

    const handleEdit = (car: Car) => {
        setEditingCar(car);
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingCar(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-serif font-bold text-white">Fleet Management</h2>
                <button
                    onClick={() => {
                        setEditingCar(null);
                        setIsFormOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gold-400 text-dark-950 rounded-md font-semibold text-sm uppercase tracking-wider transition-colors hover:bg-gold-300"
                >
                    <Plus className="h-4 w-4" />
                    Add New Car
                </button>
            </div>

            {/* Modal Overlay for Form (Simple Implementation) */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-950/80 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="relative w-full max-w-2xl bg-dark-900 border border-white/10 rounded-xl shadow-2xl p-6 my-8">
                        <button
                            onClick={closeForm}
                            className="absolute top-4 right-4 text-dark-400 hover:text-white transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        <h3 className="text-xl font-bold text-white mb-6">
                            {editingCar ? "Edit Car" : "Add New Car"}
                        </h3>
                        <CarForm
                            car={editingCar}
                            onSuccess={closeForm}
                            onCancel={closeForm}
                        />
                    </div>
                </div>
            )}

            {/* Data Table */}
            <div className="bg-dark-900/50 border border-white/5 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-dark-200">
                        <thead className="bg-dark-800/50 text-xs uppercase text-dark-300 border-b border-white/5">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-medium">Image</th>
                                <th scope="col" className="px-6 py-4 font-medium">Name</th>
                                <th scope="col" className="px-6 py-4 font-medium">Category</th>
                                <th scope="col" className="px-6 py-4 font-medium">Price/Day</th>
                                <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {cars.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-dark-400">
                                        No cars found. Click "Add New Car" to create one.
                                    </td>
                                </tr>
                            ) : (
                                cars.map((car) => (
                                    <tr key={car.id} className="hover:bg-dark-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="relative h-12 w-20 rounded-md overflow-hidden bg-dark-800 flex items-center justify-center">
                                                {car.imageUrl ? (
                                                    <Image
                                                        src={car.imageUrl}
                                                        alt={car.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-xl opacity-30">🏎️</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-white">{car.name}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center rounded-md bg-dark-800 px-2 py-1 text-xs font-medium text-gold-400 border border-white/5">
                                                {car.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium">${car.pricePerDay}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-3 text-dark-400">
                                                <button
                                                    onClick={() => handleEdit(car)}
                                                    disabled={isPending}
                                                    className="hover:text-white transition-colors disabled:opacity-50"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(car.id)}
                                                    disabled={isPending}
                                                    className="hover:text-red-400 transition-colors disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
