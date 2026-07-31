"use client";

import {
    CheckCircle2,
    Clock3,
    XCircle,
} from "lucide-react";

interface Props {
    status: "PENDING" | "APPROVED" | "REJECTED";
}

export function StatusTimeline({
    status,
}: Props) {

    return (
        <div className="space-y-6">

            <TimelineItem
                label="Request Submitted"
                active
                completed
            />

            <TimelineItem
                label="Landlord Review"
                active={status === "PENDING"}
                completed={
                    status === "APPROVED" ||
                    status === "REJECTED"
                }
            />

            <TimelineItem
                label={
                    status === "REJECTED"
                        ? "Rejected"
                        : "Approved"
                }
                active={status !== "PENDING"}
                completed={status === "APPROVED"}
                rejected={status === "REJECTED"}
                last
            />

        </div>
    );
}

function TimelineItem({
    label,
    active,
    completed,
    rejected,
    last,
}: {
    label: string;
    active?: boolean;
    completed?: boolean;
    rejected?: boolean;
    last?: boolean;
}) {
    return (
        <div className="flex gap-4">

            <div className="flex flex-col items-center">

                {completed ? (
                    <CheckCircle2 className="text-green-500 h-6 w-6" />
                ) : rejected ? (
                    <XCircle className="text-red-500 h-6 w-6" />
                ) : active ? (
                    <Clock3 className="text-blue-500 h-6 w-6" />
                ) : (
                    <div className="h-6 w-6 rounded-full border-2" />
                )}

                {!last && (
                    <div className="w-px flex-1 bg-border mt-2" />
                )}

            </div>

            <div className="pt-1">
                <p className="font-medium">
                    {label}
                </p>
            </div>

        </div>
    );
}