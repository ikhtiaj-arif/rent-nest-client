"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group";
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import { useTransition } from "react";

const OPTIONS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Available",
        value: "true",
    },
    {
        label: "Unavailable",
        value: "false",
    },
];

export default function AvailabilityFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [, startTransition] = useTransition();

    const currentValue = searchParams.get("isAvailable") ?? "all";

    const updateAvailability = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === "all") {
            params.delete("isAvailable");
        } else {
            params.set("isAvailable", value);
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
        >
            <AccordionItem value="availability">
                <AccordionTrigger>
                    Availability
                </AccordionTrigger>

                <AccordionContent>
                    <RadioGroup
                        value={currentValue}
                        onValueChange={updateAvailability}
                        className="space-y-3"
                    >
                        {OPTIONS.map((option) => (
                            <div
                                key={option.value}
                                className="flex items-center space-x-2"
                            >
                                {/* Prefixed id to avoid duplicate IDs when both mobile/desktop panels are in DOM */}
                                <RadioGroupItem
                                    id={`availability-${option.value}`}
                                    value={option.value}
                                />

                                <Label
                                    htmlFor={`availability-${option.value}`}
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