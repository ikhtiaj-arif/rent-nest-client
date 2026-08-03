"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { AuthState } from "@/lib/types";
import { cancelRentalRequestAction } from "../../_actions/tenantActions";

const initialState: AuthState = {
    success: false,
    statusCode: 0,
    message: "",
};

interface CancelRequestDialogProps {
    rentalRequestId: string;
}

export default function CancelRequestDialog({
    rentalRequestId,
}: CancelRequestDialogProps) {
    const action = cancelRentalRequestAction.bind(null, rentalRequestId);

    const [state, formAction, pending] = useActionState(
        action,
        initialState
    );

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            toast.success(state.message);
        } else {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full gap-2">
                    Cancel Request
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Cancel Rental Request?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This action cannot be undone. Your rental request
                        will be permanently cancelled.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={pending}>
                        Keep Request
                    </AlertDialogCancel>

                    <form action={formAction}>
                        <AlertDialogAction asChild>
                            <Button
                                type="submit"
                                variant="destructive"
                                disabled={pending}
                            >
                                {pending
                                    ? "Cancelling..."
                                    : "Yes, Cancel Request"}
                            </Button>
                        </AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}