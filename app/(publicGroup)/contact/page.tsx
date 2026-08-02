import {
    Clock,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
    return (
        <main className="container mx-auto max-w-5xl px-6 py-16">
            {/* Hero */}
            <section className="text-center">
                <h1 className="text-4xl font-bold md:text-5xl">
                    Contact Us
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
                    We&apos;d love to hear from you. Whether you have a question,
                    feedback, or need support, our team is always ready to help.
                </p>
            </section>

            <section className="mt-16 grid gap-8 md:grid-cols-2">
                <Card>
                    <CardContent className="space-y-8 p-8">
                        <div className="flex items-start gap-4">
                            <Mail className="mt-1 h-6 w-6 text-primary" />

                            <div>
                                <h3 className="font-semibold">
                                    Email
                                </h3>

                                <p className="text-muted-foreground">
                                    support@rentnest.com
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Phone className="mt-1 h-6 w-6 text-primary" />

                            <div>
                                <h3 className="font-semibold">
                                    Phone
                                </h3>

                                <p className="text-muted-foreground">
                                    +880 1700-000000
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <MapPin className="mt-1 h-6 w-6 text-primary" />

                            <div>
                                <h3 className="font-semibold">
                                    Office
                                </h3>

                                <p className="text-muted-foreground">
                                    Green Road,
                                    <br />
                                    Dhaka 1205,
                                    <br />
                                    Bangladesh
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Clock className="mt-1 h-6 w-6 text-primary" />

                            <div>
                                <h3 className="font-semibold">
                                    Working Hours
                                </h3>

                                <p className="text-muted-foreground">
                                    Monday – Friday
                                    <br />
                                    9:00 AM – 6:00 PM (GMT+6)
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex h-full flex-col justify-center p-8">
                        <h2 className="mb-4 text-2xl font-semibold">
                            How Can We Help?
                        </h2>

                        <p className="mb-4 leading-7 text-muted-foreground">
                            Whether you&apos;re looking for a rental property,
                            managing listings as a landlord, or experiencing a
                            technical issue, our support team is here to assist
                            you every step of the way.
                        </p>

                        <p className="leading-7 text-muted-foreground">
                            We value your feedback and are committed to
                            continually improving our platform to provide a
                            better rental experience for everyone.
                        </p>
                    </CardContent>
                </Card>
            </section>
        </main>
    );
}