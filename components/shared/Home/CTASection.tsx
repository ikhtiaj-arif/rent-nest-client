import Link from "next/link";
import { ArrowRight, Building2, Home } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-primary-foreground lg:px-16">

          {/* Background Decoration */}
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">

            {/* Left Content */}
            <div>
              <span className="rounded-full bg-white/20 px-4 py-1 text-sm font-medium">
                Join RentNest Today
              </span>

              <h2 className="mt-6 text-4xl font-bold leading-tight lg:text-5xl">
                Find Your Next Home or
                <br />
                List Your Property
              </h2>

              <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">
                Thousands of tenants and landlords trust RentNest to make
                renting simple, secure, and stress-free.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="gap-2"
                >
                  <Link href="/properties">
                    Browse Properties
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white bg-transparent text-white hover:bg-white hover:text-primary"
                >
                  <Link href="/register">
                    Become a Landlord
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Cards */}
            <div className="grid gap-5">

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                  <Home className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-semibold">
                  Looking for a Rental?
                </h3>

                <p className="mt-2 text-primary-foreground/80">
                  Browse verified listings, send rental requests, and pay
                  securely online.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                  <Building2 className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-semibold">
                  Own a Property?
                </h3>

                <p className="mt-2 text-primary-foreground/80">
                  List your property, manage rental requests, and receive
                  payments—all from one dashboard.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}