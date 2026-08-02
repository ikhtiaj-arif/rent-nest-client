"use client";

import { useActionState, useEffect } from "react";

import { Calendar, Loader2 } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";

import { createRentalRequestAction } from "@/app/(dashboardGroup)/_actions/tenantActions";
import { Property, initialAuthState } from "@/lib/types";
import { useRouter } from "next/navigation";

interface RentalRequestModalProps {
    property: Property;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function RentalRequestModal({
    property,
    isOpen,
    onOpenChange,
}: RentalRequestModalProps) {
    const router = useRouter();

    const [state, action, pending] = useActionState(
        createRentalRequestAction,
        initialAuthState
    );

    useEffect(() => {
        if (!state) return;

        if (state.success) {
            toast.success(state.message || "Rental request submitted.");

            // setMoveInDate("");

            onOpenChange(false);
            router.push("/dashboard/rental-requests");
        } else if (state.message) {
            toast.error(state.message);
        }
    }, [state, onOpenChange]);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-md">

                <DialogHeader>
                    <DialogTitle>
                        Request Rental
                    </DialogTitle>

                    <DialogDescription>
                        Request to rent {property.title} in {property.city}
                    </DialogDescription>
                </DialogHeader>

                <form
                    action={action}
                    className="space-y-6"
                >
                    <input
                        type="hidden"
                        name="propertyId"
                        value={property.id}
                    />

                    <div className="rounded-lg bg-muted p-4">
                        <p className="text-sm text-muted-foreground">
                            Monthly Rent
                        </p>

                        <p className="text-2xl font-bold">
                            ${property.price.toLocaleString()}
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                            {property.category.name}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="moveInDate">
                            Move-in Date
                        </Label>

                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                                id="moveInDate"
                                name="moveInDate"
                                type="date"
                                required
                                min={property.availableFrom
                                    ? new Date(property.availableFrom).toISOString().split("T")[0]
                                    : new Date().toISOString().split("T")[0]}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3">

                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            disabled={pending}
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="flex-1"
                            disabled={pending}
                        >
                            {pending && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}

                            Submit Request
                        </Button>

                    </div>
                </form>

            </DialogContent>
        </Dialog>
    );
}