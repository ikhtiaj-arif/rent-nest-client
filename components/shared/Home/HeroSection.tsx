"use client";

import {
    ArrowRight,
    Building2,
    CheckCircle2,
    MapPin,
    Search,
    ShieldCheck,
    Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
    user?: {
        role: "TENANT" | "LANDLORD" | "ADMIN";
    } | null;
}

export default function HeroSection({
    user,
}: HeroSectionProps) {

    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();

        const query = searchTerm.trim();

        router.push(
            query
                ? `/properties?searchTerm=${encodeURIComponent(query)}`
                : "/properties"
        );
    };

    const showBecomeLandlord =
        !user || user.role === "TENANT";

    return (
        <section className="relative overflow-hidden -mt-16">
            {/* Background */}

            <div className="absolute inset-0">

                <Image
                    src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2200&auto=format&fit=crop"
                    alt="Modern Apartment"
                    fill
                    priority
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-black/65" />

                <div className="absolute inset-0 bg-gradient-to-r from-primary/35 via-black/30 to-black/75" />

            </div>

            <div className="relative container mx-auto flex min-h-[92vh] items-center px-4 py-20">

                <div className="max-w-3xl text-white">

                    {/* Badge */}

                    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
                        🏠 Bangladesh&apos;s Trusted Rental Marketplace
                    </span>

                    {/* Heading */}

                    <h1 className="mt-8 text-5xl font-black  md:text-6xl">
                        Find Your Next
                        <span className="block text-primary">
                            Rental Home
                        </span>
                        Without the Hassle.
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg leading-6 text-gray-200">
                        Browse verified apartments, studios,
                        family homes and villas across
                        Bangladesh. Search by city, property
                        name or location and connect directly
                        with trusted landlords.
                    </p>

                    {/* Search */}

                    <form
                        onSubmit={handleSearch}
                        className="mt-10 rounded-2xl bg-white p-3 shadow-2xl"
                    >
                        <div className="flex flex-col gap-3 md:flex-row">

                            <div className="relative flex-1">

                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    placeholder="Search by city, property title or location..."
                                    className="h-12 border-0 pl-12 shadow-none text-black"
                                />

                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                className="h-12 px-8"
                            >
                                Search
                            </Button>

                        </div>
                    </form>

                    {/* CTA */}

                    <div className="mt-8 flex flex-wrap gap-4">

                        <Button
                            asChild
                            size="lg"
                        >
                            <Link href="/properties">
                                Browse Properties

                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>

                        {showBecomeLandlord && (
                            <Button
                                asChild
                                variant="secondary"
                                size="lg"
                            >
                                <Link href={user ? "/profile" : "/register"}>
                                    Become a Landlord
                                </Link>
                            </Button>
                        )}

                    </div>

                    {/* Trust Pills */}

                    <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-200">

                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                            Verified Listings
                        </div>

                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                            Secure Payments
                        </div>

                        <div className="flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-primary" />
                            Trusted Landlords
                        </div>

                    </div>

                    {/* Stats */}

                    <div className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">

                        <Stat
                            value="500+"
                            label="Properties"
                        />

                        <Stat
                            value="120+"
                            label="Landlords"
                        />

                        <Stat
                            value="2K+"
                            label="Happy Tenants"
                        />

                        <Stat
                            value="20+"
                            label="Cities"
                        />

                    </div>

                </div>

                {/* Featured Property */}

                <div className="absolute bottom-10 right-6 hidden w-80 overflow-hidden rounded-3xl bg-white shadow-2xl xl:block">

                    <div className="relative h-52">

                        <Image
                            src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop"
                            alt="Featured Property"
                            fill
                            className="object-cover"
                        />

                    </div>

                    <div className="space-y-4 p-6">

                        <div>

                            <p className="text-sm text-primary">
                                Featured Property
                            </p>

                            <h3 className="text-xl font-bold">
                                Luxury Apartment
                            </h3>

                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground">

                            <MapPin className="h-4 w-4" />

                            Gulshan, Dhaka

                        </div>

                        <div className="flex items-center justify-between">

                            <p className="text-2xl font-bold text-primary">
                                ৳35,000
                            </p>

                            <span className="text-sm text-muted-foreground">
                                / month
                            </span>

                        </div>

                        <div className="flex items-center gap-2">

                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

                            <span className="font-semibold">
                                4.9
                            </span>

                            <span className="text-muted-foreground">
                                (120 Reviews)
                            </span>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}

function Stat({
    value,
    label,
}: {
    value: string;
    label: string;
}) {
    return (
        <div>

            <h3 className="text-4xl font-bold">
                {value}
            </h3>

            <p className="mt-1 text-gray-300">
                {label}
            </p>

        </div>
    );
}