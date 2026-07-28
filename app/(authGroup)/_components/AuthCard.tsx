import Link from "next/link";
import { Building2 } from "lucide-react";

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
      <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-primary/5 blur-3xl" />

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