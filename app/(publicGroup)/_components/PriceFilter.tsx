"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function PriceFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [, startTransition] = useTransition();

    const [minPrice, setMinPrice] = useState(
        searchParams.get("minPrice") ?? ""
    );

    const [maxPrice, setMaxPrice] = useState(
        searchParams.get("maxPrice") ?? ""
    );

    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = new URLSearchParams(searchParams);

            if (minPrice) {
                params.set("minPrice", minPrice);
            } else {
                params.delete("minPrice");
            }

            if (maxPrice) {
                params.set("maxPrice", maxPrice);
            } else {
                params.delete("maxPrice");
            }

            params.set("page", "1");

            startTransition(() => {
                router.push(`${pathname}?${params.toString()}`);
            });
        }, 500);

        return () => clearTimeout(timeout);
    }, [minPrice, maxPrice]);

    return (
        <Accordion type="single" collapsible defaultValue="price">
            <AccordionItem value="price">
                <AccordionTrigger>
                    Monthly Rent
                </AccordionTrigger>

                <AccordionContent>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <Label>Minimum</Label>

                            <Input
                                type="number"
                                min={0}
                                placeholder="0"
                                value={minPrice}
                                onChange={(e) =>
                                    setMinPrice(e.target.value)
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Maximum</Label>

                            <Input
                                type="number"
                                min={0}
                                placeholder="50000"
                                value={maxPrice}
                                onChange={(e) =>
                                    setMaxPrice(e.target.value)
                                }
                            />
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}