import { Building2, Users, ShieldCheck, Home } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
    return (
        <main className="container mx-auto max-w-6xl px-6 py-16">
            {/* Hero */}
            <section className="text-center">
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                    About HomeHaven
                </h1>

                <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
                    HomeHaven is a modern property rental platform that connects
                    tenants and landlords through a simple, secure, and transparent
                    rental experience. Whether you&apos;re searching for your next home
                    or managing multiple properties, we&apos;re here to make renting
                    easier.
                </p>
            </section>

            {/* Cards */}
            <section className="mt-16 grid gap-6 md:grid-cols-2">
                <Card>
                    <CardContent className="p-8">
                        <Building2 className="mb-5 h-10 w-10 text-primary" />

                        <h2 className="mb-3 text-2xl font-semibold">
                            Our Mission
                        </h2>

                        <p className="leading-7 text-muted-foreground">
                            Our mission is to simplify the rental process by
                            providing verified listings, transparent communication,
                            and a secure platform that benefits both tenants and
                            landlords.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-8">
                        <ShieldCheck className="mb-5 h-10 w-10 text-primary" />

                        <h2 className="mb-3 text-2xl font-semibold">
                            Our Vision
                        </h2>

                        <p className="leading-7 text-muted-foreground">
                            We envision a rental marketplace where finding or
                            listing a property is fast, trustworthy, and
                            completely hassle-free.
                        </p>
                    </CardContent>
                </Card>
            </section>

            {/* Features */}
            <section className="mt-20">
                <h2 className="mb-10 text-center text-3xl font-bold">
                    Why Choose HomeHaven?
                </h2>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            icon: Home,
                            title: "Verified Properties",
                            description:
                                "Browse trusted rental listings with accurate details.",
                        },
                        {
                            icon: Users,
                            title: "Easy Communication",
                            description:
                                "Connect directly with landlords and tenants.",
                        },
                        {
                            icon: ShieldCheck,
                            title: "Secure Platform",
                            description:
                                "Reliable authentication and safe rental requests.",
                        },
                        {
                            icon: Building2,
                            title: "Modern Experience",
                            description:
                                "Responsive design for desktop, tablet, and mobile.",
                        },
                    ].map((item) => {
                        const Icon = item.icon;

                        return (
                            <Card key={item.title}>
                                <CardContent className="flex flex-col items-center p-8 text-center">
                                    <Icon className="mb-4 h-10 w-10 text-primary" />

                                    <h3 className="font-semibold">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm text-muted-foreground">
                                        {item.description}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}