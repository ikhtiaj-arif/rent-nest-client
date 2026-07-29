"use client";

import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import { useMemo, useState, useTransition } from "react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Category {
    id: string;
    name: string;
}

interface Props {
    categories: Category[];
}

export default function CategoryFilter({
    categories,
}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [, startTransition] = useTransition();

    const [search, setSearch] = useState("");

    const selectedCategory =
        searchParams.get("categoryId");

    const filteredCategories = useMemo(() => {
        return categories?.filter((category) =>
            category.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [categories, search]);

    const updateCategory = (
        categoryId?: string
    ) => {
        const params = new URLSearchParams(
            searchParams.toString()
        );

        if (!categoryId) {
            params.delete("categoryId");
        } else {
            params.set("categoryId", categoryId);
        }

        params.set("page", "1");

        startTransition(() => {
            router.push(
                `${pathname}?${params.toString()}`
            );
        });
    };

    return (
        <Accordion
            type="single"
            collapsible
            defaultValue="categories"
        >
            <AccordionItem value="categories">
                <AccordionTrigger>
                    <div className="flex items-center gap-2">
                        Categories
                        <span className="text-xs text-muted-foreground">
                            ({categories?.length})
                        </span>
                    </div>
                </AccordionTrigger>

                <AccordionContent className="space-y-4">

                    <Input
                        placeholder="Search category..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    <ScrollArea className="h-56 rounded-md border">
                        <div className="space-y-3 p-4">

                            {filteredCategories?.length ? (
                                filteredCategories?.map(
                                    (category) => (
                                        <div
                                            key={category.id}
                                            className="flex items-center gap-2"
                                        >
                                            <Checkbox
                                                checked={
                                                    selectedCategory ===
                                                    category.id
                                                }
                                                onCheckedChange={(
                                                    checked
                                                ) =>
                                                    updateCategory(
                                                        checked
                                                            ? category.id
                                                            : undefined
                                                    )
                                                }
                                            />

                                            <Label className="cursor-pointer font-normal">
                                                {
                                                    category.name
                                                }
                                            </Label>
                                        </div>
                                    )
                                )
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    No categories found.
                                </p>
                            )}

                        </div>
                    </ScrollArea>

                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}