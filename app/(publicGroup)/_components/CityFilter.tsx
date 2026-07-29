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

interface Props {
    cities: string[];
}

export default function CityFilter({
    cities,
}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [, startTransition] = useTransition();

    const [search, setSearch] = useState("");

    const selectedCity = searchParams.get("city");

    const filteredCities = useMemo(() => {
        return cities?.filter((city) =>
            city.toLowerCase().includes(search.toLowerCase())
        );
    }, [cities, search]);

    const updateCity = (city?: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (!city) {
            params.delete("city");
        } else {
            params.set("city", city);
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
            defaultValue="cities"
        >
            <AccordionItem value="cities">
                <AccordionTrigger>
                    <div className="flex items-center gap-2">
                        Cities
                        <span className="text-xs text-muted-foreground">
                            ({cities?.length})
                        </span>
                    </div>
                </AccordionTrigger>

                <AccordionContent className="space-y-4">

                    <Input
                        placeholder="Search city..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <ScrollArea className="h-56 rounded-md border">
                        <div className="space-y-3 p-4">

                            {filteredCities?.length ? (
                                filteredCities.map((city) => (
                                    <div
                                        key={city}
                                        className="flex items-center gap-2"
                                    >
                                        <Checkbox
                                            checked={selectedCity === city}
                                            onCheckedChange={(checked) =>
                                                updateCity(
                                                    checked
                                                        ? city
                                                        : undefined
                                                )
                                            }
                                        />

                                        <Label className="cursor-pointer font-normal">
                                            {city}
                                        </Label>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    No cities found.
                                </p>
                            )}

                        </div>
                    </ScrollArea>

                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}