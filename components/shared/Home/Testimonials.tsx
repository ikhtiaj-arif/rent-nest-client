import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
    {
        name: "Sarah Ahmed",
        role: "Tenant",
        image: "https://i.pravatar.cc/150?img=32",
        review:
            "RentNest made finding my apartment incredibly easy. The entire rental process was smooth and transparent.",
        rating: 5,
    },
    {
        name: "John Smith",
        role: "Landlord",
        image: "https://i.pravatar.cc/150?img=12",
        review:
            "Managing my properties has never been easier. I can approve tenants and track everything in one place.",
        rating: 5,
    },
    {
        name: "Emily Wilson",
        role: "Tenant",
        image: "https://i.pravatar.cc/150?img=25",
        review:
            "The payment process was secure and the UI is beautiful. Highly recommended!",
        rating: 5,
    },
];

export default function Testimonials() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                        Testimonials
                    </span>

                    <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                        Loved by Tenants & Landlords
                    </h2>

                    <p className="mt-4 text-muted-foreground">
                        Thousands of users trust RentNest for a seamless rental experience.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.name}
                            className="rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="mb-4 flex">
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>

                            <p className="mb-6 italic leading-relaxed text-muted-foreground">
                                {`"${testimonial.review}"`}
                            </p>

                            <div className="flex items-center gap-3">
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    width={48}
                                    height={48}
                                    className="rounded-full object-cover"
                                />

                                <div>
                                    <h4 className="font-semibold">{testimonial.name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}