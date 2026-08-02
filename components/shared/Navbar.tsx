"use client";

import {
    Building2,
    LayoutDashboard,
    LogOut,
    Menu,
    User
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { NavbarProps } from "@/lib/types";


import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { logout } from "@/service/logout";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

const dashboardRoutes = {
    USER: "/dashboard",
    LANDLORD: "/landlord-dashboard",
    ADMIN: "/admin-dashboard",
} as const;

const userMenuItems = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        action: "dashboard",
    },
    // {
    //     label: "Profile",
    //     icon: User,
    //     action: "profile",
    // },
    // {
    //     label: "Settings",
    //     icon: Settings,
    //     action: "settings",
    // },
];

export function Navbar({ user }: NavbarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleUserMenuAction = async (action: string) => {
        switch (action) {
            case "dashboard": {
                const role = user.data?.profile.role as keyof typeof dashboardRoutes;

                router.push(dashboardRoutes[role] ?? "/dashboard");
                break;
            }

            case "logout": {
                await logout();

                toast.success("Logged out successfully.");

                router.replace("/login");

                router.refresh();

                break;
            }

            case "profile":
                router.push("/profile");
                break;

            case "settings":
                router.push("/settings");
                break;
        }
    };

    return (
        <header className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">

                {/* Logo */}

                <Link
                    href="/"
                    className="flex items-center gap-3"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <Building2 className="h-5 w-5" />
                    </div>

                    <div>
                        <p className="text-lg font-bold tracking-tight">
                            RentNest
                        </p>

                        <p className="-mt-1 text-xs text-muted-foreground">
                            Smart Rental Platform
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation */}

                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList>
                        {navItems.map((item) => {
                            const active =
                                pathname === item.href ||
                                pathname.startsWith(item.href + "/");

                            return (
                                <NavigationMenuItem key={item.href}>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href={item.href}
                                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${active
                                                ? "bg-accent text-accent-foreground"
                                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                                }`}
                                        >
                                            {item.label}
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            );
                        })}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Desktop Right */}

                <div className="hidden items-center gap-2 md:flex">
                    {user.success ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="rounded-full outline-none ring-offset-background transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                        <User className="h-5 w-5 text-primary" />
                                    </div>
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                className="w-60"
                            >
                                <DropdownMenuLabel>
                                    <div className="space-y-1">
                                        <p className="font-medium">
                                            {user.data?.profile.name}
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            {user.data?.profile.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                {userMenuItems.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <DropdownMenuItem
                                            key={item.action}
                                            onClick={() =>
                                                handleUserMenuAction(item.action)
                                            }
                                        >
                                            <Icon className="mr-2 h-4 w-4" />
                                            {item.label}
                                        </DropdownMenuItem>
                                    );
                                })}

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                    onClick={() =>
                                        handleUserMenuAction("logout")
                                    }
                                    variant="destructive"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Button
                                variant="ghost"
                                asChild
                            >
                                <Link href="/login">
                                    Login
                                </Link>
                            </Button>

                            <Button asChild>
                                <Link href="/register">
                                    Get Started
                                </Link>
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile */}

                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>

                    <SheetContent className="w-80">
                        <div className="mt-8 flex flex-col gap-2">

                            {navItems.map((item) => {
                                const active =
                                    pathname === item.href ||
                                    pathname.startsWith(item.href + "/");

                                return (
                                    <Button
                                        key={item.href}
                                        asChild
                                        variant={active ? "secondary" : "ghost"}
                                        className="justify-start"
                                    >
                                        <Link href={item.href}>
                                            {item.label}
                                        </Link>
                                    </Button>
                                );
                            })}

                            <div className="mt-6 border-t pt-6">
                                {user.success ? (
                                    <div className="space-y-2">
                                        <div className="pb-4">
                                            <p className="font-medium">
                                                {user.data?.profile.name}
                                            </p>

                                            <p className="text-sm text-muted-foreground">
                                                {user.data?.profile.email}
                                            </p>
                                        </div>

                                        {userMenuItems.map((item) => {
                                            const Icon = item.icon;

                                            return (
                                                <Button
                                                    key={item.action}
                                                    variant="ghost"
                                                    className="w-full justify-start"
                                                    onClick={() =>
                                                        handleUserMenuAction(item.action)
                                                    }
                                                >
                                                    <Icon className="mr-2 h-4 w-4" />
                                                    {item.label}
                                                </Button>
                                            );
                                        })}

                                        <Button
                                            variant="destructive"
                                            className="w-full"
                                            onClick={() =>
                                                handleUserMenuAction("logout")
                                            }
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Log out
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            asChild
                                        >
                                            <Link href="/login">
                                                Login
                                            </Link>
                                        </Button>

                                        <Button
                                            className="w-full"
                                            asChild
                                        >
                                            <Link href="/register">
                                                Create Account
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}