import { Building2, CheckCircle2, ShieldCheck, Sparkles, Home } from "lucide-react";
import Link from "next/link";

interface AuthCardProps {
    title: string;
    description: string;
    children: React.ReactNode;
    footerText: string;
    footerHref: string;
    footerLabel: string;
}

const AuthCard = ({
    title,
    description,
    children,
    footerText,
    footerHref,
    footerLabel,
}: AuthCardProps) => {
    return (
        <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl grid grid-cols-1 md:grid-cols-2">
            {/* Left Branding Panel (Hidden on mobile) */}
            <div className="relative hidden md:flex flex-col justify-between p-8 bg-gradient-to-br from-primary/95 via-primary to-emerald-900 text-primary-foreground overflow-hidden">
                <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-emerald-400/20 blur-2xl" />

                <div className="relative z-10 space-y-6">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md text-white border border-white/20">
                            <Building2 className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">RentNest</span>
                    </Link>

                    <div className="space-y-2 pt-8">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-white border border-white/20">
                            <Sparkles className="w-3.5 h-3.5" /> Premium Rental Experience
                        </span>
                        <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
                            Find your ideal place with confidence.
                        </h2>
                        <p className="text-sm text-white/80 leading-relaxed">
                            Connect directly with verified landlords and manage your entire rental lifecycle seamlessly.
                        </p>
                    </div>
                </div>

                <div className="relative z-10 space-y-3 pt-6 border-t border-white/15 text-xs text-white/90">
                    <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                        <span>Verified property listings & transparent pricing</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
                        <span>Secure digital rental requests & payments</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <Home className="w-4 h-4 text-emerald-300 shrink-0" />
                        <span>Dedicated Tenant & Landlord dashboards</span>
                    </div>
                </div>
            </div>

            {/* Right Form Section */}
            <div className="flex flex-col justify-between p-6 sm:p-10 bg-card">
                <div>
                    {/* Mobile Logo */}
                    <div className="mb-6 flex items-center justify-center gap-2 md:hidden">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                            <Building2 className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">RentNest</span>
                    </div>

                    <div className="mb-6 space-y-1 text-center md:text-left">
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                            {title}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    </div>

                    {children}
                </div>

                <div className="mt-8 border-t border-border/60 pt-6 text-center text-sm text-muted-foreground">
                    <p>
                        {footerText}{" "}
                        <Link
                            href={footerHref}
                            className="font-semibold text-primary hover:underline"
                        >
                            {footerLabel}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthCard;