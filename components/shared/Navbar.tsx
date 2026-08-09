"use client";

import {
    Building2,
    LayoutDashboard,
    LogOut,
    Menu,
    User as UserIcon
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

import { NavbarProps } from "@/lib/types";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
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
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { logout } from "@/service/logout";
import Image from "next/image";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

const dashboardRoutes = {
    TENANT: "/dashboard",
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
    {
        label: "Profile",
        icon: UserIcon,
        action: "profile",
    },
];

export function Navbar({ user }: NavbarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const profilePicture = user.data?.profile?.profilePicture;
    const userName = user.data?.profile?.name || "User";
    const userInitial = userName.charAt(0).toUpperCase();

    const handleUserMenuAction = async (action: string) => {
        setMobileOpen(false);
        switch (action) {
            case "dashboard": {
                const role = user.data?.profile?.role as keyof typeof dashboardRoutes;
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
        }
    };

    return (
        <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                        <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-base font-bold tracking-tight text-foreground leading-none">
                            RentNest
                        </p>
                        <p className="text-[10px] text-muted-foreground font-medium mt-0.5">
                            Property Platform
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList className="gap-1">
                        {navItems.map((item) => {
                            const active =
                                item.href === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(item.href);

                            return (
                                <NavigationMenuItem key={item.href}>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href={item.href}
                                            className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                                                active
                                                    ? "bg-accent text-accent-foreground font-semibold"
                                                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
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
                    <ThemeToggle />

                    {user.success ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 rounded-full p-0.5 outline-none ring-offset-background transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring">
                                    {profilePicture ? (
                                        <Image
                                            src={profilePicture}
                                            alt={userName}
                                            width={36}
                                            height={36}
                                            className="h-9 w-9 rounded-full object-cover border border-border"
                                        />
                                    ) : (
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm border border-primary/20">
                                            {userInitial}
                                        </div>
                                    )}
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>
                                    <div className="space-y-0.5">
                                        <p className="font-semibold text-sm truncate">
                                            {userName}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate font-normal">
                                            {user.data?.profile?.email}
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
                                            className="cursor-pointer"
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
                                    className="cursor-pointer"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button size="sm" asChild>
                                <Link href="/register">Get Started</Link>
                            </Button>
                        </div>
                    )}
                </div>

                {/* Mobile Right Controls */}
                <div className="flex items-center gap-1 md:hidden">
                    <ThemeToggle />

                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-9 w-9">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="right" className="w-72 sm:w-80">
                            <SheetHeader className="pb-4 border-b">
                                <SheetTitle className="flex items-center gap-2">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                        <Building2 className="h-4 w-4" />
                                    </div>
                                    <span className="font-bold">RentNest</span>
                                </SheetTitle>
                            </SheetHeader>

                            <div className="py-6 flex flex-col gap-1.5">
                                {navItems.map((item) => {
                                    const active =
                                        item.href === "/"
                                            ? pathname === "/"
                                            : pathname.startsWith(item.href);

                                    return (
                                        <Button
                                            key={item.href}
                                            asChild
                                            variant={active ? "secondary" : "ghost"}
                                            className="justify-start text-sm font-medium"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            <Link href={item.href}>{item.label}</Link>
                                        </Button>
                                    );
                                })}

                                <div className="mt-6 border-t pt-6">
                                    {user.success ? (
                                        <div className="space-y-3">
                                            <div className="px-2 pb-2">
                                                <p className="font-semibold text-sm">
                                                    {userName}
                                                </p>
                                                <p className="text-xs text-muted-foreground truncate">
                                                    {user.data?.profile?.email}
                                                </p>
                                            </div>

                                            {userMenuItems.map((item) => {
                                                const Icon = item.icon;
                                                return (
                                                    <Button
                                                        key={item.action}
                                                        variant="outline"
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
                                                className="w-full justify-start"
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
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                <Link href="/login">Login</Link>
                                            </Button>

                                            <Button
                                                className="w-full"
                                                asChild
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                <Link href="/register">Create Account</Link>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}