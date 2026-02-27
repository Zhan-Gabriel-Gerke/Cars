export interface Car {
    id: string;
    category: "SPORTS" | "ULTRA LUXURY" | "HYPERCAR" | string;
    name: string;
    seats: number;
    topSpeed: number; // in mph or km/h based on UI preference
    engine: string;   // e.g., "V12", "H6"
    transmission: string; // e.g., "Auto", "PDK"
    pricePerDay: number;
    imageUrl: string;
}
