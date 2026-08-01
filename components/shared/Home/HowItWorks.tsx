import {
  CheckCircle2,
  CreditCard,
  Home,
  Search,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse Properties",
    description:
      "Search thousands of verified apartments, houses, villas, and studios using powerful filters.",
  },
  {
    icon: Home,
    title: "Request to Rent",
    description:
      "Open the property details page and submit your rental request in just a few clicks.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description:
      "Once your request is approved, complete your payment securely through our integrated payment gateway.",
  },
  {
    icon: CheckCircle2,
    title: "Move Into Your Home",
    description:
      "Receive confirmation, connect with the landlord, and move into your new home with confidence.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">

        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            Simple Process
          </span>

          <h2 className="mt-5 text-4xl font-bold">
            Renting Has Never Been Easier
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            From discovering properties to moving in, RentNest keeps the
            entire rental journey simple, transparent and secure.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">

          {/* Timeline */}
          <div className="absolute left-6 top-0 hidden h-full w-1 rounded-full bg-border md:block lg:left-1/2 lg:-translate-x-1/2" />

          <div className="space-y-16">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className={`relative flex flex-col items-start gap-8 lg:flex-row ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}

                  <div className="w-full lg:w-1/2">

                    <div className="rounded-2xl border bg-background p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>

                      <span className="text-sm font-semibold text-primary">
                        Step {index + 1}
                      </span>

                      <h3 className="mt-2 text-2xl font-bold">
                        {step.title}
                      </h3>

                      <p className="mt-4 leading-7 text-muted-foreground">
                        {step.description}
                      </p>

                    </div>

                  </div>

                  {/* Timeline Circle */}

                  <div className="absolute left-6 hidden h-5 w-5 rounded-full border-4 border-primary bg-background lg:left-1/2 lg:block lg:-translate-x-1/2" />

                  {/* Empty side */}

                  <div className="hidden lg:block lg:w-1/2" />

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}