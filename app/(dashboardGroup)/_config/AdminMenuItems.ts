import { ISidebarItem } from "@/lib/types";
import { FileText, Home, House, LayoutDashboard, TriangleAlertIcon, Users } from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label : "Admin Dashboard",
        href : "/admin-dashboard",
        icon : LayoutDashboard
    },
    {
        label : "Users",
        href : "/admin-dashboard/users",
        icon : Users
    },
    {
        label : "Properties",
        href : "/admin-dashboard/properties",
        icon : House
    },
    {
        label : "Rentals",
        href : "/admin-dashboard/rentals",
        icon : TriangleAlertIcon
    },
    {
        label : "Landlord Requests",
        href : "/admin-dashboard/landlord-requests",
        icon : TriangleAlertIcon
    },
]
