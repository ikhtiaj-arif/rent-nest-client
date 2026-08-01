"use client";

import { useEffect } from "react";
import { AlertCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[v0] Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-card rounded-2xl p-8 border border-border shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="bg-destructive/10 p-4 rounded-full">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-foreground mb-3">Something Went Wrong</h1>
        <p className="text-center text-muted-foreground mb-6">
          We encountered an unexpected error. Please try again or contact support if the problem persists.
        </p>
        <div className="bg-background/50 rounded-lg p-4 mb-6 max-h-24 overflow-auto">
          <p className="text-xs font-mono text-muted-foreground break-words">
            {error.message || "Unknown error"}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Button onClick={reset} className="w-full bg-primary hover:bg-primary/90">
            Try Again
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/" className="flex items-center justify-center gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
