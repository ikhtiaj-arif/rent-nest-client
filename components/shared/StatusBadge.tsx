import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type StatusType =
  | "PENDING"
  | "APPROVED"
  | "ACTIVE"
  | "REJECTED"
  | "CANCELLED"
  | "COMPLETED"
  | "BANNED"
  | "AVAILABLE"
  | "UNAVAILABLE"
  | "TENANT"
  | "LANDLORD"
  | "ADMIN"
  | string;

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  PENDING: {
    label: "Pending",
    className: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30 hover:bg-amber-500/20",
  },
  APPROVED: {
    label: "Approved",
    className: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30 hover:bg-blue-500/20",
  },
  ACTIVE: {
    label: "Active",
    className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20",
  },
  REJECTED: {
    label: "Rejected",
    className: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30 hover:bg-red-500/20",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-gray-500/15 text-gray-700 dark:text-gray-300 border-gray-500/30 hover:bg-gray-500/20",
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30 hover:bg-teal-500/20",
  },
  BANNED: {
    label: "Banned",
    className: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30 hover:bg-red-500/20",
  },
  AVAILABLE: {
    label: "Available",
    className: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20",
  },
  UNAVAILABLE: {
    label: "Unavailable",
    className: "bg-gray-500/15 text-gray-700 dark:text-gray-300 border-gray-500/30 hover:bg-gray-500/20",
  },
  TENANT: {
    label: "Tenant",
    className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  LANDLORD: {
    label: "Landlord",
    className: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
  ADMIN: {
    label: "Admin",
    className: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalizedKey = status?.toUpperCase() || "";
  const config = statusConfig[normalizedKey] || {
    label: status || "Unknown",
    className: "bg-secondary text-secondary-foreground border-border",
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium px-2.5 py-0.5 text-xs transition-colors rounded-full",
        config.className,
        className
      )}
    >
      {config.label}
    </Badge>
  );
}
