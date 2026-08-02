"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { initialAuthState } from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { requestLandlordAction } from "./_actions/userAction";

type LandlordRequest = {
    status: "PENDING" | "APPROVED" | "REJECTED";
    requestReason?: string | null;
    rejectionReason?: string | null;
} | null;

interface Props {
    landlordRequest: LandlordRequest;
}

export default function LandlordRequestCard({
    landlordRequest,
}: Props) {
    const [state, formAction, pending] = useActionState(
        requestLandlordAction,
        initialAuthState,
    );

    useEffect(() => {
        if (!state.message) return;

        if (state.success) {
            toast.success(state.message);
        } else {
            toast.error(state.message);
        }
    }, [state]);

    if (landlordRequest?.status === "APPROVED") {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Landlord Request</CardTitle>
                    <CardDescription>
                        Your landlord request has been approved.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                        🎉 Congratulations! You are now a landlord.
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (landlordRequest?.status === "PENDING") {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Landlord Request</CardTitle>
                    <CardDescription>
                        Your request is currently under review.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-700">
                        Your request is pending approval.
                    </div>

                    {landlordRequest.requestReason && (
                        <div>
                            <Label>Your Reason</Label>

                            <p className="mt-1 text-sm text-muted-foreground">
                                {landlordRequest.requestReason}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    }

    if (landlordRequest?.status === "REJECTED") {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Landlord Request</CardTitle>
                    <CardDescription>
                        Your previous request was rejected.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        Your request was rejected.
                    </div>

                    {landlordRequest.rejectionReason && (
                        <div>
                            <Label>Reason</Label>

                            <p className="mt-1 text-sm text-muted-foreground">
                                {landlordRequest.rejectionReason}
                            </p>
                        </div>
                    )}

                    <form action={formAction} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Request Again</Label>

                            <Textarea
                                name="requestReason"
                                placeholder="Explain why you'd like to become a landlord..."
                                required
                            />
                        </div>

                        <Button type="submit" disabled={pending}>
                            {pending ? "Submitting..." : "Submit Request"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        );
    }

    // First request
    return (
        <Card>
            <CardHeader>
                <CardTitle>Become a Landlord</CardTitle>

                <CardDescription>
                    Submit a request to start listing your properties.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Why do you want to become a landlord?</Label>

                        <Textarea
                            name="requestReason"
                            placeholder="Tell us about yourself..."
                            required
                        />
                    </div>

                    <Button type="submit" disabled={pending}>
                        {pending ? "Submitting..." : "Submit Request"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}