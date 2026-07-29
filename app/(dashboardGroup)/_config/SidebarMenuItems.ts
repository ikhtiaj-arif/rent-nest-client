import { ISidebarItem } from "@/lib/types";
import { Currency, DollarSign, FileText, LayoutDashboard, TriangleAlertIcon } from "lucide-react";
import { ADMIN_SIDEBAR_ITEMS } from "./AdminMenuItems";
import { LANDLORD_SIDEBAR_ITEMS } from "./LandlordMenuItems";

const TENANT_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Rental Requests",
    href: "/dashboard/rental-requests",
    icon: TriangleAlertIcon,
  },
  {
    label: "My Payments",
    href: "/dashboard/payments",
    icon: Currency,
  },
];

export const sidebarMenuItems = {
  TENANT: TENANT_SIDEBAR_ITEMS,
  LANDLORD: LANDLORD_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};
