"use client";

import { useMemo, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Filter, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

type Category = {
    id: string;
    name: string;
};

interface Props {
    categories: Category[];
    currentQuery: Record<string, string | string[] | undefined>;
}

export default function PropertyFilters({
    categories,
}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [, startTransition] = useTransition();

    const params = useMemo(
        () => new URLSearchParams(searchParams.toString()),
        [searchParams]
    );

    const updateQuery = (key: string, value?: string) => {
        const next = new URLSearchParams(params);

        if (!value) {
            next.delete(key);
        } else {
            next.set(key, value);
        }

        next.set("page", "1");

        startTransition(() => {
            router.push(`${pathname}?${next.toString()}`);
        });
    };

    const resetFilters = () => {
        startTransition(() => {
            router.push(pathname);
        });
    };

    const content = (
        <div className="space-y-6">

            {/* Category */}

            <div className="space-y-3">
                <Label className="text-sm font-semibold">
                    Category
                </Label>

                <div className="space-y-3">

                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="flex items-center space-x-2"
                        >
                            <Checkbox
                                checked={
                                    searchParams.get("categoryId") === category.id
                                }
                                onCheckedChange={(checked) =>
                                    updateQuery(
                                        "categoryId",
                                        checked ? category.id : undefined
                                    )
                                }
                            />

                            <Label className="font-normal">
                                {category.name}
                            </Label>
                        </div>
                    ))}

                </div>
            </div>

            {/* Availability */}

            <div className="space-y-3">

                <Label className="text-sm font-semibold">
                    Availability
                </Label>

                <div className="space-y-2">

                    <Button
                        variant={
                            !searchParams.get("isAvailable")
                                ? "secondary"
                                : "ghost"
                        }
                        className="w-full justify-start"
                        onClick={() =>
                            updateQuery("isAvailable")
                        }
                    >
                        All
                    </Button>

                    <Button
                        variant={
                            searchParams.get("isAvailable") === "true"
                                ? "secondary"
                                : "ghost"
                        }
                        className="w-full justify-start"
                        onClick={() =>
                            updateQuery("isAvailable", "true")
                        }
                    >
                        Available
                    </Button>

                    <Button
                        variant={
                            searchParams.get("isAvailable") === "false"
                                ? "secondary"
                                : "ghost"
                        }
                        className="w-full justify-start"
                        onClick={() =>
                            updateQuery("isAvailable", "false")
                        }
                    >
                        Unavailable
                    </Button>

                </div>

            </div>

            {/* Price */}

            <div className="space-y-3">

                <Label className="text-sm font-semibold">
                    Price Range
                </Label>

                <div className="grid grid-cols-2 gap-2">

                    <Input
                        type="number"
                        placeholder="Min"
                        defaultValue={
                            searchParams.get("minPrice") ?? ""
                        }
                        onBlur={(e) =>
                            updateQuery(
                                "minPrice",
                                e.target.value || undefined
                            )
                        }
                    />

                    <Input
                        type="number"
                        placeholder="Max"
                        defaultValue={
                            searchParams.get("maxPrice") ?? ""
                        }
                        onBlur={(e) =>
                            updateQuery(
                                "maxPrice",
                                e.target.value || undefined
                            )
                        }
                    />

                </div>

            </div>

            {/* City */}

            <div className="space-y-3">

                <Label className="text-sm font-semibold">
                    City
                </Label>

                <Input
                    placeholder="Dhaka"
                    defaultValue={searchParams.get("city") ?? ""}
                    onBlur={(e) =>
                        updateQuery(
                            "city",
                            e.target.value || undefined
                        )
                    }
                />

            </div>

            <Button
                variant="outline"
                className="w-full"
                onClick={resetFilters}
            >
                <RotateCcw className="mr-2 h-4 w-4" />

                Reset Filters
            </Button>

        </div>
    );

    return (
        <>
            {/* Desktop */}

            <Card className="sticky top-24 hidden lg:block">

                <CardHeader>
                    <CardTitle>
                        Filters
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    {content}
                </CardContent>

            </Card>

            {/* Mobile */}

            <div className="mb-4 lg:hidden">

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

                    <SheetContent side="left">

                        <SheetHeader>

                            <SheetTitle>
                                Filters
                            </SheetTitle>

                        </SheetHeader>

                        <div className="mt-6">
                            {content}
                        </div>

                    </SheetContent>

                </Sheet>

            </div>
        </>
    );
}