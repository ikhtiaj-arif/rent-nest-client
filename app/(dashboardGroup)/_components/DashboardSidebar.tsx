"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from "@/components/ui/sidebar";

import { Building2, LogOut, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ISidebarItem, NavbarProps } from "@/lib/types";
import { logout } from "@/service/logout";
import { sidebarMenuItems } from "../_config/SidebarMenuItems";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardSidebar({ user }: NavbarProps) {
  const pathname = usePathname();

  let navItems: ISidebarItem[] = [];
  const userRole = user?.data?.profile?.role || "USER";
  const userName = user?.data?.profile?.name || "User";
  const userEmail = user?.data?.profile?.email || "";
  const profilePicture = user?.data?.profile?.profilePicture;
  const initial = userName.charAt(0).toUpperCase();

  if (userRole === "TENANT") {
    navItems = sidebarMenuItems.TENANT;
  } else if (userRole === "LANDLORD") {
    navItems = sidebarMenuItems.LANDLORD;
  } else if (userRole === "ADMIN") {
    navItems = sidebarMenuItems.ADMIN;
  }

  return (
    <Sidebar
      collapsible="icon"
      className="hidden md:flex border-r border-sidebar-border bg-sidebar"
    >
      <SidebarHeader className="border-b border-sidebar-border p-3">
        <div className="flex items-center gap-3 px-1 py-1">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-sm font-bold text-sidebar-foreground truncate">
              RentNest
            </span>
            <span className="text-[11px] font-medium text-sidebar-foreground/70 truncate uppercase tracking-wider">
              {userRole}
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-xs"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      }`}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4 shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3 space-y-2">
        {/* User Card */}
        <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg bg-sidebar-accent/30">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profilePicture || undefined} alt={userName} />
            <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
              {initial}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
            <span className="text-xs font-semibold truncate text-sidebar-foreground">
              {userName}
            </span>
            <span className="text-[10px] text-sidebar-foreground/60 truncate">
              {userEmail}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-1">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 h-8 text-xs text-sidebar-foreground/80 hover:text-sidebar-foreground"
          >
            <Link href="/profile">
              <UserIcon className="w-3.5 h-3.5" />
              <span>Profile Settings</span>
            </Link>
          </Button>

          <form action={logout} className="w-full">
            <Button
              type="submit"
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 h-8 text-xs text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </Button>
          </form>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
