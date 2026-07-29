"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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

export default function PropertySort() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [, startTransition] = useTransition();

    const currentSort =
        searchParams.get("sort") ?? "newest";

    const handleSort = (value: string) => {
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
        <Select
            value={currentSort}
            onValueChange={handleSort}
        >
            <SelectTrigger className="w-full sm:w-56">
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                {SORT_OPTIONS.map((item) => (
                    <SelectItem
                        key={item.value}
                        value={item.value}
                    >
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}