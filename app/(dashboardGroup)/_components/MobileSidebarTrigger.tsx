"use client";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ISidebarItem, NavbarProps } from "@/lib/types";
import { logout } from "@/service/logout";
import { Building2, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { sidebarMenuItems } from "../_config/SidebarMenuItems";

// MODIFIED: Created mobile sidebar trigger component for responsive navigation
export function MobileSidebarTrigger({ user }: NavbarProps) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    let navItems: ISidebarItem[] = [];

    if (user.data.profile.role === "TENANT") {
        navItems = sidebarMenuItems.TENANT;
    } else if (user.data.profile.role === "LANDLORD") {
        navItems = sidebarMenuItems.LANDLORD;
    } else if (user.data.profile.role === "ADMIN") {
        navItems = sidebarMenuItems.ADMIN;
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="rounded-lg">
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 flex flex-col">
                {/* Header */}
                <div className="h-16 flex items-center gap-3 px-4 border-b border-border">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Building2 className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="font-semibold text-sm">RentNest</span>
                        <span className="text-xs text-muted-foreground">{user.data.profile.role}</span>
                    </div>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 overflow-y-auto py-4 px-2">
                    <ul className="space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive
                                                ? "bg-primary text-primary-foreground"
                                                : "text-foreground hover:bg-accent"
                                            }`}
                                    >
                                        <Icon className="w-4 h-4 shrink-0" />
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-border">
                    <form action={logout} className="w-full">
                        <Button
                            type="submit"
                            variant="outline"
                            className="w-full justify-start gap-2"
                            onClick={() => setOpen(false)}
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </Button>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
}
