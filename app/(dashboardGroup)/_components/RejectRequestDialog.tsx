"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { initialAuthState } from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateLandlordRequestAction } from "../_actions/adminActions";

interface RejectRequestDialogProps {
    requestId: string;
}

export default function RejectRequestDialog({
    requestId,
}: RejectRequestDialogProps) {
    const [open, setOpen] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);

    const [state, formAction, pending] = useActionState(
        updateLandlordRequestAction.bind(null, requestId),
        initialAuthState
    );

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            toast.success(state.message);

            queueMicrotask(() => {
                formRef.current?.reset();
                setOpen(false);
            });
        } else {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button variant="destructive">
                    Reject
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        Reject Landlord Request
                    </DialogTitle>

                    <DialogDescription>
                        Please provide a reason for rejecting this request.
                    </DialogDescription>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={formAction}
                    className="space-y-5"
                >
                    <input
                        type="hidden"
                        name="status"
                        value="REJECTED"
                    />

                    <div className="space-y-2">
                        <Label htmlFor="rejectionReason">
                            Rejection Reason
                        </Label>

                        <Textarea
                            id="rejectionReason"
                            name="rejectionReason"
                            placeholder="Enter rejection reason..."
                            rows={5}
                            required
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="destructive"
                            disabled={pending}
                        >
                            {pending ? "Rejecting..." : "Reject Request"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}