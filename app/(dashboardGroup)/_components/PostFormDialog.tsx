"use client";

import { useState } from "react";
import { Pencil, Plus } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Property } from "@/lib/types";
import PropertyForm from "./PropertyForm";

interface Props {
    mode: "create" | "edit";
    property?: Property;
}

export default function PropertyDialog({
    mode,
    property,
}: Props) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {mode === "create" ? (
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Property
                    </Button>
                ) : (
                    <Button variant="outline" size="sm">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent
                className="
                    w-[95vw]
                    max-w-6xl
                    h-[90vh]
                    overflow-hidden
                    p-0
                "
            >
                <DialogHeader className="border-b px-6 py-4">
                    <DialogTitle className="text-2xl">
                        {mode === "create"
                            ? "Create Property"
                            : "Edit Property"}
                    </DialogTitle>
                </DialogHeader>

                <PropertyForm
                    mode={mode}
                    property={property}
                    onSuccess={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}