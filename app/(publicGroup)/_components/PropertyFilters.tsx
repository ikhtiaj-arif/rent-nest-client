"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Filter } from "lucide-react";
import Link from "next/link";
import AvailabilityFilter from "./AvailabilityFilter";
import CategoryFilter from "./CategoryFilter";
import CityFilter from "./CityFilter";
import PriceFilter from "./PriceFilter";
import SortFilter from "./SortFilter";

interface Category {
    id: string;
    name: string;
}

interface Props {
    categories: Category[];
    cities: string[];
}

// Extracted as a real component so only one instance is mounted at a time
// (mobile sheet OR desktop card — not both simultaneously).
function FiltersContent({ categories, cities }: Props) {
    return (
        <div className="space-y-2">
            <SortFilter />
            <AvailabilityFilter />
            <CategoryFilter categories={categories} />
            <CityFilter cities={cities} />
            <PriceFilter />
        </div>
    );
}

export default function PropertyFilters({
    categories,
    cities,
}: Props) {
    return (
        <>
            {/* Mobile — only visible below lg breakpoint */}

            <div className="mb-6 lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full"
                        >
                            <Filter className="mr-2 h-4 w-4" />
                            Filters
                        </Button>
                    </SheetTrigger>

                    <SheetContent
                        side="left"
                        className="w-full max-w-sm overflow-y-auto"
                    >
                        <SheetHeader>
                            <SheetTitle>
                                Filters
                            </SheetTitle>

                        </SheetHeader>

                        <div className="mt-6">
                            <FiltersContent
                                categories={categories}
                                cities={cities}
                            />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop — only visible at lg and above */}

            {/* MODIFIED: Fixed sticky positioning and width */}
            <Card className="sticky top-20 hidden lg:block border-border">

                <CardHeader className="pb-4 border-b border-border">

                    <div className="flex items-center justify-between gap-2">
                        <CardTitle>
                            Filters
                        </CardTitle>
                        <Button
                            asChild
                            variant="ghost"
                            size="sm"
                        >
                            <Link href="/properties">
                                Clear
                            </Link>
                        </Button>
                    </div>

                </CardHeader>

                <CardContent className="pt-4">

                    <FiltersContent
                        categories={categories}
                        cities={cities}
                    />

                </CardContent>

            </Card>
        </>
    );
}
