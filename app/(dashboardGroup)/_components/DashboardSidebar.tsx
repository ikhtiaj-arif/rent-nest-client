"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

import { Building2, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ISidebarItem, NavbarProps } from "@/lib/types";
import { logout } from "@/service/logout";
import { sidebarMenuItems } from "../_config/SidebarMenuItems";

// MODIFIED: Added responsiveness, header, and logout functionality
export default function DashboardSidebar({ user }: NavbarProps) {
  const pathname = usePathname();

  let navItems: ISidebarItem[] = [];

  if (user?.data?.profile?.role === "TENANT") {
    navItems = sidebarMenuItems.TENANT
  } else if (user?.data?.profile?.role === "LANDLORD") {
    navItems = sidebarMenuItems.LANDLORD;
  } else if (user?.data?.profile?.role === "ADMIN") {
    navItems = sidebarMenuItems.ADMIN;
  }

  return (
    <Sidebar
      collapsible="icon"
      className="hidden md:flex h-[calc(100svh-3.5rem)] border-r border-sidebar-border"
    >
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <Building2 className="h-4 w-4" />
          </div>
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-sm font-semibold text-sidebar-foreground truncate">
              RentNest
            </span>
            <span className="text-xs text-sidebar-foreground/70 truncate">
              {user?.data?.profile?.role}
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    className="text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <Link href={item.href}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <form action={logout}>
          <Button
            type="submit"
            variant="outline"
            className="w-full justify-start gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </form>
      </div>
    </Sidebar>
  );
}
