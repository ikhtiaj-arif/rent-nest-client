import { ISidebarItem } from "@/lib/types";
import { ClipboardList, Home, LayoutDashboard, UserCheck, Users } from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label: "Admin Dashboard",
        href: "/admin-dashboard",
        icon: LayoutDashboard
    },
    {
        label: "Users",
        href: "/admin-dashboard/users",
        icon: Users
    },
    {
        label: "Properties",
        href: "/admin-dashboard/properties",
        icon: Home
    },
    {
        label: "Rentals",
        href: "/admin-dashboard/rentals",
        icon: ClipboardList
    },
    {
        label: "Landlord Requests",
        href: "/admin-dashboard/landlord-requests",
        icon: UserCheck
    },
];
