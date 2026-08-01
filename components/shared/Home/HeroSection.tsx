import { ArrowRight, MapPin, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1800&auto=format&fit=crop"
                    alt="Modern Apartment"
                    fill
                    priority
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-black/60" />

                <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-black/30 to-black/60" />
            </div>

            <div className="relative container mx-auto flex min-h-[90vh] items-center px-4 py-24">
                <div className="max-w-3xl text-white">

                    <span className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
                        🏠 Bangladesh&apos;s Modern Rental Marketplace
                    </span>

                    <h1 className="text-5xl font-extrabold leading-tight md:text-6xl">
                        Find Your
                        <span className="text-primary"> Perfect Rental </span>
                        Home Today
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg text-gray-200">
                        Browse verified apartments, studios, family homes and villas across
                        Bangladesh. Rent securely with trusted landlords and seamless online
                        payments.
                    </p>

                    {/* Search Box */}

                    <div className="mt-10 rounded-2xl bg-white/95 p-3 shadow-2xl backdrop-blur">

                        <div className="flex flex-col gap-3 md:flex-row">

                            <div className="relative flex-1">

                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    placeholder="Search by city, property, area..."
                                    className="h-12 border-none pl-12 shadow-none"
                                />

                            </div>

                            <Button size="lg" className="h-12 px-8">
                                Search
                            </Button>

                        </div>

                    </div>

                    {/* CTA */}

                    <div className="mt-8 flex flex-wrap gap-4">

                        <Button asChild size="lg">
                            <Link href="/properties">
                                Browse Properties
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="secondary"
                        >
                            <Link href="/register">
                                Become a Landlord
                            </Link>
                        </Button>

                    </div>

                    {/* Stats */}

                    <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">

                        <Stat
                            value="500+"
                            label="Properties"
                        />

                        <Stat
                            value="150+"
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

                {/* Floating Card */}

                <div className="absolute bottom-10 right-10 hidden rounded-2xl bg-white p-5 shadow-2xl lg:block">

                    <div className="flex items-center gap-3">

                        <div className="rounded-full bg-primary/10 p-3">

                            <MapPin className="h-6 w-6 text-primary" />

                        </div>

                        <div>

                            <p className="font-semibold text-foreground">
                                Featured Location
                            </p>

                            <p className="text-sm text-muted-foreground">
                                Gulshan, Dhaka
                            </p>

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
            <h3 className="text-3xl font-bold">{value}</h3>

            <p className="text-gray-300">
                {label}
            </p>
        </div>
    );
}