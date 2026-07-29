import { Building2, Home, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-background px-4">
            <div className="w-full max-w-md space-y-8 text-center">
                {/* Logo */}
                <div className="flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                        <Building2 className="h-8 w-8" />
                    </div>
                </div>

                {/* 404 */}
                <div className="space-y-2">
                    <p className="text-8xl font-black tracking-tighter text-primary/20">
                        404
                    </p>
                    <h1 className="-mt-4 text-3xl font-bold tracking-tight">
                        Page not found
                    </h1>
                    <p className="text-muted-foreground">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button asChild className="gap-2">
                        <Link href="/properties">
                            <Search className="h-4 w-4" />
                            Browse Properties
                        </Link>
                    </Button>
                    <Button variant="outline" asChild className="gap-2">
                        <Link href="/">
                            <Home className="h-4 w-4" />
                            Go home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
