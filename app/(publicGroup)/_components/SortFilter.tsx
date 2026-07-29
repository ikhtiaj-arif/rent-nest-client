"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import { useTransition } from "react";

const SORT_OPTIONS = [
    {
        label: "Newest",
        value: "newest",
    },
    {
        label: "Oldest",
        value: "oldest",
    },
    {
        label: "Price: Low → High",
        value: "price_asc",
    },
    {
        label: "Price: High → Low",
        value: "price_desc",
    },
    {
        label: "Highest Rated",
        value: "rating_desc",
    },
];

export default function SortFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [, startTransition] = useTransition();

    const sort = searchParams.get("sort") ?? "newest";

    const updateSort = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === "newest") {
            params.delete("sort");
        } else {
            params.set("sort", value);
        }

        params.set("page", "1");

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
        });
    };

    return (
        <Accordion
            type="single"
            collapsible
            defaultValue="sort"
        >
            <AccordionItem value="sort">
                <AccordionTrigger>
                    Sort By
                </AccordionTrigger>

                <AccordionContent>
                    <RadioGroup
                        value={sort}
                        onValueChange={updateSort}
                        className="space-y-3"
                    >
                        {SORT_OPTIONS.map((option) => (
                            <div
                                key={option.value}
                                className="flex items-center space-x-2"
                            >
                                {/* Prefixed id to avoid duplicate IDs when both mobile/desktop panels are in DOM */}
                                <RadioGroupItem
                                    value={option.value}
                                    id={`sort-${option.value}`}
                                />

                                <Label
                                    htmlFor={`sort-${option.value}`}
                                    className="cursor-pointer font-normal"
                                >
                                    {option.label}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}