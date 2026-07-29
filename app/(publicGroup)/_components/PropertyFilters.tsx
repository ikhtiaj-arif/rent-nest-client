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
import AvailabilityFilter from "./AvailabilityFilter";
import CategoryFilter from "./CategoryFilter";
import SortFilter from "./SortFilter";
import PriceFilter from "./PriceFilter";
import CityFilter from "./CityFilter";

// import SortFilter from "./SortFilter";
// import AvailabilityFilter from "./AvailabilityFilter";
// import CategoryFilter from "./CategoryFilter";
// import CityFilter from "./CityFilter";
// import PriceFilter from "./PriceFilter";

interface Category {
    id: string;
    name: string;
}

interface Props {
    categories: Category[];
    cities: string[];
}

export default function PropertyFilters({
    categories,
    cities,
}: Props) {
    const FiltersContent = (
        <div className="space-y-2">

            <SortFilter />

            <AvailabilityFilter />

            <CategoryFilter categories={categories} />

            <CityFilter cities={cities} />

            <PriceFilter />

        </div>
    );

    return (
        <>
            {/* Mobile */}

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
                            {FiltersContent}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop */}

            <Card className="sticky top-24 hidden lg:block">

                <CardHeader className="pb-4">

                    <CardTitle>
                        Filters
                    </CardTitle>

                </CardHeader>

                <CardContent>

                    {FiltersContent}

                </CardContent>

            </Card>
        </>
    );
}