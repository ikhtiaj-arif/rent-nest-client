import {
    HdIcon
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PropertyCategory } from "@/lib/types";



export default function CategoriesSection({ categories }: { categories: PropertyCategory[] }) {
    return (
        <section className="bg-muted/30 py-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                        Browse by Category
                    </span>

                    <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                        Find the Perfect Property Type
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                        Explore thousands of verified rental properties across different
                        categories tailored to your lifestyle and budget.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categories?.map((category: PropertyCategory) => {
                        // const Icon = category.icon;

                        return (
                            <Link key={category.name}
                                href={category.id ? `/properties?category=${category.id}` : "/properties"}
                            >
                                <Card className="group h-full cursor-pointer border transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl">
                                    <CardContent className="flex flex-col items-center p-8 text-center">
                                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary">
                                            <HdIcon className="h-8 w-8 text-primary transition-colors group-hover:text-white" />
                                        </div>

                                        <h3 className="text-xl font-semibold">
                                            {category.name}
                                        </h3>

                                        {/* <p className="mt-2 text-sm text-muted-foreground">
                      {category.properties}
                    </p> */}

                                        <Button
                                            variant="ghost"
                                            className="mt-6 group-hover:text-primary"
                                        >
                                            Explore →
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}