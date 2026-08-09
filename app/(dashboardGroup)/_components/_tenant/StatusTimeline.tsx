"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";

interface Props {
    status: "PENDING" | "APPROVED" | "REJECTED";
}

export function StatusTimeline({ status }: Props) {
    return (
        <div className="space-y-2">
            <TimelineItem
                label="Request Submitted"
                description="Your rental request has been submitted"
                timestamp="Completed"
                completed
                lineCompleted
            />

            <TimelineItem
                label="Landlord Review"
                description={
                    status === "PENDING"
                        ? "The landlord is reviewing your request"
                        : "The landlord has reviewed your request"
                }
                timestamp={status === "PENDING" ? "In Progress" : "Completed"}
                active={status === "PENDING"}
                completed={status === "APPROVED" || status === "REJECTED"}
                lineCompleted={status === "APPROVED" || status === "REJECTED"}
            />

            <TimelineItem
                label={
                    status === "REJECTED"
                        ? "Request Rejected"
                        : status === "APPROVED"
                        ? "Request Approved"
                        : "Final Decision"
                }
                description={
                    status === "APPROVED"
                        ? "Your request was approved"
                        : status === "REJECTED"
                        ? "Your request was rejected"
                        : "Awaiting landlord decision"
                }
                timestamp={
                    status === "APPROVED"
                        ? "Approved"
                        : status === "REJECTED"
                        ? "Rejected"
                        : "Pending"
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
    description,
    timestamp,
    active,
    completed,
    rejected,
    lineCompleted,
    last,
}: {
    label: string;
    description: string;
    timestamp: string;
    active?: boolean;
    completed?: boolean;
    rejected?: boolean;
    lineCompleted?: boolean;
    last?: boolean;
}) {
    return (
        <div
            className={cn(
                "flex gap-4 p-3 rounded-xl transition-all duration-200 border border-transparent",
                active && "bg-muted/50 dark:bg-muted/30 border-border/60 shadow-xs"
            )}
        >
            <div className="flex flex-col items-center">
                {completed ? (
                    <CheckCircle2 className="h-6 w-6 text-emerald-500 dark:text-emerald-400 shrink-0" />
                ) : rejected ? (
                    <XCircle className="h-6 w-6 text-red-500 dark:text-red-400 shrink-0" />
                ) : active ? (
                    <Clock3 className="h-6 w-6 text-blue-500 dark:text-blue-400 animate-pulse shrink-0" />
                ) : (
                    <div className="h-6 w-6 rounded-full border-2 border-muted bg-background shrink-0 flex items-center justify-center text-muted-foreground" />
                )}

                {!last && (
                    <div
                        className={cn(
                            "w-0.5 flex-1 mt-2 min-h-[20px] rounded-full transition-colors",
                            lineCompleted ? "bg-primary" : "bg-border"
                        )}
                    />
                )}
            </div>

            <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-foreground text-sm sm:text-base">
                        {label}
                    </p>
                    <span
                        className={cn(
                            "text-xs shrink-0 font-medium",
                            completed
                                ? "text-emerald-600 dark:text-emerald-400"
                                : rejected
                                ? "text-red-600 dark:text-red-400"
                                : active
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-muted-foreground"
                        )}
                    >
                        {timestamp}
                    </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    {description}
                </p>
            </div>
        </div>
    );
}