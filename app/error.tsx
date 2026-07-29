"use client"; // Error boundaries must be Client Components

import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log to an error reporting service in production
        console.error(error);
    }, [error]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-background px-4">
            <div className="w-full max-w-md space-y-8 text-center">
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
                        <AlertTriangle className="h-10 w-10 text-destructive" />
                    </div>
                </div>

                {/* Copy */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Something went wrong
                    </h1>
                    <p className="text-muted-foreground">
                        An unexpected error occurred. You can try again or return home.
                    </p>
                    {error.digest && (
                        <p className="text-xs text-muted-foreground/60">
                            Error ID: {error.digest}
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button onClick={reset} className="gap-2">
                        <RefreshCw className="h-4 w-4" />
                        Try again
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