import { ISidebarItem } from "@/lib/types";
import { House, LayoutDashboard, TriangleAlertIcon } from "lucide-react";

export const LANDLORD_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/landlord-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Properties",
    href: "/landlord-dashboard/properties",
    icon: House,
  },
  {
    label: "Rental Requests",
    href: "/landlord-dashboard/rental-requests",
    icon: TriangleAlertIcon,
  },
];
