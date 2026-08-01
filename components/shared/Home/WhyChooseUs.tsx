import {
    BadgeCheck,
    Building2,
    CreditCard,
    Headphones,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "Verified Listings",
        description:
            "Every property is reviewed before publication, reducing fake listings and ensuring trustworthy rentals.",
    },
    {
        icon: CreditCard,
        title: "Secure Payments",
        description:
            "Pay confidently using SSLCommerz or Stripe with secure checkout and transparent transactions.",
    },
    {
        icon: Building2,
        title: "Premium Properties",
        description:
            "Apartments, studios, family homes, villas, and commercial spaces across Bangladesh.",
    },
    {
        icon: BadgeCheck,
        title: "Trusted Landlords",
        description:
            "Connect directly with verified landlords for faster communication and smoother rentals.",
    },
    {
        icon: Headphones,
        title: "Dedicated Support",
        description:
            "Quick support whenever you need help with listings, payments, or rental requests.",
    },
    {
        icon: Sparkles,
        title: "Simple Experience",
        description:
            "A clean, intuitive platform built to make renting properties effortless from start to finish.",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="py-24">
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                        Why RentNest?
                    </span>

                    <h2 className="mt-5 text-4xl font-bold tracking-tight">
                        Everything You Need to Rent With Confidence
                    </h2>

                    <p className="mt-4 text-lg text-muted-foreground">
                        We combine verified properties, secure payments, and an intuitive
                        experience to help tenants find their next home while empowering
                        landlords to manage listings effortlessly.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="group rounded-2xl border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
                            >
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                                    <Icon className="h-7 w-7 text-primary transition-colors group-hover:text-white" />
                                </div>

                                <h3 className="mb-3 text-xl font-semibold">
                                    {feature.title}
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Stats */}
                <div className="mt-20 grid grid-cols-2 gap-6 rounded-3xl border bg-muted/40 p-8 text-center md:grid-cols-4">
                    <div>
                        <h3 className="text-3xl font-bold text-primary">10K+</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Happy Tenants
                        </p>
                    </div>

                    <div>
                        <h3 className="text-3xl font-bold text-primary">2K+</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Verified Properties
                        </p>
                    </div>

                    <div>
                        <h3 className="text-3xl font-bold text-primary">500+</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Trusted Landlords
                        </p>
                    </div>

                    <div>
                        <h3 className="text-3xl font-bold text-primary">99%</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Customer Satisfaction
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}