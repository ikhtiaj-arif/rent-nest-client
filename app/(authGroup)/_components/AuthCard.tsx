import { Building2 } from "lucide-react";
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
        <div className="relative w-full max-w-md">
            {/* Background decoration */}
            <div className="absolute inset-0 rounded-3xl">
                <div className="absolute -left-10 -top-10 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
                <div className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
            </div>

            <div className="relative rounded-3xl border bg-card p-8 shadow-xl">
                {/* Logo */}
                <div className="mb-8 flex flex-col items-center text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                        <Building2 className="h-7 w-7" />
                    </div>

                    <h1 className="mt-6 text-3xl font-bold tracking-tight">
                        {title}
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        {description}
                    </p>
                </div>

                {children}

                <div className="mt-8 border-t pt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        {footerText}{" "}
                        <Link
                            href={footerHref}
                            className="font-medium text-primary hover:underline"
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