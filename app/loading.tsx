import { Building2 } from "lucide-react";

export default function GlobalLoading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-6">
                {/* Animated logo */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <Building2 className="h-8 w-8" />
                    <span className="absolute inset-0 rounded-2xl animate-ping bg-primary opacity-20" />
                </div>

                {/* Brand name */}
                <div className="text-center">
                    <p className="text-lg font-bold tracking-tight">RentNest</p>
                    <p className="text-sm text-muted-foreground">Loading...</p>
                </div>

                {/* Spinner dots */}
                <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className="h-2 w-2 rounded-full bg-primary animate-bounce"
                            style={{ animationDelay: `${i * 150}ms` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}